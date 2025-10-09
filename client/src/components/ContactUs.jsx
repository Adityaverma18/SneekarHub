// src/components/ContactUs.jsx
import React, { useState } from 'react';
import { contactData } from '../assets/assets.js';
import { FaFacebookF, FaTwitter, FaInstagram, FaTiktok, FaPhoneAlt ,FaBuilding } from "react-icons/fa";


const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Add your form submission logic here
  };

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {contactData.pageTitle}
          </h1>
          <p className="text-xl text-gray-600">
            {contactData.pageSubtitle}
          </p>
        </div>

        {/* Contact Sections */}
        <div className="grid md:grid-cols-2 gap-12 mb-20">
          {/* Contact Methods */}
          <div className="space-y-8">
            {contactData.contactMethods.map((method, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-sm">
                <div className="flex items-start">
                  <div className="bg-black text-white p-3 rounded-full mr-4">
                    <ContactIcon icon={method.icon} />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {method.title}
                    </h3>
                    <p className="text-gray-600 mb-4">
                      {method.description}
                    </p>
                    <div className="space-y-2">
                      {method.details.map((detail, i) => (
                        <div key={i} className="flex">
                          <span className="text-gray-900 font-medium w-20">
                            {detail.label}:
                          </span>
                          <span className="text-gray-600">
                            {detail.value}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* Social Media */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Follow Us
              </h3>
              <div className="flex space-x-4">
                {contactData.socialMedia.map((social, index) => (
                  <a
                    key={index}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 hover:text-black transition-colors"
                  >
                    <span className="sr-only">{social.name}</span>
                    <SocialIcon platform={social.icon} />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-xl font-semibold text-gray-900 mb-6">
              Send Us a Message
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              {contactData.formFields.map((field) => (
                <div key={field.id}>
                  <label
                    htmlFor={field.id}
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    {field.label}
                    {field.required && <span className="text-red-500">*</span>}
                  </label>
                  {field.type === 'textarea' ? (
                    <textarea
                      id={field.id}
                      rows="4"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-black focus:border-black"
                      value={formData[field.id]}
                      onChange={handleChange}
                      required={field.required}
                    />
                  ) : (
                    <input
                      type={field.type}
                      id={field.id}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-black focus:border-black"
                      value={formData[field.id]}
                      onChange={handleChange}
                      required={field.required}
                    />
                  )}
                </div>
              ))}
              <button
                type="submit"
                className="w-full bg-black text-white py-3 px-4 rounded-md hover:bg-gray-800 transition-colors font-medium"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {contactData.faqs.map((faq, index) => (
              <div key={index} className="border-b border-gray-200 pb-4">
                <h3 className="text-lg font-medium text-gray-900">
                  {faq.question}
                </h3>
                <p className="text-gray-600 mt-1">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// Helper components for icons
const ContactIcon = ({ icon }) => {
  switch (icon) {
    case 'support':
      return (
        <FaPhoneAlt/>
      );
    case 'store':
      return (
        <FaBuilding/>
      );
    case 'business':
      return (
        <FaBuilding/>
      );
    default:
      return (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      );
  }
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
};

export default ContactUs;
