import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { products as allProducts } from "../assets/assets.js";

function ProductCard() {
  const [cart, setCart] = useState({});
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedBrand, setSelectedBrand] = useState("All");
  const [selectedColor, setSelectedColor] = useState("All");
  const [maxPrice, setMaxPrice] = useState(500);
  const [sortBy, setSortBy] = useState("featured");
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // 🛒 Cart handlers
  const handleAddToCart = (id) =>
    setCart((prev) => ({ ...prev, [id]: prev[id] ? prev[id] : 1 }));

  const handleIncrement = (id) =>
    setCart((prev) => ({ ...prev, [id]: prev[id] + 1 }));

  const handleDecrement = (id) => {
    setCart((prev) => {
      const qty = prev[id] - 1;
      if (qty <= 0) {
        const { [id]: _, ...rest } = prev;
        return rest;
      }
      return { ...prev, [id]: qty };
    });
  };

  // 🧩 Filters & Sorting
  let filteredProducts = allProducts
    .filter(
      (p) => selectedCategory === "All" || p.category === selectedCategory
    )
    .filter((p) => selectedBrand === "All" || p.brand === selectedBrand)
    .filter(
      (p) => selectedColor === "All" || p.colors.includes(selectedColor)
    )
    .filter((p) => p.price <= maxPrice);

  if (sortBy === "price-low") filteredProducts.sort((a, b) => a.price - b.price);
  if (sortBy === "price-high")
    filteredProducts.sort((a, b) => b.price - a.price);
  if (sortBy === "name") filteredProducts.sort((a, b) => a.name.localeCompare(b.name));

  // Unique options for filters
  const categories = ["All", ...new Set(allProducts.map((p) => p.category))];
  const brands = ["All", ...new Set(allProducts.map((p) => p.brand))];
  const colors = ["All", ...new Set(allProducts.flatMap((p) => p.colors))];

  // 🧭 Filter Options Component
  const FilterOptions = () => (
    <div className="space-y-6">
      {/* Category */}
      <div>
        <h3 className="font-semibold text-gray-700 mb-2">Category</h3>
        {categories.map((cat) => (
          <label key={cat} className="block text-sm text-gray-600">
            <input
              type="radio"
              value={cat}
              checked={selectedCategory === cat}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="mr-2"
            />
            {cat}
          </label>
        ))}
      </div>

      {/* Brand */}
      <div>
        <h3 className="font-semibold text-gray-700 mb-2">Brand</h3>
        {brands.map((brand) => (
          <label key={brand} className="block text-sm text-gray-600">
            <input
              type="radio"
              value={brand}
              checked={selectedBrand === brand}
              onChange={(e) => setSelectedBrand(e.target.value)}
              className="mr-2"
            />
            {brand}
          </label>
        ))}
      </div>

      {/* Color */}
      <div>
        <h3 className="font-semibold text-gray-700 mb-2">Color</h3>
        <div className="flex flex-wrap gap-2">
          {colors.map((color) => (
            <button
              key={color}
              onClick={() => setSelectedColor(color)}
              className={`w-6 h-6 rounded-full border ${
                selectedColor === color ? "border-black" : "border-gray-300"
              }`}
              style={{ backgroundColor: color === "All" ? "#fff" : color }}
            ></button>
          ))}
        </div>
      </div>

      {/* Price */}
      <div>
        <h3 className="font-semibold text-gray-700 mb-2">Max Price</h3>
        <input
          type="range"
          min="50"
          max="500"
          value={maxPrice}
          onChange={(e) => setMaxPrice(Number(e.target.value))}
          className="w-full"
        />
        <p className="text-gray-600 text-sm mt-1">Up to ${maxPrice}</p>
      </div>

      {/* Sort */}
      <div>
        <h3 className="font-semibold text-gray-700 mb-2">Sort By</h3>
        {[
          { value: "featured", label: "Featured" },
          { value: "price-low", label: "Price: Low to High" },
          { value: "price-high", label: "Price: High to Low" },
          { value: "name", label: "Name" },
        ].map((opt) => (
          <label key={opt.value} className="block text-sm text-gray-600">
            <input
              type="radio"
              value={opt.value}
              checked={sortBy === opt.value}
              onChange={(e) => setSortBy(e.target.value)}
              className="mr-2"
            />
            {opt.label}
          </label>
        ))}
      </div>

      {/* Reset Filters */}
      <button
        onClick={() => {
          setSelectedCategory("All");
          setSelectedBrand("All");
          setSelectedColor("All");
          setMaxPrice(500);
          setSortBy("featured");
        }}
        className="mt-4 w-full py-2 bg-gray-200 rounded hover:bg-gray-300 transition"
      >
        Reset Filters
      </button>
    </div>
  );

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 via-blue-600 to-purple-600 text-white py-16 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold mb-2"
        >
          Our Collection
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-purple-100 max-w-2xl mx-auto"
        >
          Discover the latest trends in sneakers. From performance running shoes
          to stylish lifestyle kicks.
        </motion.p>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Sidebar */}
          <aside className="hidden md:block md:col-span-1 bg-white rounded-lg shadow-md p-4 h-fit">
            <h2 className="text-xl font-bold mb-4 text-gray-800">Filter</h2>
            <FilterOptions />
          </aside>

          {/* Products */}
          <section className="md:col-span-3">
            <div className="mb-6 text-gray-600">
              Showing {filteredProducts.length} product
              {filteredProducts.length !== 1 ? "s" : ""}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product, idx) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className="bg-white rounded-lg overflow-hidden shadow-md transition-shadow duration-300"
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-56 object-cover"
                    onError={(e) =>
                      (e.target.src = "https://placehold.co/400x300")
                    }
                  />
                  <div className="p-4">
                    <div className="flex justify-between items-center">
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

                    {/* Color Swatches */}
                    <div className="flex gap-2 mt-2">
                      {product.colors.map((color, i) => (
                        <span
                          key={i}
                          className="w-5 h-5 rounded-full border"
                          style={{ backgroundColor: color }}
                        ></span>
                      ))}
                    </div>

                    {/* Cart Controls */}
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
                            className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
                          >
                            –
                          </button>
                          <span className="w-6 text-center">
                            {cart[product.id]}
                          </span>
                          <button
                            onClick={() => handleIncrement(product.id)}
                            className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
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
                </motion.div>
              ))}
            </div>
          </section>
        </div>

        {/* Mobile Filter Bar */}
        <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white shadow-md border-t flex justify-around py-2">
          <button
            onClick={() => setIsFilterOpen(true)}
            className="w-1/2 text-center py-2 font-medium text-blue-600"
          >
            Filter / Sort
          </button>
        </div>

        {/* Mobile Filter Modal */}
        {isFilterOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-end z-50">
            <div className="bg-white w-full h-full p-5 overflow-y-auto">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Filter & Sort</h2>
                <button
                  onClick={() => setIsFilterOpen(false)}
                  className="text-gray-500 hover:text-gray-800"
                >
                  ✕
                </button>
              </div>
              <FilterOptions />
              <button
                onClick={() => setIsFilterOpen(false)}
                className="mt-6 w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Apply
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ✅ Added default export
export default ProductCard;
