import React, { useState } from 'react';
import { products } from '../assets/assets.js';
import { Link } from 'react-router-dom';

const ProductCard = () => {
  // Track quantities per product
  const [cart, setCart] = useState({});

  // Handlers
  const handleAddToCart = (productId) => {
    setCart((prev) => ({
      ...prev,
      [productId]: prev[productId] ? prev[productId] : 1,
    }));
  };

  const handleIncrement = (productId) => {
    setCart((prev) => ({
      ...prev,
      [productId]: prev[productId] + 1,
    }));
  };

  const handleDecrement = (productId) => {
    setCart((prev) => {
      const qty = prev[productId] - 1;
      if (qty <= 0) {
        const { [productId]: _, ...rest } = prev; // remove from cart
        return rest;
      }
      return { ...prev, [productId]: qty };
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 mb-5">
      {/* Header */}
      <div className="flex justify-between items-center mb-6 mt-6">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">
          Exclusive Sneekar
        </h2>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="product-card bg-white rounded-lg overflow-hidden shadow-md transition-shadow duration-300"
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-56 object-cover"
              loading="lazy"
              onError={(e) => (e.target.src = 'https://placehold.co/400x300')}
            />
            <div className="p-4">
              <div className='flex justify-between items-center'>
                <h3 className="text-lg font-semibold text-gray-800">
                  {product.name}
                </h3>
                <span className="text-lg font-bold text-gray-800">
                  ${product.price.toFixed(2)}
                </span>
              </div>
              <p className="text-gray-600 text-sm mt-1">
                {product.description}
              </p>

              {/* Add to Cart / Quantity Counter */}
              <div className="flex justify-between items-center mt-4">
                {!cart[product.id] ? (
                  <button
                    onClick={() => handleAddToCart(product.id)}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                  >
                    Add to Cart
                  </button>
                ) : (
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => handleDecrement(product.id)}
                      className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 transition"
                    >
                      –
                    </button>
                    <span className="w-6 text-center">{cart[product.id]}</span>
                    <button
                      onClick={() => handleIncrement(product.id)}
                      className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 transition"
                    >
                      +
                    </button>
                  </div>
                )}

                <Link
                  to={`/products/${product.id}`}
                  className="text-blue-400 hover:text-blue-700 px-3 py-1 underline"
                >
                  View Details
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductCard;
