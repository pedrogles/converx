const GROUPED_INTEGER_PATTERN = /^\d{1,3}(?:\.\d{3})+$/;
const DECIMAL_PATTERN = /^\d+(?:[.,]\d{1,2})?$/;
const GROUPED_DECIMAL_PATTERN = /^\d{1,3}(?:\.\d{3})*,\d{1,2}$/;

export function parseBrazilianAmount(value: string): number | null {
  const compactValue = value.trim().replace(/[\s\u00a0]/g, "");

  if (!compactValue) {
    return null;
  }

  let normalizedValue: string;

  if (GROUPED_DECIMAL_PATTERN.test(compactValue)) {
    normalizedValue = compactValue.replaceAll(".", "").replace(",", ".");
  } else if (GROUPED_INTEGER_PATTERN.test(compactValue)) {
    normalizedValue = compactValue.replaceAll(".", "");
  } else if (DECIMAL_PATTERN.test(compactValue)) {
    normalizedValue = compactValue.replace(",", ".");
  } else {
    return null;
  }

  const amount = Number(normalizedValue);

  return Number.isFinite(amount) ? amount : null;
}
