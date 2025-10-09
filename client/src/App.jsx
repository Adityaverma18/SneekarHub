import React, { useContext } from "react";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./index.css"; // Tailwind

// Context
import { AppContext } from "./context/AppContext.jsx";
import { CartProvider } from "./context/CartContext.jsx"; // ✅ Use CartContext instead of Cart.jsx

// Layout
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import ScrollToTop from "./components/ScrollToTop.jsx";

// Pages
import Home from "./pages/Home.jsx";
import Checkout from "./pages/Checkout.jsx";
import ProductPage from "./pages/ProductPage.jsx";
import ProductDetail from "./components/ProductDetail.jsx";
import About from "./components/About.jsx";
import ContactUs from "./components/ContactUs.jsx";
import SearchPage from "./components/Search.jsx";
import NotFound from "./pages/NotFound.jsx";

// Modals
import Login from "./components/Login.jsx";
import CartDialog from "./components/CartDialog.jsx";

function App() {
  const { showLogin } = useContext(AppContext);

  return (
    <CartProvider>
      <div className='bg-gradient-to-b from-gray-400 to-gray-100 pt-20'>
        <ToastContainer position='bottom-right' />
        <Navbar />
        <ScrollToTop />
        {showLogin && <Login />}
        <CartDialog /> {/* ✅ Cart dialog overlay rendered globally */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/ProductPage" element={<ProductPage />} />
          <Route path="/products/:id" element={<ProductDetail />} />
          <Route path="/about" element={<About />} /> 
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </div>
    </CartProvider>
  );
}

export default App;
