import axios from "../api/axiosConfig";
const API_ENDPOINT = import.meta.env.VITE_API_ENDPOINT;

export const getBudgetCategories = async () => {
  try {
    const response = await axios.get(`${API_ENDPOINT}/budget-category`);
    const data = response?.data;
    if (data) {
      return data;
    }
  } catch (error) {
    console.error("Error fetching budget categories:", error);
    throw error;
  }
};

//  Add  BudgetCategory
export const addBudgetCategory = async (category: any) => {
  try {
    const response = await axios.post(
      `${API_ENDPOINT}/budget-category`,
      category,
      {}
    );
    const data = response?.data;
    if (data) {
      return data;
    }
  } catch (error) {
    console.error("Error adding budget category:", error);
    throw error;
  }
};

//  Update BudgetCategory
export const updateBudgetCategory = async (category: any) => {
  try {
    const response = await axios.put(
      `${API_ENDPOINT}/budget-category/${category.id}`,
      category,
      {}
    );

    const data = response?.data;
    if (data) {
      return data;
    }
  } catch (error) {
    console.error("Error updating budget category:", error);
    throw error;
  }
};

//  Get By Id BudgetCategory

export const getBudgetCategoryById = async (id: string) => {
  try {
    const response = await axios.get(
      `${API_ENDPOINT}/budget-category/${id}`,
      {}
    );

    const data = response?.data;
    if (data) {
      return data;
    }
  } catch (error) {
    console.error("Error fetching budget category:", error);
    throw error;
  }
};

//  Delete BudgetCategory

export const deleteBudgetCategory = async (id: string) => {
  try {
    const response = await axios.delete(
      `${API_ENDPOINT}/budget-category/${id}`,
      {}
    );

    const data = response?.data;
    if (data) {
      return data;
    }
  } catch (error) {
    console.error("Error deleting budget category:", error);
    throw error;
  }
};
