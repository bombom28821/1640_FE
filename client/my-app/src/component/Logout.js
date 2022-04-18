import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../hook/useAuth";

const Logout = () => {
  const location = useLocation();
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  return <Navigate to="/login" state={{ from: location }} replace />;
};

export default Logout;
