import { Navigate } from "react-router-dom";

export default function ProtectedRoute({
  children,
  adminOnly = false
}) {
  const token = localStorage.getItem("token");

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  // =============================
  // USER NOT LOGGED IN
  // =============================

  if (!token || !user) {
    return (
      <Navigate
        to="/login"
        replace
      />
    );
  }

  // =============================
  // ADMIN ACCESS REQUIRED
  // =============================

  if (
    adminOnly &&
    user.role !== "ADMIN"
  ) {
    return (
      <Navigate
        to="/dashboard"
        replace
      />
    );
  }

  return children;
}