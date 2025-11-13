import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logIn } from "../features/auth/authThunks";
import { getUserData } from "../features/user/userThunks";
import { rememberUser } from "../features/auth/authSlice";
/**
 * Hook personalisé gérant la logique du formulaire de connexion
 *
 * Ce hook orchestre tout le processus d'authentification :
 * - Envoie les identifiants de connexion au serveur via le thunk {@link logIn}.
 * - Récupère les données utilisateur via le thunk {@link getUserData} en cas de succès.
 * - Gère la persistance des informations utilisateur si l'option "Remember Me" est activée.
 * - Redirige l'utilisateur vers la page "/user-account" après une connexion réussie.
 *
 * ### Comportements possibles :
 * 1. **Connexion réussie sans "Remember Me"** : les données utilisateur sont chargées dans le store Redux.
 * 2. **Connexion réussie avec "Remember Me"** : les données utilisateur et le token sont stockés dans `localStorage` ainsi que dans le store Redux.
 * 3. **Échec de la connexion** : un message d’erreur est affiché dans la console.
 *
 * @function useLoginForm
 *
 * @returns {Object} Objet contenant la fonction handleLoginSubmit
 * @returns {Function} return.handleLoginSubmit - Fonction gérant la soumission du formulaire de connexion.
 * Elle prend en paramètre un objet contenant :
 * @param {Object} formData - Données du formulaire de connexion.
 * @param {string} formData.email - Adresse mail de l'utilisateur.
 * @param {string} formData.password - Mot de passe de l'utilisateur.
 * @param {boolean} formData.rememberMe - Indique si les données doivent être persistés dans le localStorage.
 *
 * @throws {Error} Erreur inattendue lors de la tentative de connexion ou de la récupération des données utilisateur.
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
        return navigate("/user-account");
      }

      //Cas 2 : Connexion reussie +rememberMe
      if (logIn.fulfilled.match(resultAction) && rememberMe) {
        //Persistance du token
        const token = resultAction.payload.body.token;
        //Activation de isRemember
        dispatch(rememberUser());
        //Mise à jour du state user et persistance des infos utilisateur
        const userDataAction = await dispatch(getUserData());
        const { firstName, lastName, userName } = userDataAction.payload.body;
        localStorage.setItem(
          "user",
          JSON.stringify({
            firstName,
            lastName,
            userName,
            rememberMe,
            token,
            email,
            password,
          })
        );
        return navigate("/user-account");
      }

      console.log("Erreur de connexion :", resultAction.payload);
    } catch (err) {
      console.error("Erreur inattendue:", err);
    }
  }

  return {
    handleLoginSubmit,
  };
}
