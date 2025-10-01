import "./style.scss";
const BUTTON_TYPES = {
  DEFAULT: "default",
  SUBMIT: "submit",
};
function Button({ buttonType, children, isDisabled = false }) {
  switch (buttonType) {
    case BUTTON_TYPES.DEFAULT:
      return <button className="button"> {children} </button>;
    case BUTTON_TYPES.SUBMIT:
      return (
        <input
          className="button"
          type="submit"
          value={children}
          {...(isDisabled && { disabled: true })}
        />
      );
    default:
      return <button value={children} className="defaultButton" />;
  }
}
export default Button;
