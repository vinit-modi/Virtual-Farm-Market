import React from "react";
import { Route, Routes } from "react-router-dom";
import PageNotFound from "../pages/PageNotFound/PageNotFound";
import SignInSide from "../pages/Authentication/SignIn";
import SignUp from "../pages/Authentication/SignUp";
import ResetPassword from "../pages/Authentication/ResetPassword";
import ForgetPassword from "../pages/Authentication/ForgetPassword";
import PublicRoute from "../auth/PublicRoute";
import ConfirmEmail from "../pages/Authentication/ConfirmEmail";
import AdminPublicRoute from "../auth/authAdmin/AdminPublicRoute";
import AdminHeader from "../components/AdminHeader/AdminHeader";
import UserHeader from "../components/UserHeader/UserHeader";
import LandingPage from "../pages/LandingPage/LandingPage";
import { CheckoutProvider } from "../Utils/ContextAPIs/CheckoutContext";
import FarmerRoute from "../pages/Farmers/FarmerRoute";
import SearchInputContext from "../Utils/ContextAPIs/SearchInputContext";

function IndexForRoutes() {
  return (
    <div>
      <Routes>
        {/* LANDING */}
        <Route
          path="/"
          element={
            <PublicRoute>
              <LandingPage />
            </PublicRoute>
          }
        />

        {/* CONFIRMEMAIL */}
        <Route
          path="/confirmemail"
          exact
          element={
            <PublicRoute>
              <ConfirmEmail />
            </PublicRoute>
          }
        />

        {/* Page-NotFound */}
        <Route path="*" element={<PageNotFound />} />

        {/* ADMIN */}
        <Route path="/admin">
          <Route
            exact
            path="login"
            element={
              <AdminPublicRoute>
                <SignInSide />
              </AdminPublicRoute>
            }
          />
          <Route exact path="*" element={<AdminHeader />} />
        </Route>

        {/* FARMER */}
        <Route exact path="/farmer">
          <Route exact path="*" element={<FarmerRoute />} />
        </Route>

        {/* USER */}

        <Route exact path="/user">
          <Route
            exact
            path="login"
            element={
              <PublicRoute>
                <SignInSide />
              </PublicRoute>
            }
          />
          <Route
            exact
            path="register"
            element={
              <PublicRoute>
                <SignUp />
              </PublicRoute>
            }
          />
          <Route
            exact
            path="resetpassword"
            element={
              <PublicRoute userTypeAllowed="Customer" path="user/resetpassword">
                <ResetPassword />
              </PublicRoute>
            }
          />
          <Route
            exact
            path="forgetpassword"
            element={
              <PublicRoute
                userTypeAllowed="Customer"
                path="user/forgetpassword"
              >
                <ForgetPassword />
              </PublicRoute>
            }
          />
          <Route
            exact
            path="*"
            element={
              <CheckoutProvider>
                <SearchInputContext>
                  <UserHeader />
                </SearchInputContext>
              </CheckoutProvider>
            }
          />
        </Route>

        {/* User-Done */}
      </Routes>
    </div>
  );
}

export default IndexForRoutes;
