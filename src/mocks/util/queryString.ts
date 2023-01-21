import type { GetNumberValueFromURLSearchParams } from '../types/util';

export const getNumberValueFromURLSearchParams: GetNumberValueFromURLSearchParams = (props) => {
  const { searchParams, key, defaultValue } = props;

  return (
    searchParams
      .getAll(key)
      .map(Number)
      .filter((v) => !Number.isNaN(v))[0] || defaultValue
  );
};