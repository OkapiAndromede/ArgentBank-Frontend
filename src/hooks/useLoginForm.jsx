import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logIn } from "../features/auth/authThunks";
/**
 * Hook personalisé gérant la logique du formulaire de connexion
 *
 * Le hook assure les tâches suivantes :
 * 1. La gestion des états internes du formulaire ("email", "password")
 * 2. La soumission du formulaire et la gestion du flux de connexion via Redux
 *
 * @function
 * @returns {object} Un objet contenant :
 * @returns {string} return.email - L'adresse mail saisie par l'utilisateur
 * @returns {string} return.password - Le mot de passe saisi par l'utilisateur
 * @returns {Function} return.setEmail - Le mutateur de "email"
 * @returns {Function} return.setPassword - Le mutateur de "password"
 * @returns {Function} return.handleSubmit - Gère la soumission du formulaire et la redirection après connexion
 */
export default function useLoginForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //Etats internes du formulaire
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  //Soumission du formulaire
  async function handleSubmit(event) {
    event.preventDefault();

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
    email,
    password,
    setEmail,
    setPassword,
    handleSubmit,
  };
}
