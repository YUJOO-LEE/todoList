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
    async getNewKey() {
      const lastKey = await _todoStore.key(await _todoStore.length() - 1);
      const newKey = parseInt(lastKey) + 1;
      const stringKey = newKey.toString().padStart(6, '0');
      return stringKey;
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
    async removeTodo(id: string) {
      await _todoStore.removeItem(id);
      return true;
    },
    async getTodos(offset: number, limit: number) {
      const keys = await _todoStore.keys();

      const allTodos: Todo[] = ((await Promise.all(keys.map((key) => _todoStore.getItem(key)))).filter((v) => v !== null) as Todo[]);

      return {
        data: allTodos.reverse().slice(offset, offset + limit),
        total: allTodos.length,
      };
    },
  };
};

export const todoStore = createStore();