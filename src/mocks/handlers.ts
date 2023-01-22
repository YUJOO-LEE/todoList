import { getNumberValueFromURLSearchParams } from './util/queryString';
import { rest } from 'msw';
import { todoStore } from './data/service';
import type { Todo, AddPayload, PutPayload, TodoFilters, ResPagingData, ResAllData } from './types/todo';

export const handlers = [
  rest.get('/api/todo', async (req, res, ctx) => {
    try {
      const offset = getNumberValueFromURLSearchParams({
        searchParams: req.url.searchParams,
        key: 'offset',
        defaultValue: 0,
      });
      const limit = getNumberValueFromURLSearchParams({
        searchParams: req.url.searchParams,
        key: 'limit',
        defaultValue: 10,
      });
      const filter = req.url.searchParams.get('filter') as TodoFilters || 'all';
      
      const { data, total } = await todoStore.getTodos(offset, limit, filter);

      return res(ctx.status(200), ctx.json<ResPagingData>({
        total,
        todos: data,
        paging: {
          next: offset + limit <= total ? offset + limit : undefined,
          total,
        },
      }));
    } catch {
      return res(ctx.status(400), ctx.json({ message: 'no task' }));
    }
  }),
  rest.post('/api/todo', async (req, res, ctx) => {
    const body: AddPayload = await req.json();
    try {
      const curDate = new Date().toISOString();
      const id = await todoStore.getNewKey();
      const todo: Todo = Object.assign(body, { id, createdAt: curDate, updatedAt: curDate, isCompleted: false });

      await todoStore.addTodo(id, todo);
      return res(ctx.status(201));
    } catch {
      return res(ctx.status(400), ctx.json({ message: 'error' }));
    }
  }),
  rest.put('/api/todo', async (req, res, ctx) => {
    const body: PutPayload = await req.json();
    try {
      const prevData = await todoStore.getTodo(body.id);

      if (!prevData) {
        return res(ctx.status(400), ctx.json({ message: 'error' }));
      }

      const curDate = new Date().toISOString();
      const todo: Todo = Object.assign(prevData, body, { updatedAt: curDate })

      await todoStore.setTodo(body.id, todo);
      return res(ctx.status(201), ctx.json({ todo }));
    } catch {
      return res(ctx.status(400), ctx.json({ message: 'error' }));
    }
  }),
  rest.patch('/api/todo', async (req, res, ctx) => {
    const { id, isCompleted }: { id: string, isCompleted: boolean } = await req.json();
    try {
      const prevTodo = await todoStore.getTodo(id);
      if (!prevTodo) {
        return res(ctx.status(400), ctx.json({ message: 'No Item' }));
      }
      const curDate = new Date().toISOString();
      const todo: Todo = Object.assign(prevTodo, { isCompleted, updatedAt: curDate })

      await todoStore.setTodo(id, todo);
      return res(ctx.status(201), ctx.json({ todo }));
    } catch {
      return res(ctx.status(400), ctx.json({ message: 'error' }));
    }
  }),
  rest.delete('/api/todo', async (req, res, ctx) => {
    const id = req.url.searchParams.get('id');
    if (!id) {
      return res(ctx.status(400), ctx.json({ message: 'error' }));
    }
    const curData = await todoStore.getTodo(id);
    const { data } = await todoStore.getAllTodos();

    await Promise.all(data.map(async (item: Todo) => {
      let newTags = item.tags.replace(curData!.id + curData!.title + ',', '');
      newTags = newTags.replace(curData!.id + curData!.title, '');
      const todo: Todo = Object.assign(item, { tags: newTags })
      todoStore.setTodo(item.id, todo);
    }));

    await todoStore.removeTodo(id);
    return res(ctx.status(201));
  }),
  rest.get('/api/todo/all', async (req, res, ctx) => {
    try {
      const { data, total } = await todoStore.getAllTodos();

      return res(ctx.status(200), ctx.json<ResAllData>({
        total,
        todos: data,
      }));
    } catch {
      return res(ctx.status(400), ctx.json({ message: 'no task' }));
    }
  }),
];