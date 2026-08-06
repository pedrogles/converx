export function formatMoney(amount: number, currencyCode: string): string {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: currencyCode,
    maximumFractionDigits: 2,
  }).format(amount);
}

export function formatRate(rate: number): string {
  return new Intl.NumberFormat("pt-BR", {
    maximumFractionDigits: 6,
  }).format(rate);
}

export function formatUpdateTime(value: string): string {
  return new Intl.DateTimeFormat("pt-BR", {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: "America/Sao_Paulo",
  }).format(new Date(value));
}
