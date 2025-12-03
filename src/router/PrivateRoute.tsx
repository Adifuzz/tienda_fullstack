import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/auth/context/AuthContext";

export const PrivateRoute = () => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <Outlet /> : <Navigate to="/auth/login" />;
};