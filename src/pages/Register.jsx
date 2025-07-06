import { useState } from "react";
import api from "../services/api";
import toast from "react-hot-toast";
import { useNavigate, Link } from "react-router-dom";

export default function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    address: "",
    password: "",
  });
  const navigate = useNavigate();

  const validate = () => {
    const { name, email, address, password } = form;
    const emailRegex = /^\S+@\S+\.\S+$/;
    const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,16}$/;

    if (name.length < 20 || name.length > 60) return "Name must be 20-60 chars";
    if (!emailRegex.test(email)) return "Invalid email format";
    if (address.length > 400) return "Address too long";
    if (!passwordRegex.test(password))
      return "Password must be 8–16 chars, 1 uppercase, 1 special char";

    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const error = validate();
    if (error) return toast.error(error);

    try {
      const res = await api.post("/auth/register", form);
      toast.success(res.data.message);
      navigate("/login");
    } catch (err) {
      toast.error(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-4 shadow-lg bg-blue-50 rounded-lg">
      <h2 className="text-xl text-center font-bold mb-4">Register</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {["name", "email", "address", "password"].map((field) => (
          <input
            key={field}
            type={field === "password" ? "password" : "text"}
            placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
            value={form[field]}
            onChange={(e) => setForm({ ...form, [field]: e.target.value })}
            className="w-full border p-2 rounded"
            required
          />
        ))}
        <button className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
          Sign Up
        </button>
        <p className="text-sm text-center mt-1">
          Already have an account?
          <Link to="/login" className="text-blue-600 hover:underline ml-1">
            Login Now
          </Link>
        </p>
      </form>
    </div>
  );
}
