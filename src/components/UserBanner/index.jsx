import { useDispatch, useSelector } from "react-redux";
import Button from "../Button";
import "./style.scss";
import { getUserData } from "../../features/user/userThunks";
import { useEffect } from "react";
function UserBanner() {
  const dispatch = useDispatch();
  const userName = useSelector((state) => state.user.userName);
  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    if (token) {
      dispatch(getUserData());
    }
  }, [token]);

  return (
    <div className="headerUser">
      <h1>
        Welcome back <br /> {userName || "Tony Jarvis"} !
      </h1>
      <Button buttonStyle="editButton" buttonType="default">
        Edit Name
      </Button>
    </div>
  );
}
export default UserBanner;
