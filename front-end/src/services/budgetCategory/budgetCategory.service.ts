// import axios from "../api/axiosConfig";

// export const getBudgetCategories = async () => {
//   try {

//     const response = await axios.get("/api/budget-category");

//     const data = response?.data;
//     if (data) {
//       console.log("Budget categories fetched successfully:", data);
//       return data;
//     }
//   } catch (error) {
//     console.error("Error fetching budget categories:", error);
//     throw error;
//   }
// };
import axios from "axios";

export const getBudgetCategories = async () => {
  try {
    const token = localStorage.getItem("authToken");

    const response = await axios.get("/api/budget-category", {
      headers: {
        Authorization: `Bearer ${token}`,
        // You can add custom headers here if needed
      },
    });

    const data = response?.data;
    if (data) {
      // console.log("Budget categories fetched successfully:", data);
      return data;
    }
  } catch (error) {
    console.error("Error fetching budget categories:", error);
    throw error;
  }
};

export const addBudgetCategory = async (category: any) => {
  try {
    const token = localStorage.getItem("authToken");

    const response = await axios.post("/api/budget-category", category, {
      headers: {
        Authorization: `Bearer ${token}`,
        // You can add custom headers here if needed
      },
    });

    const data = response?.data;
    if (data) {
      console.log("Budget category added successfully:", data);
      return data;
    }
  } catch (error) {
    console.error("Error adding budget category:", error);
    throw error;
  }
};

export const updateBudgetCategory = async (category: any) => {
  try {
    const token = localStorage.getItem("authToken");
    console.log(category, "SASAASA");
    const response = await axios.put(
      `/api/budget-category/${category.id}`,
      category,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = response?.data;
    if (data) {
      // console.log("Budget category updated successfully:", data);
      return data;
    }
  } catch (error) {
    console.error("Error updating budget category:", error);
    throw error;
  }
};

export const getBudgetCategoryById = async (id: string) => {
  try {
    const token = localStorage.getItem("authToken");

    const response = await axios.get(`/api/budget-category/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        // You can add custom headers here if needed
      },
    });

    const data = response?.data;
    if (data) {
      // console.log("Budget category fetched successfully:", data);
      return data;
    }
  } catch (error) {
    console.error("Error fetching budget category:", error);
    throw error;
  }
};

export const deleteBudgetCategory = async (id: string) => {
  try {
    const token = localStorage.getItem("authToken");

    const response = await axios.delete(`/api/budget-category/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        // You can add custom headers here if needed
      },
    });

    const data = response?.data;
    if (data) {
      console.log("Budget category deleted successfully:", data);
      return data;
    }
  } catch (error) {
    console.error("Error deleting budget category:", error);
    throw error;
  }
};
