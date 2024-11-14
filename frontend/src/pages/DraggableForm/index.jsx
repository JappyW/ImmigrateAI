import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { CustomDragLayer } from "../../components/CustomDragLayer";
import { DragContainer } from "../../components/DragContainer";

export const DraggableForm = () => {
  return (
    <DndProvider backend={HTML5Backend}>
      <DragContainer />
      <CustomDragLayer />
    </DndProvider>
  );
};
