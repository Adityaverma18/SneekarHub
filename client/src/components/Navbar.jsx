import React, { useContext, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { assetsImage, products } from '../assets/assets.js'; // ⬅️ Make sure products is exported
import { FaShoppingCart, FaUser, FaSearch } from 'react-icons/fa';
import { AppContext } from '../context/AppContext.jsx';
import CartDialog from "./CartDialog.jsx";
import { useCart } from "../context/CartContext.jsx";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showSearchMobile, setShowSearchMobile] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  const [isMobile, setIsMobile] = useState(false);
  const navigate = useNavigate();

  const { user, setShowLogin, logout } = useContext(AppContext);
  const { cartItems, setIsCartOpen } = useCart();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768); // breakpoint for mobile
    };
    handleResize(); // initialize on mount
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleSearchChange = (value) => {
    setSearchQuery(value);

    if (value.trim() === '') {
      setSuggestions([]);
      return;
    }

    const filtered = products
      .filter((p) =>
        p.name.toLowerCase().includes(value.toLowerCase())
      )
      .slice(0, 5); // limit to 5 suggestions
    setSuggestions(filtered);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      console.log("Search for:", searchQuery);
      setSuggestions([]);
      // Optionally: navigate to results page or perform search action
    }
  };

  const handleSuggestionClick = (name) => {
    setSearchQuery(name);
    setSuggestions([]);
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 w-full z-50 bg-gradient-to-r from-gray-300 to-gray-500 shadow-md px-4 py-4">
        <div className="flex items-center justify-between w-full gap-4 flex-nowrap">

          {/* Left - Logo */}
          <Link to="/" className="flex items-center space-x-2 min-w-[140px]">
            <img
              src={assetsImage.logo}
              alt="Logo"
              className="h-12 w-12 sm:w-16 md:h-14 md:w-20 border rounded border-zinc-200"
              onError={(e) => {
                e.target.src = "https://placehold.co/40x40";
                e.target.alt = "Placeholder logo";
              }}
            />
            <span className="text-md sm:text-md md:text-lg lg:text-xl font-bold text-gray-800">
              Sneekar<br />Hub
            </span>
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

            {/* Search input (Desktop) - Only visible when NOT showSearchMobile and not mobile overlay */}
            {!showSearchMobile && (
              <div className="hidden md:block relative w-full max-w-xs">
                <form onSubmit={handleSearchSubmit}>
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => handleSearchChange(e.target.value)}
                    placeholder="Search..."
                    className="w-full px-3 py-1 pr-10 bg-white border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <FaSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none" />
                </form>

                {/* Suggestions (Desktop) */}
                {suggestions.length > 0 && (
                  <ul className="absolute bg-white border rounded-md shadow-lg mt-1 w-full z-50">
                    {suggestions.map((item) => (
                      <li
                        key={item.id}
                        onClick={() => handleSuggestionClick(item.name)}
                        className="px-3 py-1 hover:bg-gray-100 cursor-pointer text-sm"
                      >
                        {item.name}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}

            {/* Mobile Search Icon */}
            <button
              className="md:hidden text-gray-800"
              onClick={() => {
                if (isMobile) {
                  navigate('/search'); // redirect to blank search page on mobile
                } else {
                  setShowSearchMobile(true); // show freezing overlay/panel on desktop/tablet
                }
              }}
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

      {/* Freezing fullscreen overlay search for desktop/tablet */}
      {showSearchMobile && !isMobile && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-start pt-20">
          <div className="bg-white rounded p-4 w-full max-w-md relative">
            <form onSubmit={handleSearchSubmit}>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none"
                placeholder="Search shoes..."
                value={searchQuery}
                onChange={(e) => handleSearchChange(e.target.value)}
                autoFocus
              />
            </form>
            {suggestions.length > 0 && (
              <ul className="mt-2 max-h-60 overflow-auto border rounded shadow-sm">
                {suggestions.map((item) => (
                  <li
                    key={item.id}
                    onClick={() => handleSuggestionClick(item.name)}
                    className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
                  >
                    {item.name}
                  </li>
                ))}
              </ul>
            )}
            <button
              onClick={() => setShowSearchMobile(false)}
              className="mt-2 text-blue-600 underline"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
