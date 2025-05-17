import axios from "../api/axiosConfig";
const API_ENDPOINT = import.meta.env.VITE_API_ENDPOINT;

//  Get Transaction
export const getTransaction = async () => {
  try {
    const response = await axios.get(`${API_ENDPOINT}/transaction`, {});
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

//  Add Transaction
export const addTransaction = async (transaction: any) => {
  try {
    const response = await axios.post(
      `${API_ENDPOINT}/transaction`,
      transaction,
      {}
    );
    const data = response?.data;
    if (data) {
      return data;
    }
  } catch (error) {
    console.error("Error in Adding Transaction:", error);
    throw error;
  }
};

//  Update Transaction
export const updateTransaction = async (transaction: any) => {
  try {
    const response = await axios.put(
      `${API_ENDPOINT}/transaction/${transaction.id}`,
      transaction,
      {}
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

//  Delete Transaction
export const deleteTransaction = async (id: string) => {
  try {
    const response = await axios.delete(
      `${API_ENDPOINT}/transaction/${id}`,
      {}
    );

    const data = response?.data;
    if (data) {
      return data;
    }
  } catch (error) {
    console.error("Error deleting Transaction:", error);
  }
};

//  Get Transaction by Id
export const getTransactionById = async (id: string) => {
  try {
    const response = await axios.get(`${API_ENDPOINT}/transaction/${id}`, {});

    const data = response?.data;
    if (data) {
      return data;
    }
  } catch (error) {
    console.error("Error in Fetching single Transaction:", error);
    throw error;
  }
};
