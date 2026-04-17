"use client";

import { useEffect, useRef, useState } from "react";

const features = [
  {
    icon: (
      <svg viewBox="0 0 64 64" fill="none" className="w-12 h-12">
        <circle cx="32" cy="28" r="18" stroke="currentColor" strokeWidth="3" fill="none" />
        <text x="32" y="34" textAnchor="middle" fill="currentColor" fontSize="16" fontWeight="bold">1</text>
        <path d="M20 44 L14 58 L32 52 L50 58 L44 44" stroke="currentColor" strokeWidth="3" fill="none" strokeLinejoin="round" />
      </svg>
    ),
    title: "Top Rated Institute",
    subtitle: "in Kerala",
    description: "Consistently ranked #1 for animation & VFX education across the state.",
  },
  {
    icon: (
      <svg viewBox="0 0 64 64" fill="none" className="w-12 h-12">
        <circle cx="32" cy="32" r="22" stroke="currentColor" strokeWidth="3" fill="none" />
        <path d="M22 28 L28 34 L42 20" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M20 42 Q32 48 44 42" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none" />
      </svg>
    ),
    title: "Authorized Training",
    subtitle: "Partner of STED Council",
    description: "Officially recognized and certified by the national STED Council body.",
  },
  {
    icon: (
      <svg viewBox="0 0 64 64" fill="none" className="w-12 h-12">
        <rect x="8" y="12" width="40" height="30" rx="3" stroke="currentColor" strokeWidth="3" fill="none" />
        <path d="M20 42 L20 52 M44 42 L44 52 M14 52 L50 52" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
        <circle cx="44" cy="18" r="8" fill="currentColor" opacity="0.15" stroke="currentColor" strokeWidth="2" />
        <line x1="41" y1="18" x2="47" y2="18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <line x1="44" y1="15" x2="44" y2="21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
    title: "Smart Classrooms",
    subtitle: "Modern Infrastructure",
    description: "Tech-enabled learning spaces designed for creative and digital workflows.",
  },
  {
    icon: (
      <svg viewBox="0 0 64 64" fill="none" className="w-12 h-12">
        <rect x="10" y="14" width="28" height="6" rx="2" stroke="currentColor" strokeWidth="2.5" fill="none" />
        <rect x="10" y="26" width="28" height="6" rx="2" stroke="currentColor" strokeWidth="2.5" fill="none" />
        <rect x="10" y="38" width="28" height="6" rx="2" stroke="currentColor" strokeWidth="2.5" fill="none" />
        <circle cx="48" cy="44" r="10" stroke="currentColor" strokeWidth="2.5" fill="none" />
        <path d="M44 44 L47 47 L52 41" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    title: "Production Oriented",
    subtitle: "Industry Training",
    description: "Curriculum crafted around real-world production pipelines and workflows.",
  },
  {
    icon: (
      <svg viewBox="0 0 64 64" fill="none" className="w-12 h-12">
        <circle cx="32" cy="32" r="22" stroke="currentColor" strokeWidth="3" fill="none" strokeDasharray="4 3" />
        <circle cx="32" cy="32" r="16" stroke="currentColor" strokeWidth="2" fill="none" />
        <path d="M32 20 L32 32 L40 38" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    title: "Infinite Lab Hours",
    subtitle: "Open Access",
    description: "Round-the-clock lab access so your creativity never has to wait.",
  },
  {
    icon: (
      <svg viewBox="0 0 64 64" fill="none" className="w-12 h-12">
        <circle cx="22" cy="22" r="10" stroke="currentColor" strokeWidth="2.5" fill="none" />
        <circle cx="42" cy="22" r="10" stroke="currentColor" strokeWidth="2.5" fill="none" />
        <path d="M10 52 Q10 38 22 38 Q32 38 32 38 Q32 38 42 38 Q54 38 54 52" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" />
        <path d="M26 22 L38 22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeDasharray="2 2" />
      </svg>
    ),
    title: "Individual Attention",
    subtitle: "Personalized Mentoring",
    description: "Low student-to-faculty ratios ensure every learner gets focused guidance.",
  },
  {
    icon: (
      <svg viewBox="0 0 64 64" fill="none" className="w-12 h-12">
        <circle cx="32" cy="30" r="14" stroke="currentColor" strokeWidth="2.5" fill="none" />
        <path d="M32 16 L32 8 M40 20 L46 14 M44 30 L52 30 M40 40 L46 46 M32 44 L32 52 M24 40 L18 46 M20 30 L12 30 M24 20 L18 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <circle cx="32" cy="30" r="5" fill="currentColor" opacity="0.3" stroke="currentColor" strokeWidth="2" />
      </svg>
    ),
    title: "Live Project Training",
    subtitle: "Hands-On Experience",
    description: "Work on actual client briefs and studio projects during your course.",
  },
  {
    icon: (
      <svg viewBox="0 0 64 64" fill="none" className="w-12 h-12">
        <rect x="14" y="10" width="36" height="44" rx="3" stroke="currentColor" strokeWidth="2.5" fill="none" />
        <line x1="22" y1="22" x2="42" y2="22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <line x1="22" y1="30" x2="42" y2="30" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <line x1="22" y1="38" x2="34" y2="38" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <path d="M38 44 L42 40 L46 44" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    title: "Up-to-Date Curriculum",
    subtitle: "Always Current",
    description: "Syllabus revised every semester to reflect the latest industry tools and trends.",
  },
];

function FeatureCard({ feature, index }) {
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.15 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className="group relative"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(32px)",
        transition: `opacity 0.6s ease ${index * 80}ms, transform 0.6s ease ${index * 80}ms`,
      }}
    >
      {/* Card */}
      <div className="relative bg-white rounded-2xl p-8 h-full border border-orange-100 shadow-sm overflow-hidden
        transition-all duration-300 group-hover:shadow-xl group-hover:shadow-orange-200/40 group-hover:-translate-y-1">

        {/* Subtle corner accent */}
        <div className="absolute top-0 right-0 w-20 h-20 bg-orange-50 rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Animated bottom bar */}
        <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-gradient-to-r from-orange-400 to-amber-400 group-hover:w-full transition-all duration-500 ease-out rounded-full" />

        {/* Icon */}
        <div className="relative mb-5">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-xl bg-orange-50 text-orange-500
            group-hover:bg-orange-500 group-hover:text-white transition-all duration-300 group-hover:scale-110 group-hover:rotate-3">
            {feature.icon}
          </div>
        </div>

        {/* Text */}
        <h3 className="font-bold text-gray-900 text-lg leading-tight mb-0.5 group-hover:text-orange-600 transition-colors duration-200"
          style={{ fontFamily: "'Sora', sans-serif" }}>
          {feature.title}
        </h3>
        <p className="text-orange-500 text-sm font-semibold mb-3"
          style={{ fontFamily: "'Sora', sans-serif" }}>
          {feature.subtitle}
        </p>
        {/* <p className="text-gray-500 text-sm leading-relaxed">
          {feature.description}
        </p> */}
      </div>
    </div>
  );
}

export default function WhyJoinPixeltoonz() {
  const [titleVisible, setTitleVisible] = useState(false);
  const titleRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setTitleVisible(true); },
      { threshold: 0.1 }
    );
    if (titleRef.current) observer.observe(titleRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      {/* Google Fonts */}
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700;800&display=swap');`}</style>

      <section className="relative py-24 px-4 bg-gradient-to-b from-white via-orange-50/30 to-white overflow-hidden">

        {/* Background decorative blobs */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-orange-100 rounded-full blur-3xl opacity-30 -translate-y-1/2 pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-amber-100 rounded-full blur-3xl opacity-30 translate-y-1/2 pointer-events-none" />

        <div className="relative lg:px-28 mx-auto">

          {/* Header */}
          <div
            ref={titleRef}
            className="text-center mb-16"
            style={{
              opacity: titleVisible ? 1 : 0,
              transform: titleVisible ? "translateY(0)" : "translateY(20px)",
              transition: "opacity 0.7s ease, transform 0.7s ease",
            }}
          >
            <span className="inline-block text-orange-500 font-semibold text-sm tracking-widest uppercase mb-4 px-4 py-1.5 bg-orange-50 rounded-full border border-orange-200"
              style={{ fontFamily: "'Sora', sans-serif" }}>
              Our Advantages
            </span>
            <h2
              className="text-5xl font-extrabold text-gray-900 mt-2"
              style={{ fontFamily: "'Sora', sans-serif" }}
            >
              Why Join{" "}
              <span className="relative inline-block">
                <span className="relative z-10 text-orange-500">Pixeltoonz</span>
                <svg className="absolute -bottom-1 left-0 w-full" viewBox="0 0 200 12" preserveAspectRatio="none" height="10">
                  <path d="M0 8 Q50 2 100 8 Q150 14 200 8" stroke="#fdba74" strokeWidth="3" fill="none" strokeLinecap="round" />
                </svg>
              </span>
              <span className="text-gray-900"> ?</span>
            </h2>
            <p className="mt-4 text-gray-500 text-lg max-w-xl mx-auto">
              Everything you need to launch a career in animation, VFX, and digital design — all under one roof.
            </p>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {features.map((feature, i) => (
              <FeatureCard key={i} feature={feature} index={i} />
            ))}
          </div>

        </div>
      </section>
    </>
  );
}