import { useEffect, useState } from "react";
import { Search } from "lucide-react";
import api from "../services/api";
import AddUserForm from "../components/AddUserForm";
import AddStoreForm from "../components/AddStoreForm";

export default function AdminDashboard() {
  const [stats, setStats] = useState({ totalUsers: 0, totalStores: 0, totalRatings: 0 });
  const [users, setUsers] = useState([]);
  const [stores, setStores] = useState([]);

  const [userFilters, setUserFilters] = useState({ name: "", email: "", role: "", address: "" });
  const [storeFilters, setStoreFilters] = useState({ name: "", address: "" });

  const [showUserModal, setShowUserModal] = useState(false);
  const [showStoreModal, setShowStoreModal] = useState(false);

  const fetchStats = async () => {
    const res = await api.get("/admin/stats");
    setStats(res.data);
  };

  const fetchUsers = async () => {
    const res = await api.get("/admin/users", { params: userFilters });
    setUsers(res.data);
  };

  const fetchStores = async () => {
    const res = await api.get("/admin/stores", { params: storeFilters });
    setStores(res.data);
  };

  useEffect(() => {
    fetchStats();
    fetchUsers();
    fetchStores();
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [userFilters]);

  useEffect(() => {
    fetchStores();
  }, [storeFilters]);

  return (
    <div className="min-h-screen bg-blue-50 py-6 px-4">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Admin Dashboard</h1>

      <div className="mb-6 flex gap-4 justify-center">
        <button onClick={() => setShowUserModal(true)} className="bg-green-600 text-white px-4 py-2 rounded shadow hover:bg-green-800">
          + Add New User
        </button>
        <button onClick={() => setShowStoreModal(true)} className="bg-blue-600 text-white px-4 py-2 rounded shadow hover:bg-blue-800">
          + Add New Store
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {["Total Users", "Total Stores", "Total Ratings"].map((label, idx) => (
          <div key={label} className="p-6 bg-blue-200 rounded shadow border-2 text-center">
            <p className="text-2xl font-bold text-blue-900">{Object.values(stats)[idx]}</p>
            <p className="text-gray-800 mt-1">{label}</p>
          </div>
        ))}
      </div>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-3 text-gray-800">Users Table</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-3 relative">
          {Object.keys(userFilters).map((key) => (
            <div key={key} className="relative">
              <input
                type="text"
                placeholder={`Search ${key} here...`}
                className="border p-2 pr-10 rounded w-full text-sm"
                value={userFilters[key]}
                onChange={(e) => setUserFilters({ ...userFilters, [key]: e.target.value })}
              />
              <Search className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            </div>
          ))}
        </div>
        <div className="overflow-auto rounded shadow border-1 bg-white">
          <table className="w-full text-sm table-fixed border-1">
            <thead className="bg-blue-300 text-white">
              <tr className="text-left">
                <th className="px-2 py-2 w-16 text-center">Sr. No.</th>
                <th className="px-4 py-2 w-1/5">Name</th>
                <th className="px-4 py-2 w-1/4">Email</th>
                <th className="px-4 py-2 w-1/4">Address</th>
                <th className="px-4 py-2 w-1/6">Role</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u, index) => (
                <tr key={u._id} className="border-1 hover:bg-blue-50">
                  <td className="px-2 py-2 font-medium text-center">{index + 1}</td>
                  <td className="px-4 py-2">{u.name}</td>
                  <td className="px-4 py-2">{u.email}</td>
                  <td className="px-4 py-2">{u.address}</td>
                  <td className="px-4 py-2 capitalize">{u.role}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-3 text-gray-800">Stores Table</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-3 relative">
          {Object.keys(storeFilters).map((key) => (
            <div key={key} className="relative">
              <input
                type="text"
                placeholder={`Search ${key} here...`}
                className="border p-2 pr-10 rounded w-full text-sm"
                value={storeFilters[key]}
                onChange={(e) => setStoreFilters({ ...storeFilters, [key]: e.target.value })}
              />
              <Search className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            </div>
          ))}
        </div>
        <div className="overflow-auto rounded shadow border-1 bg-white">
          <table className="w-full text-sm table-fixed border-1">
            <thead className="bg-blue-300 text-white">
              <tr className="text-left">
                <th className="px-2 py-2 w-16 text-center">Sr. No.</th>
                <th className="px-4 py-2 w-1/5">Store Name</th>
                <th className="px-4 py-2 w-1/4">Address</th>
                <th className="px-4 py-2 w-1/4">Owner</th>
                <th className="px-4 py-2 w-1/6 text-center">Avg Rating</th>
              </tr>
            </thead>
            <tbody>
              {stores.map((s, index) => (
                <tr key={s._id} className="border-1 hover:bg-blue-50">
                  <td className="px-2 py-2 font-medium text-center">{index + 1}</td>
                  <td className="px-4 py-2">{s.name}</td>
                  <td className="px-4 py-2">{s.address}</td>
                  <td className="px-4 py-2">{s.owner?.email || "Unassigned"}</td>
                  <td className="px-4 py-2 text-center">{s.avgRating}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {showUserModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-10">
          <div className="bg-white p-6 rounded w-full max-w-md">
            <h2 className="text-lg font-bold mb-2">Add User</h2>
            <AddUserForm onClose={() => { setShowUserModal(false); fetchUsers(); }} />
          </div>
        </div>
      )}

      {showStoreModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-10">
          <div className="bg-white p-6 rounded w-full max-w-md">
            <h2 className="text-lg font-bold mb-2">Add Store</h2>
            <AddStoreForm onClose={() => { setShowStoreModal(false); fetchStores(); fetchUsers(); }} />
          </div>
        </div>
      )}
    </div>
  );
}