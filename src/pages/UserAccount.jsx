import Navigation from "../components/Navigation";
import UserBanner from "../components/UserBanner";
function UserAccount() {
  return (
    <>
      <Navigation />
      <main className="mainUser">
        <UserBanner />
      </main>
    </>
  );
}

export default UserAccount;
