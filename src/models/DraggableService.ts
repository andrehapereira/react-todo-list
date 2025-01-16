export enum DragPosition {
  BEFORE = "BEFORE",
  AFTER = "AFTER",
  INVALID = "INVALID",
}

export interface DropData {
  from: string;
  to: string;
  at: DragPosition;
}

export interface DraggableService {
  dragSourceId: string | null;
  dragTargetId: string | null;
  dragPosition: DragPosition;

  setDragSourceId: (id: string | null) => void;
  setDragTargetId: (id: string | null) => void;
  setDragPosition: (position: DragPosition) => void;
  removeAllPreviews: () => void;
}
