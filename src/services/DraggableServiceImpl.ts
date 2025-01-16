import { DraggableService, DragPosition } from "../models/DraggableService";

export class DraggableServiceImpl implements DraggableService {
  #dragTargetId: string | null = null;
  #dragSourceId: string | null = null;
  #dragPosition: DragPosition = DragPosition.INVALID;

  setDragSourceId(id: string | null) {
    this.#dragSourceId = id;
  }

  setDragTargetId(id: string | null) {
    this.#dragTargetId = id;
  }

  setDragPosition(position: DragPosition) {
    this.#dragPosition = position;
  }

  removeAllPreviews() {
    const elements = document.querySelectorAll(
      ".drop-target-preview-bottom, .drop-target-preview-top"
    );
    elements.forEach((el) => {
      el.classList.remove("drop-target-preview-bottom");
      el.classList.remove("drop-target-preview-top");
    });
  }

  get dragSourceId() {
    return this.#dragSourceId;
  }

  get dragTargetId() {
    return this.#dragTargetId;
  }

  get dragPosition() {
    return this.#dragPosition;
  }
}
