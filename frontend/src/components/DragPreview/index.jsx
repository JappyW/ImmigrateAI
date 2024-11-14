import { memo } from "react";
import { DraggableBox } from "../FormComponents/DraggableBox";
const styles = {
  display: "inline-block",
  transform: "rotate(-7deg)",
  WebkitTransform: "rotate(-7deg)",
  minWidth: "200px",
};
export const DragPreview = memo(function DragPreview({ title }) {
  return (
    <div style={styles}>
      <DraggableBox title={title} preview />
    </div>
  );
});
