// src/components/Footer.jsx
import React from 'react';
import {footerAssets} from '../assets/assets.js';
import { FaFacebookF, FaTwitter, FaInstagram, FaTiktok} from "react-icons/fa";

const Footer = () => {
  const handleImageError = (e, fallback) => {
    if (e.target.src !== fallback) {
      e.target.src = fallback;
    }
  };

  return (
    <footer className="bg-gray-800 text-white pt-12 pb-6 px-6">
      <div className="max-w-full mx-auto">
        <div>
            <div className="flex items-center space-x-2 mb-4 mx-10">
              <img 
                src={footerAssets.company.logo} 
                alt={footerAssets.company.logoAlt}
                className="h-10 w-10"
                onError={(e) => handleImageError(e, footerAssets.fallbackImages.logo)}
              />
              <br/>
              <h3 className="text-xl font-bold">{footerAssets.company.name}</h3>
            </div>
          </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 px-6">
          {/* Company Info */}

          {/* Shop Links */}
          <div>
            <h4 className="font-bold text-lg mb-4">Shop</h4>
            <ul className="space-y-2">
              {footerAssets.links.shop.map((link, index) => (
                <li key={index}>
                  <a 
                    href={link.url} 
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    {link.text}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className='font-bold text-lg mb-4'>
              My Account
            </h4>
            <ul className="space-y-2">
              {footerAssets.links.myaccount.map((link,index) => (
                <li key={index}>
                  <a 
                    href={link.url}
                    className='text-gray-400 hover:text-white transition-colors'
                  >
                    {link.text}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Service Links */}
          <div>
            <h4 className="font-bold text-lg mb-4">Customer Service</h4>
            <ul className="space-y-2">
              {footerAssets.links.customerService.map((link, index) => (
                <li key={index}>
                  <a 
                    href={link.url} 
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    {link.text}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter & Social */}
          <div>
            <h4 className="font-bold text-lg mb-4">Stay Connected</h4>
            <p className="text-gray-400 mb-4">
              Subscribe to our newsletter for the latest updates and offers.
            </p>
            <div className="flex">
              <input 
                type="email" 
                placeholder="Your email" 
                className="px-4 py-2 bg-gray-700 text-white rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
              />
              <button className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-r-lg transition-colors">
                Subscribe
              </button>
            </div>
              <div className="flex space-x-15 mt-5 ">
                {footerAssets.socialMedia.map((social, index) => (
                  <a
                    key={index}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-900 transition-colors tracking-wider"
                  >
                    <span className="sr-only">{social.name}</span>
                    <SocialIcon platform={social.icon} />
                  </a>
                ))}
              </div>
          </div>
        </div>
        <div className='border-t border-gray-200 mt-8 w-full'>

        </div>

        {/* Copyright */}
        <div className="border-t border-gray-200 mt-8 pt-6 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} {footerAssets.company.name}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

const SocialIcon = ({ platform }) => {
  switch (platform) {
    case 'instagram':
      return (
        <FaInstagram />
      );
    case 'twitter':
      return (
        <FaTwitter />
      );
    case 'facebook':
      return (
        <FaFacebookF/>
      );
    case 'tiktok':
      return (
        <FaTiktok/>
      );
    default:
      return null;
  }
}

export default Footer;
