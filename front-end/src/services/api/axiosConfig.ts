import axios from "axios";

const API_ENDPOINT = import.meta.env.VITE_API_ENDPOINT;
const instance = axios.create({

  // baseURL: "http://13.233.193.236",
  baseURL:`${API_ENDPOINT}`
});

// Attach token to every request
instance.interceptors.request.use((config) => {
  const token = localStorage.getItem("authToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

//  Redirect on 401
instance.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response && err.response.status === 401) {
      localStorage.removeItem("authToken");
      window.location.href = "/login";
    }
    return Promise.reject(err);
  }
);

export default instance;
