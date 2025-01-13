import { AxiosResponse } from "axios";
import { Todos } from "./Todo";

export interface TodosService {
  getTodos: () => Promise<AxiosResponse<Todos>>;
}
