import { useEffect, useState } from "react";
import api from "../services/api";
import StoreImage from "../assets/StoreImage.jpg";

export default function StoreDashboard() {
  const [stores, setStores] = useState([]);
  const [selectedStore, setSelectedStore] = useState(null);
  const [avgRating, setAvgRating] = useState(null);
  const [ratings, setRatings] = useState([]);

  const fetchStores = async () => {
    try {
      const res = await api.get("/store-owner/stores");
      setStores(res.data);
    } catch (err) {
      console.error("Failed to fetch stores:", err);
    }
  };

  const fetchRatings = async (storeId) => {
    try {
      const res = await api.get(`/store-owner/stores/${storeId}/ratings`);
      setSelectedStore(res.data.store);
      setAvgRating(res.data.avgRating);
      setRatings(res.data.ratings);
    } catch (err) {
      console.error("Failed to fetch ratings:", err);
    }
  };

  useEffect(() => {
    fetchStores();
  }, []);

  const renderStars = (score) => {
    if (!score || score === "N/A") return "No rating yet";
    const s = Math.round(score);
    return "⭐".repeat(s) + "☆".repeat(5 - s);
  };

  return (
    <div className="min-h-screen bg-blue-100 py-6 px-4">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">My Stores</h1>

      {/* Store Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-6">
        {stores.length === 0 && <p>No stores assigned yet.</p>}
        {stores.map((store) => (
          <div key={store._id} className="bg-white rounded-xl shadow border-2 p-4">
            <img
              src={StoreImage}
              alt="Store"
              className="w-6xl h-72 border-1 object-cover rounded-xl mb-2"
            />
            <h2 className="text-lg font-semibold text-blue-800">{store.name}</h2>
            <p className="text-sm text-gray-600">{store.address}</p>
            <button
              onClick={() => fetchRatings(store._id)}
              className="mt-1 text-blue-600 underline text-sm"
            >
              View Ratings
            </button>
          </div>
        ))}
      </div>

      {/* Ratings Table */}
      {selectedStore && (
        <div className="mt-8 bg-white p-4 rounded shadow border-2">
          <h2 className="text-xl font-bold mb-2 text-blue-900">{selectedStore}</h2>
          <p className="mb-2 text-gray-700">
            Avg Rating: <strong>{avgRating}</strong> {renderStars(avgRating)}
          </p>

          <table className="w-full text-sm table-fixed border-2 mt-2">
            <thead className="bg-blue-300 text-white">
              <tr>
                <th className="px-2 py-2 w-16 text-left">Sr. No.</th>
                <th className="px-4 py-2 w-1/4 text-left">User Name</th>
                <th className="px-4 py-2 w-1/3 text-left">Email</th>
                <th className="px-4 py-2 w-1/6 text-left">Score</th>
              </tr>
            </thead>
            <tbody>
              {ratings.map((r, i) => (
                <tr key={r._id} className="border-2 hover:bg-blue-50">
                  <td className="px-2 py-2">{i + 1}</td>
                  <td className="px-4 py-2">{r.user.name}</td>
                  <td className="px-4 py-2">{r.user.email}</td>
                  <td className="px-4 py-2">{r.score}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
