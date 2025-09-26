import Button from "../../components/Button";
import Field from "../../components/Field";
import "./style.scss";
function Form() {
  return (
    <section className="signIn">
      <svg
        className="signIn__icon"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 640 640"
      >
        <path d="M463 448.2C440.9 409.8 399.4 384 352 384L288 384C240.6 384 199.1 409.8 177 448.2C212.2 487.4 263.2 512 320 512C376.8 512 427.8 487.3 463 448.2zM64 320C64 178.6 178.6 64 320 64C461.4 64 576 178.6 576 320C576 461.4 461.4 576 320 576C178.6 576 64 461.4 64 320zM320 336C359.8 336 392 303.8 392 264C392 224.2 359.8 192 320 192C280.2 192 248 224.2 248 264C248 303.8 280.2 336 320 336z" />
      </svg>
      <h1>Sign In</h1>
      <form>
        <div className="inputWrapper">
          <label htmlFor="username">Username</label>
          <Field
            inputType="text"
            inputId="username"
            inputName="Username"
            isRequired={true}
          />
        </div>
        <div className="inputWrapper">
          <label htmlFor="password">Password</label>
          <Field
            inputType="password"
            inputId="password"
            inputName="password"
            isRequired={true}
          />
        </div>
        <div className="inputRemember">
          <Field
            inputType="checkbox"
            inputId="remember-me"
            inputName="remember-me"
          />
          <label htmlFor="remember-me">Remember me</label>
        </div>
        <Button>Sign In</Button>
      </form>
    </section>
  );
}
export default Form;
