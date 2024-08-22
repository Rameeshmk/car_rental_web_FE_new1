import React from 'react';
import { FaFacebook, FaInstagram, FaWhatsapp, FaTelegramPlane, FaPhoneAlt, FaEnvelope } from 'react-icons/fa';

// Update with your own background image URL
const backgroundImageUrl = 'https://www.hdwallpapers.in/download/buick_regal_gs_car_luxury_car_mid_size_car_sedan_white_car_hd_cars-HD.jpg';

const Contact = () => {
  return (
    <div
      className="bg-cover bg-center min-h-screen flex flex-col items-center justify-center p-8"
      style={{ backgroundImage: `url(${backgroundImageUrl})` }}
    >
      <div className="bg-white bg-opacity-80 rounded-lg shadow-lg w-full max-w-lg p-8">
        <h1 className="text-3xl font-semibold text-center mb-6">Contact Us</h1>
        
        <div className="flex flex-col items-center space-y-4 mb-6">
          <h2 className="text-xl font-semibold">Get in Touch</h2>
          <p className="text-gray-600 text-center">We would love to hear from you! Reach out to us through any of the following methods:</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-8">
          {/* Facebook */}
          <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="bg-blue-600 p-4 rounded-full text-white flex items-center justify-center hover:bg-blue-700 transition-colors duration-300">
            <FaFacebook className="text-2xl" />
          </a>

          {/* Instagram */}
          <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="bg-gradient-to-br from-pink-500 to-orange-500 p-4 rounded-full text-white flex items-center justify-center hover:from-pink-600 hover:to-orange-600 transition-colors duration-300">
            <FaInstagram className="text-2xl" />
          </a>

          {/* WhatsApp */}
          <a href="https://wa.me/1234567890" target="_blank" rel="noopener noreferrer" className="bg-green-500 p-4 rounded-full text-white flex items-center justify-center hover:bg-green-600 transition-colors duration-300">
            <FaWhatsapp className="text-2xl" />
          </a>

          {/* Telegram */}
          <a href="https://t.me/username" target="_blank" rel="noopener noreferrer" className="bg-blue-400 p-4 rounded-full text-white flex items-center justify-center hover:bg-blue-500 transition-colors duration-300">
            <FaTelegramPlane className="text-2xl" />
          </a>

          {/* Phone */}
          <a href="tel:+1234567890" className="bg-gray-800 p-4 rounded-full text-white flex items-center justify-center hover:bg-gray-900 transition-colors duration-300">
            <FaPhoneAlt className="text-2xl" />
          </a>

          {/* Email */}
          <a href="mailto:info@example.com" className="bg-red-500 p-4 rounded-full text-white flex items-center justify-center hover:bg-red-600 transition-colors duration-300">
            <FaEnvelope className="text-2xl" />
          </a>
        </div>

        <div className="flex flex-col items-center">
          <h2 className="text-xl font-semibold mb-4">Visit Us</h2>
          <p className="text-gray-600 text-center">1234 Street Name, City, Country</p>
        </div>
      </div>
    </div>
  );
};

export default Contact;
