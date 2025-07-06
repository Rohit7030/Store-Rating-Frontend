import { useState } from "react";
import api from "../services/api";
import toast from "react-hot-toast";
import StoreImage from "../assets/StoreImage.jpg";
import StarRating from "./StarRating";

export default function StoreCard({ store, onRate }) {
  const [score, setScore] = useState(store.userRating || 0);
  const isRated = store.userRating != null;

  const handleRating = async () => {
    if (score < 1 || score > 5) return toast.error("Rating must be between 1–5");

    try {
      if (isRated) {
        await api.put(`/ratings/${store._id}`, { score });
        toast.success("Rating updated");
      } else {
        await api.post("/ratings", { storeId: store._id, score });
        toast.success("Rating submitted");
      }
      onRate(); // Refresh list
    } catch (err) {
      toast.error(err.response?.data?.message || "Rating failed");
    }
  };

  return (
    <div className="border-2 rounded-lg p-4 bg-white shadow-md">
      <img
        src={StoreImage}
        alt="Store"
        className="w-full border-1 object-cover rounded-xl mb-2"
      />

      <h2 className="text-lg font-bold">{store.name}</h2>
      <p className="text-sm text-gray-600">{store.address}</p>

      <div className="flex text-sm">
        <p className="mt-2">Overall Rating ({store.avgRating || "0"})</p>
        <div className="mt-1 ml-2">
          <StarRating score={store.avgRating} />
        </div>
      </div>

      <div className="flex mt-1 items-center gap-2">
        <p className="text-sm font-medium">Your Rating :</p>
        <StarRating score={score} clickable onChange={setScore} />
        <button
          onClick={handleRating}
          className="ml-2 bg-blue-500 text-white text-sm px-3 py-1 rounded hover:bg-blue-600"
        >
          {isRated ? "Update Rating" : "Submit Rating"}
        </button>
      </div>
    </div>
  );
}
