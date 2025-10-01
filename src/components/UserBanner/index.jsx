import Button from "../Button";
import "./style.scss";
function UserBanner() {
  return (
    <div className="headerUser">
      <h1>
        Welcome back <br /> Tony Jarvis !
      </h1>
      <Button buttonStyle="editButton" buttonType="default">
        Edit Name
      </Button>
    </div>
  );
}
export default UserBanner;
