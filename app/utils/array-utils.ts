/**
 * Takes an array of any type (object or primitive) and filters it distinctively.
 * Duplicate values are removed, determined by the compare function.
 *
 * @param array Array to filter
 * @param compare Compare function to compare objects for equality
 * @returns Filtered array with distinct values
 */
export function filterDistinct<T>(
  array: T[] | undefined,
  compare: (a: T, b: T) => boolean
): T[] {
  if (!array) {
    return [];
  }

  return array.filter(
    (value, index, arr) =>
      arr.findIndex((other) => compare(value, other)) === index
  );
}
