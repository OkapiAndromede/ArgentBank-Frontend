import Button from "../Button";
import "./style.scss";
import { useState } from "react";
import EditNameModal from "../EditNameModal";
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
