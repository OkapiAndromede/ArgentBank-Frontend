import { useForm } from "react-hook-form";
import Button from "../Button";
import { useSelector } from "react-redux";
import "./style.scss";

function EditNameModal({ onClose }) {
  const defaultFirstName = useSelector((state) => state.user.firstName);
  const defaultLastName = useSelector((state) => state.user.lastName);
  const {
    register,
    handleSubmit,
    formState: { error },
  } = useForm({
    defaultValues: {
      firstName: defaultFirstName,
      lastName: defaultLastName,
    },
  });
  function onSubmit(data) {
    onClose();
  }
  return (
    <section className="userModal">
      <h1 className="userModal__title">Edit user info</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="editingInput">
          <label htmlFor="username">User name :</label>
          <input
            type="text"
            id="username"
            {...register("username", {
              required: "Le nouveau nom d'utilisateur est requis",
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
