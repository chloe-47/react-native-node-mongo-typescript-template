export function uniques<T>(arr: ReadonlyArray<T>): Array<T> {
  const set = new Set(arr);
  return Array.from(set);
}
