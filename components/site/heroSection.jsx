"use client";

import React, { memo } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import {
  Home, Library, User, FileText, Sparkles,
  Settings, ChevronRight, Camera, Code2, Film,
  Video, Shapes,
} from "lucide-react";

// ✅ Moved outside component — created once, never recreated on re-render
const makeFloatVariants = (delay = 0, yDelta = 15, rotateAngle = 0) => ({
  initial: { opacity: 0, scale: 0.9, rotate: rotateAngle },
  animate: {
    opacity: 1,
    scale: 1,
    rotate: rotateAngle,
    y: [0, yDelta, 0],
    transition: {
      y: { duration: 4, repeat: Infinity, ease: "easeInOut", delay },
      opacity: { duration: 0.8 },
      scale: { duration: 0.8 },
    },
  },
});

// ✅ Pre-computed variants — zero allocation during render
const cardVariants = {
  topLeft:     makeFloatVariants(0,   -20, -12),
  topRight:    makeFloatVariants(0.5,  20,  12),
  bottomLeft:  makeFloatVariants(1,   -15,   6),
  bottomRight: makeFloatVariants(1.5,  15,  -6),
};

const iconVariants = {
  premiereProIcon: makeFloatVariants(1.8,  10, -20),
  filmIcon:        makeFloatVariants(2.2, -15,  15),
  cameraIcon:      makeFloatVariants(2.2, -15,  15),
  code2Icon:       makeFloatVariants(1.4, -10,  25),
  videoIcon:       makeFloatVariants(1.4, -10,  25),
  shapesIcon:      makeFloatVariants(1.4, -10,  25),
};

// ✅ Static course images defined outside — no new array on each render
const COURSE_IMAGES = [
  "/featured-1.webp",
  "/featured-2.webp",
  "/WhatsApp-Image-2025-12-17-at-3.52.58-PM-2.jpeg",
  "/WhatsApp-Image-2025-12-17-at-3.52.57-PM.jpeg",
  "/4.jpeg",
  "/9.jpeg",
];

// ✅ Static menu items outside component
const MENU_ITEMS = ["About Us", "Vision", "Leadership", "Programs", "Courses", "Rankings", "Accreditation"];

// ✅ Memoized course card — prevents re-renders if parent updates
const CourseCard = memo(({ src, index }) => (
  <div className="relative group h-36 rounded-[16px] bg-white border border-gray-100 flex flex-col justify-end p-5 overflow-hidden hover:border-[#f07822]/30 hover:shadow-xl transition-all cursor-pointer">
    <Image
      src={src}
      alt="Course thumbnail"
      fill
      // ✅ sizes tells browser exact width — avoids downloading full-res on mobile
      sizes="(max-width: 768px) 100vw, 33vw"
      // ✅ first 2 cards above fold → eager; rest lazy
      loading={index < 2 ? "eager" : "lazy"}
      className="object-cover group-hover:scale-105 transition-transform duration-300"
    />
    <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition" />
  </div>
));
CourseCard.displayName = "CourseCard";

