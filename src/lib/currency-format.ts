export const currencyFormatter = (value: number) => {
  return new Intl.NumberFormat("pl", {
    style: "currency",
    currency: "PLN",
  }).format(value);
};
