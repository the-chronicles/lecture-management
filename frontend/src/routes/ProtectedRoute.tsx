import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import type { JSX } from "react";

interface Props {
  children: JSX.Element;
  role: "admin" | "lecturer" | "student";
}

export default function ProtectedRoute({ children, role }: Props) {
  const { user } = useAuth();

  if (!user) return <Navigate to="/login" replace />;

  if (user.role !== role)
    return <Navigate to={`/${user.role}/dashboard`} replace />;

  return children;
}
