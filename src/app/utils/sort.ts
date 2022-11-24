/**
 * function compare(a, b) {
  if (a es menor que b según criterio de ordenamiento) {
    return -1;
  }
  if (a es mayor que b según criterio de ordenamiento) {
    return 1;
  }
  // a debe ser igual b
  return 0;
}
 */

export const sortByNewest = (a: string, b: string) => {
  if (a < b) {
    return 1;
  }
  if (b < a) {
    return -1;
  }
  return 0;
};

export const sortByOldest = (a: string, b: string) => {
  if (a > b) {
    return 1;
  }
  if (b > a) {
    return -1;
  }
  return 0;
};
