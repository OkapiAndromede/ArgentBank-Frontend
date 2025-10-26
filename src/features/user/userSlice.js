import { createSlice } from "@reduxjs/toolkit";
import { getUserData, putUserData } from "./userThunks";
import { safeGetItem } from "../utils";

const initialState = {
  firstName: safeGetItem("firstName"),
  lastName: safeGetItem("lastName"),
  userName: safeGetItem("userName"),
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
