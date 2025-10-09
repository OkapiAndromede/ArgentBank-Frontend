import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logIn } from "../features/auth/authThunks";

export default function useLoginForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //Etats internes du formulaire
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  //Soumission du formulaire
  async function handleSubmit(event) {
    event.preventDefault();

    try {
      const resultAction = await dispatch(logIn({ email, password }));
      if (logIn.fulfilled.match(resultAction)) {
        //Connexion réussie
        navigate("/userAccount");
      } else {
        //Connexion echoué
        console.log("Erreur de connexion :", resultAction.payload);
      }
    } catch (err) {
      console.error("Erreur inattendue:", err);
    }
  }

  //le hook expose uniquement ce dont le composant a besoin
  return {
    email,
    password,
    setEmail,
    setPassword,
    handleSubmit,
  };
}
