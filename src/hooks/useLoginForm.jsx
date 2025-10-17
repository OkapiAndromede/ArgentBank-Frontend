import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logIn } from "../features/auth/authThunks";
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
      switch (true) {
        //Cas 1 : Connexion reussie
        case logIn.fulfilled.match(resultAction) && !rememberMe:
          navigate("/userAccount");
          break;
        //Cas 2 : Connexion reussie +rememberMe
        case logIn.fulfilled.match(resultAction) && rememberMe:
          localStorage.setItem("email", email);
          localStorage.setItem("password", password);
          navigate("/userAccount");
          break;
        default:
          console.log("Erreur de connexion :", resultAction.payload);
          break;
      }
    } catch (err) {
      console.error("Erreur inattendue:", err);
    }
  }

  //le hook expose uniquement ce dont le composant a besoin
  return {
    handleLoginSubmit,
  };
}
