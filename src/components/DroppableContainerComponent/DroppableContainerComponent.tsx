import { PropsWithChildren, useContext } from "react";
import { DragPosition, DropData } from "../../models/DraggableService";
import { ServicesContext } from "../../services/ServicesProvider";

export interface DroppableContainerComponentProps extends PropsWithChildren {
  onDropItem: (dropData: DropData) => void;
}

export const DroppableContainerComponent = ({
  children,
  onDropItem,
}: DroppableContainerComponentProps) => {
  const { draggableService } = useContext(ServicesContext);
  const onDrop = () => {
    draggableService.removeAllPreviews();
    if (
      !draggableService.dragTargetId ||
      !draggableService.dragSourceId ||
      draggableService.dragPosition === DragPosition.INVALID
    ) {
      return;
    }
    const dropData = {
      from: draggableService.dragSourceId,
      to: draggableService.dragTargetId,
      at: draggableService.dragPosition,
    };
    onDropItem(dropData);
  };
  return (
    <div onDragOver={(e) => e.preventDefault()} onDrop={onDrop}>
      {children}
    </div>
  );
};
