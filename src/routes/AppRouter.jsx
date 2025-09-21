import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import SignIn from "../pages/SignIn";
import UserAccount from "../pages/UserAccount";

function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/signIn" element={<SignIn />}></Route>
        <Route path="/userAccount" element={<UserAccount />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;
