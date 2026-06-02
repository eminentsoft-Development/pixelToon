"use client";

import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";

// ─── Data ────────────────────────────────────────────────────────────────────
const CATEGORIES = [
  "All",
  "Film & VFX",
  "Design",
  "Photography",
  "Digital & AI",
];

const COURSES = [
  {
    id: 1,
    title: "AI Cinematics & Virtual Production",
    category: "Film & VFX",
    duration: "12 Months",
    level: "Advanced",
    tag: "HOT",
    description:
      "Master AI-driven storytelling, virtual production pipelines, and real-time rendering used across films, ads, and gaming industries.",
    skills: ["Unreal Engine", "AI Tools", "VFX", "Color Grading"],
    color: "#E8440A",
  },
  {
    id: 2,
    title: "Multimedia — VFX & Animation",
    category: "Film & VFX",
    duration: "18 Months",
    level: "Intermediate",
    tag: "TOP RATED",
    description:
      "Comprehensive diploma covering visual effects, 3D animation, motion graphics, film editing, and cinematic modeling.",
    skills: ["Maya", "After Effects", "Nuke", "Cinema 4D"],
    color: "#C0392B",
  },
  {
    id: 3,
    title: "AI Film Making",
    category: "Film & VFX",
    duration: "6 Months",
    level: "Beginner",
    description:
      "Explore contemporary visual storytelling using artificial intelligence — from script to screen with AI-powered production tools.",
    skills: ["Sora", "Runway ML", "Premiere Pro", "AI Scripting"],
    color: "#922B21",
  },
  {
    id: 4,
    title: "Film Editing",
    category: "Film & VFX",
    duration: "6 Months",
    level: "Beginner",
    description:
      "Learn professional post-production techniques that shape cinematic narratives — from rough cuts to final delivery.",
    skills: ["Premiere Pro", "DaVinci Resolve", "Avid", "Audio Mix"],
    color: "#E8440A",
  },
  {
    id: 5,
    title: "Graphics & UI/UX",
    category: "Design",
    duration: "12 Months",
    level: "Intermediate",
    tag: "IN DEMAND",
    description:
      "Design intuitive interfaces and striking brand identities. One of the fastest-growing career paths in Kerala's tech sector.",
    skills: ["Figma", "Adobe XD", "Illustrator", "Prototyping"],
    color: "#D4AC0D",
  },
  {
    id: 6,
    title: "Interior Visualization",
    category: "Design",
    duration: "9 Months",
    level: "Intermediate",
    description:
      "Photorealistic 3D rendering of architectural spaces — the skill powering today's real-estate and interior design industries.",
    skills: ["3ds Max", "V-Ray", "SketchUp", "AutoCAD"],
    color: "#A9770E",
  },
  {
    id: 7,
    title: "Interior Design Course",
    category: "Design",
    duration: "12 Months",
    level: "Beginner",
    description:
      "From concept boards to construction drawings — learn spatial design, material science, and client presentation skills.",
    skills: ["AutoCAD", "Revit", "Material Theory", "3D Viz"],
    color: "#D4AC0D",
  },
  {
    id: 8,
    title: "Graphics & Web Design",
    category: "Design",
    duration: "6 Months",
    level: "Beginner",
    description:
      "Build a solid foundation in visual communication, brand identity, and modern web aesthetics for the digital world.",
    skills: ["Photoshop", "Illustrator", "HTML/CSS", "Figma"],
    color: "#A9770E",
  },
  {
    id: 9,
    title: "Photography",
    category: "Photography",
    duration: "12 Months",
    level: "All Levels",
    tag: "33 SPECIALIZATIONS",
    description:
      "Kerala's most comprehensive photography diploma — covering 33 genres from wildlife and portrait to commercial and cinematic.",
    skills: ["Studio Lighting", "Lightroom", "Composition", "Commercial"],
    color: "#1A8A6E",
  },
  {
    id: 10,
    title: "Content Creation Program",
    category: "Photography",
    duration: "9 Months",
    level: "Beginner",
    description:
      "Master photography, videography, editing, and digital storytelling for YouTube, brands, and social media platforms.",
    skills: ["Videography", "Reels Editing", "CapCut", "Branding"],
    color: "#148A5A",
  },
  {
    id: 11,
    title: "Media Production",
    category: "Photography",
    duration: "12 Months",
    level: "Intermediate",
    description:
      "Practical skills in videography, photography, and new media — trained for broadcast, OTT, and digital studios.",
    skills: ["Cinematography", "Sound Design", "Post-Production", "OTT"],
    color: "#1A8A6E",
  },
  {
    id: 12,
    title: "Digital Marketing with AI Tools",
    category: "Digital & AI",
    duration: "6 Months",
    level: "Beginner",
    tag: "NEW",
    description:
      "Combine SEO, social media, paid advertising, and AI automation to run effective campaigns in today's digital landscape.",
    skills: ["Google Ads", "Meta Ads", "ChatGPT", "Analytics"],
    color: "#5B4FCF",
  },
];

