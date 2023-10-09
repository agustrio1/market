import React, {useState, useEffect} from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Cart from "../pages/Cart";
import ProductDetail from "../components/main/ProductDetail";
import Checkout from "../components/main/Checkout";
import Register from "../pages/accounts/Register";
import Login from "../pages/accounts/Login";
import Profile from "../pages/accounts/Profile";
import { auth } from "../firebase";

const AppRoutes = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    const unsubcribe = auth
    .onAuthStateChanged(user => {
      setIsAuthenticated(!!user)
    })

    return () => unsubcribe()
  }, [])

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      {isAuthenticated ? (
        <Route path="/cart/*" element={<Cart />} />
      ) : (
        <Route path="/cart/*" element={
          <Navigate to={'/login'} replace />}
          />
      )}
      <Route path="/product/:id" element={<ProductDetail />} />
      <Route path="/checkout" element={<Checkout />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/profile" element={<Profile />} />
    </Routes>
  );
};

export default AppRoutes;
