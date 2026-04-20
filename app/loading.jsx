"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";

const PixelToonzCreativeFrameLoader = () => {
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-white">
      <div className="relative flex flex-col items-center">
        {/* Central Image Section */}
        <motion.div
          animate={{
            scale: [0.9, 1.05, 0.9],
          }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          className="relative w-28 h-28 md:w-48 md:h-48" // Adjust size as needed
        >
          <Image
            src="/logo-icon.png" // Ensure your image is in the /public folder
            alt="PixelToonz Logo"
            fill
            className="object-contain"
            priority // Ensures the loader image loads immediately
          />
        </motion.div>
      </div>
    </div>
  );
};

export default PixelToonzCreativeFrameLoader;
