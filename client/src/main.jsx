// src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import AppContextProvider from './context/AppContext';
import { CartProvider } from './context/CartContext.jsx';

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <AppContextProvider>
        <CartProvider>
          <App />
        </CartProvider>
      </AppContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);