import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

function PublicRoute({ children }) {
  const auth = useSelector((state) => state.auth);
  const token = localStorage.get
  return (
    <>{auth.token ? <Navigate to="/user/dashboard" /> : children}</>
  );
}

export default PublicRoute;
