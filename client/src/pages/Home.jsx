import React, { useState, useEffect, useContext } from "react";
import ProductCard from "../components/main/ProductCard";
import fetchProductCategory from "../utils/category";
import fetchProduct from "../utils/api";
import Category from "../components/main/Category";
import SearchBar from "../components/main/SearchBar";
import CarouselImg from "../components/main/Carousel";
import { CartContext } from "../context/CartContext";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

function Home() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const { addToCart } = useContext(CartContext);
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleAddToCart = (product) => {
    if (currentUser) {
      addToCart(product);
    } else {
      navigate("/login");
    }
  };

  useEffect(() => {
    fetchProductCategory()
      .then((data) => {
        setCategories(data);
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      });
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const productsData = await fetchProduct();
        setProducts(productsData);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchData();
  }, []);

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

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
  };

  const handleSearch = (value) => {
    setSearchTerm(value);
    const filtered = products.filter((product) =>
      product.title.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredProducts(filtered);
  };

  return (
    <div className="pt-24 m:pt-20">
      <CarouselImg />
      <SearchBar onSearch={handleSearch} />
      <Category
        categories={categories}
        selectedCategory={selectedCategory}
        onSelectCategory={handleCategorySelect}
      />
      <ProductCard
        selectedCategory={selectedCategory}
        products={filteredProducts}
        addToCart={handleAddToCart}
      />
    </div>
  );
}

export default Home;
