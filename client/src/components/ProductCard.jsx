import React from 'react';
import { assets } from '../assets/assets.js';
import { Link } from 'react-router-dom';
import '../index.css'; 

const ProductCard = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 mb-5">
      {/* Header */}
      <div className="flex justify-between items-center mb-6 mt-6">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">
          All Sneekers
        </h2>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {assets.products.map((product) => (
          <div
            key={product.id}
            className="relative product-card bg-white rounded-lg overflow-hidden shadow-md transition-all duration-300 hover:shadow-[0_0_10px_3px_rgba(59,130,246,0.4)] group"
          >
            {/* Blue perimeter border animation */}
            <span className="blue-glow"></span>

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
              <p className="text-gray-600 text-sm mt-1">{product.description}</p>
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

export default ProductCard;
