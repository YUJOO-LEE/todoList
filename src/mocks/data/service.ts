import localForage from 'localforage';
import type { Todo } from '../types/todo';

let _todoStore: LocalForage;

const createStore = () => {
  return {
    async init() {
      if (!_todoStore) {
        _todoStore = localForage
          .createInstance({
            driver: localForage.INDEXEDDB,
            name: 'todos',
          });
      }
    },
    async length() {
      const length = (await _todoStore.length()).toString();
      return length;
    },
    async addTodo(id: string, todo: Todo) {
      await _todoStore.setItem(id, todo);
      return true;
    },
    async setTodo(id: string, todo: Todo) {
      await _todoStore.setItem(id, todo);
      return true;
    },
    async getTodo(id: string) {
      return (await _todoStore.getItem(id)) as Todo | null;
    },
    async getTodos() {
      const keys = await _todoStore.keys();
      return (await Promise.all(keys.map((key) => _todoStore.getItem(key)))) as Todo[];
    },
  };
};

export const todoStore = createStore();