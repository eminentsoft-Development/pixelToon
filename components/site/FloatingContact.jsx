import React from 'react';
import { FaWhatsapp, FaPhoneAlt } from 'react-icons/fa';

const FloatingContact = () => {
  return (
    <div className="fixed bottom-6 right-6 flex flex-col gap-2.5 z-50">
      
      {/* WhatsApp Button */}
      <a
        href="https://wa.me/919745678780?text=Hi!%20I'm%20interested%20in%20your%20services."
        target="_blank"
        rel="noopener noreferrer"
        className="bg-green-500 hover:bg-green-600 text-white p-3.5 rounded-full shadow-lg shadow-green-500/30 hover:scale-110 transition-all duration-300 flex items-center justify-center group relative"
        aria-label="Chat on WhatsApp"
      >
        <FaWhatsapp className="text-3xl" />
        {/* Optional Tooltip */}
        <span className="absolute right-16 bg-gray-900 text-white text-sm px-3 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
          WhatsApp Us
        </span>
      </a>

      {/* Call Button */}
      <a
        href="tel:+919745678780"
        className="bg-blue-600 hover:bg-blue-700 text-white p-3.5 rounded-full shadow-lg shadow-blue-600/30 hover:scale-110 transition-all duration-300 flex items-center justify-center group relative"
        aria-label="Call Us"
      >
        <FaPhoneAlt className="text-2xl m-1" />
        {/* Optional Tooltip */}
        <span className="absolute right-16 bg-gray-900 text-white text-sm px-3 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
          Call Us
        </span>
      </a>

    </div>
  );
};

export default FloatingContact;