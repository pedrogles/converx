"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useMemo, useRef, useState } from "react";
import { useForm } from "react-hook-form";

import {
  DEFAULT_SOURCE_CURRENCY,
  DEFAULT_TARGET_CURRENCY,
} from "@/lib/currency/constants";
import {
  formatMoney,
  formatRate,
  formatUpdateTime,
} from "@/lib/currency/format";
import { parseBrazilianAmount } from "@/lib/currency/parse";
import {
  currencyFormSchema,
  exchangeRateResponseSchema,
  type CurrencyFormValues,
} from "@/lib/exchange-rate/schemas";
import type {
  Currency,
  ExchangeRateResponse,
} from "@/lib/exchange-rate/types";

type ConversionState =
  | { status: "idle" }
  | { status: "loading" }
  | { status: "success"; data: ExchangeRateResponse }
  | { status: "error"; message: string };

type CurrencyConverterProps = {
  currencies: Currency[];
  loadError?: string;
};

function pickDefaultCode(
  currencies: Currency[],
  preferredCode: string,
  excludedCode?: string,
) {
  return (
    currencies.find(
      ({ code }) => code === preferredCode && code !== excludedCode,
    )?.code ?? currencies.find(({ code }) => code !== excludedCode)?.code ?? ""
  );
}

async function readErrorMessage(response: Response): Promise<string> {
  try {
    const payload = (await response.json()) as { error?: unknown };
    return typeof payload.error === "string"
      ? payload.error
      : "Não foi possível concluir a conversão.";
  } catch {
    return "Não foi possível concluir a conversão.";
  }
}

