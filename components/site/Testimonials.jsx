"use client";

import { useEffect, useRef, useState, useCallback } from "react";

const testimonials = [
  {
    quote:
      "My experience at Pixeltoonz was full of learning and grooming. Before joining, I had no idea about turning my passion into a profession. Pixeltoonz shaped me as a designer and I am proud of who I am today.",
    name: "Nithin Chandran",
    course: "Graphics & Web Development",
    initials: "NC",
    year: "2023",
    index: "01",
  },
  {
    quote:
      "The production-oriented curriculum gave me a real edge. Within months of completing my course, I landed a role at a leading animation studio. The mentors push you to exceed your own expectations every day.",
    name: "Arya Krishnan",
    course: "3D Animation & VFX",
    initials: "AK",
    year: "2022",
    index: "02",
  },
  {
    quote:
      "Infinite lab hours meant I could practice at 2 AM when inspiration struck. That freedom transformed me from a complete beginner into a confident motion designer in under a year.",
    name: "Rahul Menon",
    course: "Motion Graphics",
    initials: "RM",
    year: "2023",
    index: "03",
  },
  {
    quote:
      "What sets Pixeltoonz apart is the individual attention each student gets. My mentor knew exactly where I struggled and helped me grow in ways I could not have imagined on my own.",
    name: "Sneha Nair",
    course: "UI/UX & Multimedia",
    initials: "SN",
    year: "2024",
    index: "04",
  },
  {
    quote:
      "The live project training was a game-changer. I worked on real client deliverables while still a student, which made my portfolio stand out instantly. Pixeltoonz launches careers.",
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
    return () => clearInterval(autoRef.current);
  }, [next]);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setVisible(true);
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  const t = testimonials[active];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,600;1,300;1,500&family=Outfit:wght@300;400;500;600&display=swap');

        .tm-section { font-family: 'Outfit', sans-serif; }

        .tm-quote-anim-next {
          animation: tmFadeNext 0.4s ease forwards;
        }
        .tm-quote-anim-prev {
          animation: tmFadePrev 0.4s ease forwards;
        }
        @keyframes tmFadeNext {
          0%   { opacity: 1; transform: translateY(0); }
          100% { opacity: 0; transform: translateY(-20px); }
        }
        @keyframes tmFadePrev {
          0%   { opacity: 1; transform: translateY(0); }
          100% { opacity: 0; transform: translateY(20px); }
        }
        .tm-quote-enter {
          animation: tmEnter 0.5s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }
        @keyframes tmEnter {
          0%   { opacity: 0; transform: translateY(24px); }
          100% { opacity: 1; transform: translateY(0); }
        }

        .tm-pill {
          transition: all 0.25s ease;
        }
        .tm-pill:hover {
          background: rgba(251, 146, 60, 0.15);
          border-color: rgba(251, 146, 60, 0.5);
          color: #fb923c;
        }
        .tm-pill.active-pill {
          background: rgba(251, 146, 60, 0.12);
          border-color: rgba(251, 146, 60, 0.4);
          color: #fb923c;
        }

        .tm-track {
          transition: transform 0.5s cubic-bezier(0.22, 1, 0.36, 1);
        }

        .tm-glow {
          background: radial-gradient(ellipse at center, rgba(251,146,60,0.18) 0%, transparent 70%);
          animation: tmGlowPulse 4s ease-in-out infinite;
        }
        @keyframes tmGlowPulse {
          0%, 100% { opacity: 0.6; transform: scale(1); }
          50%       { opacity: 1;   transform: scale(1.08); }
        }

        .tm-line-grow {
          animation: tmLineGrow 0.8s cubic-bezier(0.22,1,0.36,1) forwards;
          transform-origin: left;
        }
        @keyframes tmLineGrow {
          from { transform: scaleX(0); opacity: 0; }
          to   { transform: scaleX(1); opacity: 1; }
        }

        .tm-avatar-ring {
          animation: tmRingSpin 8s linear infinite;
        }
        @keyframes tmRingSpin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }

        .tm-number-fade {
          animation: tmNumFade 0.5s ease forwards;
        }
        @keyframes tmNumFade {
          from { opacity: 0; transform: scale(0.8); }
          to   { opacity: 1; transform: scale(1); }
        }
      `}</style>

      <section
        ref={sectionRef}
        className="tm-section relative overflow-hidden"
        style={{
          background: "#080808",
          opacity: visible ? 1 : 0,
          transition: "opacity 1s ease",
        }}
      >
        {/* Ambient glow */}
        <div
          className="tm-glow absolute inset-0 pointer-events-none"
          style={{ top: "20%", left: "30%", width: "60%", height: "60%" }}
        />

        {/* Subtle dot grid */}
        <div
          className="absolute inset-0 pointer-events-none opacity-20"
          style={{
            backgroundImage:
              "radial-gradient(circle, rgba(255,255,255,0.12) 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />

        {/* Top label bar */}
        <div
          className="relative border-b border-white/[0.06] px-8 md:px-16 py-5 flex items-center justify-between"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "none" : "translateY(-10px)",
            transition: "all 0.6s ease 0.1s",
          }}
        >
          <div className="flex items-center gap-3">
            <div
              className="w-1.5 h-1.5 rounded-full bg-orange-400"
              style={{ boxShadow: "0 0 8px rgba(251,146,60,0.8)" }}
            />
            <span
              className="text-white/30 text-xs tracking-[0.3em] uppercase"
              style={{ fontFamily: "'Outfit', sans-serif" }}
            >
              Testimonials
            </span>
          </div>
          <span
            className="text-white/15 text-xs tracking-widest font-mono"
          >
            PIXELTOONZ ACADEMY
          </span>
        </div>

        <div className="relative px-8 md:px-16 pt-16 pb-20">
          <div className="max-w-7xl mx-auto">

            {/* Heading row */}
            <div
              className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "none" : "translateY(20px)",
                transition: "all 0.7s ease 0.2s",
              }}
            >
              <h2
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "clamp(2.8rem, 6vw, 5.5rem)",
                  fontWeight: 300,
                  lineHeight: 1.05,
                  color: "#fff",
                  letterSpacing: "-0.02em",
                }}
              >
                What our{" "}
                <span
                  style={{
                    fontStyle: "italic",
                    fontWeight: 600,
                    background: "linear-gradient(135deg, #fb923c 0%, #fbbf24 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
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
                  className="group w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white/30 hover:border-orange-400/50 hover:text-orange-400 transition-all duration-300"
                  aria-label="Previous"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button
                  onClick={next}
                  className="group w-12 h-12 rounded-full border border-orange-400/40 flex items-center justify-center text-orange-400 hover:bg-orange-400 hover:text-black transition-all duration-300"
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
              className="grid grid-cols-1 lg:grid-cols-[auto_1fr] gap-0"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "none" : "translateY(30px)",
                transition: "all 0.8s ease 0.3s",
              }}
            >
              {/* Left: big index number */}
              <div className="hidden lg:flex flex-col items-center pr-12 pt-2">
                <div
                  key={active}
                  className="tm-number-fade"
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: "7rem",
                    fontWeight: 600,
                    lineHeight: 1,
                    color: "transparent",
                    WebkitTextStroke: "1px rgba(251,146,60,0.25)",
                    userSelect: "none",
                    width: "5rem",
                    textAlign: "center",
                  }}
                >
                  {t.index}
                </div>
                <div
                  className="flex-1 w-px mt-4"
                  style={{
                    background:
                      "linear-gradient(to bottom, rgba(251,146,60,0.2), transparent)",
                    minHeight: "80px",
                  }}
                />
              </div>

              {/* Center: quote */}
              <div className="relative">
                {/* Top orange accent line */}
                <div
                  key={`line-${active}`}
                  className="tm-line-grow h-px mb-10"
                  style={{
                    background:
                      "linear-gradient(90deg, #fb923c, #fbbf24 60%, transparent)",
                    width: "100%",
                  }}
                />

                {/* Quote */}
                <div
                  key={`quote-${active}`}
                  className={`tm-quote-enter`}
                >
                  <blockquote
                    style={{
                      fontFamily: "'Cormorant Garamond', serif",
                      fontSize: "clamp(1.35rem, 2.8vw, 2.1rem)",
                      fontWeight: 300,
                      lineHeight: 1.6,
                      color: "rgba(255,255,255,0.85)",
                      letterSpacing: "0.01em",
                      fontStyle: "italic",
                      marginBottom: "2.5rem",
                    }}
                  >
                    &ldquo;{t.quote}&rdquo;
                  </blockquote>

                  {/* Author */}
                  <div className="flex items-center gap-5">
                    {/* Avatar with spinning dashed ring */}
                    <div className="relative w-14 h-14 flex-shrink-0">
                      <svg
                        className="tm-avatar-ring absolute inset-0 w-full h-full"
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
                        className="absolute inset-1.5 rounded-full flex items-center justify-center text-sm font-semibold text-black"
                        style={{
                          fontFamily: "'Outfit', sans-serif",
                          background:
                            "linear-gradient(135deg, #fb923c 0%, #fbbf24 100%)",
                          boxShadow: "0 0 20px rgba(251,146,60,0.4)",
                        }}
                      >
                        {t.initials}
                      </div>
                    </div>

                    <div>
                      <p
                        className="text-white font-semibold text-base mb-0.5"
                        style={{ fontFamily: "'Outfit', sans-serif" }}
                      >
                        {t.name}
                      </p>
                      <p
                        className="text-sm"
                        style={{
                          fontFamily: "'Outfit', sans-serif",
                          color: "rgba(251,146,60,0.7)",
                        }}
                      >
                        {t.course} &nbsp;·&nbsp; Class of {t.year}
                      </p>
                    </div>

                    {/* Star rating */}
                    <div className="ml-auto hidden sm:flex gap-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <svg
                          key={i}
                          className="w-4 h-4"
                          style={{ color: "#fb923c", opacity: 0.8 + i * 0.04 }}
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
                <div
                  className="mt-10 h-px"
                  style={{ background: "rgba(255,255,255,0.05)" }}
                />
              </div>
            </div>

            {/* Bottom: name pills */}
            <div
              className="mt-10 flex flex-wrap gap-2"
              style={{
                opacity: visible ? 1 : 0,
                transition: "opacity 0.6s ease 0.5s",
              }}
            >
              {testimonials.map((item, i) => (
                <button
                  key={i}
                  onClick={() =>
                    go(i, i > active ? "next" : "prev")
                  }
                  className={`tm-pill rounded-full border px-4 py-1.5 text-xs font-medium transition-all duration-200 ${
                    i === active
                      ? "active-pill"
                      : "border-white/10 text-white/30"
                  }`}
                  style={{ fontFamily: "'Outfit', sans-serif" }}
                >
                  {item.name}
                </button>
              ))}

              {/* Count */}
              <div className="ml-auto flex items-center gap-2 self-center">
                <span
                  className="text-xs text-white/20 font-mono tracking-widest"
                >
                  {String(active + 1).padStart(2, "0")} /{" "}
                  {String(testimonials.length).padStart(2, "0")}
                </span>
              </div>
            </div>

          </div>
        </div>
      </section>
    </>
  );
}