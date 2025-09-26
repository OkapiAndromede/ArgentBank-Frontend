import "./style.scss";
function Button({ children, isDisabled = false }) {
  return (
    <>
      <input
        className="button"
        type="submit"
        value={children}
        {...(isDisabled && { disabled: true })}
      />
    </>
  );
}
export default Button;
