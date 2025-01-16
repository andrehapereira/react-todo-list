import { AxiosResponse } from "axios";
import { TodoList } from "./Todo";

export interface TodosService {
  getTodos: () => Promise<AxiosResponse<TodoList>>;
}
