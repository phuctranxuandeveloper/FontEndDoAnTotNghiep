import React from "react";
import { useAuth } from "./hooks/AuthProvider";
import { Navigate, Outlet } from "react-router-dom";

export const PrivateRoute = () => {
  const user = useAuth();
  if (!user.token) return <Navigate to={`/login`} />;
  return <Outlet />;
};
