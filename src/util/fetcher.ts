import axios from 'axios';
import { Dispatch, SetStateAction } from "react";
import { AddPayload, PatchPayload } from "../mocks/types/todo";

// 리스트 조회
export const getTodos = ({ pageParam = 0}) => {
  const params = { offset: pageParam };
  return axios.get('/api/todo', { params });
}

// 신규 저장
export const postTodo = (payload: AddPayload) => {
  return axios.post('/api/todo', payload);
}

// 완료 처리
export const patchTodo = (payload: PatchPayload) => {
  return axios.patch('/api/todo', payload);
}

// 완료 처리
export const deleteTodo = (payload: { id: string }) => {
  return axios.delete('/api/todo', { params: payload });
}

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