export function formatAmount(table) {
  return table.map((item) => ({
    ...item,
    amount: item.amount
      .toLocaleString("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })
      .replace(/,/g, " "),
  }));
}
