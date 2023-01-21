import axios from 'axios';
import { Dispatch, SetStateAction } from "react";
import { AddPayload, PatchPayload, PutPayload } from "../mocks/types/todo";

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
export const deleteTodo = ({ id = '' }) => {
  const params = { id };
  return axios.delete('/api/todo', { params });
}

// 수정 처리
export const putTodo = (payload: PutPayload) => {
  return axios.put('/api/todo', payload);
}