import { memo, useCallback, useState } from "react";
import { useDrop } from "react-dnd";
import { createPortal } from "react-dom";
import { v4 as uuid } from "uuid";
import { FormItemTypes, formControlsExamples } from "../../constants";
import { snapToGrid as doSnapToGrid } from "../../utils";
import { DraggableBox } from "../FormComponents/DraggableBox";
import { PropertiesModal } from "../PropertiesModal";

const styles = {
  width: 400,
  height: 800,
  border: "1px solid black",
  position: "relative",
};

export const DragContainer = memo(() => {
  const [formElements, setFormElements] = useState(
    formControlsExamples.map((c) => ({ ...c }))
  );

  const [openPropertiesModal, setOpenPropertiesModal] = useState(false);
  const [selectedFormElement, setSelectedFormElement] = useState(null);

  const moveBox = useCallback(
    (id, left, top) => {
      setFormElements((prevFormElements) => {
        const newFormElements = [...prevFormElements];
        const modifiedBoxIndex = newFormElements.findIndex(
          (formElement) => formElement.id === id
        );
        //if initial control moved - create a new instance and move it
        if (id.includes("default")) {
          newFormElements.push({
            ...newFormElements[modifiedBoxIndex],
            id: uuid(),
            left,
            top,
          });

          return newFormElements;
        }

        //move the formElement
        newFormElements[modifiedBoxIndex] = {
          ...newFormElements[modifiedBoxIndex],
          left,
          top,
        };

        return newFormElements;
      });
    },
    [formElements]
  );

  const [, drop] = useDrop(
    () => ({
      accept: [FormItemTypes.TextInput, FormItemTypes.TextArea],
      drop(item, monitor) {
        const delta = monitor.getDifferenceFromInitialOffset();
        let left = Math.round(item.left + delta.x);
        let top = Math.round(item.top + delta.y);
        //snap to grid
        [left, top] = doSnapToGrid(left, top);
        moveBox(item.id, left, top);
        return undefined;
      },
    }),
    [moveBox]
  );

  const handleChangeProperties = useCallback((item) => {
    setFormElements((prevFormElements) => {
      const newFormElements = [...prevFormElements];
      const modifiedFormElementIndex = newFormElements.findIndex(
        (formElement) => formElement.id === item.id
      );

      newFormElements[modifiedFormElementIndex].properties = {
        label: item.label,
        placeholder: item.placeholder,
        required: item.required,
      };

      return newFormElements;
    });

    setOpenPropertiesModal(false);
  }, []);

  const handleOpenModal = useCallback(
    (item) => {
      if (item.id.includes("default")) {
        return;
      }
      setOpenPropertiesModal(true);
      setSelectedFormElement(item);
    },
    [openPropertiesModal, selectedFormElement]
  );

  const submitFormDetails = async () => {
    try {
      await fetch("http://localhost:3000/api/data", {
        method: "POST",
        body: JSON.stringify(prepareFormDetails(formElements)),
        headers: new Headers({ "content-type": "application/json" }),
      });
    } catch (error) {
      console.error("Error submitting form details", error);
    }
  };

  const prepareFormDetails = useCallback(() => {
    let sortedFormDetails = formElements
      .sort((a, b) => a.top - b.top)
      .reduce((acc, element) => {
        if (!element.id.includes("default")) {
          acc.push(element);
        }
        return acc;
      }, []);
    return sortedFormDetails;
  }, [formElements]);

  return (
    <>
      <div ref={drop} style={styles}>
        {formElements.map((formElement) => (
          <DraggableBox
            key={formElement.id}
            id={formElement.id}
            onClick={() => handleOpenModal(formElement)}
            {...formElement}
          />
        ))}
        {openPropertiesModal &&
          createPortal(
            <PropertiesModal
              id={selectedFormElement.id}
              callback={handleChangeProperties}
              title={selectedFormElement.title}
              type={selectedFormElement.type}
            />,
            document.body
          )}
      </div>
      <button type="button" onClick={submitFormDetails}>
        Submit
      </button>
    </>
  );
});
