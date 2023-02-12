import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    currentUser: null,
    forgetPassword: null,
    data: null,
    isFetching: false,
    error: false,
  },
  reducers: {
    loginStart: (state) => {
      state.isFetching = true;
    },
    loginSuccess: (state, action) => {
      state.isFetching = false;
      state.currentUser = action.payload;
    },
    loginFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    updateStart: (state) => {
      state.isFetching = true;
    },
    updateSuccess: (state, action) => {
      state.isFetching = false;
      state.currentUser = action.payload;
    },
    updateFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    forgotLoginStart: (state) => {
      state.isFetching = true;
    },
    forgotLoginSuccess: (state, action) => {
      state.isFetching = false;
      state.forgetPassword = action.payload;
    },
    forgotLoginFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    processStart: (state) => {
      state.isFetching = true;
    },
    processSuccess: (state, action) => {
      state.isFetching = false;
      state.data = action.payload;
    },
    processFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    logout: (state) => {
      state.isFetching = false;
      state.currentUser = null;
      state.error = false;
    },
  },
});

export const {
  loginStart,
  loginSuccess,
  loginFailure,
  updateStart,
  updateSuccess,
  updateFailure,
  forgotLoginStart,
  forgotLoginSuccess,
  forgotLoginFailure,
  processStart,
  processSuccess,
  processFailure,
  logout,
} = userSlice.actions;
export default userSlice.reducer;
