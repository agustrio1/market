import React, { useEffect, useState } from 'react';
import { useCart } from '../context/CartContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Cart = () => {
  const {currentUser} = useAuth();
  const { cart, addToCart, removeFromCart, incrementCartItem, decrementCartItem } = useCart();
  const navigate = useNavigate();

  if (!currentUser) {
    navigate('/login')
  }

  const calculateTotalPrice = () => {
    return cart.reduce((total, product) => total + product.price * product.quantity, 0);
  };

  const handleCheckoutClick = () => {
    navigate('/checkout')
  };

  return (
    <div className="p-4 pt-16 rounded-lg shadow-lg-bg-white shadow-lg mx-auto max-w-[1200px]">
      <h2 className="text-2xl font-semibold mb-4 pt-16">Shopping Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <ul>
            {cart.map((item) => (
              <li key={item.id} className="border-b py-4 flex items-center justify-between">
                <div className="flex items-center">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-16 h-16 rounded-full mr-4"
                  />
                  <div>
                    <h3 className="text-lg">{item.title}</h3>
                    <p className="text-gray-600">Price: ${item.price.toFixed(2)}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <button
                    onClick={() => decrementCartItem(item.id)}
                    className="text-red-500 hover:text-red-700 mr-2"
                  >
                    <FontAwesomeIcon icon={faMinus} />
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    onClick={() => incrementCartItem(item.id)}
                    className="text-green-500 hover:text-green-700 ml-2"
                  >
                    <FontAwesomeIcon icon={faPlus} />
                  </button>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-red-500 hover:text-red-700 ml-2"
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                </div>
              </li>
            ))}
          </ul>
          <div className="mt-8">
            <p className="text-lg font-semibold">Total: ${calculateTotalPrice().toFixed(2)}</p>
            <button
        onClick={handleCheckoutClick}
        className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 transition duration-300 ease-in-out mt-4"
      >
        Checkout
      </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
