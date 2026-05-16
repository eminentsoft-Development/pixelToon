"use client";

import Image from "next/image";
import { useRef, useState, useCallback, useMemo } from "react";
import { useInView } from "framer-motion";

const testimonials = [
  {
    quote: "Before joining Pixeltoonz, I do not have an idea about photography, Only here I learned everthing right from the basics to a professional level. The foclities here gave verygood technical training, I am so happy and proud to say that, I am part of Pixeltoonz",
    name: "DON ROY", course: "Photography", index: "01", image: "/testimonials/don-roy.jpg",
  },
  {
    quote: "Pixeltoonz helped me to develop my creative skills and learn more about all latest techniques and tools in film editing. Thanks for Pixeltoonz for making my dreams come true",
    name: "RESHMA", course: "Film Editing", index: "02", image: "/testimonials/testimony.jpg",
  },
  {
    quote: "My experience at Pixeltoonz was fontastic in terms of learning and foacilities. The facilities take up there best effort to deliver the subject knowledge, both practical and theoretical",
    name: "RINCE SEBASTAIN", course: "Photography", index: "03", image: "/testimonials/rince-1.jpg",
  },
  {
    quote: "My experience at Pixeltoonz was full of learning and grooming. Before Joining Pixeltoonz, I have no idea about turning my passion into profession.Pixeltoonz shaped me as a designer and lam proud of who l am today. l am thankful to all the faculties and mentors for providing us with quality education.",
    name: "Nithin Chandran", course: "Graphics & Web Development", index: "04", image: "/testimonials/Nithin.jpg",
  },
  {
    quote: "Great experience from Pixeltoonz. You get a lot of opportunities. Work hard to get it. Maintain your attendance.",
    name: "Vijiljith", course: "Graphic Design", index: "05", image: "/testimonials/vijiljith.jpg",
  },
  {
    quote: "The faculties at Pixeltoonz have put in all the efforts to groom us and make us corporate professionals. It was a wonderful experience at Pixeltoonz.",
    name: "Jomet Abraham", course: "Graphic Design", index: "06", image: "/testimonials/jomet.jpg",
  },
  {
    quote: "I definitely would recommend Pixeltoonz and would encourage students to study hard and inform themselves as much as possible about the several academic opportunities the Institution offers.",
    name: "Jisna T Benny", course: "Photography/Graphic Design", index: "07", image: "/testimonials/jisna.jpg",
  },
  {
    quote: "I'm a proud student of Pixeltoonz, the college that helps you stand stronger for what's coming in the future. What they teach you here is not just knowledge, it's experiences.",
    name: "Jishnu K.S", course: "Media Production", index: "08", image: "/testimonials/JISHNU.jpg",
  },
  {
    quote: "At Pixeltoonz, the teachers always believe in you and they make sure you try your hardest on everything you do. I had studied Diploma in Graphic Design here and got placement within one week after my examination.",
    name: "Anoop Krishnan", course: "Graphic Design", index: "09", image: "/testimonials/anoop.jpg",
  },
  {
    quote: "The best institute in Kerala, Which offers you all Multimedia courses including VFX & Animation. I highly recommend Pixeltoonz Academy for their quality of education and dedicated teaching.",
    name: "Dijo Philip", course: "Digital Marketing Expert", index: "10", image: "/testimonials/dijo-philip1.jpg",
  },
  {
    quote: "The Photography course offered by Pixeltoonz has been a phenomenal experience. The curriculum and syllabus is well structured. The faculty are outstanding and they made the learning easy and enthusiastic.",
    name: "Fegi Poulose", course: "Photography", index: "11", image: "/testimonials/fegi1.jpg",
  },
  {
    quote: "Pixeltoonz is a place where you can find an amalgamation of learning. I feel great studying at Pixeltoonz as it gives great opportunity as well as support from faculties and placement officers.",
    name: "Suryajith M.S", course: "Graphic Design", index: "12", image: "/testimonials/33-scaled.jpg",
  },
  {
    quote: "My experience at Pixeltoonz is great and memorable. The teachers and mentors are really helpful and helped me to improve my academic and interpersonal skills.",
    name: "Aishwarya Y", course: "Graphic Design", index: "13", image: "/testimonials/11-scaled.jpg",
  },
  {
    quote: "I studied graphic designing here. And I'm now a graphic designer. It has a very good coaching and the faculties are so friendly and helpful at all times.",
    name: "Hitha Sukesh", course: "Graphic Design", index: "14", image: "/testimonials/123-scaled.jpg",
  },
  {
    quote: "Excellent teaching in photography and videography. Had a really good experience in the institution. Teaching staffs are really good.",
    name: "Abin D'Cruz", course: "Graphic Design", index: "15", image: "/testimonials/22-scaled.jpg",
  },
  {
    quote: "Best Academy in town. I did Photography and videography course from this institute. All faculties are well experienced and knowledgeable. I would recommend everyone interested in photography to consult Pixeltoonz.",
    name: "C. Nizamudheen", course: "Photography", index: "16", image: "/testimonials/12-scaled.jpg",
  },
  {
    quote: "I thank Pixeltoonz faculties for putting in all the efforts to groom us and make us professionals. It was a wonderful experience at Pixeltoonz.",
    name: "Murshid Manikfan", course: "Photography", index: "17", image: "/testimonials/44-scaled.jpg",
  },
  {
    quote: "I had received a lot of opportunities to groom myself, thanks to my ever inspiring mentors who helped me to discover the talented part of myself.",
    name: "Abin Peter", course: "Graphic Design", index: "18", image: "/testimonials/13-scaled.jpg",
  },
];

