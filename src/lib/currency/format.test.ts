import { describe, expect, it } from "vitest";

import {
  formatMoney,
  formatRate,
  formatUpdateTime,
} from "@/lib/currency/format";

describe("currency formatters", () => {
  it("formats Brazilian money", () => {
    expect(formatMoney(1234.5, "BRL")).toContain("1.234,50");
  });

  it("limits exchange-rate precision", () => {
    expect(formatRate(1.23456789)).toBe("1,234568");
  });

  it("formats an ISO update time in the product locale", () => {
    expect(formatUpdateTime("2026-08-06T15:30:00.000Z")).toContain("2026");
  });
});
