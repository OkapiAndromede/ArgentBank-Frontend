import { createSlice } from "@reduxjs/toolkit";
import { getUserData, putUserData } from "./userThunks";
import { safeGetItem } from "../utils";
/**
 * Slice Redux gérant l'état de l'utilisateur
 *
 * Cette slice centralise la logique liée à l'obtention des données utilisateur, leur persistance et leur modification.
 *
 * ### Structure du state:
 * - "firstName" *(string)* : prénom de l'utilisateur éventuellement stocké dans le localStorage
 * - "lastName" *(string)* : nom de l'utilisateur éventuellement stocké dans le localStorage
 * - "userName" *(string)* : pseudo de l'utilisateur éventuellement stocké dans le localStorage
 * - "userEmail" *(string)* : email de l'utilisateur éventuellement stocké dans le localStorage
 * - "userPassword" *(string)* : mot de passe de l'utilisateur éventuellement stocké dans le localStorage
 * - "getStatus" *("idle" | "loading" | "succeeded" | "failed")* : état de la requête d'obtention des données utilisateur
 * - "putStatus" *("idle" | "loading" | "succeeded" | "failed")* : état de la requête d'envoi de données utilisateur
 *
 * ### Reducers:
 * - "resetUser" : réinitialise entièrement le state utilisateur
 *
 * ### Extra reducers:
 * #### Requête GET USER DATA :
 * - "getUserData.pending" : Définit "getStatus" sur loading
 * - "getUserData.fulfilled" : Stocke le prénom, le nom de famille, le pseudo de l'utilisateur et définit "getStatus" sur "succeeded"
 * - "getUserData.rejected" : Définit "getStatus" sur "failed" et stocke le message d'erreur
 * #### Requête PUT USER DATA :
 * - "putUserData.pending" : Définit "putStatus" sur loading
 * - "putUserData.fulfilled" : Stocke le pseudo de l'utilisateur et définit "putStatus" sur "succeeded"
 * - "putUserData.rejected" : Définit "putStatus" sur "failed" et stocke le message d'erreur
 *
 * ### Action exportées:
 * - {@link resetUser}
 *
 * @module userSlice
 * @see {@link getUserData} pour la gestion de la requête asynchrone de l'obtention des données utilisateur.
 * @see {@link putUserData} pour la gestion de la requête asynchrone de de mise à jour des données utilisateur.
 */
const initialState = {
  firstName: safeGetItem("firstName"),
  lastName: safeGetItem("lastName"),
  userName: safeGetItem("userName"),
  userEmail: safeGetItem("email"),
  userPassword: safeGetItem("password"),
  getStatus: "idle",
  putStatus: "idle",
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    resetUser: (state) => {
      state.firstName = "";
      state.lastName = "";
      state.userName = "";
      state.userEmail = "";
      state.userPassword = "";
      state.getStatus = "idle";
      state.putStatus = "idle";
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      //----- GET USER DATA -----
      .addCase(getUserData.pending, (state) => {
        state.getStatus = "loading";
      })
      .addCase(getUserData.fulfilled, (state, action) => {
        state.getStatus = "succeeded";
        state.firstName = action.payload.body.firstName;
        state.lastName = action.payload.body.lastName;
        state.userName = action.payload.body.userName;
      })
      .addCase(getUserData.rejected, (state, action) => {
        state.getStatus = "failed";
        state.error = action.payload;
      })
      //----- PUT USER DATA -----
      .addCase(putUserData.pending, (state) => {
        state.putStatus = "loading";
      })
      .addCase(putUserData.fulfilled, (state, action) => {
        state.putStatus = "succeeded";
        state.userName = action.payload.body.userName;
      })
      .addCase(putUserData.rejected, (state, action) => {
        state.putStatus = "failed";
        state.error = action.payload;
      });
  },
});
export const { resetUser } = userSlice.actions;
export default userSlice.reducer;
