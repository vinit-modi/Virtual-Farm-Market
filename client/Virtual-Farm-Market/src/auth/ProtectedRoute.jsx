import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  const auth = useSelector((state) => state.auth);
  return <>{auth.token ? children : <Navigate to="/user/login" />}</>;
}

export default ProtectedRoute;
