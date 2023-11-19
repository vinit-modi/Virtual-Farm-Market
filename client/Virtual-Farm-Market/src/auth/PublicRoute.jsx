import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

function PublicRoute({ path, userTypeAllowed, children }) {
  const auth = useSelector((state) => state.auth);
  // return (
  //   <>{auth.token ? <Navigate to="/user/dashboard" /> : children}</>
  // );

  if (auth.token) {
    if (
      (userTypeAllowed === "Customer" && auth.userType === "Customer") ||
      (userTypeAllowed === "Farmer" && auth.userType === "Farmer") ||
      auth.userType === "Farmer" ||
      auth.userType === "Customer"
    ) {
      return auth.userType === "Customer" ? (
        <Navigate to="/user/dashboard" />
      ) : (
        <Navigate to="/farmer/addproduct" />
      );
    }
    return children;
  } else {
    return children;
  }
}

export default PublicRoute;
