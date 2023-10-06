import React, { useState } from "react";

function SearchBar({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState("");

  const handleChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    onSearch(value);
  };

  return (
    <div className="mb-4 px-4 md:px-16 text-center">
      <input
        type="text"
        placeholder="Search products by name"
        value={searchTerm}
        onChange={handleChange}
        className="w-full md:w-1/2 px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring focus:ring-blue-500"
      />
    </div>
  );
}

export default SearchBar;
