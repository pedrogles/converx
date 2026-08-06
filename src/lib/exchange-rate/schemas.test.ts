import { describe, expect, it } from "vitest";

import {
  currencyCodeSchema,
  exchangeQuerySchema,
} from "@/lib/exchange-rate/schemas";

describe("exchange validation", () => {
  it("normalizes valid currency codes", () => {
    expect(currencyCodeSchema.parse(" brl ")).toBe("BRL");
  });

  it.each(["BR", "BRLL", "B1L", ""])("rejects invalid code %s", (code) => {
    expect(currencyCodeSchema.safeParse(code).success).toBe(false);
  });

  it("rejects equal currencies", () => {
    const result = exchangeQuerySchema.safeParse({
      amount: "10",
      base: "BRL",
      target: "BRL",
    });

    expect(result.success).toBe(false);
  });

  it.each(["0", "-1", "1000000001", "not-a-number"])(
    "rejects invalid amount %s",
    (amount) => {
      const result = exchangeQuerySchema.safeParse({
        amount,
        base: "BRL",
        target: "USD",
      });

      expect(result.success).toBe(false);
    },
  );
});
