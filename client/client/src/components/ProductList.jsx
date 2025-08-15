import React, { useState, useEffect } from 'react';
import { assets } from '../assets/assets';
import { Link } from 'react-router-dom';

const ProductList = () => {
  const [visibleProducts, setVisibleProducts] = useState(4);

  // Determine how many products to show based on screen width
  const updateVisibleProducts = () => {
    const width = window.innerWidth;

    if (width < 640) setVisibleProducts(4);        // mobile
    else if (width < 768) setVisibleProducts(3);   // small tablets
    else if (width < 1024) setVisibleProducts(3);  // tablets
    else setVisibleProducts(4);                    // desktop
  };

  useEffect(() => {
    updateVisibleProducts(); // set initially

    window.addEventListener('resize', updateVisibleProducts);
    return () => window.removeEventListener('resize', updateVisibleProducts);
  }, []);

  const displayedProducts = assets.products.slice(0, visibleProducts);

  return (
    <div className="max-w-7xl mx-auto px-4">
      {/* Header with "Featured Sneakers" and "Show More" */}
      <div className="flex justify-between items-center mb- mt-6">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">
          Featured Sneakers
        </h2>
        <Link
          to="/ProductPage"
          className="text-sm md:text-base font-medium bg-white px-3 py-1 rounded shadow transition duration-200 hover:bg-blue-600 hover:text-white"
        >
          Show More
        </Link>
      </div>

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
              <h3 className="text-lg font-semibold text-gray-800">
                {product.name}
              </h3>
              <p className="text-gray-600 text-sm mt-1">
                {product.description}
              </p>
              <div className="flex justify-between items-center mt-4">
                <span className="text-lg font-bold text-gray-800">
                  ${product.price.toFixed(2)}
                </span>
                <Link
                  to={`/products/${product.id}`}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm"
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
