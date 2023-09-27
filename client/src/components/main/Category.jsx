import React from "react";

const Category = ({ categories, selectedCategory, onSelectCategory }) => {
  return (
    <div className="px-4 sm:px-8 mb-4">
      <h2 className="text-xl font-semibold mb-4">Category</h2>
      <div className="flex flex-wrap space-x-2 sm:space-x-4 mb-4">
        <button
          onClick={() => onSelectCategory(null)}
          className={`px-3 sm:px-4 py-2 rounded-lg ${
            selectedCategory === null
              ? "bg-blue-500 text-white"
              : "bg-gray-200 text-gray-600"
          }`}
        >
          All Products
        </button>
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => onSelectCategory(category)}
            className={`px-3 sm:px-4 py-2 rounded-lg m-1 ${
              selectedCategory === category
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-600"
            }`}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Category;
