import { createSlice } from "@reduxjs/toolkit";
import { userLogin, userRegister } from "./AuthActions";

const initialState = {
  loading: false,
  Info: null,
  error: null,
  success: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: {
    [userLogin.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [userLogin.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.Info = payload.data;
    },
    [userLogin.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },

    [userRegister.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [userRegister.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.Info = payload.data;
      state.success = true

    }
  },
  [userRegister.rejected]: (state, { payload }) => {
    state.loading = false;
    state.error = payload;
  },
});

export default authSlice.reducer;
