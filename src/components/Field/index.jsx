function Field({ inputType = "text", inputId, inputName, isRequired = false }) {
  return (
    <>
      <input
        type={inputType}
        id={inputId}
        name={inputName}
        {...(isRequired ? { required: true } : {})}
      />
    </>
  );
}

export default Field;
