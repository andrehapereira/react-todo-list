import { DraggableService } from "./DraggableService";
import { TodosService } from "./TodosService";

export interface ServicesContextModel {
  todosService: TodosService;
  draggableService: DraggableService;
}
