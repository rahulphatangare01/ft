import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  getMontlyExpense,
  getTotalSummary,
  getCategoryExpense,
} from "../../../../services/transaction/summary/summary.service";

export const getTotalSummaryThunk = createAsyncThunk(
  "summary/get-total-summary",
  getTotalSummary
);

export const getCategoryExpenseThunk = createAsyncThunk(
  "summary/get-category-expense",
  getCategoryExpense
);

export const getMontlyExpenseThunk = createAsyncThunk(
  "summary/get-montly-expense",
  getMontlyExpense
);
