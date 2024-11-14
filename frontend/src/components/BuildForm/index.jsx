import * as Yup from "yup";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { useMemo } from "react";
import { FormItemTypes } from "../../constants";
import { buildValidation } from "../../utils";

const formRowStyle = {
  display: "flex",
  flexDirection: "column",
  gap: "10px",
};

export const BuildForm = ({ formValues }) => {
  console.log(formValues);
  const initialValues = useMemo(() => {
    let initialValues = {};

    formValues.forEach((v) => {
      initialValues[v.name] = "";
    });

    return initialValues;
  }, [formValues]);

  const formSchema = useMemo(() => {
    let schemaObject = {};
    formValues.map((v) => {
      schemaObject[v.name] = buildValidation({
        type: v.type,
        properties: v.properties,
      });
      return schemaObject;
    });

    return Yup.object().shape(schemaObject);
  }, [formValues]);

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={formSchema}
      onSubmit={(values) => {
        console.log(values);
      }}
    >
      {(formik) => {
        const { errors, touched, isValid, dirty } = formik;
        return (
          <Form>
            <div className="container">
              {formValues.map((v) => {
                switch (v.type) {
                  case FormItemTypes.TextArea:
                  case FormItemTypes.TextInput: {
                    return (
                      <div className="form-row" key={v.id} style={formRowStyle}>
                        <label htmlFor={v.id}>{v.properties.label}</label>
                        <Field
                          placeholder={v.properties.placeholder}
                          type="text"
                          name={v.name}
                          id={v.id}
                          className={
                            errors[v.name] && touched[v.name]
                              ? "input-error"
                              : null
                          }
                        />
                        <ErrorMessage
                          name={v.name}
                          component="span"
                          className="error"
                        />
                      </div>
                    );
                  }
                  case FormItemTypes.Checkbox: {
                    return (
                      <div className="form-row" key={v.id} style={formRowStyle}>
                        <label for={v.id}>
                          <Field
                            id={v.id}
                            type="checkbox"
                            name="toggle"
                            className={
                              errors[v.name] && touched[v.name]
                                ? "input-error"
                                : null
                            }
                          />
                        </label>
                        <ErrorMessage
                          name={v.name}
                          component="span"
                          className="error"
                        />
                      </div>
                    );
                  }

                  case FormItemTypes.Dropdown: {
                    return (
                      <div className="form-row" key={v.id} style={formRowStyle}>
                        <label htmlFor={v.id} style={{ display: "block" }}>
                          Color
                        </label>
                        <select id={v.id} name={v.name}>
                          <option>Default</option>
                        </select>
                        <ErrorMessage
                          name={v.name}
                          component="span"
                          className="error"
                        />
                      </div>
                    );
                  }
                }
              })}
            </div>
            <button type="submit">Submit</button>
          </Form>
        );
      }}
    </Formik>
  );
};
