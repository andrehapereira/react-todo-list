// export type TodoListProps = {};

import { SyntheticEvent, useContext, useEffect, useState } from "react";
import { v4 as generateId } from "uuid";
import { HeartEyesIcon } from "../../icons/HeartEyesIcon";
import { ListIconIcon } from "../../icons/ListIconIcon";
import { SadFaceIcon } from "../../icons/SadFaceIcon";
import { DragPosition, DropData } from "../../models/DraggableService";
import { Todo, TodoList, TodoStatus } from "../../models/Todo";
import { ServicesContext } from "../../services/ServicesProvider";
import { DroppableContainerComponent } from "../DroppableContainerComponent/DroppableContainerComponent";
import { EmptyStateComponent } from "../EmptyStateComponent/EmptyStateComponent";
import { LoadingSkeletonComponent } from "../LoadingSkeletonComponent/LoadingSkeletonComponent";
import { TodoListComponent } from "../TodoListComponent/TodoListComponent";

export const TodoListPageContainerComponent = () => {
  const { todosService } = useContext(ServicesContext);
  const [loading, setLoading] = useState<boolean>(true);
  const [doneTodos, setDoneTodos] = useState<TodoList>([]);
  const [pendingTodos, setPendingTodos] = useState<TodoList>([]);
  const [formData, setFormData] = useState<{ todoName: string }>({
    todoName: "",
  });

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

  const reorderTodos = (data: DropData) => {
    const allTodos = [...pendingTodos, ...doneTodos];
    const fromTodo = allTodos.find((item) => item.id === data.from);
    const targetTodo = allTodos.find((item) => item.id === data.to);
    if (!fromTodo || !targetTodo) return;

    const targetStatus = targetTodo.status;
    const positionOffset = data.at === DragPosition.AFTER ? 1 : 0;
    fromTodo.status = targetStatus;
    const newList = reorderList(allTodos, fromTodo, data.to, positionOffset);
    setPendingTodos(newList.filter((todo) => todo.status === TodoStatus.TODO));
    setDoneTodos(newList.filter((todo) => todo.status === TodoStatus.DONE));
  };

  const reorderList = (
    list: TodoList,
    fromTodo: Todo,
    targetId: string,
    offset: number
  ): TodoList => {
    const result = list.filter((item) => item.id !== fromTodo.id);
    const targetIndex = result.findIndex((item) => item.id === targetId);
    result.splice(targetIndex + offset, 0, fromTodo);
    return result.map((item, i) => ({ ...item, priority: i }));
  };

  const createTodo = (ev: SyntheticEvent) => {
    ev.preventDefault();
    if (!formData.todoName) {
      return;
    }
    setPendingTodos([
      ...pendingTodos,
      {
        id: generateId(),
        title: formData.todoName,
        status: TodoStatus.TODO,
        details: "",
        priority: 0,
      },
    ]);
    setFormData({ todoName: "" });
  };

  const doneEmptyState = (
    <EmptyStateComponent
      icon={<SadFaceIcon width="3rem" height="3rem" />}
      title="Oh no!"
      description="Let's get some work done. I promise there will be cookies in the end."
    />
  );

  const pendingEmptyState = (
    <EmptyStateComponent
      icon={<HeartEyesIcon width="3rem" height="3rem" />}
      title="Wooo!"
      description="You've completed all taks! Wonderful job. Cookie time!"
    />
  );

  const listsEmpty = () => {
    return pendingTodos.length === 0 && doneTodos.length === 0;
  };

  return (
    <section>
      {loading ? (
        <LoadingSkeletonComponent />
      ) : (
        <>
          <form
            className="flex gap-4 px-4 pt-8 flex-col sm:flex-row"
            onSubmit={createTodo}
          >
            <input
              type="text"
              value={formData.todoName}
              onChange={(e) => setFormData({ todoName: e.target.value })}
              className="flex-1 shadow appearance-none border rounded p-3 px-3 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="What are you doing next?"
            />
            <button
              className="cursor-pointer p-3 px-6 bg-transparent hover:bg-black hover:text-white border border-solid rounded-md disabled:bg-transparent disabled:text-neutral-400"
              disabled={!formData.todoName}
            >
              Add
            </button>
          </form>
          <DroppableContainerComponent onDropItem={reorderTodos}>
            <div className="flex flex-col lg:flex-row p-4 pb-16 gap-8 todo-list-container">
              {listsEmpty() ? (
                <EmptyStateComponent
                  icon={<ListIconIcon width="3rem" height="3rem" />}
                  title="Let's get working!"
                  description="Add some tasks via the above form and get some work done!"
                ></EmptyStateComponent>
              ) : (
                <>
                  <div className="flex-1">
                    <TodoListComponent
                      title="Pending:"
                      todos={pendingTodos}
                      onMove={moveToDone}
                      onDelete={deleteTodo}
                      emptyState={pendingEmptyState}
                    />
                  </div>
                  <div className="flex-1">
                    <TodoListComponent
                      title="Done:"
                      todos={doneTodos}
                      onMove={moveToPending}
                      onDelete={deleteTodo}
                      emptyState={doneEmptyState}
                    />
                  </div>
                </>
              )}
            </div>
          </DroppableContainerComponent>
        </>
      )}
    </section>
  );
};
