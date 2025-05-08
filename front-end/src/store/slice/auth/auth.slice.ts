import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { loginThunk, registrationThunk } from "../../thunk/auth/auth.thunk";

const initialState = {
  user: null,
  isAuthenticated: false,
  userData: [],
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(state, action) {
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    logout(state) {
      state.user = null;
      state.isAuthenticated = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      registrationThunk.pending,
      (state, action: PayloadAction<any>) => {
        console.log("registration reducer-pending:--->", action.payload);
        state.loading = true;
        state.error = null;
        state.isAuthenticated = false;
      }
    );

    builder.addCase(
      registrationThunk.fulfilled,
      (state, action: PayloadAction<any>) => {
        console.log("registration reducer-fulfilled:--->", action.payload);

        state.loading = false;
        state.userData = action.payload;
        state.isAuthenticated = true;
      }
    );

    builder.addCase(
      registrationThunk.rejected,
      (state, action: PayloadAction<any>) => {
        console.log("registration reducer-rejected:--->", action.payload);
        state.loading = false;
      }
    );

    //  Login
    builder.addCase(loginThunk.pending, (state) => {
      // console.log("login reducer-pending:--->", action.payload);
      state.loading = true;
      state.error = null;
      state.isAuthenticated = false;
    });

    builder.addCase(
      loginThunk.fulfilled,
      (state, action: PayloadAction<any>) => {
        // console.log("login reducer-fulfilled:--->", action.payload);
        state.loading = false;
        state.userData = action.payload;
        state.isAuthenticated = true;
      }
    );
    builder.addCase(
      loginThunk.rejected,
      (state, action: PayloadAction<any>) => {
        console.log("login reducer-rejected:--->", action.payload);
        state.loading = false;
        state.error = action.payload;
        state.isAuthenticated = false;
      }
    );
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
