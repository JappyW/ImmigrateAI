import { useEffect, useState } from "react";
import { BuildForm } from "../../components/BuildForm";

export const FormBuilder = () => {
  const [formElements, setFormElements] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/api/data", {})
      .then((data) => data.json())
      .then((data) => setFormElements(JSON.parse(data)));
  }, []);

  if (!formElements.length) {
    return;
  }

  return <BuildForm formValues={formElements} />;
};
