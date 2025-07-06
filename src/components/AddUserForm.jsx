import { useState } from "react";
import api from "../services/api";
import toast from "react-hot-toast";

export default function AddUserForm({ onClose }) {
  const [form, setForm] = useState({ name: "", email: "", address: "", password: "", role: "user" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/admin/users", form);
      toast.success("User added");
      onClose();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to add user");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      {["name", "email", "address", "password"].map((field) => (
        <input
          key={field}
          type={field === "password" ? "password" : "text"}
          placeholder={field}
          value={form[field]}
          onChange={(e) => setForm({ ...form, [field]: e.target.value })}
          className="border p-2 w-full rounded"
          required
        />
      ))}
      <select
        value={form.role}
        onChange={(e) => setForm({ ...form, role: e.target.value })}
        className="border p-2 w-full rounded"
      >
        <option value="user">User</option>
        <option value="admin">Admin</option>
      </select>
      <div className="flex justify-between">
        <button type="submit" className="bg-green-600 text-white px-4 py-1 rounded">Submit</button>
        <button onClick={onClose} type="button" className="text-red-500">Cancel</button>
      </div>
    </form>
  );
}
