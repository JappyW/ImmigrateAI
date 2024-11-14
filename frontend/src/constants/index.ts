export const FormItemTypes = {
  TextInput: "TextInput",
  TextArea: "TextArea",
  Dropdown: "Dropdown",
  Checkbox: "Checkbox",
  DatePicker: "DatePicker",
  FileUpload: "FileUpload",
};

export const formControlsExamples = [
  {
    type: FormItemTypes.TextInput,
    top: 0,
    left: -200,
    title: "Text Input",
    name: "text",
    id: "defaultTextInput",
    properties: {
      required: false,
      label: "",
      placeholder: "",
    },
  },
  {
    type: FormItemTypes.TextArea,
    top: 42,
    left: -200,
    name: "area",
    title: "Text Area",
    id: "defaultTextArea",
    properties: {
      required: false,
      label: "",
      placeholder: "",
    },
  },
  {
    type: FormItemTypes.Dropdown,
    top: 84,
    left: -200,
    name: "select",
    title: "Dropdown",
    id: "defaultDropdown",
    properties: {
      required: false,
      label: "",
      placeholder: "",
    },
  },
];
