import { useEffect, useState } from "react";
import Feature from "../components/Feature";
import HeroBanner from "../components/HeroBanner";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import { useDispatch, useSelector } from "react-redux";
import { connectUser } from "../features/auth/authSlice";
import { logIn } from "../features/auth/authThunks";

/**
 * Composant principal de la page d'accueil
 *
 * En particulier, il assure :
 * 1. Affichage de la barre de navigation, la bannière principale et la liste des qualités de l'entreprise.
 * 2. Récupération dynamique des données des "qualités" depuis un fichier local `features.json`.
 * 3. Gestion d'une connexion automatique de l'utilisateur si l'option "Remember Me" est active.
 *
 * ### Logique interne :
 * - **Récupération des données :** via `fetch("/features.json")`, les qualités sont chargées au montage du composant.
 * - **Connexion automatique :** si `rememberMe`, `userEmail` et `userPassword` sont présents dans le store Redux,
 *   le composant tente de reconnecter automatiquement l’utilisateur en déclenchant le thunk `logIn`.
 *   En cas de succès, l’action `connectUser` est dispatchée pour rétablir l’état d’authentification.
 *
 * ### Éléments Redux utilisés :
 * - `user.userEmail` : email stocké localement.
 * - `user.userPassword` : mot de passe stocké localement.
 * - `auth.isRemember` : indicateur du mode “Remember Me”.
 *
 * @component
 * @returns {JSX.Element} Composant Home rendu
 */
function Home() {
  const [features, setFeatures] = useState([]);
  const dispatch = useDispatch();
  const userEmail = useSelector((state) => state.user.userEmail);
  const userPassword = useSelector((state) => state.user.userPassword);
  const rememberMe = useSelector((state) => state.auth.isRemember);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch("/features.json");
      const data = await response.json();
      setFeatures(data?.features);
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
        }
      } catch (err) {
        console.error("Erreur lors de la connexion automatique : ", err);
      }
    };
    autoLogIn();
  }, [dispatch]);

  return (
    <>
      <Navigation wantToConnect={true} />
      <main>
        <HeroBanner />
        <section className="features">
          <h2 className="srOnly">Features</h2>
          {features?.map((item) => (
            <Feature
              key={item.id}
              imageSrc={item.image}
              imageAlt={item.description}
              title={item.title}
              text={item.content}
            />
          ))}
        </section>
      </main>
      <Footer />
    </>
  );
}
export default Home;