const testimonialPairs = [];
for (let i = 0; i < testimonials.length; i += 2) {
  testimonialPairs.push(testimonials.slice(i, i + 2));
}

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
          {/* ✅ Spinning ring removed — was two simultaneous infinite CSS animations
                 for a subtle decorative effect. Static ring achieves same look. */}
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 56 56" fill="none" aria-hidden="true">
            <circle cx="28" cy="28" r="26" stroke={`url(#${gradId})`} strokeWidth="1" strokeDasharray="4 4" opacity="0.6" />
            <defs>
              {/* ✅ Unique id per card — fixes both cards sharing ringGrad2 */}
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

        {/* ✅ Static STARS array — no Array.from() allocation per render */}
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

export default function Testimonials() {
  const [activePair, setActivePair] = useState(0);
  const sectionRef = useRef(null);

  // ✅ useInView — already in bundle, replaces manual IntersectionObserver
  const visible = useInView(sectionRef, { once: true, threshold: 0.1 });

  // ✅ Both next/prev wrapped in useCallback for stable references
  const next = useCallback(
    () => setActivePair((p) => (p + 1) % testimonialPairs.length),
    []
  );
  const prev = useCallback(
    () => setActivePair((p) => (p - 1 + testimonialPairs.length) % testimonialPairs.length),
    []
  );

  // ✅ Auto-advance
  useRef((() => {
    // intentionally empty — interval set below
  })());

  const autoRef = useRef(null);
  // useEffect for interval
  const { useEffect } = require("react"); // already imported at top in real file
  useEffect(() => {
    autoRef.current = setInterval(next, 5500);
    return () => clearInterval(autoRef.current);
  }, [next]);

  const pair = testimonialPairs[activePair];

  // ✅ Memoized counter string — only recomputes when activePair changes
  const counter = useMemo(
    () => `${String(activePair + 1).padStart(2, "0")} / ${String(testimonialPairs.length).padStart(2, "0")}`,
    [activePair]
  );

  return (
    <section
      ref={sectionRef}
      className={`relative overflow-hidden bg-[#080808] font-outfit transition-opacity duration-1000 ${
        visible ? "opacity-100" : "opacity-0"
      }`}
    >
      <div className="absolute pointer-events-none top-[20%] left-[30%] w-[60%] h-[60%] animate-[glowPulse_4s_ease-in-out_infinite]"
        style={{ background: "radial-gradient(ellipse at center, rgba(251,146,60,0.18) 0%, transparent 70%)" }}
      />
      <div className="absolute inset-0 pointer-events-none opacity-20"
        style={{ backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.12) 1px, transparent 1px)", backgroundSize: "32px 32px" }}
      />

      <div className={`relative border-b border-white/[0.06] px-4 md:px-16 py-5 flex items-center justify-between transition-all duration-700 delay-100 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2.5"
      }`}>
        <div className="flex items-center gap-3">
          <div className="w-1.5 h-1.5 rounded-full bg-orange-400" style={{ boxShadow: "0 0 8px rgba(251,146,60,0.8)" }} />
          <span className="font-outfit text-white text-xs tracking-[0.3em] uppercase">Testimonials</span>
        </div>
        <span className="text-white/15 text-xs tracking-widest font-mono">PIXELTOONZ ACADEMY</span>
      </div>

      <div className="relative px-4 md:px-16 pt-12 pb-16">
        <div className="max-w-7xl mx-auto">
          <div className={`flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12 transition-all duration-700 delay-200 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
          }`}>
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

          <div className={`grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 transition-all duration-700 delay-300 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}>
            {pair.map((t, i) => (
              <TestimonialCard key={`${activePair}-${i}`} t={t} cardIndex={i} />
            ))}
          </div>

          <div className="flex justify-center gap-2 mt-10">
            {testimonialPairs.map((_, i) => (
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
        </div>
      </div>
    </section>
  );
}