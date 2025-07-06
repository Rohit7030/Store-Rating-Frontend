import { useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/auth/login", form);
      const user = res.data.user;

      // Save user info
      localStorage.setItem("user", JSON.stringify(user));
      toast.success("Login successful");

      // ✅ Redirect based on role
      if (user.role === "admin") {
        navigate("/admin");
        window.location.reload();
      }
      else if (user.role === "storeOwner") {
        navigate("/store-dashboard");
        window.location.reload();
      } else if (user.role === "user") {
        navigate("/stores");
        // ✅ Optional fix for stale context
        window.location.reload();
      } else {
        toast.error("Unknown role: " + user.role);
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="max-w-md mx-auto justify-items-center mt-20 p-4 shadow bg-blue-50 rounded">
      <h2 className="text-xl font-bold mb-4">Login</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className="w-full border p-2 rounded"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          className="w-full border p-2 rounded"
          required
        />
         <p className="text-sm text-right mt-1">
          <Link to="/forgot-password" className="text-blue-600 hover:underline">
            Forgot your Password?
          </Link>
        </p>
      
        <button className="w-full bg-blue-600 text-white py-2 rounded">
          Log In
        </button>
       

        <p className="text-sm text-center mt-1">
          Not registred?
          <Link to="/register" className="text-blue-600 hover:underline ml-1">
            Create an account!
          </Link>
        </p>
      </form>
    </div>
  );
}
