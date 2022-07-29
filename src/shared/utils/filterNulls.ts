export function filterNulls<T>(array: ReadonlyArray<T>): Array<NonNullable<T>> {
  const filtered: Array<NonNullable<T>> = [];
  for (const elem of array) {
    if (elem != null) {
      filtered.push(elem as NonNullable<T>);
    }
  }
  return filtered;
}
