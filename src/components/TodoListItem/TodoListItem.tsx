import "./TodoListItem.css";

import { Todo, TodoStatus } from "../../models/Todo";
import { ActionItem } from "./ActionButton/ActionButton";
import { useEffect, useState } from "react";

export interface TodoListItemProps {
  todo: Todo;
  onMoveToDone: (todo: Todo) => void;
  onMoveToTodo: (todo: Todo) => void;
  onDelete: (id: string) => void;
  skipAnimation?: boolean;
}

export const TodoListItem = ({
  todo,
  onMoveToDone,
  onMoveToTodo,
  onDelete,
  skipAnimation = false,
}: TodoListItemProps) => {
  const [animationClass, setAnimationClass] = useState("");

  useEffect(() => {
    if (skipAnimation) {
      return;
    }
    animate(
      todo.status === TodoStatus.DONE ? "slide-in-left" : "slide-in-right"
    );
  }, []);

  const animate = (
    cls: "slide-right" | "slide-left" | "slide-in-right" | "slide-in-left"
  ) => {
    return new Promise((resolve) => {
      setAnimationClass(cls);
      setTimeout(() => {
        //fake 1s time for the css animation to complete
        setAnimationClass("");
        resolve(true);
      }, 600);
    });
  };

  return (
    <div
      className={`flex shadow-md px-8 py-5 my-2 rounded-xl border-neutral-100 border border-solid slide ${animationClass}`}
    >
      <div
        className={`flex flex-1 items-center ${
          todo.status === "DONE" ? "line-through text-neutral-400" : ""
        }`}
      >
        {todo.title}
      </div>
      <div className="flex gap-3">
        {todo.status === "TODO" ? (
          <ActionItem
            variant="success"
            title={`Move ${todo.title} to done`}
            action={() => {
              animate("slide-right").then(() => {
                onMoveToDone(todo);
              });
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m4.5 12.75 6 6 9-13.5"
              />
            </svg>
          </ActionItem>
        ) : (
          <ActionItem
            variant="dark"
            title={`Move ${todo.title} back to todo`}
            action={() => {
              animate("slide-left").then(() => {
                onMoveToTodo(todo);
              });
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3"
              />
            </svg>
          </ActionItem>
        )}
        <ActionItem
          variant="danger"
          title={`Delete ${todo.title}`}
          action={() => onDelete(todo.id)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
            />
          </svg>
        </ActionItem>
      </div>
    </div>
  );
};
