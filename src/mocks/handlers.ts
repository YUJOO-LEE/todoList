import { getNumberValueFromURLSearchParams } from './util/queryString';
import { rest } from 'msw';
import { todoStore } from './data/service';
import type { Todo, AddPayload } from './types/todo';

//const data = { messages: [] as string[] };

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
        defaultValue: 12,
      });
      
      const { data, total } = await todoStore.getTodos(offset, limit);

      return res(ctx.status(200), ctx.json({
        total,
        todos: data,
        paging: {
          next: offset + limit,
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
      const curDate = new Date();
      const id = await todoStore.length();
      const todo: Todo = Object.assign(body, { id, createAt: curDate, updateAt: curDate, isCompleted: false });

      await todoStore.addTodo(id, todo);
      return res(ctx.status(201));
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
      const todo: Todo = Object.assign(prevTodo, { isCompleted })

      await todoStore.setTodo(id, todo);
      return res(ctx.status(201), ctx.json({ todo }));
    } catch {
      return res(ctx.status(400), ctx.json({ message: 'error' }));
    }
  }),
  rest.delete('/api/todo', async (req, res, ctx) => {
    console.log(req);
    // try {
    //   await todoStore.removeTodo(id);
    //   return res(ctx.status(201));
    // } catch {
    //   return res(ctx.status(400), ctx.json({ message: 'error' }));
    // }
  }),
    // rest.get('/test', (req, res, ctx) => {
    //   return res(
    //     ctx.status(200),
    //     ctx.json({
    //         messages: data.messages
    //     }),
    //   );
    // }),
    // rest.post('/test', (req, res, ctx) => {
    //   const newMessage = `message(${Date.now()})`;

    //   data.messages.push(newMessage);

    //   return res(
    //     ctx.status(200),
    //     ctx.json({
    //       messages: newMessage
    //     }),
    //   );
    // }),
    // rest.put('/test', (req, res, ctx) => {

    //   return res(
    //     ctx.status(200),
    //     ctx.json({
    //       messages: 'put!!!'
    //     }),
    //   );
    // }),
    // rest.delete('/test', (req, res, ctx) => {
    //   data.messages = [];

    //   return res(
    //     ctx.status(200),
    //     ctx.json({
    //       messages: 'message deleted'
    //     }),
    //   );
    // }),
];