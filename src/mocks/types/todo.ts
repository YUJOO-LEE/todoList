export type AddPayload = {
  title: string;
  tags: string;
};

export type PatchPayload = {
  id: string;
  isCompleted: boolean;
};

export type Todo = AddPayload & { id: string; createAt: Date; updateAt: Date; isCompleted: boolean };