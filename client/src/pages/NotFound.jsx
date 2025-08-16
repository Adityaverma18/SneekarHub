import React from 'react';
import { Link } from 'react-router-dom';
import { FaExclamationTriangle } from 'react-icons/fa';

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center ">
      <div className="bg-white bg-opacity-20 backdrop-blur-md rounded-3xl shadow-xl p-12 max-w-lg text-center">
        <FaExclamationTriangle className="mx-auto text-red-400 w-20 h-20 mb-6 animate-pulse" />
        <h1 className="text-6xl font-extrabold text-black mb-4 drop-shadow-lg">404</h1>
        <h2 className="text-3xl md:text-4xl font-bold text-black mb-6 drop-shadow-md">
          Page Not Found
        </h2>
        <p className="text-black text-lg mb-8 drop-shadow-sm">
          Oops! The page you’re looking for doesn’t exist or has been moved.
        </p>
        <Link
          to="/"
          className="inline-block px-8 py-3 bg-yellow-400 text-purple-800 font-semibold rounded-full shadow-lg hover:bg-yellow-500 transition-colors"
        >
          Go Back Home
        </Link>
      </div>
      <footer className="mt-12 text-white opacity-70 text-sm select-none">
        &copy; {new Date().getFullYear()} Sneekar Hub. All rights reserved.
      </footer>
    </div>
  );
};

export default NotFound;
