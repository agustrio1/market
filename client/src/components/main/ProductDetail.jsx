import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import fetchProduct from "../../utils/api";
import { useCart } from "../../context/CartContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchProduct();
        const selectedProduct = data.find(
          (product) => product.id === Number(id)
        );

        if (selectedProduct) {
          setProduct(selectedProduct);
        } else {
          console.error(`Product with ID ${id} not found.`);
        }
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    fetchData();
  }, [id]);

  const handleAddToCart = () => {
    addToCart(product);
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-4 pt-32a rounded-lg shadow-lg-bg-white shadow-lg mx-auto max-w-[1200px]">
      <img
        src={product.image}
        alt={product.title}
        className="w-48 h-auto rounded-t-lg md:w-64 md:h-48 lg:w-72 lg:h-auto m-auto"
      />
      <div className="mt-8 p-4">
        <h2 className="text-gray-800 text-xl font-semibold">{product.title}</h2>
        <p className="text-gray-600 mt-2">{product.category}</p>
        <p className="text-gray-800 mt-2">{product.description}</p>
        <p className="text-gray-800 font-bold mt-2">
          ${product.price.toFixed(2)}
        </p>
        <button
        onClick={handleAddToCart}
        className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 transition duration-300 ease-in-out"
      >
        <FontAwesomeIcon icon={faShoppingCart} className="mr-2" />
        Add to Cart
      </button>
      <Link to="/cart" className="text-blue-500 ml-2">View Cart</Link>
      </div>
    </div>
  );
};

export default ProductDetail;
