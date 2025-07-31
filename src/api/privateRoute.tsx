import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../auth/useAuth";

interface PrivateRouteProps {
  allowedRoles: string[];
}

const privateRoute = ({ allowedRoles }: PrivateRouteProps) => {
  const { user } = useAuth();

  if (user === undefined) {
    return <div className="text-center p-4">Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (!allowedRoles.includes(user.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <Outlet />;
};

export default privateRoute;
