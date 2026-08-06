import { z } from "zod";

import { getExchangeRateApiKey } from "@/lib/env.server";
import { currencyCodeSchema } from "@/lib/exchange-rate/schemas";
import type {
  Currency,
  ExchangeRateResponse,
} from "@/lib/exchange-rate/types";

const PROVIDER_BASE_URL = "https://v6.exchangerate-api.com/v6";
const REQUEST_TIMEOUT_MS = 8_000;
const CURRENCY_CACHE_SECONDS = 24 * 60 * 60;

const supportedCodesPayloadSchema = z.object({
  result: z.literal("success"),
  supported_codes: z.array(
    z.tuple([currencyCodeSchema, z.string().trim().min(1)]),
  ),
});

const conversionPayloadSchema = z.object({
  result: z.literal("success"),
  base_code: currencyCodeSchema,
  target_code: currencyCodeSchema,
  conversion_rate: z.number().finite().positive(),
  conversion_result: z.number().finite(),
  time_last_update_unix: z.number().int().nonnegative(),
});

type ProviderRequestOptions = {
  revalidate?: number;
};

export class ExchangeProviderError extends Error {
  constructor(message = "Exchange-rate provider request failed.") {
    super(message);
    this.name = "ExchangeProviderError";
  }
}

async function requestProvider(
  path: string,
  options: ProviderRequestOptions = {},
): Promise<unknown> {
  const apiKey = getExchangeRateApiKey();
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

  try {
    const response = await fetch(
      `${PROVIDER_BASE_URL}/${encodeURIComponent(apiKey)}${path}`,
      {
        headers: { Accept: "application/json" },
        signal: controller.signal,
        ...(options.revalidate
          ? { next: { revalidate: options.revalidate } }
          : { cache: "no-store" }),
      },
    );

    if (!response.ok) {
      throw new ExchangeProviderError();
    }

    return (await response.json()) as unknown;
  } catch (error) {
    if (error instanceof ExchangeProviderError) {
      throw error;
    }

    throw new ExchangeProviderError();
  } finally {
    clearTimeout(timeout);
  }
}

export async function getSupportedCurrencies(): Promise<Currency[]> {
  const payload = await requestProvider("/codes", {
    revalidate: CURRENCY_CACHE_SECONDS,
  });
  const parsedPayload = supportedCodesPayloadSchema.safeParse(payload);

  if (!parsedPayload.success) {
    throw new ExchangeProviderError();
  }

  return parsedPayload.data.supported_codes
    .map(([code, name]) => ({ code, name }))
    .sort((left, right) => left.code.localeCompare(right.code));
}

export async function convertCurrency(
  baseCode: string,
  targetCode: string,
  sourceAmount: number,
): Promise<ExchangeRateResponse> {
  const payload = await requestProvider(
    `/pair/${encodeURIComponent(baseCode)}/${encodeURIComponent(targetCode)}/${sourceAmount}`,
  );
  const parsedPayload = conversionPayloadSchema.safeParse(payload);

  if (!parsedPayload.success) {
    throw new ExchangeProviderError();
  }

  const data = parsedPayload.data;

  return {
    baseCode: data.base_code,
    targetCode: data.target_code,
    rate: data.conversion_rate,
    convertedAmount: data.conversion_result,
    sourceAmount,
    updatedAt: new Date(data.time_last_update_unix * 1_000).toISOString(),
  };
}
