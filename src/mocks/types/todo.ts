export type AddPayload = {
  title: string;
  tags: string;
};

export type PatchPayload = {
  id: string;
  isCompleted: boolean;
};

export type PutPayload = {
  id: string;
  isCompleted: boolean;
} & AddPayload;

export type Todo = AddPayload & { id: string; createAt: Date; updateAt: Date; isCompleted: boolean };

export type TodoFilters = 'all' | 'active' | 'completed';