const HeroSection = () => {
  // ✅ Respects user's OS "Reduce Motion" accessibility setting
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="min-h-[1200px] flex flex-col items-center justify-center bg-gradient-to-br from-[#F09410] to-[#BC430D]">
      <div className="pt-[120px] lg:pt-[90px] w-full" aria-hidden="true" />

      {/* Floating Icons Layer */}
      {!prefersReducedMotion && (
        <div className="absolute inset-0 pointer-events-none hidden xl:block">
          <motion.div
            variants={iconVariants.premiereProIcon}
            initial="initial"
            animate="animate"
            className="absolute top-[90%] right-[9%] w-14 h-14 rounded-xl flex items-center justify-center"
          >
            <Image
              src="/floating-icons/premiere-pro-icon.png"
              alt="Adobe Premiere Pro"
              width={56}
              height={56}
              // ✅ decorative icon — defer loading, it's below fold
              loading="lazy"
              className="object-contain opacity-70"
            />
          </motion.div>

          <motion.div variants={iconVariants.filmIcon} initial="initial" animate="animate"
            className="absolute top-[86%] left-[8%] p-4 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 text-white/80 shadow-xl">
            <Film size={30} strokeWidth={1.2} />
          </motion.div>

          <motion.div variants={iconVariants.cameraIcon} initial="initial" animate="animate"
            className="absolute top-[20%] right-[33%] p-4 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 text-white/80 shadow-xl">
            <Camera size={30} strokeWidth={1.2} />
          </motion.div>

          <motion.div variants={iconVariants.code2Icon} initial="initial" animate="animate"
            className="absolute top-[28%] left-[33%] p-4 bg-white/10 backdrop-blur-md rounded-full border border-white/20 text-white shadow-xl">
            <Code2 size={28} strokeWidth={1.5} />
          </motion.div>

          <motion.div variants={iconVariants.videoIcon} initial="initial" animate="animate"
            className="absolute bottom-[-62%] left-[60%] p-4 bg-white/10 backdrop-blur-md rounded-full border border-white/20 text-white shadow-xl">
            <Video size={28} strokeWidth={1.5} />
          </motion.div>

          <motion.div variants={iconVariants.shapesIcon} initial="initial" animate="animate"
            className="absolute bottom-[-55%] left-[33%] p-4 bg-white/10 backdrop-blur-md rounded-full border border-white/20 text-white shadow-xl">
            <Shapes size={28} strokeWidth={1.5} />
          </motion.div>
        </div>
      )}

      <div className="relative min-h-[1200px] flex flex-col items-center justify-center w-full font-sans overflow-hidden">

        {/* Floating Image Cards */}
        {!prefersReducedMotion && (
          <>
            <motion.div variants={cardVariants.topLeft} initial="initial" animate="animate"
              className="absolute top-[6%] left-[2%] w-[450px] h-[320px] rounded-[45px] p-[15px] bg-white/25 backdrop-blur-md border border-white/30 shadow-2xl z-0 hidden xl:flex">
              <div className="relative w-full h-full rounded-[35px] overflow-hidden bg-black">
                <Image src="/floating-img-1.jpg" alt="Creative Media" fill
                  // ✅ above fold + large → priority load
                  priority
                  sizes="450px"
                  className="object-cover" />
              </div>
            </motion.div>

            <motion.div variants={cardVariants.topRight} initial="initial" animate="animate"
              className="absolute top-[8%] right-[2%] w-[450px] h-[320px] rounded-[45px] p-[15px] bg-white/25 backdrop-blur-md border border-white/30 shadow-2xl z-0 hidden xl:flex">
              <div className="relative w-full h-full rounded-[35px] overflow-hidden bg-[#1a1125]">
                <Image src="/vfx-and-animation-courses-in-kerala.jpg" alt="VFX and Animation Courses"
                  fill
                  // ✅ above fold → priority
                  priority
                  sizes="450px"
                  className="object-cover" />
              </div>
            </motion.div>

            <motion.div variants={cardVariants.bottomLeft} initial="initial" animate="animate"
              className="absolute bottom-[5%] left-[1%] w-[450px] h-[320px] rounded-[45px] p-[15px] bg-white/25 backdrop-blur-md border border-white/30 shadow-xl z-0 hidden xl:flex items-center justify-center">
              <div className="relative w-full h-full rounded-[35px] overflow-hidden bg-[#1a1125]">
                <Image src="/floating-img-2.jpg" alt="Creative Course" fill
                  sizes="450px"
                  loading="lazy"
                  className="object-cover" />
              </div>
            </motion.div>

            <motion.div variants={cardVariants.bottomRight} initial="initial" animate="animate"
              className="absolute bottom-[2%] right-[1%] w-[450px] h-[320px] rounded-[45px] p-[15px] bg-white/25 backdrop-blur-md border border-white/30 shadow-xl z-0 hidden xl:flex items-center justify-center">
              <div className="relative w-full h-full rounded-[35px] overflow-hidden bg-[#1a1125]">
                <Image src="/floating-img-3.jpg" alt="Creative Course" fill
                  sizes="450px"
                  loading="lazy"
                  className="object-cover" />
              </div>
            </motion.div>
          </>
        )}

        {/* Central UI Card */}
        <div className="relative z-10 mb-6 w-full max-w-5xl rounded-[50px] p-[18px] bg-white/25 backdrop-blur-xl border border-white/30 shadow-[0_40px_100px_-20px_rgba(0,0,0,0.2)] overflow-hidden">
          <div className="grid grid-cols-12 min-h-[700px] rounded-[40px] overflow-hidden bg-white/80">

            <aside className="col-span-12 lg:col-span-3 bg-gray-50 p-6 flex flex-col gap-5 border-r border-gray-100">
              <div className="bg-black text-white rounded-[35px] p-5 shadow-2xl">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-9 h-9 rounded-full bg-[#f07822] flex items-center justify-center font-black text-sm text-white">
                    S
                  </div>
                  <span className="text-[11px] font-black uppercase tracking-widest">Student Portal</span>
                </div>
                <nav className="space-y-5">
                  <div className="flex items-center gap-4 text-[#f07822] font-black cursor-pointer">
                    <Home size={20} /> <span className="text-sm">Home</span>
                  </div>
                  <div className="flex items-center gap-4 text-gray-500 cursor-pointer hover:text-white transition-colors">
                    <Library size={20} /> <span className="text-sm">Library</span>
                  </div>
                </nav>
              </div>

              <div className="flex-1 bg-white/60 rounded-[35px] p-7 border border-gray-100 shadow-sm">
                <h3 className="text-[10px] font-black uppercase tracking-[0.25em] text-gray-400 mb-6">Explore Menu</h3>
                <ul className="space-y-4">
                  {MENU_ITEMS.map((item) => (
                    <li key={item} className="flex items-center gap-3 text-gray-600 hover:text-[#f07822] cursor-pointer text-[13px] font-bold group">
                      <span className="text-[8px] text-[#f07822] group-hover:translate-x-1 transition-transform">▶</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </aside>

            <section className="col-span-12 bg-white/70 lg:col-span-9 p-6 lg:p-7 flex flex-col">
              <div className="relative bg-[#080808] rounded-[45px] h-44 md:h-52 w-full flex flex-col items-center justify-center shadow-inner mb-14 overflow-visible">
                <div className="absolute inset-0 rounded-[45px] overflow-hidden pointer-events-none">
                  <div className="absolute -top-24 -right-24 w-64 h-64 bg-[#f07822]/20 blur-[100px] rounded-full" />
                </div>
                <h1 className="relative z-10 text-3xl md:text-5xl font-black text-white text-center uppercase tracking-tighter">
                  Learn Today<br />
                  <span className="text-[#f07822]">Earn Tomorrow</span>
                </h1>
                <div className="absolute -bottom-7 flex items-center bg-[#080808] border border-white/10 rounded-full w-64 md:w-96 px-6 justify-evenly py-3 gap-4 md:gap-10 lg:gap-14 shadow-[0_20px_50px_rgba(0,0,0,0.5)] z-20">
                  <User size={20} className="text-gray-400 hover:text-white cursor-pointer" />
                  <FileText size={20} className="text-gray-400 hover:text-white cursor-pointer" />
                  <Sparkles size={20} className="text-[#f07822]" />
                  <Settings size={20} className="text-gray-400 hover:text-white cursor-pointer" />
                  <div className="w-10 h-10 rounded-full bg-[#f07822] flex items-center justify-center text-white cursor-pointer hover:scale-110 transition-all shadow-lg shadow-[#f07822]/40">
                    <ChevronRight size={22} strokeWidth={3} />
                  </div>
                </div>
              </div>

              <div className="relative z-10">
                <div className="flex justify-between items-end mb-8 px-2">
                  <h2 className="text-lg md:text-2xl font-black uppercase tracking-tight leading-none">Featured Courses</h2>
                  <span className="text-[11px] font-bold text-[#f07822] uppercase tracking-widest cursor-pointer border-b-2 border-[#f07822] pb-0.5 transition-all">
                    View All
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {COURSE_IMAGES.map((src, i) => (
                    <CourseCard key={src} src={src} index={i} />
                  ))}
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;