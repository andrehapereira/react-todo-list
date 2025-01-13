// export type TodoListProps = {};

import { useContext, useEffect, useState } from "react";
import { HeartEyesIcon } from '../../icons/HeartEyesIcon';
import { SadFaceIcon } from "../../icons/SadFaceIcon";
import { Todo, TodoStatus, Todos } from "../../models/Todo";
import { ServicesContext } from "../../services/ServicesProvider";
import { EmptyStateComponent } from "../EmptyState/EmptyState";
import { LoadingSkeleton } from "../LoadingSkeleton/LoadingSkeleton";
import { TodoList } from "../TodoList/TodoList";

export const TodoListPageContainer = () => {
  const { todosService } = useContext(ServicesContext);
  const [loading, setLoading] = useState<boolean>(true);
  const [doneTodos, setDoneTodos] = useState<Todos>([]);
  const [pendingTodos, setPendingTodos] = useState<Todos>([]);

  useEffect(() => {
    todosService
      .getTodos()
      .then(({ data }) => {
        const pending = data.filter((todo) => todo.status === TodoStatus.TODO);
        setPendingTodos(pending);

        const done = data.filter((todo) => todo.status === TodoStatus.DONE);
        setDoneTodos(done);
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

  const doneEmptyState = <EmptyStateComponent icon={<SadFaceIcon width="3rem" height="3rem"/>} title="Oh no!" description="Let's get some work done. I promise there will be cookies in the end."/>

  const pendingEmptyState = <EmptyStateComponent icon={<HeartEyesIcon width="3rem" height="3rem"/>} title="Wooo!" description="You've completed all taks! Wonderful job. Cookie time!"/>

  return (
    <section>
      {loading ? (
        <LoadingSkeleton></LoadingSkeleton>
      ) : (
        <div className="flex flex-col lg:flex-row p-4 gap-8">
          <div className="flex-1">
            <TodoList title="Pending:" todos={pendingTodos} onMove={moveToDone} onDelete={deleteTodo} emptyState={pendingEmptyState}/>
          </div>
          <div className="flex-1">
            <TodoList title="Done:" todos={doneTodos} onMove={moveToPending} onDelete={deleteTodo} emptyState={doneEmptyState}/>
          </div>
        </div>
      )}
    </section>
  );
};
