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

export type TodoAnimation =
  | "slide-right"
  | "slide-left"
  | "slide-in-right"
  | "slide-in-left";

export type TodoActionVariant = "success" | "danger" | "dark";

export type TodoConfig = {
  [key in `${TodoStatus}`]: {
    variant: TodoActionVariant;
    title: string;
    animation: TodoAnimation;
    icon: JSX.Element;
  };
};
