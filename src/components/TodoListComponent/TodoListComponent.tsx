import { useEffect, useState } from "react";
import { Todo, TodoList } from "../../models/Todo";
import { DraggableItemComponent } from "../DraggableItemComponent/DraggableItemComponent";
import { TodoListItemComponent } from "../TodoListItemComponent/TodoListItemComponent";

export type TodoListComponentProps = {
  title: string;
  todos: TodoList;
  onDelete: (id: string) => void;
  onMove: (todo: Todo) => void;
  emptyState?: JSX.Element;
};

export const TodoListComponent = ({
  title,
  todos,
  onMove,
  onDelete,
  emptyState,
}: TodoListComponentProps) => {
  const [skipAnimation, setSkipAnimation] = useState<boolean>(true);

  useEffect(() => {
    if (todos.length && skipAnimation) {
      setTimeout(() => {
        setSkipAnimation(false);
      }, 250); //timeout to make sure animations are skipped during first render of todos
    }
  }, [todos]);

  const mapToTodoListItem = (todo: Todo) => (
    <DraggableItemComponent key={todo.id} itemId={todo.id}>
      <TodoListItemComponent
        skipAnimation={skipAnimation}
        key={todo.id}
        todo={todo}
        onMove={onMove}
        onDelete={onDelete}
      />
    </DraggableItemComponent>
  );

  const sortByPriority = (a: Todo, b: Todo) => {
    return a.priority > b.priority ? 1 : -1;
  };

  return (
    <>
      <h3>{title}</h3>
      {todos.length || !emptyState ? (
        <div className="todo-list">
          {todos.sort(sortByPriority).map(mapToTodoListItem)}
        </div>
      ) : (
        emptyState
      )}
    </>
  );
};
