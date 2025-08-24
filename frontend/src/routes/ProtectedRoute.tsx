import type { JSX } from "react";import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

interface Props {
  children: JSX.Element;
  role: "admin" | "lecturer" | "student";
}

export default function ProtectedRoute({ children, role }: Props) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-lg font-semibold">
        Loading...
      </div>
    );
  }

  if (!user) return <Navigate to="/login" replace />;

  if (user.role !== role) return <Navigate to={`/${user.role}/dashboard`} replace />;

  return children;
}
