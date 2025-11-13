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
/**
 * Composant principale de la page user-account
 *
 * En particulier, il assure :
 * 1. Affichage des informations de compte et les soldes financiers de l'utilisateur
 * 2. Gestion de l'accès à la page
 * 3. La reconnexion automatique de l'utilisateur si l'option "Remember Me" est active.
 *
 * ### Logique interne :
 * - **Vérification d’authentification :**
 *   Si l’utilisateur n’est pas connecté et qu’aucun token n’est présent,
 *   il est redirigé vers la page de connexion (`/signIn`).
 * - **Connexion automatique :**
 *   Si l’option “Remember Me” est active, le composant tente de reconnecter
 *   l’utilisateur automatiquement à partir de son email et de son mot de passe stockés.
 * - **Récupération des comptes :**
 *   Les données des comptes (`funds`) sont chargées depuis un fichier local (`/features.json`),
 *   puis formatées via la fonction utilitaire `formatAmount()` avant affichage.
 *
 * ### Données Redux utilisées :
 * - `user.userName` : nom d’utilisateur affiché.
 * - `user.userEmail`, `user.userPassword` : informations nécessaires à la reconnexion automatique.
 * - `auth.isRemember` : état du mode “Remember Me”.
 * - `auth.isAuthenticated` : indique si l’utilisateur est connecté.
 * - `auth.token` : token JWT de session.
 *
 * @returns {JSX.Element|null} Le contenu de la page `UserAccount` si l’utilisateur est authentifié,
 * sinon redirige vers la page de connexion.
 */
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
