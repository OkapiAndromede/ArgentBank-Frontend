import { useDispatch, useSelector } from "react-redux";
import { putUserData } from "../features/user/userThunks";
import { toast } from "react-toastify";
import { safeChangeItem } from "../features/utils";

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
