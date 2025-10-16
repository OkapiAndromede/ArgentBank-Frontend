import Button from "../../components/Button";
import "./style.scss";
import useLoginForm from "../../hooks/useLoginForm";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { resetStatus } from "../../features/auth/authSlice";
/**
 * Composant Form affichant un formulaire de connexion utilisateur
 *
 * Ce composant gère la saisie et la validation des identifiants de connexion à l’aide de **React Hook Form**
 * et du hook personnalisé {@link useLoginForm}, qui encapsule la logique d’authentification.
 * @component
 *
 * @returns {JSX.Element} composant Form rendu.
 */
function Form() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();
  const { status } = useSelector((state) => state.auth);
  const { handleLoginSubmit } = useLoginForm();

  function onSubmit(data) {
    handleLoginSubmit(data);
    setTimeout(() => {
      reset();
    }, 1000);
  }
  console.log("refresh");
  if (status === "failed") {
    return (
      <div className="errorContainer">
        <svg
          onClick={() => dispatch(resetStatus())}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 640 640"
        >
          <path d="M320 112C434.9 112 528 205.1 528 320C528 434.9 434.9 528 320 528C205.1 528 112 434.9 112 320C112 205.1 205.1 112 320 112zM320 576C461.4 576 576 461.4 576 320C576 178.6 461.4 64 320 64C178.6 64 64 178.6 64 320C64 461.4 178.6 576 320 576zM231 231C221.6 240.4 221.6 255.6 231 264.9L286 319.9L231 374.9C221.6 384.3 221.6 399.5 231 408.8C240.4 418.1 255.6 418.2 264.9 408.8L319.9 353.8L374.9 408.8C384.3 418.2 399.5 418.2 408.8 408.8C418.1 399.4 418.2 384.2 408.8 374.9L353.8 319.9L408.8 264.9C418.2 255.5 418.2 240.3 408.8 231C399.4 221.7 384.2 221.6 374.9 231L319.9 286L264.9 231C255.5 221.6 240.3 221.6 231 231z" />
        </svg>
        <p className="errorContainer__content">
          Email ou mot de passe incorrect
        </p>
      </div>
    );
  } else {
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
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="inputWrapper">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              {...register("email", {
                required: "L'email est requis",
                pattern: {
                  value: /^[A-Za-z0-9._-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/i,
                  message: "Adresse email invalide",
                },
              })}
            />
            {errors.email && <span>{errors.email.message}</span>}
          </div>
          <div className="inputWrapper">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              {...register("password", {
                required: "Le mot de passe est requis",
              })}
            />
            {errors.password && <span>{errors.password.message}</span>}
          </div>
          <div className="inputRemember">
            <input
              type="checkbox"
              id="remember-me"
              {...register("remember-me")}
            />
            <label htmlFor="remember-me">Remember me</label>
          </div>
          <Button buttonType="submit">Sign In</Button>
        </form>
      </section>
    );
  }
}
export default Form;
