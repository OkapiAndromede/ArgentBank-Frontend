import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

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