export function CurrencyConverter({
  currencies,
  loadError,
}: CurrencyConverterProps) {
  const defaults = useMemo(() => {
    const sourceCode = pickDefaultCode(
      currencies,
      DEFAULT_SOURCE_CURRENCY,
    );
    const targetCode = pickDefaultCode(
      currencies,
      DEFAULT_TARGET_CURRENCY,
      sourceCode,
    );

    return { amount: "1,00", sourceCode, targetCode };
  }, [currencies]);
  const [state, setState] = useState<ConversionState>({ status: "idle" });
  const requestController = useRef<AbortController | null>(null);
  const requestSequence = useRef(0);
  const {
    clearErrors,
    formState: { errors },
    getValues,
    handleSubmit,
    register,
    setValue,
  } = useForm<CurrencyFormValues>({
    resolver: zodResolver(currencyFormSchema),
    defaultValues: defaults,
  });

  useEffect(() => {
    return () => requestController.current?.abort();
  }, []);

  async function performConversion(values: CurrencyFormValues) {
    const amount = parseBrazilianAmount(values.amount);

    if (amount === null) {
      return;
    }

    requestController.current?.abort();
    const controller = new AbortController();
    const sequence = ++requestSequence.current;
    requestController.current = controller;
    setState({ status: "loading" });

    try {
      const query = new URLSearchParams({
        amount: String(amount),
        base: values.sourceCode,
        target: values.targetCode,
      });
      const response = await fetch(`/api/exchange?${query}`, {
        headers: { Accept: "application/json" },
        signal: controller.signal,
      });

      if (!response.ok) {
        throw new Error(await readErrorMessage(response));
      }

      const parsedResponse = exchangeRateResponseSchema.safeParse(
        (await response.json()) as unknown,
      );

      if (!parsedResponse.success) {
        throw new Error("O serviço retornou uma resposta inesperada.");
      }

      if (sequence === requestSequence.current) {
        setState({ status: "success", data: parsedResponse.data });
      }
    } catch (error) {
      if (controller.signal.aborted || sequence !== requestSequence.current) {
        return;
      }

      setState({
        status: "error",
        message:
          error instanceof Error
            ? error.message
            : "Não foi possível concluir a conversão.",
      });
    } finally {
      if (sequence === requestSequence.current) {
        requestController.current = null;
      }
    }
  }

  function submitConversion(event?: React.BaseSyntheticEvent) {
    void handleSubmit(performConversion)(event);
  }

  function swapCurrencies() {
    const sourceCode = getValues("sourceCode");
    const targetCode = getValues("targetCode");

    setValue("sourceCode", targetCode, { shouldValidate: true });
    setValue("targetCode", sourceCode, { shouldValidate: true });
    clearErrors(["sourceCode", "targetCode"]);
    setState({ status: "idle" });
  }

  const isUnavailable = currencies.length < 2 || Boolean(loadError);
  const isLoading = state.status === "loading";

  return (
    <section
      aria-labelledby="converter-title"
      className="rounded-3xl border border-slate-200 bg-white p-5 shadow-xl shadow-slate-950/5 sm:p-8"
    >
      <div className="mb-6">
        <p className="text-sm font-semibold uppercase tracking-[0.16em] text-cyan-700">
          Cotação atualizada
        </p>
        <h2
          className="mt-2 text-2xl font-bold tracking-tight text-slate-950"
          id="converter-title"
        >
          Faça sua conversão
        </h2>
      </div>

      {loadError ? (
        <p
          className="mb-5 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-950"
          role="alert"
        >
          {loadError}
        </p>
      ) : null}

      <form className="space-y-5" noValidate onSubmit={submitConversion}>
        <div>
          <label className="field-label" htmlFor="amount">
            Valor
          </label>
          <input
            aria-describedby={errors.amount ? "amount-error" : "amount-hint"}
            aria-invalid={Boolean(errors.amount)}
            className="field-control"
            disabled={isUnavailable || isLoading}
            id="amount"
            inputMode="decimal"
            placeholder="1.000,00"
            {...register("amount")}
          />
          {errors.amount ? (
            <p className="field-error" id="amount-error">
              {errors.amount.message}
            </p>
          ) : (
            <p className="field-hint" id="amount-hint">
              Use vírgula ou ponto para os centavos.
            </p>
          )}
        </div>

        <div className="grid gap-4 sm:grid-cols-[1fr_auto_1fr] sm:items-end">
          <div>
            <label className="field-label" htmlFor="source-currency">
              De
            </label>
            <select
              aria-describedby={
                errors.sourceCode ? "source-currency-error" : undefined
              }
              aria-invalid={Boolean(errors.sourceCode)}
              className="field-control"
              disabled={isUnavailable || isLoading}
              id="source-currency"
              {...register("sourceCode")}
            >
              {currencies.map(({ code, name }) => (
                <option key={code} value={code}>
                  {code} — {name}
                </option>
              ))}
            </select>
            {errors.sourceCode ? (
              <p className="field-error" id="source-currency-error">
                {errors.sourceCode.message}
              </p>
            ) : null}
          </div>

          <button
            aria-label="Inverter moedas"
            className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-xl border border-slate-300 bg-white px-3 text-xl font-semibold text-slate-700 transition hover:border-cyan-600 hover:text-cyan-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-700 disabled:cursor-not-allowed disabled:opacity-50"
            disabled={isUnavailable || isLoading}
            onClick={swapCurrencies}
            type="button"
          >
            ⇄
          </button>

          <div>
            <label className="field-label" htmlFor="target-currency">
              Para
            </label>
            <select
              aria-describedby={
                errors.targetCode ? "target-currency-error" : undefined
              }
              aria-invalid={Boolean(errors.targetCode)}
              className="field-control"
              disabled={isUnavailable || isLoading}
              id="target-currency"
              {...register("targetCode")}
            >
              {currencies.map(({ code, name }) => (
                <option key={code} value={code}>
                  {code} — {name}
                </option>
              ))}
            </select>
            {errors.targetCode ? (
              <p className="field-error" id="target-currency-error">
                {errors.targetCode.message}
              </p>
            ) : null}
          </div>
        </div>

        <button
          className="inline-flex min-h-12 w-full items-center justify-center rounded-xl bg-cyan-700 px-5 py-3 font-bold text-white shadow-lg shadow-cyan-950/15 transition hover:bg-cyan-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-700 disabled:cursor-not-allowed disabled:bg-slate-400"
          disabled={isUnavailable || isLoading}
          type="submit"
        >
          {isLoading ? "Consultando cotação…" : "Converter moedas"}
        </button>
      </form>

      <div className="mt-6 min-h-28" aria-live="polite">
        {state.status === "idle" ? (
          <p className="rounded-2xl bg-slate-50 p-5 text-sm leading-6 text-slate-600">
            Preencha o valor, escolha moedas diferentes e veja a estimativa da
            conversão.
          </p>
        ) : null}

        {state.status === "loading" ? (
          <p className="rounded-2xl bg-cyan-50 p-5 text-sm font-medium text-cyan-950">
            Buscando a cotação mais recente…
          </p>
        ) : null}

        {state.status === "error" ? (
          <div
            className="rounded-2xl border border-red-200 bg-red-50 p-5 text-red-950"
            role="alert"
          >
            <p>{state.message}</p>
            <button
              className="mt-3 min-h-11 rounded-lg border border-red-300 px-4 py-2 text-sm font-bold hover:bg-red-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-700"
              onClick={() => void submitConversion()}
              type="button"
            >
              Tentar novamente
            </button>
          </div>
        ) : null}

        {state.status === "success" ? (
          <output className="block rounded-2xl bg-slate-950 p-5 text-white">
            <span className="text-sm text-slate-300">
              {formatMoney(state.data.sourceAmount, state.data.baseCode)} equivale
              a aproximadamente
            </span>
            <strong className="mt-2 block text-3xl font-bold tracking-tight text-cyan-300">
              {formatMoney(
                state.data.convertedAmount,
                state.data.targetCode,
              )}
            </strong>
            <span className="mt-3 block text-xs leading-5 text-slate-400">
              1 {state.data.baseCode} = {formatRate(state.data.rate)}{" "}
              {state.data.targetCode} · Atualizada em{" "}
              {formatUpdateTime(state.data.updatedAt)}
            </span>
          </output>
        ) : null}
      </div>
    </section>
  );
}
