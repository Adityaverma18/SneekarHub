// src/components/Cart.jsx
import React, { useState, useContext, createContext } from 'react';
import { Link } from 'react-router-dom';
import { assetsImage } from '../assets/assets';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const addToCart = (product) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === product.id);
      if (existingItem) {
        return prevItems.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevItems, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity < 1) return;
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === productId
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
  };

  const cartTotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        cartTotal,
        isCartOpen,
        setIsCartOpen
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

const Cart = () => {
  const {
    cartItems,
    removeFromCart,
    updateQuantity,
    cartTotal,
    isCartOpen,
    setIsCartOpen
  } = useCart();

  const deliveryFee = cartItems.length > 0 ? 5.99 : 0;
  const grandTotal = cartTotal + deliveryFee;

  return (
    isCartOpen && (
      <div className="fixed inset-0 z-50 overflow-hidden">
        <div
          className="absolute inset-0 bg-black bg-opacity-50"
          onClick={() => setIsCartOpen(false)}
        ></div>

        <div className="absolute right-0 top-0 h-full w-full md:w-96 bg-white shadow-lg transform transition-transform duration-300 ease-in-out">
          <div className="p-6 h-full flex flex-col">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-800">Your Cart</h2>
              <button
                className="text-gray-500 hover:text-gray-700"
                onClick={() => setIsCartOpen(false)}
              >
                ❌
              </button>
            </div>

            <div className="flex-grow overflow-y-auto">
              {cartItems.length === 0 ? (
                <div className="text-center py-8">
                  <img
                    src={assetsImage.image5 || 'https://placehold.co/200x200'}
                    alt="Empty cart"
                    className="w-48 h-48 mx-auto mb-4"
                  />
                  <p className="text-gray-600">Your cart is empty</p>
                  <Link
                    to="/all-products"
                    className="mt-4 inline-block bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
                    onClick={() => setIsCartOpen(false)}
                  >
                    Continue Shopping
                  </Link>
                </div>
              ) : (
                cartItems.map(item => (
                  <div key={item.id} className="flex border-b border-gray-200 py-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-20 h-20 object-cover rounded"
                      onError={(e) => e.target.src = 'https://placehold.co/100x100'}
                    />
                    <div className="ml-4 flex-grow">
                      <h3 className="font-medium text-gray-800">{item.name}</h3>
                      <p className="text-gray-600 text-sm">{item.colors?.[0] || 'One Color'}</p>
                      <div className="flex justify-between items-center mt-2">
                        <div className="flex items-center border border-gray-300 rounded">
                          <button
                            className="px-2 py-1 text-gray-600 hover:bg-gray-100"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          >-</button>
                          <span className="px-2 py-1">{item.quantity}</span>
                          <button
                            className="px-2 py-1 text-gray-600 hover:bg-gray-100"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          >+</button>
                        </div>
                        <span className="font-bold text-gray-800">
                          ${(item.price * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    </div>
                    <button
                      className="text-gray-400 hover:text-red-500 ml-2"
                      onClick={() => removeFromCart(item.id)}
                    >
                      🗑️
                    </button>
                  </div>
                ))
              )}
            </div>

            {cartItems.length > 0 && (
              <div className="border-t border-gray-200 pt-4 mt-4">
                <div className="flex justify-between mb-2">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-bold">${cartTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-600">Delivery</span>
                  <span>{deliveryFee > 0 ? `$${deliveryFee.toFixed(2)}` : 'Free'}</span>
                </div>
                <div className="flex justify-between text-lg font-bold mt-4">
                  <span>Total</span>
                  <span>${grandTotal.toFixed(2)}</span>
                </div>
                <Link
                  to="/checkout"
                  className="block w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-bold mt-6 text-center"
                  onClick={() => setIsCartOpen(false)}
                >
                  Proceed to Checkout
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    )
  );
};

export default Cart;
