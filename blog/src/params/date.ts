export function match(value: string): boolean {
  return /^\d{4}\/\d{2}\/\d{2}$/.test(value);
}
