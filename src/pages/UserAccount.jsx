import Account from "../components/Account";
import Button from "../components/Button";
import Navigation from "../components/Navigation";
import UserBanner from "../components/UserBanner";
import Footer from "../components/Footer";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import axios from "axios";
import { formatAmount } from "./utils";
import { useNavigate } from "react-router-dom";
import { connectUser } from "../features/auth/authSlice";
function UserAccount() {
  const userName = useSelector((state) => state.user.userName);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const dispatch = useDispatch();

  const localToken = localStorage.getItem("token");
  const navigate = useNavigate();
  const [funds, setFunds] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await axios.get("/features.json");
      const brutFunds = response.data?.funds;
      const formattedFunds = formatAmount(brutFunds);
      setFunds(formattedFunds);
    }
    fetchData();
  }, []);

  useEffect(() => {
    if (!localToken && !isAuthenticated) {
      return navigate("/signIn");
    }
    if (localToken) {
      dispatch(connectUser());
    }
  }, []);

  //Renvoi l'utilisateur sur la page de connexion s'il n'est pas authentifié
  if (isAuthenticated || localToken) {
    return (
      <>
        <Navigation wantToConnect={false} userName={userName} />
        <main className="mainUser">
          <UserBanner userName={userName} />
          {funds?.map((item) => (
            <section className="account" key={item.id}>
              <Account
                title={item.title}
                amount={`$${item.amount}`}
                description={item.description}
              />
              <div>
                <Button buttonType={"default"} buttonStyle="account__cta">
                  View transactions
                </Button>
              </div>
            </section>
          ))}
        </main>
        <Footer />
      </>
    );
  }
}

export default UserAccount;
