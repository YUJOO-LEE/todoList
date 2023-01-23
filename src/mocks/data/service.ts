import localForage from 'localforage';
import type { Todo, TodoFilters } from '../types/todo';

let _todoStore: LocalForage;

const createStore = () => {
  return {
    // 초기화 (DB 공간 생성)
    async init() {
      if (!_todoStore) {
        _todoStore = localForage
          .createInstance({
            driver: localForage.INDEXEDDB,
            name: 'todos',
          });
      }
    },

    // 마지막 Key 반환 (고유 id 로 사용)
    async getNewKey() {
      const lastKey = await _todoStore.key(await _todoStore.length() - 1) || '0';
      const newKey = parseInt(lastKey) + 1;
      const stringKey = newKey.toString().padStart(6, '0');
      return stringKey;
    },

    // 데이터 저장
    async setTodo(id: string, todo: Todo) {
      const keys = await _todoStore.keys();

      // 완료 해제 시 나를 참조하는 작업이 있다면 같이 완료 해제
      if (!todo.isCompleted) {
        await Promise.all(
          (await Promise.all(keys.map((key) => _todoStore.getItem(key))) as Todo[])
            .filter((item) => item.tags.includes(id))
            .map((item) => {
              const todo: Todo = Object.assign(item, { isCompleted: false });
              return this.setTodo(item.id, todo);
            })
        )
      }

      await _todoStore.setItem(id, todo);
      return true;
    },

    // 데이터 반환
    async getTodo(id: string) {
      return (await _todoStore.getItem(id)) as Todo | null;
    },

    // 데이터 삭제
    async removeTodo(id: string) {
      await _todoStore.removeItem(id);
      return true;
    },

    // 일부 데이터 반환 (페이징)
    async getTodos(offset: number, limit: number, filter: TodoFilters = 'all') {
      const keys = await _todoStore.keys();
      const isCompleted = filter === 'completed';

      const allTodos: Todo[] = ((await Promise.all(keys
        .map((key) => _todoStore.getItem(key))) as Todo[])
        .filter((v: any) => {
          return filter === 'all' ? v !== null : (v !== null && v.isCompleted === isCompleted);
      }));

      return {
        data: allTodos.reverse().slice(offset, offset + limit),
        total: allTodos.length,
      };
    },

    // 전체 데이터 반환
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