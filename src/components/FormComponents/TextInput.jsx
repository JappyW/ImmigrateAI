export const TextInput = ({
  label,
  placeholder,
  required,
  validationSchema,
}) => {
  return (
    <>
      <label htmlFor="text-input">{label}</label>
      <input type="text" id="text-input"></input>
    </>
  );
};
