import { createAsyncThunk } from "@reduxjs/toolkit";

import {
  getTransaction,
  addTransaction,
  updateTransaction,
  getTransactionById,
  deleteTransaction,
} from "../../../services/transaction/transaction.service";

export const getTransactionsThunk = createAsyncThunk(
  "transaction/getAll-transaction",
  getTransaction
);

export const addTransactionThunk = createAsyncThunk(
  "transaction/add-transaction",
  addTransaction
);

export const getTransactionByIdThunk = createAsyncThunk(
  "transaction/getById-transaction",
  getTransactionById
);

export const updateTransactionThunk = createAsyncThunk(
  "transaction/update-transaction",
  updateTransaction
);

export const deleteTransactionThunk = createAsyncThunk(
  "transaction/delete-transaction",
  deleteTransaction
);
