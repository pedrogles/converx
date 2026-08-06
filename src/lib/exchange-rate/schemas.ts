import { z } from "zod";

import { MAX_CONVERSION_AMOUNT } from "@/lib/currency/constants";
import { parseBrazilianAmount } from "@/lib/currency/parse";

export const currencyCodeSchema = z
  .string()
  .trim()
  .toUpperCase()
  .regex(/^[A-Z]{3}$/, "Selecione uma moeda válida.");

export const currencyFormSchema = z
  .object({
    amount: z
      .string()
      .trim()
      .min(1, "Informe um valor.")
      .refine((value) => {
        const amount = parseBrazilianAmount(value);
        return amount !== null && amount > 0;
      }, "Informe um valor maior que zero.")
      .refine((value) => {
        const amount = parseBrazilianAmount(value);
        return amount !== null && amount <= MAX_CONVERSION_AMOUNT;
      }, `O valor máximo é ${MAX_CONVERSION_AMOUNT.toLocaleString("pt-BR")}.`),
    sourceCode: currencyCodeSchema,
    targetCode: currencyCodeSchema,
  })
  .superRefine((value, context) => {
    if (value.sourceCode === value.targetCode) {
      context.addIssue({
        code: "custom",
        message: "Escolha moedas diferentes.",
        path: ["targetCode"],
      });
    }
  });

export const exchangeQuerySchema = z
  .object({
    amount: z.coerce
      .number()
      .finite("Informe um valor válido.")
      .positive("O valor deve ser maior que zero.")
      .max(MAX_CONVERSION_AMOUNT, "O valor excede o limite permitido."),
    base: currencyCodeSchema,
    target: currencyCodeSchema,
  })
  .strict()
  .superRefine((value, context) => {
    if (value.base === value.target) {
      context.addIssue({
        code: "custom",
        message: "As moedas devem ser diferentes.",
        path: ["target"],
      });
    }
  });

export const exchangeRateResponseSchema = z.object({
  baseCode: currencyCodeSchema,
  targetCode: currencyCodeSchema,
  rate: z.number().finite().positive(),
  convertedAmount: z.number().finite(),
  sourceAmount: z.number().finite().positive(),
  updatedAt: z.iso.datetime(),
});

export type CurrencyFormValues = z.infer<typeof currencyFormSchema>;
