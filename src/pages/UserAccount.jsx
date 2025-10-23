import Account from "../components/Account";
import Button from "../components/Button";
import Navigation from "../components/Navigation";
import UserBanner from "../components/UserBanner";
import Footer from "../components/Footer";
import { useSelector } from "react-redux";
function UserAccount() {
  const userName = useSelector((state) => state.user.userName);
  return (
    <>
      <Navigation isConnected={true} userName={userName} />
      <main className="mainUser">
        <UserBanner />
        <section className="account">
          <Account
            title="Argent Bank Checking (x8349)"
            amount={`$${2_082.79}`}
            description="Available Balance"
          />
          <div>
            <Button buttonType={"default"} buttonStyle="account__cta">
              View transactions
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

export default UserAccount;
