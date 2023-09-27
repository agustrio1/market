import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const ProductCard = ({ selectedCategory, products }) => {
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    if (selectedCategory) {
      const filtered = products.filter(
        (product) => product.category === selectedCategory
      );
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts(products);
    }
  }, [selectedCategory, products]);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {filteredProducts.map((product) => (
        <Link
          key={product.id}
          to={`/product/${product.id}`}
          className="bg-white shadow-lg rounded-lg overflow-hidden cursor-pointer"
        >
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-48 object-cover"
          />
          <div className="p-4">
            <h2 className="text-gray-800 text-xl font-semibold">
              {product.title}
            </h2>
            <p className="text-gray-600 mt-2">{product.category}</p>
            <p className="text-gray-800 font-bold mt-2">
              ${product.price.toFixed(2)}
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default ProductCard;
