import React from "react";
import {Routes, Route} from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import "./index.css"; // Tailwind
import Home from "./pages/Home.jsx";
import Checkout from './pages/Checkout.jsx'
import Navbar from "./components/Navbar.jsx";
import ProductPage from './pages/ProductPage.jsx'
import NotFound from './pages/NotFound.jsx'
import {AppContext} from "./context/AppContext.jsx"; 
import Footer from './components/Footer.jsx'
import Login from './components/Login.jsx'
import ProductDetail from './components/ProductDetail.jsx'
import { useContext } from 'react'// ✅ Import the actual provider
import { CartProvider } from "./components/Cart.jsx";
import About from "./components/About.jsx";
import ContactUs from "./components/ContactUs.jsx";

function App() {
  const { showLogin } = useContext(AppContext); // Ensure AppContext is not undefined

  return (
    <CartProvider>
      <div className='bg-gradient-to-b from-gray-400 to-gray-100'>
        <ToastContainer position='bottom-right'/>
        <Navbar />
        {showLogin && <Login />}
        <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/ProductPage" element={<ProductPage />} />
        <Route path="/products/:id" element={<ProductDetail />} />
        <Route path="/about" element={<About />} /> 
        <Route path="/contact" element ={<ContactUs />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
        <Footer />
      </div>
    </CartProvider>
  );
}


export default App;
