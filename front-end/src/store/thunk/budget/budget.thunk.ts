import { createAsyncThunk } from "@reduxjs/toolkit";

import {
  getBudgetCategories,
  addBudgetCategory,
  deleteBudgetCategory,
  updateBudgetCategory,
  getBudgetCategoryById,
} from "../../../services/budgetCategory/budgetCategory.service";

// export const getBudgetCategoriesThunk = createAsyncThunk(
//   "budget/getBudgetCategories",
//   async () => {
//     try {
//       const data = await getBudgetCategories;
//       return data;
//     } catch (error) {
//       console.error("Error fetching budget categories:", error);
//       throw error;
//     }
//   }
// );

// export const addBudgetCategoryThunk = createAsyncThunk(
//   "budget/addBudgetCategory",
//   async (category: any) => {
//     try {
//       const data = await addBudgetCategory(category);
//       return data;
//     } catch (error) {
//       console.error("Error adding budget category:", error);
//       throw error;
//     }
//   }
// );

// export const  deleteBudgetCategoryThunk = createAsyncThunk(
//   "budget/deleteBudgetCategory",

//   async (id: string) => {
//     try {
//       const data = await deleteBudgetCategory(id);
//       return data;
//     } catch (error) {
//       console.error("Error deleting budget category:", error);
//       throw error;
//     }
//   }
// )

// export const updateBudgetCategoryThunk = createAsyncThunk(
//   "budget/updateBudgetCategory",
//   async (category: any) => {
//     try {
//       const data = await addBudgetCategory(category);
//       console.log("Budget category updated successfully:", data);
//       return data;
//     } catch (error) {
//       console.error("Error updating budget category:", error);
//       throw error;
//     }
//   }
// );
export const getBudgetCategoriesThunk = createAsyncThunk(
  "budget/getBudgetCategories",
  getBudgetCategories
);

export const addBudgetCategoryThunk = createAsyncThunk(
  "budget/addBudgetCategory",
  addBudgetCategory
);
export const deleteBudgetCategoryThunk = createAsyncThunk(
  "budget/deleteBudgetCategory",
  deleteBudgetCategory
);

export const updateBudgetCategoryThunk = createAsyncThunk(
  "budget/updateBudgetCategory",
  updateBudgetCategory
);
export const getBudgetCategoryByIdThunk = createAsyncThunk(
  "budget/getBudgetCategoryById",
  getBudgetCategoryById
);
