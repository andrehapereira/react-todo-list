import "./TodoListItem.css";

import { useEffect, useState } from "react";
import { Checkmark } from "../../icons/Checkmark";
import { DeleteBucket } from "../../icons/DeleteBucket";
import { Undo } from "../../icons/Undo";
import { Todo, TodoStatus } from "../../models/Todo";
import { ActionItem } from "./ActionButton/ActionButton";

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
            <Checkmark/>
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
            <Undo/>
          </ActionItem>
        )}
        <ActionItem
          variant="danger"
          title={`Delete ${todo.title}`}
          action={() => onDelete(todo.id)}
        >
          <DeleteBucket/>
        </ActionItem>
      </div>
    </div>
  );
};
