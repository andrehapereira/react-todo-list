// export type TodoListProps = {};

import { useContext, useEffect, useState } from "react";
import { ServicesContext } from "../../services/ServicesProvider";
import { Todo, Todos, TodoStatus } from "../../models/Todo";
import { TodoListItem } from "../TodoListItem/TodoListItem";
import { LoadingSkeleton } from "../LoadingSkeleton/LoadingSkeleton";

export const TodoList = () => {
  const { todosService } = useContext(ServicesContext);
  const [loading, setLoading] = useState<boolean>(true);
  const [doneTodos, setDoneTodos] = useState<Todos>([]);
  const [pendingTodos, setPendingTodos] = useState<Todos>([]);
  const [skipAnimation, setSkipAnimation] = useState<boolean>(true);

  useEffect(() => {
    todosService
      .getTodos()
      .then(({ data }) => {
        const pending = data.filter((todo) => todo.status === TodoStatus.TODO);
        setPendingTodos(pending);

        const done = data.filter((todo) => todo.status === TodoStatus.DONE);
        setDoneTodos(done);

        setTimeout(() => {
          setSkipAnimation(false);
        }, 250); //timeout to make sure animations are skipped during first render
      })
      .finally(() => setLoading(false));
  }, []);

  const moveToDone = (todo: Todo) => {
    setPendingTodos(pendingTodos.filter((item) => item.id !== todo.id));
    setDoneTodos([...doneTodos, { ...todo, status: TodoStatus.DONE }]);
  };
  const moveToPending = (todo: Todo) => {
    setDoneTodos(doneTodos.filter((item) => item.id !== todo.id));
    setPendingTodos([...pendingTodos, { ...todo, status: TodoStatus.TODO }]);
  };

  const deleteTodo = (id: string) => {
    setPendingTodos(pendingTodos.filter((item) => item.id !== id));
    setDoneTodos(doneTodos.filter((item) => item.id !== id));
  };

  const mapToTodoListItem = (todo: Todo, i: number) => (
    <TodoListItem
      skipAnimation={skipAnimation}
      key={i}
      todo={todo}
      onMoveToDone={moveToDone}
      onMoveToTodo={moveToPending}
      onDelete={deleteTodo}
    ></TodoListItem>
  );

  return (
    <section>
      {loading ? (
        <LoadingSkeleton></LoadingSkeleton>
      ) : (
        <div className="flex flex-col lg:flex-row p-4 gap-8">
          <div className="flex-1">
            <h3>Pending:</h3>
            <div className="todo-list pending">
              {pendingTodos.map(mapToTodoListItem)}
            </div>
          </div>
          <div className="flex-1">
            <h3>Done:</h3>
            <div className="todo-list done">
              {doneTodos.map(mapToTodoListItem)}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
