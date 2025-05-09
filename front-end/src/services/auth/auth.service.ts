import axios from "axios";
import { LoginUser, RegisterUser } from "./auth.type";

export const registerApiService = async (body: RegisterUser) => {
  try {
    // Allow cors from the backend. All code is done from the fronted for registration.
    // const response = await axios.post("http://13.233.193.236/api/auth/register", {
    //         ...body
    //     });
    const response = await axios.post("http://13.233.193.236/api/auth/register", {
      ...body,
    });
    // console.log("r-then", response);
    const data = response?.data;
    // console.log("r-try", data);
    if (data) {
      return data;
    }
  } catch (error) {
    console.log("r-catch");
    console.log(error);
  }
};

export const loginApiService = async (body: LoginUser) => {
  try {
    // const response = await axios.post("http://13.233.193.236/api/auth/login", {
    //   ...body,
    // });
    const response = await axios.post("http://13.233.193.236/api/auth/login", { 
      ...body,
    }, {
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
    });
    // console.log("login-response", response);
    const data = response?.data;
    // console.log("login-response-res", data);
    if (data) {
      return data;
    }
  } catch (error) {
    console.log("login-error:", error);
    console.log(error);
  }
};
