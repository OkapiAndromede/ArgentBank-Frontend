import { createSlice } from "@reduxjs/toolkit";
import { logIn } from "./authThunks";

const initialState = {
  token: null,
  isAuthenticated: false,
  isRemember: false,
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
    },
    resetStatus: (state) => {
      state.status = "idle";
      state.error = null;
    },
    rememberUser: (state) => {
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
        state.token = action.payload.token;
        state.isAuthenticated = true;
      })
      .addCase(logIn.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { logOut, resetStatus, rememberUser } = authSlice.actions;
export default authSlice.reducer;
