function Field({
  inputType = "text",
  inputId,
  inputName,
  isRequired = false,
  value,
  onChange,
}) {
  return (
    <>
      <input
        type={inputType}
        id={inputId}
        name={inputName}
        value={value}
        onChange={onChange}
        {...(isRequired ? { required: true } : {})}
      />
    </>
  );
}

export default Field;
