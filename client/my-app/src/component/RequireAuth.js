import React, { useEffect } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import useAuth from "../hook/useAuth";

const RequireAuth = ({ allowedRoles }) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const location = useLocation();
  return allowedRoles.includes(user?.role) ? (
    <Outlet />
  ) : user ? (
    <Navigate to="/unauthorized" state={{ from: location }} replace />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default RequireAuth;
