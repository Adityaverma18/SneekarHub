// src/components/Slider.jsx
import React, { useState, useEffect } from 'react';
import { assetsImage, sliderAssets } from '../assets/assets';

const Slider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = sliderAssets.slides;

  // Manually create image array from imported images
  const img = [assetsImage.slider1, assetsImage.slider2, assetsImage.image1];

  useEffect(() => {
    const interval = setInterval(() => {
      handleNextSlide();
    }, sliderAssets.settings.autoplaySpeed);
    return () => clearInterval(interval);
  }, [currentSlide]);

  const handleNextSlide = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const handlePrevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  return (
    <div className="relative overflow-hidden" style={{ height: sliderAssets.styles.height }}>
      {/* Current Slide */}
      <div key={slides[currentSlide].id} className="absolute inset-0 transition-opacity duration-500 ease-in-out opacity-100">
        <img
          src={img[currentSlide]}
          alt={slides[currentSlide].alt}
          className="w-full h-full object-cover"
          onError={(e) => {
            e.target.src = sliderAssets.fallbacks.image;
            console.warn("Fallback image used");
          }}
        />
        <div className={`absolute inset-0 flex flex-col items-center justify-center ${sliderAssets.styles.overlay}`}>
          <h1 className={`text-4xl md:text-6xl font-bold ${sliderAssets.styles.textColor} mb-4`}>
            {slides[currentSlide].title}
          </h1>
          <p className={`text-xl md:text-2xl ${sliderAssets.styles.textColor} mb-8`}>
            {slides[currentSlide].subtitle}
          </p>
          {slides[currentSlide].cta && (
            <button className={`py-3 px-6 rounded-lg text-lg ${sliderAssets.styles.buttonStyle}`}>
              {slides[currentSlide].cta}
            </button>
          )}
        </div>
      </div>

      {/* Arrows */}
      {sliderAssets.settings.showArrows && (
        <>
          <button
            onClick={handlePrevSlide}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-md hover:bg-gray-100 transition-colors"
            aria-label="Previous slide"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={handleNextSlide}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-md hover:bg-gray-100 transition-colors"
            aria-label="Next slide"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </>
      )}

      {/* Dots */}
      {sliderAssets.settings.showDots && (
        <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
          {slides.map((slide, index) => (
            <button
              key={slide.id}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full ${index === currentSlide ? 'bg-white' : 'bg-gray-400'}`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Slider;
