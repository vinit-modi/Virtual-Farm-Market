import React from "react";
import { Route, Routes, Router } from "react-router-dom";
import SignInSide from "../pages/Authentication/SignIn";
import SignUp from "../pages/Authentication/SignUp";
import ResetPassword from "../pages/Authentication/ResetPassword";
import ChangePassword from "../pages/Authentication/ChangePassword";
import ForgetPassword from "../pages/Authentication/ForgetPassword";
import Dashboard from "../pages/Dashboard/Dashboard";
import PublicRoute from "../auth/PublicRoute";
import ProtectedRoute from "../auth/ProtectedRoute";

function IndexForRoutes() {
  return (
    <div>
      <Routes>
        <Route
          exact
          path="/login"
          element={
            <PublicRoute>
              <SignInSide />
            </PublicRoute>
          }
        />
        <Route
          exact
          path="/register"
          element={
            <PublicRoute>
              <SignUp />
            </PublicRoute>
          }
        />
        <Route
          exact
          path="/resetpassword"
          element={
            <PublicRoute>
              <ResetPassword />
            </PublicRoute>
          }
        />
        <Route
          exact
          path="/forgetpassword"
          element={
            <PublicRoute>
              <ForgetPassword />
            </PublicRoute>
          }
        />
        <Route
          exact
          path="/changepassword"
          element={
            <ProtectedRoute>
              <ChangePassword />
            </ProtectedRoute>
          }
        />
        <Route
          exact
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default IndexForRoutes;
