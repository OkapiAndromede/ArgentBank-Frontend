import { useDispatch, useSelector } from "react-redux";
import Button from "../Button";
import "./style.scss";
import { getUserData } from "../../features/user/userThunks";
import { useEffect, useState } from "react";
import EditNameModal from "../EditNameModal";
function UserBanner() {
  const dispatch = useDispatch();
  const userName = useSelector((state) => state.user.userName);
  const token = useSelector((state) => state.auth.token);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (token) {
      dispatch(getUserData());
    }
  }, [token]);

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
