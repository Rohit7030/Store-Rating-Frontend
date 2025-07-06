import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import toast from "react-hot-toast";

export default function VerifyOtp() {
  const [otp, setOtp] = useState("");
  const email = localStorage.getItem("resetEmail");
  const navigate = useNavigate();

  const handleVerify = async (e) => {
    e.preventDefault();
    try {
      await api.post("/auth/verify-otp", { email, otp });
      localStorage.setItem("otp", otp);
      toast.success("OTP verified");
      navigate("/reset-password");
    } catch (err) {
      toast.error(err.response?.data?.message || "Invalid OTP");
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 mt-10 bg-blue-100 rounded shadow">
      <h2 className="text-xl font-bold mb-4 text-center">Verify OTP</h2>
      <form onSubmit={handleVerify} className="space-y-4">
        <input
          type="text"
          placeholder="Enter OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          className="w-full border p-2 rounded"
          required
        />
        <button className="w-full bg-green-600 text-white py-2 rounded">
          Verify OTP
        </button>
      </form>
    </div>
  );
}
