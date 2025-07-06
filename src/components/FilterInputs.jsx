import { Search } from "lucide-react";

export default function FilterInputs({ filters, setFilters }) {
  return (
    <div className="flex gap-4 mb-4">
      {/* Name Input */}
      <div className="relative w-1/2">
        <input
          type="text"
          placeholder="Search by name"
          value={filters.name}
          onChange={(e) => setFilters((f) => ({ ...f, name: e.target.value }))}
          className="border-2 p-2 pr-10 rounded w-full"
        />
        <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
      </div>

      {/* Address Input */}
      <div className="relative w-1/2">
        <input
          type="text"
          placeholder="Search by address"
          value={filters.address}
          onChange={(e) => setFilters((f) => ({ ...f, address: e.target.value }))}
          className="border-2 p-2 pr-10 rounded w-full"
        />
        <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
      </div>
    </div>
  );
}
