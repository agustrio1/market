import React, { useState, useEffect } from "react";
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
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      {isAuthenticated ? (
        <Route path="/cart/*" element={<Cart />} />
      ) : (
        <Route path="/cart/*" element={<Navigate to={"/login"} replace />} />
      )}
      <Route path="/product/:id" element={<ProductDetail />} />
      {isAuthenticated ? (
        <Route path="/checkout" element={<Checkout />} />
      ) : (
        <Route path="/checkout/*" element={<Navigate to={"/login"} replace />} />
      )}
      <Route
        path="/login"
        element={isAuthenticated ? <Navigate to="/" replace /> : <Login />}
      />
      <Route
        path="/register"
        element={isAuthenticated ? <Navigate to="/" replace /> : <Register />}
      />
      <Route path="/profile" element={<Profile />} />
    </Routes>
  );
};

export default AppRoutes;
