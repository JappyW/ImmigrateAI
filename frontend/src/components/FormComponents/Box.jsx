import { memo } from "react";

const styles = {
  border: "1px dashed gray",
  padding: "0.5rem 1rem",
  cursor: "move",
  backgroundColor: "#fff",
  color: "#000",
};

export const Box = memo(function Box({ title, preview }) {
  return (
    <div style={styles} role={preview ? "BoxPreview" : "Box"}>
      {title}
    </div>
  );
});
