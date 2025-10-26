import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logIn } from "../features/auth/authThunks";
import { getUserData } from "../features/user/userThunks";
import { rememberUser } from "../features/auth/authSlice";
/**
 * Hook personalisé gérant la logique du formulaire de connexion
 *
 * Le hook assure la logique d'authentification
 *
 * @function
 * @returns {Function} return.handleLoginSubmit - Gère l'authentification et la redirection après connexion
 */
export default function useLoginForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //Soumission du formulaire
  async function handleLoginSubmit(formData) {
    const { email, password, rememberMe } = formData;

    try {
      const resultAction = await dispatch(logIn({ email, password }));
      // Else OUT

      //Cas 1 : Connexion reussie
      if (logIn.fulfilled.match(resultAction) && !rememberMe) {
        //Mise à jour du state user
        dispatch(getUserData());
        return navigate("/userAccount");
      }

      //Cas 2 : Connexion reussie +rememberMe
      if (logIn.fulfilled.match(resultAction) && rememberMe) {
        //Persistance du token
        const token = resultAction.payload.body.token;
        localStorage.setItem("token", token);
        //Activation de isRemember
        dispatch(rememberUser());
        //Mise à jour du state user et persistance des infos utilisateur
        const userDataAction = await dispatch(getUserData());
        const { firstName, lastName, userName } = userDataAction.payload.body;
        localStorage.setItem("firstName", firstName);
        localStorage.setItem("lastName", lastName);
        localStorage.setItem("userName", userName);
        localStorage.setItem("isRemember", rememberMe);
        return navigate("/userAccount");
      }

      console.log("Erreur de connexion :", resultAction.payload);
    } catch (err) {
      console.error("Erreur inattendue:", err);
    }
  }

  //le hook expose uniquement ce dont le composant a besoin
  return {
    handleLoginSubmit,
  };
}
