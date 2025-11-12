import { useEffect, useState } from "react";
import Feature from "../components/Feature";
import HeroBanner from "../components/HeroBanner";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import { useDispatch, useSelector } from "react-redux";
import { connectUser } from "../features/auth/authSlice";
import { logIn } from "../features/auth/authThunks";

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
      <Footer />
    </>
  );
}
export default Home;
