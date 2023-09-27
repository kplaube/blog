export function match(value: string): boolean {
  return /^[a-z0-9_-]+$/.test(value);
}
