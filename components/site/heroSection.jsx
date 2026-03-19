"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Home,
  Library,
  User,
  FileText,
  Sparkles,
  Settings,
  ChevronRight,
} from "lucide-react";

const HeroSection = () => {
  // Enhanced variants to include the specific rotation for each card
  const floatingVariants = (delay = 0, yDelta = 15, rotateAngle = 0) => ({
    initial: {
      opacity: 0,
      scale: 0.9,
      rotate: rotateAngle, // Set the initial slant
    },
    animate: {
      opacity: 1,
      scale: 1,
      rotate: rotateAngle, // Maintain the slant during animation
      y: [0, yDelta, 0],
      transition: {
        y: {
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
          delay: delay,
        },
        opacity: { duration: 0.8 },
        scale: { duration: 0.8 },
      },
    },
  });

  return (
    <div className="relative min-h-[1200px] bg-white flex items-center justify-center p-12 md:p-24 font-sans overflow-hidden">
      {/* --- FLOATING CORNER CARDS --- */}

      {/* Top Left: ZERO 2 HERO - Rotated -12deg */}
      <motion.div
        variants={floatingVariants(0, -20, -12)}
        initial="initial"
        animate="animate"
        className="absolute top-[6%] left-[2%] w-[480px] h-[320px] bg-black rounded-[45px] shadow-2xl z-0 hidden xl:flex items-center justify-center overflow-hidden border border-white/10"
      >
        <Image
          src="/our-vision.jpg"
          alt="VR Media"
          fill
          className="object-cover"
        />
      </motion.div>

      {/* Top Right: VR Image - Rotated 12deg */}
      <motion.div
        variants={floatingVariants(0.5, 20, 12)}
        initial="initial"
        animate="animate"
        className="absolute top-[8%] right-[2%] w-[450px] h-[340px] bg-[#1a1125] rounded-[45px] shadow-2xl z-0 hidden xl:block overflow-hidden border border-white/5"
      >
        <Image
          src="/our-vision.jpg"
          alt="VR Media"
          fill
          className="object-cover"
        />
      </motion.div>

      {/* Bottom Left: Adsin Hub - Rotated 6deg */}
      <motion.div
        variants={floatingVariants(1, -15, 6)}
        initial="initial"
        animate="animate"
        className="absolute bottom-[5%] left-[1%] w-[420px] h-[300px] bg-[#1a1125] rounded-[45px] shadow-xl z-0 hidden overflow-hidden xl:flex items-center justify-center border border-gray-200"
      >
        <Image
          src="/our-vision.jpg"
          alt="VR Media"
          fill
          className="object-cover "
        />
      </motion.div>

      {/* Bottom Right: Sparkles - Rotated -6deg */}
      <motion.div
        variants={floatingVariants(1.5, 15, -6)}
        initial="initial"
        animate="animate"
        className="absolute bottom-[2%] right-[1%] w-[400px] h-[320px] bg-[#1a1125] rounded-[45px] shadow-xl z-0 overflow-hidden hidden xl:flex items-center justify-center border border-[#f07822]/20"
      >
        <Image
          src="/our-vision.jpg"
          alt="VR Media"
          fill
          className="object-cover"
        />
      </motion.div>

      {/* --- CENTRAL CONTAINER (PRESERVED STATIC) --- */}
      <div className="relative z-10 w-full max-w-5xl bg-white/95 backdrop-blur-3xl border border-white rounded-[50px] shadow-[0_40px_100px_-20px_rgba(0,0,0,0.15)] grid grid-cols-12 min-h-[700px] overflow-hidden">
        <aside className="col-span-12 lg:col-span-3 bg-gray-50/50 p-6 flex flex-col gap-5 border-r border-gray-100">
          <div className="bg-black text-white rounded-[35px] p-5 shadow-2xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 rounded-full bg-[#f07822] flex items-center justify-center font-black text-sm text-white">
                S
              </div>
              <span className="text-[11px] font-black uppercase tracking-widest">
                Student Portal
              </span>
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

          <div className="flex-1 bg-white rounded-[35px] p-7 border border-gray-100 shadow-sm">
            <h3 className="text-[10px] font-black uppercase tracking-[0.25em] text-gray-400 mb-6">
              Explore Menu
            </h3>
            <ul className="space-y-4">
              {[
                "About Us",
                "Vision",
                "Leadership",
                "Programs",
                "Courses",
                "Rankings",
                "Accreditation",
              ].map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-3 text-gray-600 hover:text-[#f07822] cursor-pointer text-[13px] font-bold group"
                >
                  <span className="text-[8px] text-[#f07822] group-hover:translate-x-1 transition-transform">
                    ▶
                  </span>{" "}
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </aside>

        <section className="col-span-12 lg:col-span-9 p-6 lg:p-7 flex flex-col">
          <div className="relative bg-[#080808] rounded-[45px] h-44 md:h-52 w-full flex flex-col items-center justify-center shadow-inner mb-14 overflow-visible">
            <div className="absolute inset-0 rounded-[45px] overflow-hidden pointer-events-none">
              <div className="absolute -top-24 -right-24 w-64 h-64 bg-[#f07822]/20 blur-[100px] rounded-full" />
            </div>

            <h1 className="relative z-10 text-3xl md:text-5xl font-black text-white text-center uppercase tracking-tighter">
              Learn Today
              <br />
              <span className="text-[#f07822]">Earn Tomorrow</span>
            </h1>

            <div className="absolute -bottom-7 flex items-center bg-[#080808] border border-white/10 rounded-full w-64 md:w-96 px-6 justify-evenly py-3 gap-4 md:gap-10 lg:gap-14 shadow-[0_20px_50px_rgba(0,0,0,0.5)] z-20">
              <User
                size={20}
                className="text-gray-400 hover:text-white cursor-pointer"
              />
              <FileText
                size={20}
                className="text-gray-400 hover:text-white cursor-pointer"
              />
              <Sparkles size={20} className="text-[#f07822]" />
              <Settings
                size={20}
                className="text-gray-400 hover:text-white cursor-pointer"
              />
              <div className="w-10 h-10 rounded-full bg-[#f07822] flex items-center justify-center text-white cursor-pointer hover:scale-110 transition-all shadow-lg shadow-[#f07822]/40">
                <ChevronRight size={22} strokeWidth={3} />
              </div>
            </div>
          </div>

          <div className="relative z-10">
            <div className="flex justify-between items-end mb-8 px-2">
              <h2 className="text-lg md:text-2xl font-black uppercase tracking-tight leading-none">
                Featured Courses
              </h2>
              <span className="text-[11px] font-bold text-[#f07822] uppercase tracking-widest cursor-pointer border-b-2 border-[#f07822] pb-0.5 transition-all">
                View All
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
  {[
    { title: "Digital Marketing", tag: "With AI" },
    { title: "Graphic Design", tag: "Pro UI/UX" },
    { title: "Multimedia", tag: "VFX & Edit" },
  ].map((course, i) => (
    <div
      key={i}
      className="relative group h-36 rounded-[25px] bg-white border border-gray-100 flex flex-col justify-end p-5 overflow-hidden hover:border-[#f07822]/30 hover:shadow-xl transition-all cursor-pointer"
    >
      <Image
        src="/film-editor.jpg"
        alt={course.title}
        fill
        className="object-cover group-hover:scale-105 transition-transform duration-300"
      />

      <div className="relative z-10 text-white">
        <h3 className="text-lg font-semibold">{course.title}</h3>
        <p className="text-sm opacity-80">{course.tag}</p>
      </div>

      <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition"></div>
    </div>
  ))}
</div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default HeroSection;
