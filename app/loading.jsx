"use client";

import React from "react";
import { motion } from "framer-motion";

const PixelToonzCreativeFrameLoader = () => {
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-white">
      <div className="relative flex flex-col items-center">
        
        {/* Viewfinder / Framing Box */}
        <div className="relative w-24 h-24 flex items-center justify-center">
          
          {/* Top-Left Corner */}
          <motion.div 
            animate={{ 
              x: [-5, 0, -5], 
              y: [-5, 0, -5] 
            }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-0 left-0 w-6 h-6 border-t-4 border-l-4 border-[#393d72]" 
          />
          
          {/* Bottom-Right Corner */}
          <motion.div 
            animate={{ 
              x: [5, 0, 5], 
              y: [5, 0, 5] 
            }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-0 right-0 w-6 h-6 border-b-4 border-r-4 border-[#BC430D]" 
          />

          {/* Central Creative Icon (Playhead/VFX Node style) */}
          <motion.div
            animate={{ 
              scale: [0.8, 1.1, 0.8],
              rotate: [0, 90, 180, 270, 360]
            }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            className="flex items-center justify-center"
          >
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
              <rect x="3" y="3" width="18" height="18" rx="2" stroke="#393d72" strokeWidth="2" />
              <path d="M9 8l6 4-6 4V8z" fill="#BC430D" />
            </svg>
          </motion.div>
        </div>

        {/* Text Section */}
        <div className="mt-8 text-center">
          <div className="flex items-center justify-center space-x-1">
            <span className="text-[#393d72] font-black text-xl tracking-widest">PIXEL</span>
            <span className="text-[#BC430D] font-black text-xl tracking-widest">TOONZ</span>
          </div>
          
          {/* Animated Status Subtext */}
          <motion.p 
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="text-[9px] font-medium text-gray-400 mt-2 uppercase tracking-[0.4em]"
          >
            ISO 9001:2015 Certified
          </motion.p>
        </div>

        {/* Bottom Decorative Line */}
        <div className="mt-4 w-12 h-[2px] bg-gray-100 relative overflow-hidden">
          <motion.div 
            animate={{ left: ["-100%", "100%"] }}
            transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-0 bottom-0 w-6 bg-[#BC430D]"
          />
        </div>

      </div>
    </div>
  );
};

export default PixelToonzCreativeFrameLoader;