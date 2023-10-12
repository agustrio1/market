import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";

const ProductCard = ({ selectedCategory, products }) => {
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [visibleProducts, setVisibleProducts] = useState(5);
  const [isLoading, setIsLoading] = useState(false);
  const containerRef = useRef(null);

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

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 1.0,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !isLoading) {
          setIsLoading(true);
          setTimeout(() => {
            setVisibleProducts((prevVisible) =>
              Math.min(prevVisible + 5, filteredProducts.length)
            );
            setIsLoading(false);
          }, 500);
        }
      });
    }, options);

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, [filteredProducts, isLoading]);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
      {filteredProducts.slice(0, visibleProducts).map((product, index) => (
        <Link
          key={product.id}
          to={`/product/${product.id}`}
          className="bg-white shadow-lg rounded-lg overflow-hidden cursor-pointer transition-transform transform hover:scale-105"
        >
          <img
            src={product.image}
            alt={product.title}
            loading="lazy"
            className="w-auto h-60 m-auto"
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
      {visibleProducts < filteredProducts.length && (
        <div ref={containerRef} className="text-center font-bold my-4"> Loading </div>
      )}
    </div>
  );
};

export default ProductCard;
