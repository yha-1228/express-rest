/**
 * When value is `null` or `undefined`, return `false`.
 */
const isNonNullable = <T>(value: T): value is NonNullable<T> => {
  if (value === null || value === void 0) return false;
  return true;
};
