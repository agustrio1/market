import React, { createContext, useContext, useState, useCallback, useEffect } from "react";

const CartContext = createContext();

export const useCart = () => {
  return useContext(CartContext);
};

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const addToCart = useCallback((product) => {
    setCart((prevCart) => {
      const existingProductIndex = prevCart.findIndex((item) => item.id === product.id);
      if (existingProductIndex !== -1) {
        const updatedCart = [...prevCart];
        updatedCart[existingProductIndex].quantity += 1;
        return updatedCart;
      } else {
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
  }, []);

  const removeFromCart = useCallback((productId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
  }, []);

  const decrementCartItem = useCallback((productId) => {
    setCart((prevCart) => {
      return prevCart.map((item) => {
        if (item.id === productId && item.quantity > 1) {
          item.quantity -= 1;
        }
        return item;
      });
    });
  }, []);

  const incrementCartItem = useCallback((productId) => {
    setCart((prevCart) => {
      return prevCart.map((item) => {
        if (item.id === productId) {
          item.quantity += 1;
        }
        return item;
      });
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
