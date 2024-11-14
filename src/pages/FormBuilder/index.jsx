import { useDrag } from "react-dnd";
import { useState, useCallback } from "react";
import { DropArea } from "../../components/DropArea";
import { FormComponents } from "../../components/FormComponents";
import { TextInput } from "../../components/FormComponents/TextInput";

export const FormItemTypes = {
  TextInput: "TextInput",
  TextArea: "TextArea",
  Dropdown: "Dropdown",
  Checkbox: "Checkbox",
  Radio: "Radio",
  DatePicker: "DatePicker",
  FileUpload: "FileUpload",
};

export const FormBuilder = () => {
  const [dropArea, setDropArea] = useState({
    accepts: [FormItemTypes.TextInput, FormItemTypes.TextArea],
    droppedItems: [],
  });

  const [droppedBoxNames, setDroppedBoxNames] = useState([]);
  const isDropped = (boxName) => {
    return droppedBoxNames.indexOf(boxName) > -1;
  };

  const handleDroppedItem = (droppedItems, item) => {
    const indexOfNewItem = droppedItems.indexOf(item);
    if (indexOfNewItem === -1) {
      return droppedItems.push(item);
    }

    return droppedItems.splice(indexOfNewItem, 1);
  };

  const handleDrop = useCallback(
    (index, item) => {
      const { name } = item;

      setDroppedBoxNames(name);
      setDropArea(
        (prevArea) => ({
          ...prevArea,
          lastDroppedItem: item,
          droppedItems: handleDroppedItem(prevArea.droppedItems, item),
        })
        // update(dustbins, {
        //   [index]: {
        //     lastDroppedItem: {
        //       $set: item,
        //     },
        //   },
        // })
      );
    },
    [dropArea]
  );

  return (
    <>
      <DropArea
        accept={dropArea.accepts}
        lastDroppedItem={dropArea.lastDroppedItem}
        // onDrop={(item) => handleDrop(index, item)}
        onDrop={(item) => handleDrop(0, item)}
        key={"dropArea"}
      />
      <TextInput
        type={FormItemTypes.TextInput}
        isDropped={isDropped("FormComponents")}
        key={"FormComponents"}
      />
    </>
  );
};
