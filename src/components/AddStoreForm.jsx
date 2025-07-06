import { useEffect, useState } from "react";
import api from "../services/api";
import toast from "react-hot-toast";

export default function AddStoreForm({ onClose }) {
  const [form, setForm] = useState({ name: "", address: "", ownerId: "" });
  const [owners, setOwners] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const res = await api.get("/admin/users?role=user");
      setOwners(res.data);
    };
    fetchUsers();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/admin/stores", form);
      toast.success("Store added");
      onClose();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to add store");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <input
        type="text"
        placeholder="Store Name"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
        className="border p-2 w-full rounded"
        required
      />
      <input
        type="text"
        placeholder="Address"
        value={form.address}
        onChange={(e) => setForm({ ...form, address: e.target.value })}
        className="border p-2 w-full rounded"
        required
      />
      <select
        value={form.ownerId}
        onChange={(e) => setForm({ ...form, ownerId: e.target.value })}
        className="border p-2 w-full rounded"
      >
        <option value="">No Owner</option>
        {owners.map((o) => (
          <option key={o._id} value={o._id}>{o.name}</option>
        ))}
      </select>
      <div className="flex justify-between">
        <button type="submit" className="bg-blue-600 text-white px-4 py-1 rounded">Submit</button>
        <button onClick={onClose} type="button" className="text-red-500">Cancel</button>
      </div>
    </form>
  );
}
