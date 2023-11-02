import React from "react";
import { Route, Routes, Router } from "react-router-dom";
import PageNotFound from "../pages/PageNotFound/PageNotFound";
import SignInSide from "../pages/Authentication/SignIn";
import SignUp from "../pages/Authentication/SignUp";
import ResetPassword from "../pages/Authentication/ResetPassword";
import ChangePassword from "../pages/Authentication/ChangePassword";
import ForgetPassword from "../pages/Authentication/ForgetPassword";
import Dashboard from "../pages/Dashboard/Dashboard";
import PublicRoute from "../auth/PublicRoute";
import ProtectedRoute from "../auth/ProtectedRoute";
import UpdateUserProfile from "../pages/UpdateProfile/UpdateUserProfile";
import ConfirmEmail from "../pages/Authentication/ConfirmEmail";
import AdminUserList from "../pages/AdminPages/AdminUserList";
import AdminCategories from "../pages/AdminPages/AdminCategories";
import AdminDashboard from "../pages/AdminPages/AdminDashboard";
import AdminPrivacyPolicy from "../pages/AdminPages/AdminPrivacyPolicy";
import AdminTermsAndCondition from "../pages/AdminPages/AdminTermsAndCondition";
import AdminProtectedRoute from "../auth/authAdmin/AdminProtectedRoute";
import FaqsUser from "../pages/Faqs/FaqsUser";
import TermsAndConditions from "../pages/Cms/TermsAndConditions/TermsAndConditions";
import PrivacyPolicy from "../pages/Cms/PrivacyPolicy/PrivacyPolicy";
import AdminPublicRoute from "../auth/authAdmin/AdminPublicRoute";
import AdminHeader from "../components/AdminHeader/AdminHeader";
import UserHeader from "../components/UserHeader/UserHeader";

function IndexForRoutes() {
  return (
    <div>
      <Routes>
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
        {/* Admin-DONE */}
        
        {/* USER */}
        <Route
          path="/confirmemail"
          exact
          element={
            <PublicRoute>
              <ConfirmEmail />
            </PublicRoute>
          }
        />
        <Route path="/user">
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
              <PublicRoute>
                <ResetPassword />
              </PublicRoute>
            }
          />
          <Route
            exact
            path="forgetpassword"
            element={
              <PublicRoute>
                <ForgetPassword />
              </PublicRoute>
            }
          />
          <Route exact path="*" element={<UserHeader />} />
        </Route>
        {/* User-Done */}
      </Routes>
    </div>
  );
}

export default IndexForRoutes;
