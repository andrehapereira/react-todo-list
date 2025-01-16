import { useEffect, useState } from "react";
import { Todo, Todos } from "../../models/Todo";
import { TodoListItemComponent } from "../TodoListItemComponent/TodoListItemComponent";

export type TodoListComponentProps = {
  title: string;
  todos: Todos;
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

  const mapToTodoListItem = (todo: Todo, i: number) => (
    <TodoListItemComponent
      skipAnimation={skipAnimation}
      key={i}
      todo={todo}
      onMove={onMove}
      onDelete={onDelete}
    />
  );

  return (
    <>
      <h3>{title}</h3>
      {todos.length || !emptyState ? (
        <div className="todo-list">{todos.map(mapToTodoListItem)}</div>
      ) : (
        emptyState
      )}
    </>
  );
};
