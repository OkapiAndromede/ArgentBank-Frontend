import "./style.scss";
function UserBanner() {
  return (
    <div className="headerUser">
      <h1>
        Welcome back <br /> Tony Jarvis !
      </h1>
      <button className="editButton">Edit Name</button>
    </div>
  );
}
export default UserBanner;
