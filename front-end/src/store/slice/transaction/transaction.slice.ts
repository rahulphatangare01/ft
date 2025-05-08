import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  addTransactionThunk,
  deleteTransactionThunk,
  getTransactionsThunk,
  updateTransactionThunk,
} from "../../thunk/transaction/transaction.thunk";

interface TransactionState {
  transaction: any[];
  loading: boolean;
  error: string | null;
}

const initialState: TransactionState = {
  transaction: [],
  loading: false,
  error: null,
};

const transactionSlice = createSlice({
  name: "transaction",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getTransactionsThunk.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(
      getTransactionsThunk.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.transaction = action.payload;
      }
    );
    builder.addCase(
      getTransactionsThunk.rejected,
      (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      }
    );

    //  Add Transaction
    builder.addCase(addTransactionThunk.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(
      addTransactionThunk.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.transaction = [...state.transaction, action.payload];
      }
    );
    builder.addCase(
      addTransactionThunk.rejected,
      (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
        console.log("AddTransation Thunk reducer rejected", action.payload);
      }
    );
    //    update Transaction

    builder.addCase(updateTransactionThunk.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(
      updateTransactionThunk.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.loading = false;
        const index = state.transaction.findIndex(
          (trans) => trans._id === action.payload.id
        );
        if (index !== -1) {
          state.transaction[index] = action.payload;
        }
      }
    );
    builder.addCase(
      updateTransactionThunk.rejected,
      (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
        console.log("update transaction thunk Reducer", action.payload);
      }
    );

    //   delete traaction
    builder.addCase(deleteTransactionThunk.pending, (state) => {
      state.error = null;
      state.loading = true;
    });
    builder.addCase(
      deleteTransactionThunk.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.transaction = state.transaction.filter(
          (trans) => trans._id !== action.payload._id
        );
      }
    );
    builder.addCase(
      deleteTransactionThunk.rejected,
      (state, action: PayloadAction<any>) => {
        state.loading = true;
        state.error = action.payload;
        console.log("Delete transaction thunk reducer", action.payload);
      }
    );
  },
});

export default transactionSlice.reducer;
