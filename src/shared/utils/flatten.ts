export function flatten<T>(array: ReadonlyArray<ReadonlyArray<T>>): Array<T> {
  const flattened: Array<T> = [];
  for (const elem of array) {
    for (const subElem of elem) {
      flattened.push(subElem);
    }
  }
  return flattened;
}
