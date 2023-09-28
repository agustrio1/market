import React, { useState } from "react";

function SearchBar({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState("");

  const handleChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    onSearch(value);
  };

  return (
    <div className="mb-4 px-16">
      <input
        type="text"
        placeholder="Search products by name"
        value={searchTerm}
        onChange={handleChange}
        className="px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring focus:ring-blue-500"
      />
    </div>
  );
}

export default SearchBar;
