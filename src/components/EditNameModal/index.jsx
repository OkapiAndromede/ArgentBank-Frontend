import { useForm } from "react-hook-form";
import Button from "../Button";
import { useSelector } from "react-redux";
import "./style.scss";
import useEditForm from "../../hooks/useEditForm";
import { toast } from "react-toastify";
import { useEffect } from "react";
/**
 * Composant EditNameModal gérant le formulaire de modification de nom d'utilisateur
 *
 * Ce composant affiche une modale permettant à l'utilisateur de modifier son "userName"
 * Il utilise :
 * - {@link useEditForm} : hook personnalisé qui gère la soumission et la mise à jour des données utilisateur
 * - "useForm" (de la bibliothèque **react-hook-form**): pour la gestion des entrées et des validations du formulaire
 *
 * @component
 * @param {Function} onClose - Fonction appelée lors de la fermeture de la modal
 *
 * @returns {JSX.Element} composant EditNameModal rendu
 */
function EditNameModal({ onClose }) {
  const defaultFirstName = useSelector((state) => state.user.firstName);
  const defaultLastName = useSelector((state) => state.user.lastName);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      firstName: defaultFirstName,
      lastName: defaultLastName,
    },
  });
  const { handleEditSubmit } = useEditForm();

  function onSubmit(data) {
    handleEditSubmit(data);
    onClose();
  }

  useEffect(() => {
    if (errors.userName) {
      toast.error(errors.userName.message);
    }
  }, [errors.userName]);
  return (
    <section className="userModal">
      <h2 className="userModal__title">Edit user info</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="editingInput">
          <label htmlFor="userName">User name :</label>
          <input
            type="text"
            id="userName"
            {...register("userName", {
              required: "You must provide a new username",
              pattern: {
                value: /^[A-Za-zÀ-ÖØ-öø-ÿ\-'\s]{2,30}$/i,
                message: "New user Name are invalid",
              },
            })}
          />
        </div>
        <div className="editingInput">
          <label htmlFor="firstName">First name :</label>
          <input
            type="text"
            id="firstName"
            {...register("firstName")}
            disabled
          />
        </div>
        <div className="editingInput">
          <label htmlFor="lastName">Last name :</label>
          <input type="text" id="lastName" {...register("lastName")} disabled />
        </div>
        <div className="buttonChoice">
          <Button buttonType="submit" buttonStyle={"modalButton saveStyle"}>
            Save
          </Button>
          <Button
            buttonType="default"
            onClick={onClose}
            buttonStyle={"modalButton cancelStyle"}
          >
            Cancel
          </Button>
        </div>
      </form>
    </section>
  );
}

export default EditNameModal;
