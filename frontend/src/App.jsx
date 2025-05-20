import React, { useEffect, useState } from "react"; // ✅ Add this line
import { Navigate, Route, Routes } from "react-router-dom";
// import { useEffect, useCallback } from "react";
import { Toaster } from "react-hot-toast";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import MainContent from "./pages/admin/MainContent";
import DashboardAdmin from "./components/admin/DashboardAdmin";
import Inventory from "./components/admin/Inventory";
import Sample from "./pages/sample";
import Products from "./components/admin/Products";
import Setting from "./components/admin/Setting";
import Suppliers from "./components/admin/Suppliers";
import Report from "./components/admin/Report";
import Sampleprint from "./components/admin/sampleprint";
import ReportSample from "./components/admin/ReportSample";
import { useAuthStore } from "./store/useAuthStore";
import Loader from "./components/Loader/Loader";
import ForgotPasswordPage from "./components/ForgotPassword";

function App() {
  // const { authUser, checkAuth, isCheckingAuth } = useAuthStore();
  const authUser = useAuthStore((state) => state.authUser);
  const checkAuth = useAuthStore((state) => state.checkAuth);
  const isCheckingAuth = useAuthStore((state) => state.isCheckingAuth);

  useEffect(() => {
    checkAuth();
  }, []);

  if (isCheckingAuth) {
    return <Loader />;
  }

  return (
    <div>
      <Routes>
        <Route
          path="/login"
          element={
            !authUser ? <LoginPage /> : <Navigate to="/dashboard-admin" />
          }
        />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/sample" element={<Sample />} />
        <Route path="/sample1" element={<Sampleprint />} />
        <Route path="/sample2" element={<ReportSample />} />

        {/* Admin */}
        <Route
          path="/dashboard-admin"
          element={authUser ? <MainContent /> : <Navigate to="/login" />}
        >
          <Route index element={<DashboardAdmin />} />
          <Route path="inventory" element={<Inventory />} />
          <Route path="products" element={<Products />} />
          <Route path="settings" element={<Setting />} />
          <Route path="suppliers" element={<Suppliers />} />
          <Route path="report" element={<Report />} />
        </Route>
      </Routes>
      <Toaster />
    </div>
  );
}

export default App;
