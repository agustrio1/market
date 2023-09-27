import React, { useState, useEffect } from 'react';
import ProductCard from '../components/main/ProductCard';
import fetchProductCategory from '../utils/category';
import fetchProduct from '../utils/api';
import Category from '../components/main/Category';

function Home() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
  
    fetchProductCategory()
      .then((data) => {
        setCategories(data);
      })
      .catch((error) => {
        console.error('Error fetching categories:', error);
      });
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const productsData = await fetchProduct();
        setProducts(productsData);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchData();
  }, []);

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
  };

  return (
    <div className="pt-16 m:pt-8">
      <Category
        categories={categories}
        selectedCategory={selectedCategory}
        onSelectCategory={handleCategorySelect}
      />
      <ProductCard selectedCategory={selectedCategory} products={products} />
    </div>
  );
}

export default Home;
