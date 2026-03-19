"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Plus, Quote, RefreshCcw } from "lucide-react";

const stories = [
  {
    name: "Rahul Sharma",
    role: "VFX @ RedChillies",
    text: "Pixeltoonz changed my perspective on digital art. The training was exactly what the industry demanded.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=600",
  },
  {
    name: "Anjali Nair",
    role: "Senior Video Editor",
    text: "The mentorship here is unparalleled. I went from knowing nothing to editing professional shorts.",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=600",
  },
  {
    name: "Kevin Joseph",
    role: "Commercial Photographer",
    text: "From lighting techniques to client management, Pixeltoonz prepares you for the real world.",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=600",
  },
  {
    name: "Sneha Reddy",
    role: "UI/UX Designer",
    text: "The blend of technology and art here is unique. It helped me land my dream job in Kochi.",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=600",
  }
];

const StackedSuccess = () => {
  const [index, setIndex] = useState(0);

  // Auto-shuffle every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % stories.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextCard = () => setIndex((prev) => (prev + 1) % stories.length);

  return (
    <section className="relative py-24 bg-white overflow-hidden px-4 lg:px-28">
      {/* Background Large Text (Reference to image_e31c7a) */}
      <div className="absolute top-1/2 -translate-y-1/2 left-0 w-full opacity-[0.03] select-none pointer-events-none">
        <h2 className="text-[25vw] font-black uppercase tracking-tighter leading-none whitespace-nowrap"
            style={{ WebkitTextStroke: '3px #000', color: 'transparent' }}>
          ALUMNI SPOTLIGHT
        </h2>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          
          {/* LEFT: Static Content */}
          <div className="space-y-8">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center">
                <Plus className="text-yellow-400 w-6 h-6" />
              </div>
              <span className="font-black uppercase tracking-widest text-xs">Hall of Fame</span>
            </div>
            
            <h2 className="text-6xl md:text-8xl font-black text-black leading-[0.85] tracking-tighter uppercase">
              REWRITING <br />
              <span className="text-yellow-400">THE RULES.</span>
            </h2>
            
            <p className="text-gray-500 font-bold text-sm max-w-sm leading-relaxed border-l-2 border-black pl-6">
              Our graduates dont just find jobs; they create impact. Click the deck to shuffle through our latest success stories.
            </p>

            <div className="flex items-center gap-6 pt-4">
               <div className="text-center">
                  <div className="text-4xl font-black italic tracking-tighter">5K+</div>
                  <div className="text-[10px] font-bold uppercase text-gray-400">Graduates</div>
               </div>
               <div className="h-10 w-[1px] bg-gray-200" />
               <div className="text-center">
                  <div className="text-4xl font-black italic tracking-tighter">94%</div>
                  <div className="text-[10px] font-bold uppercase text-gray-400">Placement</div>
               </div>
            </div>
          </div>

          {/* RIGHT: The Animated Deck */}
          <div className="relative h-[500px] w-full flex items-center justify-center cursor-pointer" onClick={nextCard}>
            <AnimatePresence mode="popLayout">
              {stories.map((story, i) => {
                // Only render the current card and the one below it for performance
                if (i !== index) return null;

                return (
                  <motion.div
                    key={i}
                    initial={{ scale: 0.9, opacity: 0, rotate: -5, x: 100 }}
                    animate={{ scale: 1, opacity: 1, rotate: 0, x: 0 }}
                    exit={{ x: -500, opacity: 0, rotate: -15, scale: 0.9 }}
                    transition={{ type: "spring", stiffness: 260, damping: 20 }}
                    className="absolute w-full max-w-[450px]"
                  >
                    {/* The Card Style matches your previous favorite */}
                    <div className="bg-[#111] rounded-[2.5rem] p-10 shadow-[20px_20px_0px_#f07822] border-2 border-black group relative overflow-hidden">
                      
                      {/* Number Indicator */}
                      <span className="absolute top-8 right-10 text-5xl font-black text-white/5 uppercase italic">
                        {i + 1}/{stories.length}
                      </span>

                      <div className="flex flex-col gap-8">
                        <div className="relative w-24 h-24 rounded-2xl overflow-hidden border-2 border-primary">
                          <Image src={story.image} alt={story.name} fill className="object-cover" />
                        </div>

                        <div className="space-y-4">
                          <Quote className="w-8 h-8 text-primary" />
                          <p className="text-xl md:text-2xl font-bold text-white leading-tight">
                            {story.text}
                          </p>
                        </div>

                        <div className="pt-6 border-t border-white/10 flex justify-between items-end">
                          <div>
                            <h4 className="text-white font-black uppercase tracking-tighter text-lg">{story.name}</h4>
                            <p className="text-primary text-[10px] font-black uppercase tracking-widest">{story.role}</p>
                          </div>
                          <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
                             <RefreshCcw className="w-4 h-4 text-black animate-spin-slow" />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Fake cards behind for "Depth" */}
                    <div className="absolute inset-0 bg-zinc-900 rounded-[2.5rem] -z-10 translate-x-4 translate-y-4 border-2 border-black opacity-40" />
                    <div className="absolute inset-0 bg-zinc-800 rounded-[2.5rem] -z-20 translate-x-8 translate-y-8 border-2 border-black opacity-20" />
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>

        </div>
      </div>
    </section>
  );
};

export default StackedSuccess;