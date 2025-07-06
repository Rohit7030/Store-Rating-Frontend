import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Stores from "../pages/Stores";
import AdminDashboard from "../pages/AdminDashboard";
import StoreDashboard from "../pages/StoreDashboard";
import ProtectedRoute from "../layouts/ProtectedRoute";
import ForgotPassword from "../pages/ForgotPassword";
import VerifyOtp from "../pages/VerifyOtp";
import ResetPassword from "../pages/ResetPassword";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Protected Routes */}
      <Route element={<ProtectedRoute roles={["user"]} />}>
        <Route path="/stores" element={<Stores />} />
      </Route>

      <Route element={<ProtectedRoute roles={["admin"]} />}>
        <Route path="/admin" element={<AdminDashboard />} />
      </Route>

      <Route element={<ProtectedRoute roles={["storeOwner"]} />}>
        <Route path="/store-dashboard" element={<StoreDashboard />} />
      </Route>

      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/verify-otp" element={<VerifyOtp />} />
      <Route path="/reset-password" element={<ResetPassword />} />
    </Routes>
  );
}