// ─── Utility: Fade-up reveal ──────────────────────────────────────────────────
function FadeUp({ children, delay = 0, className = "" }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ─── Course Card ──────────────────────────────────────────────────────────────
function CourseCard({ course, index }) {
  const [hovered, setHovered] = useState(false);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.6,
        delay: (index % 3) * 0.1,
        ease: [0.22, 1, 0.36, 1],
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group relative flex flex-col bg-[#0F0F0F] border border-white/8 rounded-sm overflow-hidden cursor-pointer"
      style={{ borderColor: hovered ? course.color + "55" : undefined }}
    >
      {/* Top accent bar */}
      <motion.div
        className="h-[3px] w-full"
        style={{ backgroundColor: course.color }}
        initial={{ scaleX: 0, originX: 0 }}
        animate={inView ? { scaleX: 1 } : {}}
        transition={{ duration: 0.8, delay: (index % 3) * 0.1 + 0.3 }}
      />

      <div className="p-7 flex flex-col flex-1">
        {/* Category + Tag row */}
        <div className="flex items-center justify-between mb-5">
          <span
            className="text-[10px] font-bold tracking-[0.18em] uppercase px-2.5 py-1 rounded-sm"
            style={{
              color: course.color,
              backgroundColor: course.color + "18",
            }}
          >
            {course.category}
          </span>
          {course.tag && (
            <span className="text-[9px] font-black tracking-[0.15em] text-white/50 border border-white/15 px-2 py-0.5 rounded-sm">
              {course.tag}
            </span>
          )}
        </div>

        {/* Index number */}
        <span
          className="font-black text-[56px] leading-none mb-3 select-none"
          style={{
            color: course.color + "22",
            fontFamily: "'Bebas Neue', sans-serif",
          }}
        >
          {String(course.id).padStart(2, "0")}
        </span>

        <h3 className="font-bold text-white text-xl leading-tight mb-3 group-hover:text-white transition-colors">
          {course.title}
        </h3>

        <p className="text-white/45 text-sm leading-relaxed mb-5 flex-1">
          {course.description}
        </p>

        {/* Skills pills */}
        <div className="flex flex-wrap gap-1.5 mb-6">
          {course.skills.map((s) => (
            <span
              key={s}
              className="text-[10px] text-white/40 border border-white/10 px-2 py-0.5 rounded-sm tracking-wide"
            >
              {s}
            </span>
          ))}
        </div>

        {/* Meta row */}
        <div className="flex items-center justify-between pt-4 border-t border-white/8">
          <div className="flex gap-4">
            <div>
              <p className="text-[9px] text-white/30 uppercase tracking-widest mb-0.5">
                Duration
              </p>
              <p className="text-white/70 text-xs font-semibold">
                {course.duration}
              </p>
            </div>
            <div>
              <p className="text-[9px] text-white/30 uppercase tracking-widest mb-0.5">
                Level
              </p>
              <p className="text-white/70 text-xs font-semibold">
                {course.level}
              </p>
            </div>
          </div>
          <motion.button
            whileHover={{ x: 4 }}
            className="text-[11px] font-bold tracking-widest uppercase flex items-center gap-1.5"
            style={{ color: course.color }}
          >
            View <span>→</span>
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Stats Bar ────────────────────────────────────────────────────────────────
const STATS = [
  { value: "2000+", label: "Graduates" },
  { value: "15+", label: "Years of Excellence" },
  { value: "33", label: "Photo Specializations" },
  { value: "ISO", label: "Certified Institute" },
  { value: "100%", label: "Practical Training" },
];

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function CoursesPage() {
  return (
    <div
      className="min-h-screen text-white"
      style={{ fontFamily: "'DM Sans', sans-serif" }}
    >
      <div className="bg-white relative z-10">
        {/* ── Hero ── */}
        <section className="relative min-h-screen bg-gradient-to-br from-[#F09410] to-[#BC430D] flex justify-start items-center overflow-hidden">
          <div className="container">
            {/* Background decorative text */}
            <div
              className="absolute top-0 right-0 text-[22vw] font-black leading-none select-none pointer-events-none"
              style={{
                fontFamily: "'Bebas Neue', sans-serif",
                color: "rgba(255,255,255,0.025)",
                lineHeight: 0.85,
              }}
            >
              COURSES
            </div>

            {/* Diagonal gradient */}
            <div
              className="absolute  bottom-0 left-0 w-96 h-96 rounded-full blur-[120px] pointer-events-none"
              style={{
                background:
                  "radial-gradient(circle, #E8440A18 0%, transparent 70%)",
              }}
            />

            <div className="max-w-6xl relative z-10">
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="flex items-center gap-3 mb-6"
              >
                <div className="w-8 h-[2px] bg-[#E8440A]" />
                <span className="text-[11px] tracking-[0.25em] uppercase text-[#E8440A] font-semibold">
                  Kerala&apos;s No.1 Design & Media School
                </span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.8,
                  delay: 0.1,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="text-white leading-none mb-6"
                style={{
                  fontFamily: "'Bebas Neue', sans-serif",
                  fontSize: "clamp(52px, 8vw, 100px)",
                  letterSpacing: "0.02em",
                }}
              >
                Every Course Is a{" "}
                <span
                  style={{
                    WebkitTextStroke: "1px #E8440A",
                    color: "transparent",
                  }}
                >
                  Career.
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.25 }}
                className="text-white/50 text-lg max-w-2xl leading-relaxed mb-10"
              >
                From AI-powered cinema to photographic artistry — Pixeltoonz
                Academy offers industry-standard programs designed to transform
                creative passion into professional mastery.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.35 }}
                className="flex flex-wrap gap-3"
              >
                <button className="bg-[#E8440A] hover:bg-[#C03800] text-white font-bold text-sm tracking-widest uppercase px-6 py-3.5 rounded-sm transition-colors">
                  Explore All Courses
                </button>
                <button className="border border-white/20 hover:border-white/40 text-white/70 hover:text-white font-medium text-sm tracking-wider uppercase px-6 py-3.5 rounded-sm transition-all">
                  Download Brochure
                </button>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ── Stats Strip ── */}
        <section className="border-y border-white/8 bg-[#0C0C0C]">
          <div className="max-w-6xl mx-auto px-8 py-6 flex flex-wrap gap-8 justify-between">
            {STATS.map((s, i) => (
              <FadeUp key={s.label} delay={i * 0.07}>
                <div className="text-center">
                  <p
                    className="text-white font-black leading-none"
                    style={{
                      fontFamily: "'Bebas Neue', sans-serif",
                      fontSize: "clamp(28px, 4vw, 42px)",
                      color: i % 2 === 0 ? "#E8440A" : "#fff",
                    }}
                  >
                    {s.value}
                  </p>
                  <p className="text-white/35 text-[10px] tracking-[0.2em] uppercase mt-1">
                    {s.label}
                  </p>
                </div>
              </FadeUp>
            ))}
          </div>
        </section>

        {/* ── Course Grid ── */}
        <section className="mx-auto bg-[#080808] py-16">
          <div className="container">
            <AnimatePresence mode="wait">
              {COURSES.length > 0 ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="px-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
                >
                  {COURSES.map((course, i) => (
                    <CourseCard key={course.id} course={course} index={i} />
                  ))}
                </motion.div>
              ) : (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-24 text-white/25"
                >
                  <p className="text-6xl mb-4">🎬</p>
                  <p className="text-lg">No courses match your search.</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </section>

        {/* ── CTA Banner ── */}
        <FadeUp>
          <section className="container py-16 rounded-sm overflow-hidden relative">
            <div
              className="relative px-10 py-16 flex flex-col md:flex-row items-center justify-between gap-8"
              style={{
                background:
                  "linear-gradient(135deg, #1a0a06 0%, #0F0F0F 60%, #0a0a14 100%)",
              }}
            >
              {/* Accent glow */}
              <div
                className="absolute top-0 left-0 w-64 h-64 rounded-full blur-[100px] pointer-events-none"
                style={{ background: "#E8440A22" }}
              />
              <div className="border-l-2 border-[#E8440A] pl-6 relative z-10">
                <p className="text-[11px] tracking-[0.25em] uppercase text-[#E8440A] font-semibold mb-2">
                  STED Council Authorized
                </p>
                <h2
                  className="text-white leading-tight"
                  style={{
                    fontFamily: "'Bebas Neue', sans-serif",
                    fontSize: "clamp(36px, 5vw, 60px)",
                  }}
                >
                  Not Sure Which Course <br />
                  <span style={{ color: "#E8440A" }}>Is Right For You?</span>
                </h2>
                <p className="text-white/45 mt-3 max-w-md text-sm leading-relaxed">
                  Talk to our counselors for a free career assessment.
                  We&apos;ll help you pick the perfect program based on your
                  interests and goals.
                </p>
              </div>
              <div className="flex flex-col gap-3 relative z-10 shrink-0">
                <a
                  href="tel:+919745678780"
                  className="bg-[#E8440A] hover:bg-[#C03800] text-white font-bold text-sm tracking-widest uppercase px-8 py-4 rounded-sm transition-colors text-center"
                >
                  Call Us: +91 97456 78780
                </a>
                <button className="border border-white/20 hover:border-[#E8440A]/50 text-white/60 hover:text-white font-medium text-sm tracking-wider uppercase px-8 py-4 rounded-sm transition-all text-center">
                  Book Free Counseling →
                </button>
              </div>
            </div>
          </section>
        </FadeUp>
      </div>
    </div>
  );
}
