export type GetNumberValueFromURLSearchParams = (props: {
  searchParams: URLSearchParams;
  key: string;
  defaultValue: number;
}) => number;
