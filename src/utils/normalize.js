export function normalize(value) {
  return String(value)
    .toLocaleLowerCase('es-MX')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
}
