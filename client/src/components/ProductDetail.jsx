import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Badge } from "./Badge.jsx";
import { useCart } from "../context/CartContext.jsx";

import {
  Heart,
  ChevronLeft,
  ShoppingCart,
  Share2,
  Truck,
  Shield,
  RefreshCcw,
  Check,
  Star,
} from "lucide-react"; // ✅ single import
import { assets } from "../assets/assets";
import { toast } from "sonner";
import ProductCards from "./ProductCards.jsx"; 
import { Tabs, TabsList, TabsTrigger, TabsContent } from "./CustomTabs";

export default function ProductDetail() {
  const { addToCart } = useCart(); // get the addToCart function
  const { id } = useParams();
  const navigate = useNavigate();
  const product = assets.products.find((p) => String(p.id) === String(id));

  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedColor, setSelectedColor] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);
  const [showSharePopup, setShowSharePopup] = useState(false);
  const [inCart, setInCart] = useState(false);

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h2 className="text-red-500 text-2xl font-semibold mb-4">
          Product not found
        </h2>
        <button
          onClick={() => navigate(-1)}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          Back to Products
        </button>
      </div>
    );
  }

  const images = product.images || [product.image];

  const relatedProducts = assets.products
    .filter((p) => p.id !== product.id)
    .sort(() => Math.random() - 0.5)
    .slice(0, 4);

  const composedDescription = `
    ${product.title ? product.title + ". " : ""}
    ${product.description || ""}
    ${
      product.features?.length
        ? "Features: " + product.features.join(", ") + ". "
        : ""
    }
    ${
      product.colors?.length
        ? "Available colors: " + product.colors.join(", ") + ". "
        : ""
    }
    ${
      product.sizes?.length
        ? "Available sizes: " + product.sizes.join(", ") + "."
        : ""
    }
  `;


  // Prevent scrolling when share popup is open
  useEffect(() => {
    document.body.classList.toggle("overflow-hidden", showSharePopup);
  }, [showSharePopup]);

  return (
    <div className="min-h-screen transition-colors">
      {/* Product Layout */}
      <div className="container mx-auto px-4 pb-20 grid md:grid-cols-2 gap-12 mt-5">
        {/* Left: Images */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-4"
        >
          <div className="relative aspect-square overflow-hidden rounded-2xl">
            <motion.img
              key={selectedImage}
              src={images[selectedImage]}
              alt={product.name}
              className="w-full h-full object-cover"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
            />
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsFavorite(!isFavorite)}
              className="absolute top-4 right-4 p-3 rounded-full bg-white shadow-lg"
            >
              <Heart
                className={`h-6 w-6 transition-colors ${
                  isFavorite
                    ? "fill-red-500 text-red-500"
                    : "text-gray-600 dark:text-gray-400"
                }`}
              />
            </motion.button>
          </div>

          {/* Thumbnails */}
          <div className="grid grid-cols-4 gap-4">
            {images.map((img, i) => (
              <motion.button
                key={i}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedImage(i)}
                className={`relative aspect-square overflow-hidden rounded-lg transition-all border ${
                  selectedImage === i
                    ? "border-blue-600 ring-2 ring-blue-500"
                    : "border-gray-300"
                }`}
              >
                <img
                  src={img}
                  alt={`${product.name} view ${i + 1}`}
                  className="w-full h-full object-cover"
                />
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Right: Product Info */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-6"
        >
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="secondary">{product.category}</Badge>
              <Badge variant="outline">{product.brand}</Badge>
            </div>
            <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
            <p className="text-lg mb-4 whitespace-pre-line">{composedDescription}</p>
            <p className="text-2xl font-semibold mb-4">${product.price.toFixed(2)}</p>
          </div>

          {/* Color Selection */}
          {product.colors && product.colors.length > 0 && (
            <div>
              <label className="block mb-2 font-semibold">Color</label>
              <div className="flex gap-3">
                {product.colors.map((color, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      setSelectedColor(i);
                      toast.success(`Color changed to ${color}`);
                    }}
                    className={`w-10 h-10 rounded-full border-2 transition-all ${
                      selectedColor === i
                        ? "ring-2 ring-blue-500 border-blue-500"
                        : "border-gray-300"
                    }`}
                    style={{ backgroundColor: color.toLowerCase() }} // ✅ ensure CSS-valid colors
                  >
                    {selectedColor === i && (
                      <Check className="text-white h-5 w-5 m-auto block" />
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Size Selection */}
          {product.sizes && product.sizes.length > 0 && (
            <div>
              <label className="block mb-2 font-semibold">Size (US)</label>
              <div className="grid grid-cols-6 gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => {
                      setSelectedSize(size);
                      toast.success(`Selected size: ${size}`);
                    }}
                    className={`p-3 rounded-lg border transition-all ${
                      selectedSize === size
                        ? "bg-blue-600 text-white border-blue-600"
                        : "border-gray-300 hover:border-blue-500"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Cart & Share */}
          <div className="flex gap-4 pt-4">
            {!inCart ? (
              <button
                onClick={() => {
                  if (!selectedSize) {
                    alert("Please select a size before adding to cart!");
                    return;
                  }
                  addToCart(product, selectedSize, quantity);
                  setInCart(true);
                  setQuantity(1);
                  toast.success(
                    `${product.name} added to cart (Size: ${selectedSize})!`
                  );
                }}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-2xl bg-blue-600 text-white hover:bg-blue-700 transition"
              >
                <ShoppingCart className="h-5 w-5" />
                Add to Cart
              </button>
            ) : (
              <div className="flex-1 flex items-center justify-center gap-4 border rounded-2xl p-2 transition ">
                <button
                  onClick={() => {
                    const newQty = quantity - 1;
                    if (newQty <= 0) {
                      setInCart(false);
                      setQuantity(1);
                      toast.info(`${product.name} removed from cart`);
                      return;
                    }
                    setQuantity(newQty);
                  }}
                  className="px-3 py-1 border rounded bg-black/25 hover:bg-black/50 transition text-white"
                >
                  -
                </button>
                <span className="w-12 text-center font-semibold">{quantity}</span>
                <button
                  onClick={() => {
                    const newQty = Math.min(10, quantity + 1);
                    setQuantity(newQty);
                    if (newQty === 10) toast.info("Maximum quantity is 10");
                  }}
                  className="px-3 py-1 border rounded bg-black/25 hover:bg-black/50 transition text-white"
                >
                  +
                </button>
              </div>
            )}

            <button
              onClick={() => setShowSharePopup(true)}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-2 border rounded-2xl hover:bg-gray-100 transition"
            >
              <Share2 className="h-5 w-5" />
              Share
            </button>
          </div>

          {/* Share Popup */}
          {showSharePopup && (
            <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
              <div className="bg-white rounded-2xl shadow-lg p-6 w-80 relative">
                <h3 className="text-lg font-semibold mb-3 text-center">
                  Share this product
                </h3>
                <input
                  type="text"
                  readOnly
                  value={window.location.href}
                  className="w-full border rounded p-2 bg-gray-100 text-gray-700"
                />
                <div className="flex justify-between mt-4">
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(window.location.href);
                      toast.success("Link copied to clipboard!");
                    }}
                    className="flex-1 bg-blue-600 text-white py-2 rounded-2xl hover:bg-blue-700 transition mr-2"
                  >
                    Copy Link
                  </button>
                  <button
                    onClick={() => setShowSharePopup(false)}
                    className="flex-1 border py-2 rounded-2xl hover:bg-gray-100 transition"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Shipping Features */}
          {product.features?.length > 0 && (
            <div className="grid grid-cols-3 gap-4 pt-4">
              <div className="text-center p-4 rounded-lg bg-gray-400">
                <Truck className="h-6 w-6 mx-auto mb-2" />
                <p className="text-sm">Free Shipping</p>
              </div>
              <div className="text-center p-4 rounded-lg bg-gray-400">
                <Shield className="h-6 w-6 mx-auto mb-2" />
                <p className="text-sm">2 Year Warranty</p>
              </div>
              <div className="text-center p-4 rounded-lg bg-gray-400">
                <RefreshCcw className="h-6 w-6 mx-auto mb-2" />
                <p className="text-sm">30 Day Returns</p>
              </div>
            </div>
          )}
        </motion.div>
      </div>

      {/* Product Tabs */}
      <div className="mt-5 mx-20">
        <Tabs defaultValue="features" className="w-full">
          <TabsList className="flex justify-center gap-4 rounded-2xl">
          <TabsTrigger value="features">Features</TabsTrigger>
          <TabsTrigger value="reviews">Reviews</TabsTrigger>
          <TabsTrigger value="shipping">Shipping</TabsTrigger>
        </TabsList>


          {/* Features Tab */}
          <TabsContent value="features" className="mt-6">
            <div className="bg-white rounded-2xl p-8 shadow-sm">
              <h3 className="mb-4 text-lg font-semibold">Product Features</h3>
              <ul className="space-y-3">
                {product.features?.map((feature, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <Check className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </TabsContent>

          {/* Reviews Tab */}
          <TabsContent value="reviews" className="mt-6">
            <div className="bg-white rounded-xl p-8 shadow-sm">
              <h3 className="mb-4 text-lg font-semibold">Customer Reviews</h3>
              <div className="space-y-6">
                {product.reviews?.map((review, index) => (
                  <div key={index} className="pb-6 border-b last:border-b-0">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${
                              i < review.rating
                                ? "fill-yellow-400 text-yellow-400"
                                : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                      <span className="font-medium">{review.user}</span>
                    </div>
                    <p className="text-muted-foreground">{review.comment}</p>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>

          {/* Shipping Tab */}
          <TabsContent value="shipping" className="mt-6">
            <div className="bg-white rounded-xl p-8 shadow-sm">
              <h3 className="mb-4 text-lg font-semibold">Shipping Information</h3>
              <div className="space-y-4">
                <p>{product.shippingInfo}</p>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="container mx-auto px-4 mt-20">
          <h2 className="text-2xl font-bold mb-8 text-center">You May Also Like</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mb-10">
            {relatedProducts.map((p) => (
              <ProductCards
                key={p.id}
                {...p}
                onClick={() => navigate(`/products/${p.id}`)}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
