import { PropsWithChildren } from "react";
import { TodoActionVariant } from "../../../models/Todo";
export interface ActionItemProps extends PropsWithChildren {
  variant: TodoActionVariant;
  title?: string;
  action: () => void;
}

export const ActionItem = ({
  variant,
  title,
  children,
  action,
}: ActionItemProps) => {
  const variants: { [key in ActionItemProps["variant"]]: string } = {
    danger: "hover:bg-red-700 text-red-700",
    success: "hover:bg-green-700 text-green-700",
    dark: "hover:bg-black text-black",
  };
  return (
    <button
      title={title ?? ""}
      type="button"
      className={`
        cursor-pointer
        flex
        justify-items-center
        items-center
        bg-white
        hover:text-white
        border-0
        rounded-full
        w-[35px]
        h-[35px]
        ${variants[variant]}
      `}
      role="button"
      onClick={action}
    >
      {children}
    </button>
  );
};
