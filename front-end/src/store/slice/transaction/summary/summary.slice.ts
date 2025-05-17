import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  getTotalSummaryThunk,
  getCategoryExpenseThunk,
  getMontlyExpenseThunk,
} from "../../../thunk/transaction/summary/summary.thunk";

interface Summarystate {
  totalSummary: any;
  categoryExpense: any[];
  montlyExpense: any[];
  loading: boolean;
  error: string | null;
}
const intialState: Summarystate = {
  totalSummary: {},
  categoryExpense: [],
  montlyExpense: [],
  loading: false,
  error: null,
};

const summarySlice = createSlice({
  name: "summary",
  initialState: intialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getTotalSummaryThunk.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(
      getTotalSummaryThunk.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.loading = false;

        state.totalSummary = action.payload.data;
      }
    );
    builder.addCase(
      getTotalSummaryThunk.rejected,
      (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
        console.error("Error in Get Total Summary", action.payload);
      }
    );
    // Category Expense
    builder.addCase(getCategoryExpenseThunk.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(
      getCategoryExpenseThunk.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.categoryExpense = action.payload?.data;
      }
    );
    builder.addCase(
      getCategoryExpenseThunk.rejected,
      (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
        console.error("Error in Get Catory expeense slice", action.payload);
      }
    );

    // Monthly Expense
    builder.addCase(getMontlyExpenseThunk.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(
      getMontlyExpenseThunk.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.loading = false;

        state.montlyExpense = [action.payload.data];
      }
    );
    builder.addCase(
      getMontlyExpenseThunk.rejected,
      (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
        console.error("Error in get montly expense slice", action.payload);
      }
    );
  },
});
export const summary = summarySlice.reducer;
