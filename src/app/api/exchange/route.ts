import { NextResponse } from "next/server";

import { ExchangeConfigurationError } from "@/lib/env.server";
import {
  convertCurrency,
  ExchangeProviderError,
  getSupportedCurrencies,
} from "@/lib/exchange-rate/provider.server";
import { exchangeQuerySchema } from "@/lib/exchange-rate/schemas";

const ALLOWED_QUERY_PARAMETERS = new Set(["amount", "base", "target"]);

function errorResponse(message: string, status: number) {
  return NextResponse.json({ error: message }, { status });
}

export async function GET(request: Request) {
  const searchParams = new URL(request.url).searchParams;
  const parameterNames = [...searchParams.keys()];

  const hasInvalidParameters = parameterNames.some(
    (name) =>
      !ALLOWED_QUERY_PARAMETERS.has(name) || searchParams.getAll(name).length !== 1,
  );

  if (hasInvalidParameters) {
    return errorResponse("Parâmetros de conversão inválidos.", 400);
  }

  const parsedQuery = exchangeQuerySchema.safeParse(
    Object.fromEntries(searchParams.entries()),
  );

  if (!parsedQuery.success) {
    return errorResponse("Parâmetros de conversão inválidos.", 400);
  }

  try {
    const currencies = await getSupportedCurrencies();
    const supportedCodes = new Set(currencies.map(({ code }) => code));
    const { amount, base, target } = parsedQuery.data;

    if (!supportedCodes.has(base) || !supportedCodes.has(target)) {
      return errorResponse("Moeda não suportada.", 400);
    }

    const conversion = await convertCurrency(base, target, amount);

    return NextResponse.json(conversion, {
      headers: { "Cache-Control": "private, no-store" },
    });
  } catch (error) {
    if (error instanceof ExchangeConfigurationError) {
      return errorResponse("Serviço de câmbio não configurado.", 503);
    }

    if (error instanceof ExchangeProviderError) {
      return errorResponse(
        "Não foi possível consultar a cotação agora. Tente novamente.",
        502,
      );
    }

    return errorResponse("Não foi possível concluir a conversão.", 500);
  }
}
