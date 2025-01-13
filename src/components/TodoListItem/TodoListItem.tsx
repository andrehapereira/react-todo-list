import "./TodoListItem.css";

import { useEffect, useState } from "react";
import { Checkmark } from '../../icons/Checkmark';
import { DeleteBucket } from "../../icons/DeleteBucket";
import { Undo } from "../../icons/Undo";
import { Todo, TodoAnimation, TodoConfig, TodoStatus } from "../../models/Todo";
import { ActionItem } from "./ActionButton/ActionButton";

export interface TodoListItemProps {
  todo: Todo;
  onMove: (todo: Todo) => void;
  onDelete: (id: string) => void;
  skipAnimation?: boolean;
}

export const TodoListItem = ({
  todo,
  onMove,
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
    cls: TodoAnimation
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

  const todoConfig: TodoConfig = {
    [TodoStatus.TODO]: {
      variant: 'success',
      title: `Move ${todo.title} to done`,
      animation: 'slide-right',
      icon: <Checkmark/>
    },
    [TodoStatus.DONE]: {
      variant: 'dark',
      title: `Move ${todo.title} back to todo`,
      animation: 'slide-left',
      icon: <Undo/>
    }
  }

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
        <ActionItem
          variant={todoConfig[todo.status].variant}
          title={todoConfig[todo.status].title}
          action={() => {
            animate(todoConfig[todo.status].animation).then(() => {
              onMove(todo);
            });
          }}
        >
          {todoConfig[todo.status].icon}
        </ActionItem>
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
