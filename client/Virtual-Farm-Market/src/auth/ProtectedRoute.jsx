import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ userTypeAllowed, children }) {
  const auth = useSelector((state) => state.auth);
  // return <>{auth.token ? children : <Navigate to="/user/login" />}</>;

  if (!auth.token) {
    return <Navigate to="/user/login" />;
  }

  const allowed =
    (userTypeAllowed === "Customer" && auth.userType === "Customer") ||
    (userTypeAllowed === "Farmer" && auth.userType === "Farmer")

  return allowed ? children : <Navigate to="/user/login" />;
}

export default ProtectedRoute;
