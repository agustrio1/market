import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/header/navbar";

import Home from "./pages/Home";
import Cart from "./pages/Cart";
import ProductDetail from "./components/main/ProductDetail";
import { CartProvider } from "./context/CartContext";
import Checkout from "./components/main/Checkout";
import Login from "./pages/accounts/Login";
import Register from "./pages/accounts/Register";
import AuthContextProvider from "./context/AuthContext";
import Profile from "./pages/accounts/Profile";

function App() {
  return (
    <Router>
      <Navbar />
      <AuthContextProvider>

      <CartProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile/>} />
        </Routes>
      </CartProvider>
      </AuthContextProvider>
    </Router>
  );
}

export default App;
