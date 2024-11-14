import * as Yup from "yup";
import { FormItemTypes } from "../constants";

export function buildValidation({ type, properties }) {
  let validationSchema = Yup;
  validationSchema = buildType(validationSchema, type);
  validationSchema = buildMin(validationSchema, properties.min);
  validationSchema = buildMax(validationSchema, properties.max);
  validationSchema = buildRequired(validationSchema, properties.required);
  return validationSchema;
}

function buildType(validationSchema, type) {
  if (type === FormItemTypes.Checkbox) {
    return validationSchema.boolean();
  }

  if (type === FormItemTypes.FileUpload) {
    return validationSchema
      .mixed()
      .test("fileSize", "The file is too large", (value) => {
        if (!value.length) return true; // attachment is optional
        return value[0].size <= 2000000;
      });
  }

  return validationSchema.string();
}

function buildMin(validationSchema, min) {
  if (min) {
    return validationSchema.min(min, "Must meet the minimum criteria");
  }
  return validationSchema;
}

function buildMax(validationSchema, max) {
  if (max) {
    return validationSchema.max(max);
  }
  return validationSchema;
}

function buildRequired(validationSchema, required) {
  if (required) {
    return validationSchema.required("This property is required");
  }
  return validationSchema;
}
