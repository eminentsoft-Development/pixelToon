"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, PlayCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const LevelUpCompact = () => {
  return (
    <section className="py-6 md:py-10 px-4 md:px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row bg-[#0a0a0a] rounded-[2rem] md:rounded-[3rem] overflow-hidden shadow-2xl min-h-[500px] md:min-h-[600px]">
          {/* LEFT: The Message (Vertical stack on mobile, 40% width on Desktop) */}
          <div className="order-2 md:order-1 md:w-[40%] p-8 md:p-16 flex flex-col justify-center border-t md:border-t-0 md:border-r border-white/10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white leading-[0.95] md:leading-[0.9] uppercase tracking-tighter mb-4 md:mb-6">
                Education <br />
                <span className="text-gray-500 italic font-medium text-2xl sm:text-3xl md:text-4xl">
                  Taken to the
                </span>{" "}
                <br />
                <span className="text-yellow-400">Next Level</span>
              </h2>
              <p className="text-gray-400 text-sm leading-relaxed mb-6 md:mb-8 max-w-xs">
                Breaking traditional boundaries with industry-first training in
                Film, VFX, and Media Design.
              </p>
              <Link href={"/gallery/students-work"}>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full sm:w-auto flex items-center justify-center gap-2 bg-yellow-400 text-black px-8 py-4 md:px-6 md:py-3 rounded-full font-bold text-xs uppercase tracking-widest"
                >
                  View Gallery <ArrowUpRight className="w-4 h-4" />
                </motion.button>
              </Link>
            </motion.div>
          </div>

          {/* RIGHT: The Visual (Top on mobile, 60% width on Desktop) */}
          <div className="order-1 md:order-2 md:w-[60%] relative group cursor-pointer min-h-[300px] md:min-h-full overflow-hidden">
            <motion.div
              initial={{ scale: 1.1, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1.2 }}
              className="absolute inset-0"
            >
              {/* Video Replacement */}
              <video
                src="https://res.cloudinary.com/dauoxptqb/video/upload/q_auto/f_auto/v1777518818/website_p3semc.mp4"
                autoPlay
                loop
                muted
                playsInline
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 scale-125"
              />

              {/* Gradient Overlay - Adaptive */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent md:bg-gradient-to-r md:from-[#0a0a0a] md:via-transparent pointer-events-none" />
              <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors pointer-events-none" />
            </motion.div>

            {/* Play Button Overlay - Smaller on mobile */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-16 h-16 md:w-20 md:h-20 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center border border-white/20"
              >
                <PlayCircle className="w-8 h-8 md:w-10 md:h-10 text-white" />
              </motion.div>
            </div>

            {/* Floating Tag - Responsive Position */}
            <div className="absolute bottom-4 right-4 md:bottom-10 md:right-10 pointer-events-none">
              <span className="bg-yellow-400 text-black px-3 py-1 md:px-4 md:py-1 rounded-full text-[9px] md:text-[10px] font-black uppercase tracking-widest shadow-xl">
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
