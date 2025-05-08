import { Navigate } from "react-router-dom";
import { isTokenExpired } from "../utils/tokenUtils";
import { JSX } from "react";

const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  const token = localStorage.getItem("authToken");

  if (!token || isTokenExpired(token)) {
    localStorage.removeItem("authToken");
    return <Navigate to="/login" />;
  }
  return children;
};

export default PrivateRoute;
