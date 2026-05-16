"use client";

import React, { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowUpRight, PlayCircle } from "lucide-react";
import Link from "next/link";

// ✅ Outside component — never recreated
const contentVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};
const viewport = { once: true };

// ✅ Play icon pulse — defined once at module scope
const pulseTransition = { duration: 3, repeat: Infinity, ease: "easeInOut" };
const pulseAnimate = { scale: [1, 1.05, 1] };

const LevelUpSection = () => {
  const containerRef = useRef(null);
  const [videoLoaded, setVideoLoaded] = useState(false);

  // ✅ Reduced margin: "200px" — still lazy, but doesn't fire too early on mobile
  const isInView = useInView(containerRef, { once: true, margin: "200px" });

  return (
    <section ref={containerRef} className="py-6 md:py-10 px-4 lg:px-24 bg-white">
      <div className="mx-auto">
        <div className="flex flex-col md:flex-row bg-[#0a0a0a] rounded-[2rem] md:rounded-[3rem] overflow-hidden shadow-2xl min-h-[500px] md:min-h-[600px]">

          {/* LEFT: Content */}
          <div className="order-2 md:order-1 md:w-[40%] p-8 md:p-16 flex flex-col justify-center border-t md:border-t-0 md:border-r border-white/10">
            <motion.div
              variants={contentVariants}
              initial="hidden"
              whileInView="visible"
              viewport={viewport}
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

              {/* ✅ CSS-only hover — removed motion.button inside Link */}
              <Link
                href="/gallery/students-work"
                prefetch={false}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-yellow-400 text-black px-8 py-4 md:px-6 md:py-3 rounded-full font-bold text-xs uppercase tracking-widest transition-transform hover:scale-[1.02] active:scale-[0.98]"
              >
                View Gallery <ArrowUpRight className="w-4 h-4" />
              </Link>
            </motion.div>
          </div>

          {/* RIGHT: Video */}
          <div className="order-1 md:order-2 md:w-[60%] relative group min-h-[300px] md:min-h-full overflow-hidden bg-neutral-900">

            {isInView && (
              <video
                autoPlay
                loop
                muted
                playsInline
                onLoadedData={() => setVideoLoaded(true)}
                // ✅ Removed scale-125 (causes paint each frame)
                //    Using transform via CSS class that's GPU-composited
                //    will-change-transform tells browser to promote to its own layer
                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 will-change-transform [transform:scale(1.25)] ${
                  videoLoaded ? "opacity-100" : "opacity-0"
                }`}
                src="https://res.cloudinary.com/dauoxptqb/video/upload/f_auto,q_auto/v1777518818/website_p3semc.mp4"
              />
            )}

            {/* Placeholder */}
            <div
              className={`absolute inset-0 bg-neutral-900 transition-opacity duration-500 ${
                videoLoaded ? "opacity-0 pointer-events-none" : "opacity-100"
              }`}
            />

            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent md:bg-gradient-to-r md:from-[#0a0a0a] md:via-transparent pointer-events-none" />

            {/* ✅ Play icon only shown before video loads — stops the infinite animation once playing */}
            {!videoLoaded && (
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <motion.div
                  animate={pulseAnimate}
                  transition={pulseTransition}
                  className="w-14 h-14 md:w-20 md:h-20 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center border border-white/20"
                >
                  <PlayCircle className="w-6 h-6 md:w-10 md:h-10 text-white opacity-80" />
                </motion.div>
              </div>
            )}

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

export default LevelUpSection;