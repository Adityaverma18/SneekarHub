import React from "react";
import { motion } from "framer-motion";

const ProductCards = ({ id, name, image, price, description, onClick }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      onClick={onClick}
      className="cursor-pointer bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all"
    >
      <div className="aspect-square overflow-hidden">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover transition-transform hover:scale-110"
          onError={(e) => (e.target.src = "https://placehold.co/400x400")}
        />
      </div>

      <div className="p-3 text-center">
        <h3 className="text-lg font-semibold text-gray-800 truncate">{name}</h3>
        <p className="text-sm text-gray-600 line-clamp-2">{description}</p>
        <p className="text-blue-600 font-bold mt-1">${price.toFixed(2)}</p>
      </div>
    </motion.div>
  );
};

export default ProductCards;
