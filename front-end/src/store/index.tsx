// src/app/store.js
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slice/auth/auth.slice";
import budgetReducer from "./slice/budget/budget.slice";
import transactionReducer from "./slice/transaction/transaction.slice";
import { summary } from "./slice/transaction/summary/summary.slice";
const store = configureStore({
  reducer: {
    auth: authReducer,
    budget: budgetReducer,
    transaction: transactionReducer,
    summary: summary,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
