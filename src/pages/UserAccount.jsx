import Account from "../components/Account";
import Button from "../components/Button";
import Navigation from "../components/Navigation";
import UserBanner from "../components/UserBanner";
import Footer from "../components/Footer";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import axios from "axios";
import { formatAmount } from "./utils";
function UserAccount() {
  const userName = useSelector((state) => state.user.userName);
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
  console.log(funds);
  return (
    <>
      <Navigation isConnected={true} userName={userName} />
      <main className="mainUser">
        <UserBanner />
        {funds?.map((item) => (
          <section className="account">
            <Account
              key={item.id}
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

export default UserAccount;
