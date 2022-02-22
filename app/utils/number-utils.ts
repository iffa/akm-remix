export function getFormattedPrice(currency?: string, price?: number): string {
  if (!currency || !price) {
    return "";
  }

  const format = Intl.NumberFormat("en", {
    style: "currency",
    currency,
  });

  return format.format(price);
}

export function getFormattedNumber(value: number): string {
  const format = Intl.NumberFormat("en", {
    style: "decimal",
  });

  return format.format(value);
}
