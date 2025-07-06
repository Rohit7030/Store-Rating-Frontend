import { useEffect, useState } from "react";
import api from "../services/api";
import StoreCard from "../components/StoreCard";
import FilterInputs from "../components/FilterInputs";

export default function Stores() {
  const [stores, setStores] = useState([]);
  const [filters, setFilters] = useState({ name: "", address: "" });

  const fetchStores = async () => {
    try {
      const res = await api.get("/ratings/stores", { params: filters });
      setStores(res.data);
    } catch (err) {
      console.error("Error fetching stores:", err);
    }
  };

  useEffect(() => {
    fetchStores();
  }, [filters]);

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Browse Stores</h1>
      <FilterInputs filters={filters} setFilters={setFilters} 
      />
      <div className="grid md:grid-cols-3 gap-4">
        {stores.map((store) => (
          <StoreCard key={store._id} store={store} onRate={fetchStores} />
        ))}
      </div>
    </div>
  );
}
