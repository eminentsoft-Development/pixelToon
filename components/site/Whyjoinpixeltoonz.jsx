"use client";

import React from "react";
import { useInView } from "framer-motion"; // ✅ already in your bundle
import { useRef } from "react";

// ✅ Feature data outside component — created once at module load
// ✅ Icons as plain JSX — no className that changes, so React can diff cheaply
const features = [
  {
    icon: (
      <svg viewBox="0 0 64 64" fill="none" className="w-10 h-10 md:w-12 md:h-12" aria-hidden="true">
        <circle cx="32" cy="28" r="18" stroke="currentColor" strokeWidth="3" />
        <text x="32" y="34" textAnchor="middle" fill="currentColor" fontSize="16" fontWeight="bold">1</text>
        <path d="M20 44 L14 58 L32 52 L50 58 L44 44" stroke="currentColor" strokeWidth="3" strokeLinejoin="round" />
      </svg>
    ),
    title: "Top Rated Institute",
    subtitle: "in Kerala",
  },
  {
    icon: (
      <svg viewBox="0 0 64 64" fill="none" className="w-10 h-10 md:w-12 md:h-12" aria-hidden="true">
        <circle cx="32" cy="32" r="22" stroke="currentColor" strokeWidth="3" />
        <path d="M22 28 L28 34 L42 20" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M20 42 Q32 48 44 42" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
    title: "Authorized Training",
    subtitle: "STED Council Partner",
  },
  {
    icon: (
      <svg viewBox="0 0 64 64" fill="none" className="w-10 h-10 md:w-12 md:h-12" aria-hidden="true">
        <rect x="8" y="12" width="40" height="30" rx="3" stroke="currentColor" strokeWidth="3" />
        <path d="M20 42 L20 52 M44 42 L44 52 M14 52 L50 52" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
        <circle cx="44" cy="18" r="8" fill="currentColor" opacity="0.15" />
      </svg>
    ),
    title: "Smart Classrooms",
    subtitle: "Modern Tech",
  },
  {
    icon: (
      <svg viewBox="0 0 64 64" fill="none" className="w-10 h-10 md:w-12 md:h-12" aria-hidden="true">
        <rect x="10" y="14" width="28" height="6" rx="2" stroke="currentColor" strokeWidth="2.5" />
        <rect x="10" y="26" width="28" height="6" rx="2" stroke="currentColor" strokeWidth="2.5" />
        <circle cx="48" cy="44" r="10" stroke="currentColor" strokeWidth="2.5" />
        <path d="M44 44 L47 47 L52 41" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    title: "Production Oriented",
    subtitle: "Industry Training",
  },
  {
    icon: (
      <svg viewBox="0 0 64 64" fill="none" className="w-10 h-10 md:w-12 md:h-12" aria-hidden="true">
        <circle cx="32" cy="32" r="22" stroke="currentColor" strokeWidth="3" strokeDasharray="4 3" />
        <path d="M32 20 L32 32 L40 38" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    title: "Infinite Lab Hours",
    subtitle: "Open Access",
  },
  {
    icon: (
      <svg viewBox="0 0 64 64" fill="none" className="w-10 h-10 md:w-12 md:h-12" aria-hidden="true">
        <circle cx="22" cy="22" r="10" stroke="currentColor" strokeWidth="2.5" />
        <circle cx="42" cy="22" r="10" stroke="currentColor" strokeWidth="2.5" />
        <path d="M10 52 Q10 38 32 38 Q54 38 54 52" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      </svg>
    ),
    title: "Individual Attention",
    subtitle: "Personal Mentoring",
  },
  {
    icon: (
      <svg viewBox="0 0 64 64" fill="none" className="w-10 h-10 md:w-12 md:h-12" aria-hidden="true">
        <circle cx="32" cy="30" r="14" stroke="currentColor" strokeWidth="2.5" />
        <path d="M32 16 L32 8 M46 14 L40 20 M52 30 L44 30" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <circle cx="32" cy="30" r="5" fill="currentColor" opacity="0.3" />
      </svg>
    ),
    title: "Live Project Training",
    subtitle: "Hands-On Experience",
  },
  {
    icon: (
      <svg viewBox="0 0 64 64" fill="none" className="w-10 h-10 md:w-12 md:h-12" aria-hidden="true">
        <rect x="14" y="10" width="36" height="44" rx="3" stroke="currentColor" strokeWidth="2.5" />
        <line x1="22" y1="22" x2="42" y2="22" stroke="currentColor" strokeWidth="2" />
        <path d="M38 44 L42 40 L46 44" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    title: "Updated Curriculum",
    subtitle: "Always Current",
  },
];

export default function WhyJoinPixeltoonz() {
  const sectionRef = useRef(null);

  // ✅ useInView from framer-motion — already in bundle, handles cleanup internally
  const isVisible = useInView(sectionRef, { once: true, margin: "50px" });

  return (
    <section
      ref={sectionRef}
      className="relative py-16 md:py-24 px-4 bg-gradient-to-b from-white via-orange-50/20 to-white overflow-hidden"
    >
      {/* Background blob */}
      <div className="absolute top-0 left-1/4 w-72 h-72 bg-orange-100 rounded-full blur-[100px] opacity-20 -translate-y-1/2 pointer-events-none" />

      <div className="relative lg:px-28 mx-auto">
        {/* Header */}
        <div
          className={`text-center mb-12 md:mb-16 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          {/* ✅ font-sora Tailwind class instead of inline style — no object per render */}
          <span className="font-sora inline-block text-orange-500 font-semibold text-xs tracking-widest uppercase mb-4 px-4 py-1.5 bg-orange-50 rounded-full border border-orange-100">
            Our Advantages
          </span>
          <h2 className="font-sora text-3xl md:text-5xl font-extrabold text-gray-900 mt-2">
            Why Join{" "}
            <span className="text-orange-500 relative">
              Pixeltoonz
              <svg className="absolute -bottom-1 left-0 w-full h-2" viewBox="0 0 200 12" preserveAspectRatio="none" aria-hidden="true">
                <path d="M0 8 Q50 2 100 8 Q150 14 200 8" stroke="#fdba74" strokeWidth="3" fill="none" />
              </svg>
            </span>{" "}
            ?
          </h2>
          <p className="mt-4 text-gray-500 text-base md:text-lg max-w-xl mx-auto">
            Industry-standard training in animation, VFX, and digital design.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
          {features.map((feature) => (
            <div
              key={feature.title} // ✅ stable key
              className={`group relative bg-white rounded-2xl p-5 md:p-8 border border-orange-100 shadow-sm transition-all duration-500 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              // ✅ will-change removed from always-on CSS class
              //    only applied during the transition window via inline style
              style={{
                transitionDelay: isVisible ? `${features.indexOf(feature) * 50}ms` : "0ms",
              }}
            >
              <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-orange-400 group-hover:w-full transition-all duration-300 rounded-full" />

              <div className="relative mb-4 md:mb-5">
                <div className="inline-flex items-center justify-center w-12 h-12 md:w-16 md:h-16 rounded-xl bg-orange-50 text-orange-500 group-hover:bg-orange-500 group-hover:text-white transition-all duration-300">
                  {feature.icon}
                </div>
              </div>

              <h3 className="font-sora font-bold text-gray-900 text-sm md:text-lg leading-tight mb-1">
                {feature.title}
              </h3>
              <p className="font-sora text-orange-500 text-[10px] md:text-sm font-semibold">
                {feature.subtitle}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}