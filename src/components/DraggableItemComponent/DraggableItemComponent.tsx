import { PropsWithChildren, useContext } from "react";
import { DragPosition } from "../../models/DraggableService";
import { ServicesContext } from "../../services/ServicesProvider";
import "./DraggableItemComponent.css";
export interface DraggableItemComponentProps extends PropsWithChildren {
  itemId: string;
}

export const DraggableItemComponent = ({
  children,
  itemId,
}: DraggableItemComponentProps) => {
  const { draggableService } = useContext(ServicesContext);

  const onDragStart = (ev: React.DragEvent, dragItemId: string) => {
    const target = ev.currentTarget;
    setTimeout(() => {
      target.classList.add("hidden");
    }, 10);
    draggableService.setDragSourceId(dragItemId);
  };

  const onDragEnd = (ev: React.DragEvent) => {
    ev.currentTarget.classList.remove("hidden");
    removeAllPreviews();
    draggableService.setDragSourceId(null);
    draggableService.setDragTargetId(null);
    draggableService.setDragPosition(DragPosition.INVALID);
  };

  const onDragEnter = (targetId: string, ev: React.DragEvent) => {
    removeAllPreviews();
    draggableService.setDragTargetId(targetId);
    if (
      draggableService.dragSourceId === null ||
      targetId === draggableService.dragSourceId
    ) {
      return;
    }
    const { y, height } = ev.currentTarget.getBoundingClientRect();
    const targetMiddle = height / 2 + y;
    draggableService.setDragPosition(
      ev.clientY > targetMiddle ? DragPosition.AFTER : DragPosition.BEFORE
    );
    const classModifier =
      draggableService.dragPosition === DragPosition.AFTER ? "bottom" : "top";
    ev.currentTarget.classList.add(`drop-target-preview-${classModifier}`);
  };

  const removeAllPreviews = () => {
    draggableService.removeAllPreviews();
  };

  return (
    <div
      draggable
      className="draggable-item"
      onDragStart={(e) => onDragStart(e, itemId)}
      onDragEnd={onDragEnd}
      onDragEnter={(e) => onDragEnter(itemId, e)}
      onDragOver={(e) => e.preventDefault()}
    >
      {children}
    </div>
  );
};
