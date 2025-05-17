import axios from "axios";
import { LoginUser, RegisterUser } from "./auth.type";

const API_ENDPOINT = import.meta.env.VITE_API_ENDPOINT;
export const registerApiService = async (body: RegisterUser) => {
  try {
    const response = await axios.post(`${API_ENDPOINT}/auth/register`, {
      ...body,
    });
    const data = response?.data;
    if (data) {
      return data;
    }
  } catch (error) {
    console.log("Error in Register API", error);
  }
};

export const loginApiService = async (body: LoginUser) => {
  try {
    const response = await axios.post(`${API_ENDPOINT}/auth/login`, {
      ...body,
    });

    const data = response?.data;

    if (data) {
      return data;
    }
  } catch (error) {
    console.log("Error in Login API", error);
  }
};
