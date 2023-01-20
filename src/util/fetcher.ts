import { Dispatch, SetStateAction } from "react";

export async function callApi<T = any>({ url, method }: { url: string; method: string; }) {
  const res = await fetch(url, { method });
  const json = await res?.json();


  if (!res.ok) {
    const errorMessage =  {
      statusText: res.statusText,
      json
    };
    throw errorMessage;
  }

  return json as T;
}

export const handleCallAPI = (method: string, state: string[], setState: Dispatch<SetStateAction<string[]>> ) => async () => {
  try {
    const json = await callApi<{ messages: string }>({
      url: '/test',
      method
    });

    setState([...state, JSON.stringify(json.messages)]);
  } catch (e) {
    console.log('e', e);
  }
}