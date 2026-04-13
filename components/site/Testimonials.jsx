"use client";

import { useEffect, useRef, useState, useCallback } from "react";

const testimonials = [
  {
    quote: "My experience at Pixeltoonz was full of learning and grooming. Before joining, I had no idea about turning my passion into a profession. Pixeltoonz shaped me as a designer and I am proud of who I am today.",
    name: "Nithin Chandran",
    course: "Graphics & Web Development",
    initials: "NC",
    year: "2023",
    index: "01",
  },
  {
    quote: "The production-oriented curriculum gave me a real edge. Within months of completing my course, I landed a role at a leading animation studio. The mentors push you to exceed your own expectations every day.",
    name: "Arya Krishnan",
    course: "3D Animation & VFX",
    initials: "AK",
    year: "2022",
    index: "02",
  },
  {
    quote: "Infinite lab hours meant I could practice at 2 AM when inspiration struck. That freedom transformed me from a complete beginner into a confident motion designer in under a year.",
    name: "Rahul Menon",
    course: "Motion Graphics",
    initials: "RM",
    year: "2023",
    index: "03",
  },
  {
    quote: "What sets Pixeltoonz apart is the individual attention each student gets. My mentor knew exactly where I struggled and helped me grow in ways I could not have imagined on my own.",
    name: "Sneha Nair",
    course: "UI/UX & Multimedia",
    initials: "SN",
    year: "2024",
    index: "04",
  },
  {
    quote: "The live project training was a game-changer. I worked on real client deliverables while still a student, which made my portfolio stand out instantly. Pixeltoonz launches careers.",
    name: "Aditya Varma",
    course: "Visual Effects",
    initials: "AV",
    year: "2022",
    index: "05",
  },
];

