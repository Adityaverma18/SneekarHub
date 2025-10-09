import React, { useState, useEffect } from 'react';
import { assets } from '../assets/assets';
import { Link } from 'react-router-dom';

const ProductList = () => {
  const [visibleProducts, setVisibleProducts] = useState(4);

  // Track quantities per product
  const [cart, setCart] = useState({});

  const updateVisibleProducts = () => {
    const width = window.innerWidth;
    if (width < 640) setVisibleProducts(4);        // mobile
    else if (width < 768) setVisibleProducts(3);   // small tablets
    else if (width < 1024) setVisibleProducts(3);  // tablets
    else setVisibleProducts(4);                    // desktop
  };

  useEffect(() => {
    updateVisibleProducts();
    window.addEventListener('resize', updateVisibleProducts);
    return () => window.removeEventListener('resize', updateVisibleProducts);
  }, []);

  const displayedProducts = assets.products.slice(0, visibleProducts);

  // Handlers for quantity
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
    <div className="max-w-7xl mx-auto px-4 ">
      {/* Header */}
      <div className="flex justify-between items-center mb-4 mt-6 ">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">
          Latest Featured Sneakers
        </h2>
        <Link
          to="/ProductPage"
          className="text-sm md:text-base font-medium bg-white px-3 py-1 rounded shadow transition duration-200 hover:bg-blue-600 hover:text-white"
        >
          Show More
        </Link>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {displayedProducts.map((product) => (
          <div
            key={product.id}
            className="product-card bg-white rounded-lg overflow-hidden shadow-md transition-all duration-300 hover:shadow-[0_0_10px_3px_rgba(59,130,246,0.6)]"
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-56 object-cover"
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
              <p className="text-gray-600 text-sm mt-1 line-clamp-2">
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

export default ProductList;
