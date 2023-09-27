import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import fetchProduct from "../../utils/api";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

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

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-4 rounded-lg shadow-lg-bg-white shadow-lg mx-auto max-w-[1200px]">
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
      </div>
    </div>
  );
};

export default ProductDetail;
