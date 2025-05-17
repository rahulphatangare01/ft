import axios from "../../api/axiosConfig";
const API_ENDPOINT = import.meta.env.VITE_API_ENDPOINT;

//  Get Total summary
export const getTotalSummary = async () => {
  try {
    const response = await axios.get(`${API_ENDPOINT}/summary/totals`, {});
    const data = response?.data;
    if (data) {
      return data;
    }
  } catch (error) {
    console.error("Error in fetching total summary:", error);
    throw error;
  }
};

//  Get Category Expense
export const getCategoryExpense = async () => {
  try {
    const response = await axios.get(
      `${API_ENDPOINT}/summary/category-expense`,
      {}
    );
    const data = response?.data;
    if (data) {
      return data;
    }
  } catch (error) {
    console.error("Error in fetching category expense:", error);
    throw error;
  }
};

//  Get Montly Expense
export const getMontlyExpense = async () => {
  try {
    const response = await axios.get(
      `${API_ENDPOINT}/summary/monthly-expense`,
      {}
    );
    const data = response?.data;
    if (data) {
      return data;
    }
  } catch (error) {
    console.error("Error in fetching montly expense:", error);
    throw error;
  }
};
