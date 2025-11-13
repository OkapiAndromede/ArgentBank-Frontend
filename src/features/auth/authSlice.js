import { createSlice } from "@reduxjs/toolkit";
import { logIn } from "./authThunks";
import { resetUser } from "../user/userSlice";
import { safeGetItem } from "../utils";
/**
 * Slice Redux gérant l'état d'authentification de l'utilisateur
 *
 * Cette slice centralise la logique liée à la connexion, la persistance de la connexion et la déconnexion.
 *
 * ### Structure du state:
 * - "token" *(string)* : jeton JWT de l'utilisateur éventuellement stocké dans le localStorage
 * - "isAuthenticated" *(boolean)* : indique si l'utilisateur est actuellement connecté
 * - "isRemember" *(boolean)* : indique si l'utilisateur a activé l'option "Remember Me"
 * - "status" *("idle" | "loading" | "succeeded" | "failed")* : état de la requête d'authentification
 * - "error" *(string | null)* : message d'erreur éventuel lors du login
 *
 * ### Reducers:
 * - "logOut" : Déconnecte l'utilisateur, réinitialise le state et vide le localStorage
 * - "resetStatus" : Réinitialise "status" et "error" à leurs valeurs par défauts
 * - "rememberUser" : Active le mode "Remember Me"
 * - "connectUser" : Marque l'utilisateur comme connecté avec le mode "Remember Me"
 *
 * ### Extra reducers:
 * - "logIn.pending" : Définit le status sur "loading"
 * - "logIn.fulfilled" : Stocke le token, marque l'utilisateur comme connecté et définit le statut sur "succeeded"
 * - "logIn.rejected" : Définit le status sur "failed" et stocke le message d'erreur
 *
 * ### Action exportées:
 * - {@link logOut}
 * - {@link resetStatus}
 * - {@link rememberUser}
 * - {@link connectUser}
 *
 * @module authSlice
 * @see {@link logIn} pour la gestion de la requête asynchrone de la connexion utilisateur.
 * @see {@link resetUser} pour la réinitialisation de l'état utilisateur.
 */
const initialState = {
  token: safeGetItem("token"),
  isAuthenticated: false,
  isRemember: safeGetItem("rememberMe"),
  status: "idle",
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logOut: (state) => {
      state.token = null;
      state.isAuthenticated = false;
      state.isRemember = false;
      state.status = "idle";
      state.error = null;

      localStorage.clear();

      resetUser();
    },
    resetStatus: (state) => {
      state.status = "idle";
      state.error = null;
    },
    rememberUser: (state) => {
      state.isRemember = true;
    },
    connectUser: (state) => {
      state.isAuthenticated = true;
      state.isRemember = true;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(logIn.pending, (state) => {
        state.status = "loading";
      })
      .addCase(logIn.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.token = action.payload.body.token;
        state.isAuthenticated = true;
      })
      .addCase(logIn.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { logOut, resetStatus, rememberUser, connectUser } =
  authSlice.actions;
export default authSlice.reducer;
