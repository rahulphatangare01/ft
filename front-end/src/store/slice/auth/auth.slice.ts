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
    builder.addCase(registrationThunk.pending, (state) => {
      state.loading = true;
      state.error = null;
      state.isAuthenticated = false;
    });

    builder.addCase(
      registrationThunk.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.userData = action.payload;
        state.isAuthenticated = true;
      }
    );

    builder.addCase(
      registrationThunk.rejected,
      (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
        console.error("Error in Register slice", action.payload);
      }
    );

    //  Login
    builder.addCase(loginThunk.pending, (state) => {
      state.loading = true;
      state.error = null;
      state.isAuthenticated = false;
    });

    builder.addCase(
      loginThunk.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.userData = action.payload;
        state.isAuthenticated = true;
      }
    );
    builder.addCase(
      loginThunk.rejected,
      (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
        console.error("Error in Login slice", action.payload);
        state.isAuthenticated = false;
      }
    );
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
