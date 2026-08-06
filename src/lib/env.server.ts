export class ExchangeConfigurationError extends Error {
  constructor() {
    super("Exchange-rate provider is not configured.");
    this.name = "ExchangeConfigurationError";
  }
}

export function getExchangeRateApiKey(): string {
  const apiKey = process.env.EXCHANGE_RATE_API_KEY?.trim();

  if (!apiKey || apiKey === "replace_with_your_key") {
    throw new ExchangeConfigurationError();
  }

  return apiKey;
}
