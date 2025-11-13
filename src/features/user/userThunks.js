import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

/**
 * Thunk asynchrone gérant l'obtention des données utilisateur
 *
 * Cette fonction envoie une requète HTTP `GET` au serveur afin d'obtenir
 * les données de l'utilisateur. En cas de succès, elle retourne les données de réponse.
 * En cas d'échec, elle renvoie une valeur de rejet contenant le message d'erreur approprié.
 *
 * @async
 * @function getUserData
 * @param {void} _ - Aucun paramètre n'est nécessaire pour cette requête.
 * @param {Object} thunkAPI - Objet fourni automatiquement par Redux Toolkit.
 * @param {Function} thunkAPI.getState - Fonction permettant d'accéder au state global Redux.
 * Utilisée ici pour récupérer le token d'authentification depuis `state.auth.token`.
 * @param {Function} thunkAPI.rejectWithValue - Fonction utilisée pour rejeter la promesse avec une valeur personnalisée.
 *
 * @returns {Promise<Object>} Les données renvoyées par le serveur en cas de succès.
 *
 * @throws {string|Object} Message ou objet d'erreur en cas d'échec de la requête.
 */
export const getUserData = createAsyncThunk(
  "user/getUserData",
  async (_, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth.token;
      const response = await axios.get(
        "http://localhost:3010/api/v1/user/profile",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "erreur serveur");
    }
  }
);
/**
 * Thunk asynchrone gérant la mise à jour des données utilisateur
 *
 * Cette fonction envoie une requète HTTP `POST` au serveur afin de mettre à jour
 * les données de l'utilisateur. En cas de succès, elle retourne le nouveau pseudo de l'utilisateur.
 * En cas d'échec, elle renvoie une valeur de rejet contenant le message d'erreur approprié.
 *
 * @async
 * @function putUserData
 * @param {Object} input - Les données de l'utilisateur à mettre à jour.
 * @param {string} input.userName - Le nouveau pseudo de l'utilisateur
 * @param {Object} thunkAPI - Objet fourni automatiquement par Redux Toolkit.
 * @param {Function} thunkAPI.getState - Fonction permettant d'accéder au state global Redux.
 * Utilisée ici pour récupérer le token d'authentification depuis `state.auth.token`.
 * @param {Function} thunkAPI.rejectWithValue - Fonction utilisée pour rejeter la promesse avec une valeur personnalisée.
 *
 * @returns {Promise<Object>} Les données renvoyées par le serveur en cas de succès.
 *
 * @throws {string|Object} Message ou objet d'erreur en cas d'échec de la requête.
 */
export const putUserData = createAsyncThunk(
  "user/putUserData",
  async ({ userName }, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth.token;
      const response = await axios.put(
        "http://localhost:3010/api/v1/user/profile",
        { userName },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "erreur serveur");
    }
  }
);
