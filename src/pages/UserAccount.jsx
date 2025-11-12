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
import { logIn } from "../features/auth/authThunks";
function UserAccount() {
  const userName = useSelector((state) => state.user.userName);
  const userEmail = useSelector((state) => state.user.userEmail);
  const userPassword = useSelector((state) => state.user.userPassword);
  const rememberMe = useSelector((state) => state.auth.isRemember);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const localToken = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();

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
    const autoLogIn = async () => {
      if (!rememberMe || !userEmail || !userPassword) return;

      try {
        const resultAction = await dispatch(
          logIn({ email: userEmail, password: userPassword })
        );
        if (logIn.fulfilled.match(resultAction)) {
          dispatch(connectUser());
        } else {
          console.warn("connexion automatique échouée", resultAction);
          return navigate("/signIn");
        }
      } catch (err) {
        console.error("Erreur lors de la connexion automatique : ", err);
      }
    };
    //On essaye d'abord de récupérer une connexion remember
    autoLogIn();
    //On vérifie a minima la présence du token
    if (!localToken) return navigate("/signIn");
  }, []);

  //Renvoi l'utilisateur sur la page de connexion s'il n'est pas authentifié
  if (isAuthenticated) {
    return (
      <>
        <Navigation wantToConnect={false} userName={userName} />
        <main className="mainUser">
          <UserBanner userName={userName} />
          <h2 className="srOnly">Accounts</h2>
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
