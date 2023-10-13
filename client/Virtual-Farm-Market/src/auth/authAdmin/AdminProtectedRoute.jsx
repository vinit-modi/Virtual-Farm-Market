import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

function AdminProtectedRoute({ children }) {
  const adminReducer = useSelector((state) => state.adminReducer);
  return <>{adminReducer.adminId ? children : <Navigate to="/admin/login" />}</>;
}

export default AdminProtectedRoute;