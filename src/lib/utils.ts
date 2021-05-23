export const isNotNull = <T>(value: T | null): value is Exclude<T, null> =>
  value !== null;
