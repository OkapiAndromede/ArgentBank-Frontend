import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import SignIn from "../pages/SignIn";
import UserAccount from "../pages/UserAccount";
import { ToastContainer, Flip } from "react-toastify";

function AppRouter() {
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        transition={Flip}
      />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/signIn" element={<SignIn />}></Route>
          <Route path="/user-account" element={<UserAccount />}></Route>
          <Route path="*" element={<SignIn />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default AppRouter;
