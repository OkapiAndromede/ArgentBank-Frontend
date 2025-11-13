import Button from "../Button";
import "./style.scss";
import { useState } from "react";
import EditNameModal from "../EditNameModal";
/**
 * Composant UserBanner affichant la bannière d'accueil utilisateur.
 *
 * Ce composant affiche soit :
 * - Une bannière de bienvenue contenant le nom d'utilisateur et un bouton pour modifier le nom
 * - La modale {@link EditNameModal} lorsque l'utilisateur souhaite éditer le userName
 *
 * @component
 * @param {string} userName - Le nom d'utilisateur affiché dans la bannière
 *
 * @returns {JSX.Element} composant UserBanner rendu
 */

function UserBanner({ userName }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (isModalOpen) {
    return <EditNameModal onClose={() => setIsModalOpen(false)} />;
  } else {
    return (
      <div className="headerUser">
        <h1>
          Welcome back <br /> {userName || "Tony Jarvis"} !
        </h1>
        <Button
          buttonStyle="editButton"
          buttonType="default"
          onClick={() => setIsModalOpen(true)}
        >
          Edit Name
        </Button>
      </div>
    );
  }
}
export default UserBanner;
