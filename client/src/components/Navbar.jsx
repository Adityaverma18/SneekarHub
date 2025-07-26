// src/components/Navbar.jsx
import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { assetsImage } from '../assets/assets.js';
import { FaShoppingCart, FaUser } from "react-icons/fa";
import { AppContext } from '../context/AppContext.jsx';
import Cart, { useCart } from './Cart.jsx';


const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, setShowLogin, logout} = useContext(AppContext);
  const { cartItems , setIsCartOpen} = useCart()

  return (
    <nav className="bg-gradient-to-r from-gray-300 to-gray-500 shadow-md px-4 py-3">
      <div className="flex justify-between items-center flex-wrap w-full">
        
        {/* Left - Logo */}
        <Link to="/" className="flex items-center space-x-2 min-w-[140px]">
          <img
            src={assetsImage.logo}
            alt="Logo"
            className="h-15 w-20 border rounded border-zinc-200"
            onError={(e) => {
              e.target.src = "https://placehold.co/40x40";
              e.target.alt = "Placeholder logo";
            }}
          />
          <span className="text-xl font-bold text-gray-800">Sneekar<br/> Hub</span>
        </Link>

        {/* Center - Desktop Menu */}
        <div className="hidden md:flex space-x-6 mx-auto text-gray-800">
          <Link to="/" className="hover:text-blue-600 hover:underline">Home</Link>
          <Link to="/ProductPage" className="hover:text-blue-600 hover:underline">Products</Link>
          <Link to="/about" className="hover:text-blue-600 hover:underline">About</Link>
          <Link to="/contact" className="hover:text-blue-600 hover:underline">Contact</Link>
        </div>

        {/* Right - Cart and User */}
        <div className="flex items-center space-x-4">
          {/* Cart Icon */}
          <button onClick={() => setIsCartOpen(true)} className="relative text-gray-800 hover:text-blue-600">
            <FaShoppingCart className="w-6 h-6" />
            <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">{cartItems.length}</span>
          </button>
          

          {/* User / Login */}
          {user ? (
            <div className="relative group flex items-center space-x-1">
              <FaUser className="w-6 h-6 text-gray-800" />
              <div className="absolute top-8 right-0 hidden group-hover:block bg-gray-300 rounded-md shadow-lg z-50">
                <ul className="text-sm p-2">
                   <li
                    onClick={logout}
                    className="px-4 py-2 cursor-pointer hover:bg-gray-400 rounded"
                  >
                    Logout
                  </li>
                </ul>
              </div>
              <span className="text-sm text-black font-semibold max-sm:hidden">Hi, User</span>
            </div>
          ) : (
            <button
              className="bg-zinc-800 text-white px-4 py-1 text-sm rounded-full whitespace-nowrap hover:text-blue-600"
              onClick={() => setShowLogin(true)}
            >
              Login/SignUp
            </button>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden mt-3 text-gray-800 hover:text-blue-600"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        {/* Mobile Menu Dropdown */}
        {menuOpen && (
          <div className="w-full flex flex-col mt-2 space-y-2 md:hidden text-gray-800">
            <Link to="/" className="hover:text-blue-600">Home</Link>
            <Link to="/ProductPage" className="hover:text-blue-600">Products</Link>
            <Link to="/about" className="hover:text-blue-600">About</Link>
            <Link to="/contact" className="hover:text-blue-600">Contact</Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
