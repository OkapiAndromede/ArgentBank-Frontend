import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
/**
 * Thunk asynchrone gérant la connexion d'un utilisateur.
 *
 * Cette fonction envoie une requête HTTP `POST` au serveur d'authentification afin de valider les identifiants
 * de l'utilisateur. En cas de succès, elle retourne les données de réponse (incluant le token d'authentification).
 * En cas d'échec, elle renvoie une valeur de rejet contenant le message d'erreur approprié.
 *
 * @async
 * @function logIn
 * @param {Object} credentials - Les identifiants de connexion de l'utilisateur.
 * @param {string} credentials.email - L'adresse email de l'utilisateur.
 * @param {string} credentials.password - Le mot de passe de l'utilisateur.
 * @param {Object} thunkAPI - Objet fourni automatiquement par Redux Toolkit.
 * @param {Function} thunkAPI.rejectWithValue - Fonction utilisée pour rejeter la promesse avec une valeur personnalisée.
 *
 * @returns {Promise<Object>} Les données renvoyées par le serveur en cas de succès.
 *
 * @throws {string|Object} Message ou objet d'erreur en cas d'échec de la requête.
 */
export const logIn = createAsyncThunk(
  "auth/logIn",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "http://localhost:3010/api/v1/user/login",
        {
          email,
          password,
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "erreur serveur");
    }
  }
);
