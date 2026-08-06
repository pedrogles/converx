import { describe, expect, it } from "vitest";

import { parseBrazilianAmount } from "@/lib/currency/parse";

describe("parseBrazilianAmount", () => {
  it.each([
    ["10", 10],
    ["10,50", 10.5],
    ["10.50", 10.5],
    ["1.234,56", 1234.56],
    ["1 234,56", 1234.56],
    ["1.234", 1234],
  ])("normalizes %s", (input, expected) => {
    expect(parseBrazilianAmount(input)).toBe(expected);
  });

  it.each(["", "abc", "1,2,3", "1,234.56", "12,345"])(
    "rejects %s",
    (input) => {
      expect(parseBrazilianAmount(input)).toBeNull();
    },
  );
});
