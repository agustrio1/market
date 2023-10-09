import React, { createContext, useContext, useState, useCallback, useEffect } from "react";

export const CartContext = createContext();

export const useCart = () => {
  return useContext(CartContext);
};

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  //buat local storage
  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  const updateCartAndLocalStorage = (newCart) => {
    setCart(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart));
  };

  const addToCart = useCallback((product) => {
    setCart((prevCart) => {
      const existingProductIndex = prevCart.findIndex((item) => item.id === product.id);
      if (existingProductIndex !== -1) {
        const updatedCart = [...prevCart];
        updatedCart[existingProductIndex].quantity += 1;
        updateCartAndLocalStorage(updatedCart);
        return updatedCart;
      } else {
        const newCart = [...prevCart, { ...product, quantity: 1 }];
        updateCartAndLocalStorage(newCart);
        return newCart;
      }
    });
  }, []);

  const removeFromCart = useCallback((productId) => {
    setCart((prevCart) => {
      const newCart = prevCart.filter((item) => item.id !== productId);
      updateCartAndLocalStorage(newCart);
      return newCart;
    });
  }, []);

  const decrementCartItem = useCallback((productId) => {
    setCart((prevCart) => {
      const newCart = prevCart.map((item) => {
        if (item.id === productId && item.quantity > 1) {
          item.quantity -= 1;
        }
        return item;
      });
      updateCartAndLocalStorage(newCart);
      return newCart;
    });
  }, []);

  const incrementCartItem = useCallback((productId) => {
    setCart((prevCart) => {
      const newCart = prevCart.map((item) => {
        if (item.id === productId) {
          return { ...item, quantity: item.quantity + 1 };
        }
        return item;
      });
      updateCartAndLocalStorage(newCart);
      return newCart;
    });
  }, []);

  const calculateTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        decrementCartItem,
        incrementCartItem,
        calculateTotalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
