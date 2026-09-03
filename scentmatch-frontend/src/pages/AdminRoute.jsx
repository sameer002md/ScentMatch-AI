import { Navigate } from "react-router-dom";

export default function AdminRoute({ children }) {

  const userData = localStorage.getItem("user");

  if (!userData) {

    return (
      <Navigate
        to="/login"
        replace
      />
    );

  }

  const user = JSON.parse(userData);

  if (user.role !== "ADMIN") {

    return (
      <Navigate
        to="/dashboard"
        replace
      />
    );

  }

  return children;

}