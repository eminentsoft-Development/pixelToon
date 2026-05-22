"use client";

import Image from "next/image";
import { useState, useCallback, useMemo, useEffect } from "react";

const STARS = [0, 1, 2, 3, 4];

function TestimonialCard({ t, cardIndex }) {
  const gradId = `ringGrad-${cardIndex}`;

  return (
    <div className="animate-[quoteEnter_0.5s_cubic-bezier(0.22,1,0.36,1)_forwards] flex flex-col h-full">
      <div
        className="animate-[lineGrow_0.8s_cubic-bezier(0.22,1,0.36,1)_forwards] h-px mb-6 origin-left"
        style={{ background: "linear-gradient(90deg, #fb923c, #fbbf24 60%, transparent)", width: "100%" }}
      />

      <div
        className="font-cormorant text-5xl font-semibold leading-none select-none mb-4"
        style={{ color: "transparent", WebkitTextStroke: "1px rgba(251,146,60,0.25)" }}
      >
        {t.index}
      </div>

      <blockquote className="font-cormorant font-light italic text-white/80 leading-relaxed tracking-[0.01em] mb-6 text-[clamp(0.95rem,1.5vw,1.2rem)] flex-1">
        &ldquo;{t.quote}&rdquo;
      </blockquote>

      <div className="flex items-center gap-4">
        <div className="relative w-14 h-14 flex-shrink-0">
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 56 56" fill="none" aria-hidden="true">
            <circle cx="28" cy="28" r="26" stroke={`url(#${gradId})`} strokeWidth="1" strokeDasharray="4 4" opacity="0.6" />
            <defs>
              <linearGradient id={gradId} x1="0" y1="0" x2="56" y2="56">
                <stop stopColor="#fb923c" />
                <stop offset="1" stopColor="#fbbf24" />
              </linearGradient>
            </defs>
          </svg>
          <div className="absolute inset-1 rounded-full overflow-hidden bg-gradient-to-br from-orange-400 to-amber-400">
            <Image
              src={t.image}
              alt={`${t.name} testimonial`}
              fill
              sizes="56px"
              className="object-cover"
            />
          </div>
        </div>

        <div className="min-w-0">
          <p className="font-outfit text-white font-semibold text-sm mb-0.5 truncate">{t.name}</p>
          <p className="font-outfit text-xs text-orange-400/70 truncate">{t.course}</p>
        </div>

        <div className="ml-auto hidden sm:flex gap-0.5 flex-shrink-0" aria-label="5 stars">
          {STARS.map((i) => (
            <svg key={i} className="w-3 h-3 text-orange-400" style={{ opacity: 0.8 + i * 0.04 }} fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          ))}
        </div>
      </div>

      <div className="mt-6 h-px bg-white/5" />
    </div>
  );
}

export default function TestimonialCarousel({ pairs }) {
  const [activePair, setActivePair] = useState(0);

  const next = useCallback(() => {
    setActivePair((p) => (p + 1) % pairs.length);
  }, [pairs.length]);

  const prev = useCallback(() => {
    setActivePair((p) => (p - 1 + pairs.length) % pairs.length);
  }, [pairs.length]);

  useEffect(() => {
    const interval = setInterval(next, 5500);
    return () => clearInterval(interval);
  }, [next]);

  const pair = pairs[activePair];

  const counter = useMemo(
    () => `${String(activePair + 1).padStart(2, "0")} / ${String(pairs.length).padStart(2, "0")}`,
    [activePair, pairs.length]
  );

  return (
    <>
      {/* Header and Controls */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
        <h2 className="font-cormorant text-white font-light leading-[1.05] tracking-[-0.02em] text-[clamp(2rem,4vw,3.5rem)]">
          What our{" "}
          <span className="italic font-semibold bg-gradient-to-br from-orange-400 to-amber-400 bg-clip-text text-transparent">
            students
          </span>
          <br />have to say
        </h2>

        <div className="flex items-center gap-3 mb-1">
          <span className="text-white/20 text-xs font-mono mr-2">{counter}</span>
          <button onClick={prev} className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/30 hover:border-orange-400/50 hover:text-orange-400 transition-all duration-300" aria-label="Previous testimonial">
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button onClick={next} className="w-10 h-10 rounded-full border border-orange-400/40 flex items-center justify-center text-orange-400 hover:bg-orange-400 hover:text-black transition-all duration-300" aria-label="Next testimonial">
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>

      {/* Grid of Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
        {pair.map((t, i) => (
          /* key uses activePair so React forces a remount, triggering the CSS entry animations */
          <TestimonialCard key={`${activePair}-${i}`} t={t} cardIndex={i} />
        ))}
      </div>

      {/* Pagination Dots */}
      <div className="flex justify-center gap-2 mt-10">
        {pairs.map((_, i) => (
          <button
            key={i}
            onClick={() => setActivePair(i)}
            className={`rounded-full transition-all duration-300 ${
              i === activePair ? "w-6 h-1.5 bg-orange-400" : "w-1.5 h-1.5 bg-white/15 hover:bg-white/30"
            }`}
            aria-label={`Go to testimonial pair ${i + 1}`}
          />
        ))}
      </div>
    </>
  );
}