import localForage from 'localforage';
import type { Todo, TodoFilters } from '../types/todo';

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
      const lastKey = await _todoStore.key(await _todoStore.length() - 1) || '0';
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
    async getTodos(offset: number, limit: number, filter: TodoFilters = 'all') {
      const keys = await _todoStore.keys();
      const isCompleted = filter === 'completed';

      const allTodos: Todo[] = ((await Promise.all(keys.map((key) => _todoStore.getItem(key)))).filter((v: any) => {
        return filter === 'all' ? v !== null : (v !== null && v.isCompleted === isCompleted);
      }) as Todo[]);

      return {
        data: allTodos.reverse().slice(offset, offset + limit),
        total: allTodos.length,
      };
    },
    async getAllTodos() {
      const keys = await _todoStore.keys();
      const allTodos: Todo[] = ((await Promise.all(keys.map((key) => _todoStore.getItem(key)))).filter((v: any) =>  v !== null) as Todo[]);

      return {
        data: allTodos.reverse(),
        total: allTodos.length,
      };
    },
  };
};

export const todoStore = createStore();