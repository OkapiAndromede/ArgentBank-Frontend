import { useEffect, useState } from "react";
import Feature from "../components/Feature";
import HeroBanner from "../components/HeroBanner";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import { useDispatch } from "react-redux";
import { logIn } from "../features/auth/authThunks";

function Home() {
  const [features, setFeatures] = useState([]);
  const dispatch = useDispatch();
  useEffect(() => {
    async function fetchData() {
      const response = await fetch("/features.json");
      const data = await response.json();
      setFeatures(data?.features);
    }
    fetchData();
  }, []);
  useEffect(() => {
    const email = localStorage.getItem("email");
    const password = localStorage.getItem("password");
    if (email && password) {
      dispatch(logIn({ email, password }));
    }
  }, [dispatch]);

  return (
    <>
      <Navigation />
      <HeroBanner />
      <section className="features">
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
