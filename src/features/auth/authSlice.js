import { createSlice } from "@reduxjs/toolkit";
import { logIn } from "./authThunks";
import { resetUser } from "../user/userSlice";
import { safeGetItem } from "../utils";

const initialState = {
  token: safeGetItem("token"),
  isAuthenticated: false,
  isRemember: safeGetItem("isRemember"),
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
