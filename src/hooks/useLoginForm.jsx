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
    const { email, password } = formData;

    try {
      const resultAction = await dispatch(logIn({ email, password }));
      if (logIn.fulfilled.match(resultAction)) {
        //Connexion réussie
        navigate("/userAccount");
      } else {
        //Connexion echoué
        console.log("Erreur de connexion :", resultAction.payload);
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
