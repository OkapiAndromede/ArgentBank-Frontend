import { useDispatch, useSelector } from "react-redux";
import { putUserData } from "../features/user/userThunks";
import { toast } from "react-toastify";
import { safeChangeItem } from "../features/utils";
/**
 * Hook personalisé gérant la logique du formulaire de modification du nom d'utilisateur.
 *
 * Ce hook orchestre l'envoi du nouveau nom d'utilisateur au serveur via le thunk {@link putUserData}.
 * En fonction de la réponse, trois scénarios sont possibles :
 * 1. **Succès sans "Remember Me"** : affichage d'un message de succès via `toast.success`.
 * 2. **Succès avec "Remember Me"** : mise à jour persistante du `userName` puis affichage d'un message de succès.
 * 3. **Echec de la requête** : affichage d'une erreur dans la console.
 *
 * @function useEditForm
 * @returns {Object} Un objet contenant la fonction `handleEditSubmit`
 * @returns {Function} return.handleEditSubmit -Fonction de gestion de la soumission du formulaire d'édition.
 * Accepte un objet `formData` contenant la nouvelle valeur du `userName`.
 *
 * @see {@link putUserData} pour la requête asynchrone utilisée dans ce hook.
 */
export default function useEditForm() {
  const dispatch = useDispatch();
  const isRemember = useSelector((state) => state.auth.isRemember);
  //Soumission du formulaire d'édition
  async function handleEditSubmit(formData) {
    const { userName } = formData;

    try {
      const resultAction = await dispatch(putUserData({ userName }));
      //Cas 1 : Utilisateur sans remember
      if (putUserData.fulfilled.match(resultAction) && !isRemember) {
        //Message de succès de l'opération
        return toast.success("Username updated successfully");
      }
      //Cas 2 : Utilisateur avec remember
      if (putUserData.fulfilled.match(resultAction) && isRemember) {
        //Stockage persistant de la nouvelle valeur
        safeChangeItem("userName", userName);
        //Message de succès de l'opération
        return toast.success("Username updated successfully");
      }
      console.log("Erreur de connexion : ", resultAction.payload);
    } catch (err) {
      console.error("Erreur inattendue :", err);
    }
  }
  return { handleEditSubmit };
}
