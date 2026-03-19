"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, PlayCircle } from "lucide-react";

const LevelUpCompact = () => {
  return (
    <section className="py-10 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row bg-[#0a0a0a] rounded-[3rem] overflow-hidden shadow-2xl min-h-[600px]">
          
          {/* LEFT: The Message (40%) */}
          <div className="md:w-[40%] p-10 md:p-16 flex flex-col justify-center border-b md:border-b-0 md:border-r border-white/10">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-black text-white leading-[0.9] uppercase tracking-tighter mb-6">
                Education <br />
                <span className="text-gray-500 italic font-medium">Taken to the</span> <br />
                <span className="text-yellow-400">Next Level</span>
              </h2>
              <p className="text-gray-400 text-sm leading-relaxed mb-8 max-w-xs">
                Breaking traditional boundaries with industry-first training in Film, VFX, and Media Design.
              </p>
              <motion.button 
                whileHover={{ scale: 1.05 }}
                className="flex items-center gap-2 bg-yellow-400 text-black px-6 py-3 rounded-full font-bold text-xs uppercase tracking-widest"
              >
                View Gallery <ArrowUpRight className="w-4 h-4" />
              </motion.button>
            </motion.div>
          </div>

          {/* RIGHT: The Visual (60%) */}
          <div className="md:w-[60%] relative group cursor-pointer">
            <motion.div 
              initial={{ scale: 1.2, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1.2 }}
              className="absolute inset-0"
            >
              <img 
                src="https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=1200" 
                alt="Cinematography" 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-transparent md:block hidden" />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />
            </motion.div>

            {/* Play Button Overlay */}
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div 
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-20 h-20 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center border border-white/20"
              >
                <PlayCircle className="w-10 h-10 text-white" />
              </motion.div>
            </div>

            {/* Floating Tag */}
            <div className="absolute bottom-10 right-10">
              <span className="bg-yellow-400 text-black px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest shadow-xl">
                Showcase 2026
              </span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default LevelUpCompact;