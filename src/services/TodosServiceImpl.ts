import axios from "axios";
import { Todos } from "../models/Todo";
import { TodosService } from "../models/TodosService";
import { DelayableService } from "./DelayableService";

export class TodosServiceImpl extends DelayableService implements TodosService {
  getTodos() {
    return axios.get<Todos>("/api-data/todos.json").then(this.sleep());
  }
}
