"use client";

import React from "react";
import { motion } from "framer-motion";

const PixeltoonzOnionLoader = () => {
  // Animation variants for the trail effect
  const trailVariants = (delay) => ({
    animate: {
      scale: [1, 1.5, 1],
      opacity: [0.1, 0.4, 0.1],
      transition: {
        duration: 1.5,
        repeat: Infinity,
        delay: delay,
        ease: "easeInOut",
      },
    },
  });

  return (
    <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#BC430D] overflow-hidden">
      
      {/* Background "Blueprint" Grid - Essential for a Design Academy feel */}
      <div 
        className="absolute inset-0 opacity-[0.05]" 
        style={{ 
          backgroundImage: `linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)`,
          backgroundSize: '40px 40px' 
        }} 
      />

      <div className="relative flex flex-col items-center">
        
        {/* The Animating Core */}
        <div className="relative flex items-center justify-center h-40 w-40">
          
          {/* Onion Skin Trails (The "Ghost" Frames) */}
          {[0.6, 0.4, 0.2].map((delay, i) => (
            <motion.div
              key={i}
              variants={trailVariants(delay)}
              animate="animate"
              className="absolute w-24 h-24 border-2 border-white/20 rounded-[2rem] bg-white/5 backdrop-blur-sm"
            />
          ))}

          {/* The Primary "Action" Frame */}
          <motion.div
            animate={{ 
              y: [-20, 20, -20],
              rotate: [0, 90, 180, 270, 360],
              borderRadius: ["30%", "50%", "30%"]
            }}
            transition={{ 
              y: { duration: 1.5, repeat: Infinity, ease: "easeInOut" },
              rotate: { duration: 3, repeat: Infinity, ease: "linear" },
              borderRadius: { duration: 2, repeat: Infinity, ease: "easeInOut" }
            }}
            className="z-10 w-16 h-16 bg-white shadow-[0_0_30px_rgba(255,255,255,0.6)] flex items-center justify-center"
          >
             {/* Tiny Pixel Cutout */}
             <div className="w-4 h-4 bg-[#F09410]" />
          </motion.div>
        </div>

        {/* Brand Information */}
        <div className="mt-10 text-center relative">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-baseline gap-1"
          >
            <span className="text-white text-4xl font-black tracking-tighter italic">PIXEL</span>
            <span className="text-[#F09410] text-4xl font-black tracking-tighter italic drop-shadow-md">TOONZ</span>
          </motion.div>
          
          <div className="mt-2 overflow-hidden">
            <motion.p 
              initial={{ x: "-100%" }}
              animate={{ x: "100%" }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="text-white/40 text-[10px] uppercase tracking-[0.4em] font-bold whitespace-nowrap"
            >
              Academy of Film & Media Design • Academy of Film & Media Design
            </motion.p>
          </div>
        </div>
      </div>

      {/* Modern UI Metadata (Film School Aesthetic) */}
      <div className="absolute top-1/2 left-10 -translate-y-1/2 hidden md:block">
        <div className="flex flex-col gap-4">
          <div className="h-20 w-[2px] bg-gradient-to-b from-transparent via-white/20 to-transparent" />
          <span className="[writing-mode:vertical-lr] text-white/30 text-[10px] font-mono tracking-widest uppercase">
            Motion Graphics V.2.6
          </span>
          <div className="h-20 w-[2px] bg-gradient-to-b from-transparent via-white/20 to-transparent" />
        </div>
      </div>

      <div className="absolute bottom-10 flex flex-col items-center">
        <span className="text-white/60 text-xs font-mono mb-2">SEQUENCE_START</span>
        <div className="w-48 h-[2px] bg-white/10 relative overflow-hidden">
          <motion.div 
            animate={{ x: ["-100%", "100%"] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="absolute inset-0 bg-white"
          />
        </div>
      </div>
    </div>
  );
};

export default PixeltoonzOnionLoader;