export default function Testimonials() {
  const [active, setActive] = useState(0);
  const [animDir, setAnimDir] = useState(null);
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef(null);
  const autoRef = useRef(null);

  const go = useCallback(
    (index, dir = "next") => {
      if (index === active) return;
      setAnimDir(dir);
      setTimeout(() => {
        setActive(index);
        setAnimDir(null);
      }, 400);
    },
    [active]
  );

  const next = useCallback(
    () => go((active + 1) % testimonials.length, "next"),
    [active, go]
  );
  const prev = () =>
    go((active - 1 + testimonials.length) % testimonials.length, "prev");

  useEffect(() => {
    autoRef.current = setInterval(next, 5500);
    return () => { if (autoRef.current) clearInterval(autoRef.current); };
  }, [next]);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  const t = testimonials[active];

  return (
    <section
      ref={sectionRef}
      className={`relative overflow-hidden bg-[#080808] font-['Outfit',sans-serif] transition-opacity duration-1000 ${
        visible ? "opacity-100" : "opacity-0"
      }`}
    >
      {/* Ambient glow */}
      <div
        className="absolute pointer-events-none top-[20%] left-[30%] w-[60%] h-[60%] animate-[glowPulse_4s_ease-in-out_infinite]"
        style={{
          background: "radial-gradient(ellipse at center, rgba(251,146,60,0.18) 0%, transparent 70%)",
        }}
      />

      {/* Dot grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.12) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      {/* Top label bar */}
      <div
        className={`relative border-b border-white/[0.06] px-8 md:px-16 py-5 flex items-center justify-between transition-all duration-700 delay-100 ${
          visible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2.5"
        }`}
      >
        <div className="flex items-center gap-3">
          <div
            className="w-1.5 h-1.5 rounded-full bg-orange-400"
            style={{ boxShadow: "0 0 8px rgba(251,146,60,0.8)" }}
          />
          <span className="text-white/30 text-xs tracking-[0.3em] uppercase font-['Outfit',sans-serif]">
            Testimonials
          </span>
        </div>
        <span className="text-white/15 text-xs tracking-widest font-mono">
          PIXELTOONZ ACADEMY
        </span>
      </div>

      <div className="relative px-8 md:px-16 pt-16 pb-20">
        <div className="max-w-7xl mx-auto">

          {/* Heading row */}
          <div
            className={`flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 transition-all duration-700 delay-200 ${
              visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
            }`}
          >
            <h2 className="text-white font-['Cormorant_Garamond',serif] font-light leading-[1.05] tracking-[-0.02em] text-[clamp(2.8rem,6vw,5.5rem)]">
              What our{" "}
              <span
                className="italic font-semibold bg-gradient-to-br from-orange-400 to-amber-400 bg-clip-text text-transparent"
              >
                students
              </span>
              <br />
              have to say
            </h2>

            {/* Nav arrows */}
            <div className="flex items-center gap-3 mb-2">
              <button
                onClick={prev}
                className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white/30 hover:border-orange-400/50 hover:text-orange-400 transition-all duration-300"
                aria-label="Previous"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                onClick={next}
                className="w-12 h-12 rounded-full border border-orange-400/40 flex items-center justify-center text-orange-400 hover:bg-orange-400 hover:text-black transition-all duration-300"
                aria-label="Next"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>

          {/* Main card area */}
          <div
            className={`grid grid-cols-1 lg:grid-cols-[auto_1fr] gap-0 transition-all duration-700 delay-300 ${
              visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            {/* Left: big index number */}
            <div className="hidden lg:flex flex-col items-center pr-12 pt-2">
              <div
                key={active}
                className="animate-[numberFade_0.5s_ease_forwards] font-['Cormorant_Garamond',serif] text-[7rem] font-semibold leading-none select-none w-20 text-center"
                style={{
                  color: "transparent",
                  WebkitTextStroke: "1px rgba(251,146,60,0.25)",
                }}
              >
                {t.index}
              </div>
              <div
                className="flex-1 w-px mt-4 min-h-[80px]"
                style={{
                  background: "linear-gradient(to bottom, rgba(251,146,60,0.2), transparent)",
                }}
              />
            </div>

            {/* Center: quote */}
            <div className="relative">
              {/* Top accent line */}
              <div
                key={`line-${active}`}
                className="animate-[lineGrow_0.8s_cubic-bezier(0.22,1,0.36,1)_forwards] h-px mb-10 origin-left"
                style={{
                  background: "linear-gradient(90deg, #fb923c, #fbbf24 60%, transparent)",
                  width: "100%",
                }}
              />

              {/* Quote block */}
              <div key={`quote-${active}`} className="animate-[quoteEnter_0.5s_cubic-bezier(0.22,1,0.36,1)_forwards]">
                <blockquote className="font-['Cormorant_Garamond',serif] font-light italic text-white/85 leading-relaxed tracking-[0.01em] mb-10 text-[clamp(1.35rem,2.8vw,2.1rem)]">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>

                {/* Author */}
                <div className="flex items-center gap-5">
                  {/* Avatar with spinning dashed ring */}
                  <div className="relative w-14 h-14 flex-shrink-0">
                    <svg
                      className="animate-[ringSpin_8s_linear_infinite] absolute inset-0 w-full h-full"
                      viewBox="0 0 56 56"
                      fill="none"
                    >
                      <circle
                        cx="28" cy="28" r="26"
                        stroke="url(#ringGrad)"
                        strokeWidth="1"
                        strokeDasharray="4 4"
                        opacity="0.6"
                      />
                      <defs>
                        <linearGradient id="ringGrad" x1="0" y1="0" x2="56" y2="56">
                          <stop stopColor="#fb923c" />
                          <stop offset="1" stopColor="#fbbf24" />
                        </linearGradient>
                      </defs>
                    </svg>
                    <div
                      className="absolute inset-1.5 rounded-full flex items-center justify-center text-sm font-semibold text-black bg-gradient-to-br from-orange-400 to-amber-400"
                      style={{ boxShadow: "0 0 20px rgba(251,146,60,0.4)" }}
                    >
                      {t.initials}
                    </div>
                  </div>

                  <div>
                    <p className="text-white font-semibold text-base mb-0.5 font-['Outfit',sans-serif]">
                      {t.name}
                    </p>
                    <p className="text-sm text-orange-400/70 font-['Outfit',sans-serif]">
                      {t.course} &nbsp;·&nbsp; Class of {t.year}
                    </p>
                  </div>

                  {/* Stars */}
                  <div className="ml-auto hidden sm:flex gap-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <svg
                        key={i}
                        className="w-4 h-4 text-orange-400"
                        style={{ opacity: 0.8 + i * 0.04 }}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                </div>
              </div>

              {/* Bottom line */}
              <div className="mt-10 h-px bg-white/5" />
            </div>
          </div>

          {/* Name pills */}
          <div
            className={`mt-10 flex flex-wrap gap-2 transition-opacity duration-700 delay-500 ${
              visible ? "opacity-100" : "opacity-0"
            }`}
          >
            {testimonials.map((item, i) => (
              <button
                key={i}
                onClick={() => go(i, i > active ? "next" : "prev")}
                className={`rounded-full border px-4 py-1.5 text-xs font-medium transition-all duration-200 font-['Outfit',sans-serif] ${
                  i === active
                    ? "bg-orange-400/[0.12] border-orange-400/40 text-orange-400"
                    : "border-white/10 text-white/30 hover:bg-orange-400/[0.15] hover:border-orange-400/50 hover:text-orange-400"
                }`}
              >
                {item.name}
              </button>
            ))}

            <div className="ml-auto flex items-center gap-2 self-center">
              <span className="text-xs text-white/20 font-mono tracking-widest">
                {String(active + 1).padStart(2, "0")} /{" "}
                {String(testimonials.length).padStart(2, "0")}
              </span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}