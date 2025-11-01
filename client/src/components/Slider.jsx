import React, { useState, useEffect, useRef } from "react";
import { sliderAssets } from "../assets/assets";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom"; // ✅ Added missing import

// Create a motion-enhanced Link
const MotionLink = motion.create(Link);

const Slider = () => {
  const slides = sliderAssets.slides;
  const [currentSlide, setCurrentSlide] = useState(0);
  const intervalRef = useRef(null);

  // Auto-slide every 5 seconds
  useEffect(() => {
    startAutoplay();
    return () => stopAutoplay();
  }, []);

  const startAutoplay = () => {
    if (intervalRef.current) return;
    intervalRef.current = setInterval(() => {
      setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 5000);
  };

  const stopAutoplay = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  const handleNext = () => {
    stopAutoplay();
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    startAutoplay();
  };

  const handlePrev = () => {
    stopAutoplay();
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
    startAutoplay();
  };

  const current = slides[currentSlide];
  const accent = sliderAssets.accentColors[current.accentColor];

  return (
    <div
      className={`relative w-full h-[650px] overflow-hidden bg-gradient-to-r ${current.gradient}`}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={current.id}
          initial={{ opacity: 0, scale: 1.02 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.98 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="relative lg:absolute lg:inset-0 flex flex-col lg:flex-row items-center justify-center text-center lg:text-left px-6 lg:px-20 py-10 lg:py-0"
        >
          {/* Text Section */}
          <div className="max-w-xl z-10 space-y-4">
            <span
              className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${accent.badge}`}
            >
              {current.subtitle}
            </span>

            <h1
              className={`text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r ${accent.gradient}`}
            >
              {current.title}
            </h1>

            <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed">
              {current.description}
            </p>

            {/* ✅ Updated Button to MotionLink */}
            <MotionLink
              to="/ProductPage"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className={`mt-4 inline-block px-6 py-3 rounded-lg text-white font-semibold bg-gradient-to-r ${accent.gradient} shadow-lg transition-all`}
            >
              Shop Now
            </MotionLink>
          </div>

          {/* Image Section */}
          <div className="flex-1 flex justify-center mt-8 lg:mt-0">
            <motion.img
              key={current.image}
              src={current.image}
              alt={current.title}
              className="w-full max-w-md lg:max-w-2xl object-contain drop-shadow-2xl"
              loading="lazy"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              onError={(e) => (e.target.src = "https://placehold.co/600x400")}
            />
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation Arrows */}
      <button
        onClick={handlePrev}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/70 backdrop-blur-md p-3 rounded-full shadow-md hover:bg-white transition"
        aria-label="Previous Slide"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-6 h-6 text-gray-700"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>

      <button
        onClick={handleNext}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/70 backdrop-blur-md p-3 rounded-full shadow-md hover:bg-white transition"
        aria-label="Next Slide"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-6 h-6 text-gray-700"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </button>

      {/* Dots Indicator */}
      <div className="absolute bottom-6 left-0 right-0 flex justify-center space-x-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all ${
              currentSlide === index
                ? `bg-gradient-to-r ${accent.glow}`
                : "bg-gray-300 dark:bg-gray-600"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          ></button>
        ))}
      </div>
    </div>
  );
};

export default Slider;
