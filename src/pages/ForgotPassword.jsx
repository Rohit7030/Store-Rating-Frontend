import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import toast from "react-hot-toast";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/auth/forgot-password", { email });
      toast.success(`OTP sent to email (dev: ${res.data.otp})`, {
        duration: 5000,
      });
      localStorage.setItem("resetEmail", email);
      navigate("/verify-otp");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to send OTP");
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 mt-10 bg-blue-100 rounded shadow">
      <h2 className="text-xl font-bold mb-4 text-center">Forgot Password</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="email"
          placeholder="Enter your registered email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border p-2 rounded"
          required
        />
        <button className="w-full bg-blue-600 text-white py-2 rounded">
          Send OTP
        </button>
      </form>
    </div>
  );
}
