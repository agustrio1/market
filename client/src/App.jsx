import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/header/navbar'

import Home from './pages/Home'
import Cart from './pages/Cart'
import ProductDetail from './components/main/ProductDetail';
import { CartProvider } from './context/CartContext';


function App() {
  return (
    <Router>
      <Navbar />
      <CartProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path='/product/:id' element={<ProductDetail/>} />
      </Routes>
      </CartProvider>
    </Router>
  )
}

export default App