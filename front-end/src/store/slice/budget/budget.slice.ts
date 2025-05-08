import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  getBudgetCategoriesThunk,
  addBudgetCategoryThunk,
  deleteBudgetCategoryThunk,
  updateBudgetCategoryThunk,
} from "../../thunk/budget/budget.thunk";

interface BudgetState {
  budgetCategories: any[]; // Replace 'any[]' with the appropriate type if known
  loading: boolean;
  error: string | null;
}

const initialState: BudgetState = {
  budgetCategories: [],
  loading: false,
  error: null,
};

const budgetSlice = createSlice({
  name: "budget",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getBudgetCategoriesThunk.pending, (state) => {
      // console.log(
      //   "getBudgetCategoriesThunk reducer-pending:--->",
      //   action.payload
      // );
      state.loading = true;
      state.error = null;
    });
    builder.addCase(
      getBudgetCategoriesThunk.fulfilled,
      (state, action: PayloadAction<any>) => {
        console.log(
          "getBudgetCategoriesThunk reducer-fulfilled:--->",
          action.payload
        );
        state.loading = false;
        state.budgetCategories = action.payload;
      }
    );
    builder.addCase(
      getBudgetCategoriesThunk.rejected,
      (state, action: PayloadAction<any>) => {
        console.log(
          "getBudgetCategoriesThunk reducer-rejected:--->",
          action.payload
        );
        state.loading = false;
        state.error = action.payload;
      }
    );
    builder.addCase(addBudgetCategoryThunk.pending, (state) => {
      // console.log(
      //   "addBudgetCategoryThunk reducer-pending:--->",
      //   action.payload
      // );
      state.loading = true;
      state.error = null;
    });
    builder.addCase(
      addBudgetCategoryThunk.fulfilled,
      (state, action: PayloadAction<any>) => {
        // console.log(
        //   "addBudgetCategoryThunk reducer-fulfilled:--->",
        //   action.payload
        // );
        state.loading = false;
        state.budgetCategories = [...state.budgetCategories, action.payload];
      }
    );
    builder.addCase(
      addBudgetCategoryThunk.rejected,
      (state, action: PayloadAction<any>) => {
        console.log(
          "addBudgetCategoryThunk reducer-rejected:--->",
          action.payload
        );
        state.loading = false;
        state.error = action.payload;
      }
    );

    //  delete budget category
    builder.addCase(deleteBudgetCategoryThunk.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(
      deleteBudgetCategoryThunk.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.budgetCategories = state.budgetCategories.filter(
          (category) => category._id !== action.payload._id
        );
      }
    );
    builder.addCase(
      deleteBudgetCategoryThunk.rejected,
      (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      }
    );

    //  update budget category

    builder.addCase(updateBudgetCategoryThunk.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(
      updateBudgetCategoryThunk.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.loading = false;
        const index = state.budgetCategories.findIndex(
          (category) => category._id === action.payload._id
        );
        if (index !== -1) {
          state.budgetCategories[index] = action.payload;
        }
      }
    );
    builder.addCase(
      updateBudgetCategoryThunk.rejected,
      (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
        console.log("updateBudgetCategoryThunk rejected:", action.payload);
      }
    );
  },
});

export default budgetSlice.reducer;
