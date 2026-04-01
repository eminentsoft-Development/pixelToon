"use client";

import React from "react";
import { motion } from "framer-motion";

const PixelToonzSimpleLoader = () => {
  return (
    <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-white">
      <div className="relative flex flex-col items-center">
        
        {/* Animated Pixel Icon */}
        <div className="relative h-16 w-16 mb-6 flex items-center justify-center">
          {/* Main Bouncing Square */}
          <motion.div
            animate={{
              y: [0, -20, 0],
              rotate: [0, 90, 180, 270, 360],
              scale: [1, 0.8, 1],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="w-10 h-10 bg-[#BC430D] rounded-lg shadow-lg flex items-center justify-center"
          >
            {/* Inner "Pixel" */}
            <div className="w-3 h-3 bg-white" />
          </motion.div>

          {/* Shadow Effect */}
          <motion.div 
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.3, 0.1, 0.3]
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute bottom-0 w-8 h-1 bg-black/10 rounded-full blur-[2px]"
          />
        </div>

        {/* Brand Text */}
        <div className="text-center">
          <div className="flex items-baseline gap-1">
            <span className="text-[#393d72] text-2xl font-black italic tracking-tighter">PIXEL</span>
            <span className="text-[#BC430D] text-2xl font-black italic tracking-tighter">TOONZ</span>
          </div>
          
          {/* Subtle Progress Bar */}
          <div className="mt-3 w-32 h-[2px] bg-gray-100 rounded-full overflow-hidden mx-auto">
            <motion.div 
              animate={{ x: ["-100%", "100%"] }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              className="w-1/2 h-full bg-[#BC430D]"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PixelToonzSimpleLoader;