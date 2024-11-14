import { useCallback, useState, useMemo } from "react";

export const PropertiesModal = ({ title, type, id, callback }) => {
  const [label, setLabel] = useState("");
  const [placeholder, setPlaceholder] = useState("");
  const [required, setRequired] = useState(false);

  const { requiredId, labelId, placeholderId } = useMemo(() => {
    return {
      requiredId: "required" + id,
      labelId: "label" + id,
      placeholderId: "placeholder" + id,
    };
  }, [id]);

  const handleChangeLabel = useCallback((event) => {
    setLabel(event.target.value);
  }, []);

  const handleChangePlaceholder = useCallback((event) => {
    setPlaceholder(event.target.value);
  }, []);

  const handleChangeRequired = useCallback(() => {
    setRequired((r) => !r);
  }, []);

  const handleApplyChanges = () => {
    callback({ id, label, placeholder, required });
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        position: "absolute",
        right: 0,
        top: 0,
      }}
    >
      <div>{title}</div>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <label htmlFor={requiredId}>Required</label>
        <input
          type="checkbox"
          id={requiredId}
          name="required"
          defaultChecked={required}
          onClick={handleChangeRequired}
        ></input>
      </div>

      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <label htmlFor={labelId}>Label</label>
        <input
          type="text"
          id={labelId}
          name="label"
          value={label}
          onChange={handleChangeLabel}
        ></input>
      </div>

      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <label htmlFor={placeholderId}>Placeholder</label>
        <input
          type="text"
          id={placeholderId}
          name="placeholder"
          value={placeholder}
          onChange={handleChangePlaceholder}
        ></input>
      </div>
      <button onClick={handleApplyChanges}>Apply</button>
    </div>
  );
};
