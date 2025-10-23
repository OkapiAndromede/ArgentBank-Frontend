import { useDispatch } from "react-redux";
import { putUserData } from "../features/user/userThunks";
import { toast } from "react-toastify";

export default function useEditForm() {
  const dispatch = useDispatch();

  //Soumission du formulaire d'édition
  async function handleEditSubmit(formData) {
    const { userName } = formData;

    try {
      const resultAction = await dispatch(putUserData({ userName }));
      if (putUserData.fulfilled.match(resultAction)) {
        toast.success("User name changé avec succès");
      } else {
        console.log("Erreur de connexion : ", resultAction.payload);
      }
    } catch (err) {
      console.error("Erreur inattendue :", err);
    }
  }
  return { handleEditSubmit };
}
