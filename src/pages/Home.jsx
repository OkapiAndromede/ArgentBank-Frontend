import { useEffect, useState } from "react";
import Feature from "../components/Feature";
import HeroBanner from "../components/HeroBanner";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";

function Home() {
  const [features, setFeatures] = useState([]);
  useEffect(() => {
    async function fetchData() {
      const response = await fetch("/features.json");
      const data = await response.json();
      setFeatures(data?.features);
    }
    fetchData();
  }, []);

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
