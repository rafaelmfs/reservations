export function formatCurrencyValue(value: number) {
  const valueNumber = new Intl.NumberFormat('pt-bR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
    useGrouping: true,
  }).format(value)

  return valueNumber
}
