export const checkIdsForEquality = (arr1: number[], arr2: number[]): boolean =>
  arr1.sort().toString() === arr2.sort().toString();
