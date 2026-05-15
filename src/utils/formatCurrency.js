export function formatCurrency(value) {
  return `$${Number(value).toLocaleString('es-MX')}`;
}
