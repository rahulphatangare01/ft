import { createAsyncThunk } from "@reduxjs/toolkit";

import {
  loginApiService,
  registerApiService,
} from "../../../services/auth/auth.service";

export const registrationThunk = createAsyncThunk(
  "user/register",
  registerApiService
);

export const loginThunk = createAsyncThunk("user/login", loginApiService);
