import axios from "axios";

export const getTransaction = async () => {
  try {
    const token = localStorage.getItem("authToken");
    const response = await axios.get("/api/transaction", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = response?.data;
    if (data) {
      return data;
    } else {
      throw "No data found";
    }
  } catch (error) {
    console.error("Error in fetching Transaction:", error);
    throw error;
  }
};

export const addTransaction = async (transaction: any) => {
  try {
    const token = localStorage.getItem("authToken");
    const response = await axios.post("/api/transaction", transaction, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = response?.data;
    if (data) {
      return data;
    }
  } catch (error) {
    console.error("Error in Adding Transaction:", error);
    throw error;
  }
};

export const updateTransaction = async (transaction: any) => {
  try {
    const token = localStorage.getItem("authToken");
    const response = await axios.put(
      `/api/transaction/${transaction.id}`,
      transaction,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const data = response?.data;
    if (data) {
      return data;
    }
  } catch (error) {
    console.error("Error in updating Transaction:", error);
    throw error;
  }
};

export const getTransactionById = async (id: string) => {
  try {
    const token = localStorage.getItem("authToken");
    console.log(token);
    const response = await axios.get(`/api/transaction/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(response, "Transaction by id response");
    const data = response?.data;
    if (data) {
      return data;
    }
  } catch (error) {
    console.error("Error in Fetching single Transaction:", error);
    throw error;
  }
};

export const deleteTransaction = async (id: string) => {
  try {
    const tooken = localStorage.getItem("authToken");
    const response = await axios.delete(`/api/transaction/${id}`, {
      headers: {
        Authorization: `Bearer ${tooken}`,
      },
    });

    const data = response?.data;
    if (data) {
      return data;
    }
  } catch (error) {
    console.error("Error deleting Transaction:", error);
  }
};
