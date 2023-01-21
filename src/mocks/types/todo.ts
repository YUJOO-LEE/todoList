export type Payload = {
  title: string;
  tags: string;
};

export type Todo = Payload & { id: string; createAt: Date; updateAt: Date; };