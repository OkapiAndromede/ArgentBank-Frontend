import { createSlice } from "@reduxjs/toolkit";
import { getUserData } from "./userThunks";

const initialState = {
  firstName: "",
  lastName: "",
  userName: "",
  status: "idle",
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
      state.status = "idle";
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUserData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getUserData.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.firstName = action.payload.body.firstName;
        state.lastName = action.payload.body.lastName;
        state.userName = action.payload.body.userName;
      })
      .addCase(getUserData.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});
export const { resetUser } = userSlice.actions;
export default userSlice.reducer;
