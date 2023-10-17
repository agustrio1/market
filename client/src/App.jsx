import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Navbar from "./components/header/navbar";
import Footer from "./components/footer/Footer";
import { CartProvider } from "./context/CartContext";
import AuthContextProvider from "./context/AuthContext";
import AppRoutes from "./routes/AppRoutes";
import { WishlistProvider } from "./context/WishlistContext";

function App() {
  return (
    <Router>
      <Navbar />
      <AuthContextProvider>
        <CartProvider>
          <WishlistProvider>
          <AppRoutes />
          </WishlistProvider>
        </CartProvider>
      </AuthContextProvider>
      <Footer />
    </Router>
  );
}

export default App;
