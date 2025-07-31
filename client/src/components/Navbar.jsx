import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { assetsImage } from '../assets/assets.js';
import { FaShoppingCart, FaUser, FaSearch } from 'react-icons/fa';
import { AppContext } from '../context/AppContext.jsx';
import Cart, { useCart } from './Cart.jsx';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showSearchMobile, setShowSearchMobile] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const { user, setShowLogin, logout } = useContext(AppContext);
  const { cartItems, setIsCartOpen } = useCart();

  const handleSearch = (e) => {
    e.preventDefault();
    // You can add your search logic here
  };

    return (
    <nav className="bg-gradient-to-r  from-gray-300 to-gray-500 shadow-md px-4 py-4">
      <div className="flex items-center justify-between w-full gap-4 flex-nowrap">
        
        {/* Left - Logo */}
        <Link to="/" className="flex items-center space-x-2 min-w-[140px]">
          <img
            src={assetsImage.logo}
            alt="Logo"
            className="h-12 w-13 sm:h-12 sm:w-16 md:h-15 md:w-20 border rounded border-zinc-200"
            onError={(e) => {
              e.target.src = "https://placehold.co/40x40";
              e.target.alt = "Placeholder logo";
            }}
          />
          <span className="text-md sm:text-md md:text-lg lg:text-xl font-bold text-gray-800">Sneekar<br/> Hub</span>
        </Link>

        {/* Center - Desktop Menu */}
        {!showSearchMobile && (
          <div className="hidden md:flex space-x-6 mx-auto text-gray-800">
            <Link to="/" className="hover:text-blue-600 hover:underline">Home</Link>
            <Link to="/ProductPage" className="hover:text-blue-600 hover:underline">Products</Link>
            <Link to="/about" className="hover:text-blue-600 hover:underline">About</Link>
            <Link to="/contact" className="hover:text-blue-600 hover:underline">Contact</Link>
          </div>
        )}

        {/* Right - Search, Cart, User, Mobile Menu */}
        <div className="flex items-center space-x-4">

          {/* Search input (Desktop) */}
          <form onSubmit={handleSearch} className="hidden md:block relative w-full max-w-xs">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search..."
              className="w-full px-3 py-1 pr-10 bg-white border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <FaSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none" />
          </form>

          {/* Mobile Search Icon */}
          <button
            className="md:hidden text-gray-800"
            onClick={() => setShowSearchMobile(true)}
          >
            <FaSearch className="w-5 h-5" />
          </button>

          {/* Cart Icon */}
          {!showSearchMobile && (
            <button onClick={() => setIsCartOpen(true)} className="relative text-gray-800 hover:text-blue-600">
              <FaShoppingCart className="w-6 h-6" />
              <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {cartItems.length}
              </span>
            </button>
          )}

          {/* User/Login */}
          {!showSearchMobile && (
            user ? (
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
            )
          )}

          {/* Mobile Menu Button */}
          {!showSearchMobile && (
            <button
              className="md:hidden text-gray-800 hover:text-blue-600"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          )}
        </div>
      </div>

      {/* Mobile Search Input */}
      {showSearchMobile && (
        <div className="w-full mt-2 px-2 md:hidden flex items-center space-x-2">
          <input
            type="text"
            className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none"
            placeholder="Search shoes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button
            onClick={() => setShowSearchMobile(false)}
            className="text-sm text-blue-600"
          >
            Cancel
          </button>
        </div>
      )}

      {/* Mobile Menu Dropdown */}
      {menuOpen && !showSearchMobile && (
        <div className="w-full flex flex-col mt-2 space-y-2 md:hidden text-gray-800">
          <Link to="/" className="hover:text-blue-600">Home</Link>
          <Link to="/ProductPage" className="hover:text-blue-600">Products</Link>
          <Link to="/about" className="hover:text-blue-600">About</Link>
          <Link to="/contact" className="hover:text-blue-600">Contact</Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;