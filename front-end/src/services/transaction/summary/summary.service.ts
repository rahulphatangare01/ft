import axios from "axios";

export const getTotalSummary = async () => {
  try {
    const token = localStorage.getItem("authToken");
    const response = await axios.get(`/api/summary/totals`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = response?.data;
    if (data) {
      return data;
    }
  } catch (error) {
    console.error("Error in fetching total summary:", error);
    throw error;
  }
};

export const getCategoryExpense = async () => {
  try {
    const token = localStorage.getItem("authToken");
    const response = await axios.get(`/api/summary/category-expense`, {
      headers: {
        Authorization: `Bearer ${token} `,
      },
    });
    const data = response?.data;
    if (data) {
      return data;
    }
  } catch (error) {
    console.error("Error in fetching category expense:", error);
    throw error;
  }
};

export const getMontlyExpense = async () => {
  try {
    const token = localStorage.getItem("authToken");
    const response = await axios.get("/api/summary/monthly-expense", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = response?.data;
    if (data) {
      return data;
    }
  } catch (error) {
    console.error("Error in fetching montly expense:", error);
    throw error;
  }
};
