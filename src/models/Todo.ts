export enum TodoStatus {
  TODO = "TODO",
  DONE = "DONE",
}

export interface Todo {
  id: string;
  title: string;
  details: string;
  status: TodoStatus;
  priority: number;
}

export type Todos = Todo[];
