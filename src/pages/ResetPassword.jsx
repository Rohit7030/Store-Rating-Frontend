import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import toast from "react-hot-toast";

export default function ResetPassword() {
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const navigate = useNavigate();
  const email = localStorage.getItem("resetEmail");
  const otp = localStorage.getItem("otp");

  const handleReset = async (e) => {
    e.preventDefault();
    if (password !== confirm) return toast.error("Passwords do not match");

    try {
      await api.post("/auth/reset-password", { email, otp, newPassword: password });
      toast.success("Password reset successful");
      localStorage.removeItem("resetEmail");
      localStorage.removeItem("otp");
      navigate("/login");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to reset password");
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 mt-10 bg-blue-100 rounded shadow">
      <h2 className="text-xl font-bold mb-4 text-center">Reset Password</h2>
      <form onSubmit={handleReset} className="space-y-4">
        <input
          type="password"
          placeholder="New Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border p-2 rounded"
          required
        />
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
          className="w-full border p-2 rounded"
          required
        />
        <button className="w-full bg-purple-600 text-white py-2 rounded">
          Reset Password
        </button>
      </form>
    </div>
  );
}
