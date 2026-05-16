"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import FranchiseForm from "@/components/site/FranchiseForm";

// ─── Reusable animation variants ───────────────────────────────────────────
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: i * 0.1 },
  }),
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: (i = 0) => ({
    opacity: 1,
    transition: { duration: 0.6, delay: i * 0.08 },
  }),
};

// ─── Section wrapper with scroll-triggered animation ───────────────────────
function RevealSection({ children, className = "" }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ─── Decorative orange line ─────────────────────────────────────────────────
function OrangeLine({ className = "" }) {
  return (
    <motion.span
      variants={{
        hidden: { scaleX: 0, opacity: 0 },
        visible: {
          scaleX: 1,
          opacity: 1,
          transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
        },
      }}
      className={`block h-[3px] bg-primary origin-left ${className}`}
    />
  );
}

// ─── DATA ───────────────────────────────────────────────────────────────────
const whyPartnerItems = [
  {
    num: "01",
    title: "Proven Business Model",
    desc: "Our business model has proven highly successful, reflected in the growth and satisfaction of our valued partners.",
  },
  {
    num: "02",
    title: "Largest Alumni Network",
    desc: "Our students' success is our success, and our alumni are spread across the Indian Creative industry, holding leadership and influential positions.",
  },
  {
    num: "03",
    title: "NSDC-Certified Training Institute",
    desc: "Pixeltoonz Academy is committed to industry-focused creative education, helping students gain professional skills aligned with current industry standards.",
  },
  {
    num: "04",
    title: "Access to Industry-Certified Events",
    desc: "Our students get opportunities to participate in industry-recognized events,creative competitions, workshops, and scholarship programs that help showcase their talent and skills.",
  },
];

const rdPoints = [
  {
    title: "Pioneering Curriculums",
    desc: "Designing cutting-edge courses on creative technologies aligned with the present and futuristic advancements.",
  },
  {
    title: "Faculty Empowerment",
    desc: "Uplifting the knowledge and the teaching skills of faculties to deliver exceptional learning experiences for students.",
  },
  {
    title: "Developing Course Materials",
    desc: "Creating original and comprehensive course materials in print for seamless learning.",
  },
  {
    title: "SME Collaboration",
    desc: "Ensuring rigorous evaluation of student portfolios and skills by the Subject Matter Experts (SMEs) from each specialized field before placements.",
  },
  {
    title: "Syllabus Updates",
    desc: "Ensuring our programs always reflect the in-demand skills expected by the various segments of the creative industry.",
  },
  {
    title: "Organizing Exams and Vivas",
    desc: "Evaluations of the students are administered by the R & D team.",
  },
];

const franchiseSupportItems = [
  {
    num: "1",
    title: "Business Development Support",
    desc: "The Heads of Business Development collaborate with the franchise business partners to devise and develop tailored marketing, promotional and sales strategies for each centre.",
  },
  {
    num: "2",
    title: "Delivery of Copyrighted Study Material",
    desc: "Timely delivery of valuable, copyrighted study materials required from time to time.",
  },
  {
    num: "3",
    title: "Business Partner Training",
    desc: "Based on 8 years of experience, we help new franchisees establish the business by providing detailed training to the business partners.",
  },
  {
    num: "4",
    title: "Faculty Training",
    desc: " Image provides training at the Corporate Office for our franchise faculty recruits so that they can be fully qualified to teach students. The faculty is also provided continuous online training support upon requirement.",
  },
];

// ─── PAGE ───────────────────────────────────────────────────────────────────
export default function FranchisePage() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <main className="bg-bgColor text-white font-sans overflow-x-hidden">
      <section className="relative min-h-screen flex items-center justify-center text-white px-4 py-16 bg-gradient-to-br from-[#F09410] to-[#BC430D] overflow-hidden">
        <div
          className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] rounded-full bg-[#F09410]/15 blur-[140px] animate-pulse pointer-events-none"
          style={{ animationDuration: "8s" }}
        />
        <div
          className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] rounded-full bg-[#BC430D]/20 blur-[160px] animate-pulse pointer-events-none"
          style={{ animationDuration: "12s" }}
        />

        <div className="container mx-auto grid grid-cols-1 mt-20 lg:grid-cols-12 gap-12 items-center relative z-10">
          <motion.div
            className="lg:col-span-7 space-y-6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.h1
              variants={itemVariants}
              className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight leading-[1.05]"
            >
              Own a Creative Education Franchise
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="text-white text-lg tracking-wider w-[90%] leading-relaxed"
            >
              Partner with Kerala’s premier ISO-certified institute. Tap into a
              proven, highly profitable business model in the rapidly expanding
              digital media and design industry.
            </motion.p>
            <Link
              href="#why-partner"
              className="group inline-flex items-center gap-3 bg-white hover:opacity-90 text-textColor font-bold px-8 py-4 rounded-xl shadow-lg shadow-[#BC430D]/20 transition-all transform hover:-translate-y-0.5"
            >
              Explore More
              <svg
                className="w-5 h-5 transform group-hover:translate-x-1 transition-transform"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </Link>

            <motion.div
              variants={itemVariants}
              className="grid grid-cols-3 gap-2 border-t border-white/20 pt-8 max-w-lg divide-x divide-white/20"
            >
              {[
                ["ISO", "Certified"],
                ["100%", "LMS Support"],
                ["Proven", "ROI Model"],
              ].map(([value, label], index) => (
                <div
                  key={label}
                  className={`${index === 0 ? "pl-0" : "pl-4 sm:pl-6"} pr-2`}
                >
                  <p className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                    {value}
                  </p>
                  <p className="text-[10px] sm:text-xs text-textColor font-bold uppercase tracking-wider mt-1 whitespace-nowrap">
                    {label}
                  </p>
                </div>
              ))}
            </motion.div>
          </motion.div>

          <FranchiseForm />
        </div>
      </section>

      <section id="why-partner" className="py-24 md:py-32 bg-[#fff9f5]">
        <div className="container">
          <RevealSection>
            <div className="mb-12 md:mb-16">
              <motion.h2
                variants={fadeUp}
                custom={1}
                className="font-heading font-bold text-3xl md:text-4xl lg:text-5xl text-textColor leading-tight"
              >
                WHY PARTNER WITH THE LEADER?
              </motion.h2>
              <OrangeLine className="mt-4 w-16" />
            </div>
          </RevealSection>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {whyPartnerItems.map((item, i) => (
              <RevealSection key={item.num}>
                <motion.div
                  variants={fadeUp}
                  custom={i * 0.15}
                  className="group relative border border-white/[0.07] min-h-64 hover:border-primary/40 bg-bgColor p-8 transition-all duration-500"
                >
                  {/* Number */}
                  <span className="animate-numberFade font-heading font-bold text-5xl text-primary group-hover:text-primary/40 leading-none block mb-6 transition-colors duration-500">
                    {item.num}
                  </span>
                  <h3 className="font-heading font-bold text-xl text-primary mb-3 group-hover:text-primary transition-colors duration-300">
                    {item.title}
                  </h3>
                  <p className="text-white/55 text-sm leading-relaxed">
                    {item.desc}
                  </p>
                  {/* Hover accent line */}
                  <span className="absolute bottom-0 left-0 h-[2px] w-0 group-hover:w-full bg-primary transition-all duration-500" />
                </motion.div>
              </RevealSection>
            ))}
          </div>
        </div>
      </section>

      {/* ── R&D TEAM ─────────────────────────────────────────────────────── */}
      <section className="py-24 md:py-32 bg-white/[0.02] border-y border-white/[0.06]">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
            {/* Left: intro */}
            <RevealSection>
              <div>
                <div className="mb-12 md:mb-16">
                  <motion.h2
                    variants={fadeUp}
                    custom={1}
                    className="font-heading font-bold text-3xl md:text-4xl lg:text-5xl text-white leading-tight"
                  >
                    Dedicated Research & Development Team
                  </motion.h2>
                  <OrangeLine className="mt-4 w-16" />
                </div>
                <motion.p
                  variants={fadeUp}
                  custom={3}
                  className="text-white/80 text-sm leading-relaxed mb-6"
                >
                  The future of the creative industry lies in the perfect blend
                  of creativity and technology. At Pixeltoonz Academy, our
                  Research & Development team works continuously to create
                  innovative and industry-relevant creative education programs
                  that help aspiring creators build successful careers.
                </motion.p>
                <motion.p
                  variants={fadeUp}
                  custom={4}
                  className="text-white/80 text-sm leading-relaxed mb-8"
                >
                  Under the guidance of founders{" "}
                  <span className="text-primary font-semibold">
                    Akhil Mohan
                  </span>{" "}
                  and{" "}
                  <span className="text-primary font-semibold">
                    Tijin Antony
                  </span>
                  , our R&D team focuses on developing advanced learning
                  methods, updated technologies, and practical training
                  approaches to keep students’ future-ready.
                </motion.p>

                {/* Founders accent */}
                <motion.div
                  variants={fadeUp}
                  custom={5}
                  className="flex gap-6 mt-4"
                >
                  {["Akhil Mohan", "Tijin Antony"].map((name) => (
                    <div key={name} className="flex items-center gap-3">
                      <span className="w-8 h-8 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center text-primary font-bold text-xs font-heading">
                        {name[0]}
                      </span>
                      <span className="text-white/70 text-sm font-medium">
                        {name}
                      </span>
                    </div>
                  ))}
                </motion.div>
              </div>
            </RevealSection>

            {/* Right: R&D points grid */}
            <RevealSection>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {rdPoints.map((pt, i) => (
                  <motion.div
                    key={pt.title}
                    variants={fadeUp}
                    custom={i * 0.1}
                    className="group p-5 border border-white/[0.07] hover:border-primary/30 bg-white/[0.015] hover:bg-white/[0.03] transition-all duration-400 relative overflow-hidden"
                  >
                    <div className="flex items-start gap-3 mb-2">
                      <span className="mt-1 w-2 h-2 rounded-full bg-primary flex-shrink-0" />
                      <h4 className="font-heading font-semibold text-sm text-white group-hover:text-primary transition-colors duration-300">
                        {pt.title}
                      </h4>
                    </div>
                    <p className="text-white/80 text-xs leading-relaxed pl-5">
                      {pt.desc}
                    </p>
                  </motion.div>
                ))}
              </div>
            </RevealSection>
          </div>
        </div>
      </section>

      {/* ── FRANCHISE SUPPORT ─────────────────────────────────────────────── */}
      <section className="py-14 md:py-20 bg-white">
        <div className="container">
          <RevealSection>
            <div className="mb-12 md:mb-16">
              <motion.h2
                variants={fadeUp}
                custom={1}
                className="font-heading font-bold text-3xl md:text-4xl lg:text-5xl text-textColor leading-tight"
              >
                OUR COMPREHENSIVE FRANCHISE SUPPORT SYSTEM
              </motion.h2>
              <OrangeLine className="mt-4 w-16" />
            </div>
          </RevealSection>

          <div className="relative">
            {/* Refreshed Vertical connector line for white BG */}
            <div className="hidden lg:block absolute left-[2.25rem] top-6 bottom-6 w-[1px] bg-gradient-to-b from-primary/40 via-zinc-200 to-transparent" />

            <div className="flex flex-col gap-8">
              {franchiseSupportItems.map((item, i) => (
                <RevealSection key={item.num}>
                  <motion.div
                    variants={fadeUp}
                    custom={i * 0.12}
                    className="group flex flex-col lg:flex-row items-start gap-6 lg:gap-10 relative"
                  >
                    {/* Number bubble with clean background matching white theme */}
                    <div className="flex-shrink-0 w-[4.5rem] h-[4.5rem] rounded-full border-2 border-primary/20 group-hover:border-primary bg-white flex items-center justify-center transition-colors duration-400 z-10 shadow-sm">
                      <span className="font-heading font-bold text-primary text-xl">
                        {item.num}
                      </span>
                    </div>

                    {/* Content Card optimized for White BG */}
                    <div className="flex-1 border border-zinc-200 bg-zinc-50/50 group-hover:bg-white p-7 transition-all duration-400 shadow-sm group-hover:shadow-xl group-hover:shadow-zinc-200/50 rounded-xl">
                      <h3 className="font-heading font-bold text-lg text-zinc-900 group-hover:text-primary transition-colors duration-300 mb-2">
                        {item.title}
                      </h3>
                      <p className="text-zinc-600 text-sm leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </motion.div>
                </RevealSection>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── ABOUT ────────────────────────────────────────────────────────── */}
      <section
        id="about"
        className="py-14 md:py-24 bg-[#fff9f5] border-y border-zinc-100 relative overflow-hidden"
      >
        {/* Ambient background accent tailored for a light theme */}
        <div className="absolute -right-40 top-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-primary/5 blur-[100px] pointer-events-none" />

        <div className="container relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Left badge column - Optimized for White background */}
            <RevealSection className="lg:col-span-4">
              <motion.div variants={fadeUp} custom={0} className="relative">
                <div className="border border-primary/20 bg-primary/5 p-8 text-center rounded-xl">
                  <span className="font-heading font-bold text-primary text-5xl block mb-1">
                    ISO
                  </span>
                  <span className="text-zinc-600 text-xs tracking-widest uppercase font-semibold">
                    Certified Institute
                  </span>
                </div>

                <div className="mt-4 grid grid-cols-2 gap-4">
                  {[
                    { label: "Years of Experience", value: "8+" },
                    { label: "Creative Courses", value: "10+" },
                  ].map((s) => (
                    <div
                      key={s.label}
                      className="border border-zinc-200/60 bg-zinc-50 p-5 text-center rounded-xl"
                    >
                      <span className="font-heading font-bold text-3xl text-primary block">
                        {s.value}
                      </span>
                      <span className="text-zinc-500 text-xs mt-1 block leading-tight font-medium">
                        {s.label}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="mt-4 border border-zinc-200/60 bg-zinc-50 p-5 text-center rounded-xl">
                  <span className="text-zinc-700 text-xs tracking-widest uppercase font-bold font-heading">
                    NSDC Certified
                  </span>
                </div>
              </motion.div>
            </RevealSection>

            {/* Right text column */}
            <RevealSection className="lg:col-span-8">
              <div>
                <div className="mb-8 md:mb-10">
                  <motion.p
                    variants={fadeUp}
                    custom={0}
                    className="text-primary font-heading font-semibold text-sm tracking-[0.2em] uppercase mb-3"
                  >
                    Who We Are
                  </motion.p>
                  <motion.h2
                    variants={fadeUp}
                    custom={1}
                    className="font-heading font-bold text-3xl md:text-4xl lg:text-5xl text-textColor leading-tight"
                  >
                    About Pixeltoonz Creative Education
                  </motion.h2>
                  <OrangeLine className="mt-4 w-16" />
                </div>

                <motion.div
                  variants={fadeUp}
                  custom={3}
                  className="space-y-4 text-zinc-600 text-sm leading-relaxed"
                >
                  <p>
                    Pixeltoonz Academy is an ISO-certified creative education
                    institute in Kerala offering industry-focused courses in{" "}
                    <span className="text-zinc-900 font-semibold">
                      Animation, VFX, 3D Design, Film Editing, Photography,
                      Cinematography, Graphic Design, and Web Technologies.
                    </span>
                  </p>
                  <p>
                    With production-oriented training, experienced mentors, and
                    strong industry partnerships, we help students build
                    practical skills and become career-ready creative
                    professionals. Our personalized learning approach, small
                    batch sizes, and hands-on projects ensure every student
                    receives focused guidance and real-world exposure.
                  </p>
                  <p>
                    At Pixeltoonz, we believe in nurturing creativity through
                    the perfect blend of art, design, and technology, empowering
                    students to grow with confidence in today’s fast-evolving
                    creative industry
                  </p>
                </motion.div>

                {/* Course tags container */}
                <motion.div
                  variants={fadeUp}
                  custom={4}
                  className="mt-8 flex flex-wrap gap-2"
                >
                  {[
                    "Animation",
                    "VFX",
                    "3D Design",
                    "Film Editing",
                    "Photography",
                    "Cinematography",
                    "Graphic Design",
                    "Web Technologies",
                  ].map((course) => (
                    <span
                      key={course}
                      className="text-xs font-heading font-semibold text-primary border border-primary/20 bg-primary/5 px-3 py-1.5 rounded-md hover:bg-primary/10 transition-colors duration-200 cursor-default"
                    >
                      {course}
                    </span>
                  ))}
                </motion.div>
              </div>
            </RevealSection>
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────────────── */}
      <section className="py-14 md:py-24">
        <div className="container text-center">
          <RevealSection>
            <motion.p
              variants={fadeUp}
              custom={0}
              className="text-primary font-heading font-semibold text-sm tracking-[0.2em] uppercase mb-4"
            >
              Start Your Journey
            </motion.p>
            <motion.h2
              variants={fadeUp}
              custom={1}
              className="font-heading font-bold text-3xl md:text-4xl lg:text-5xl text-white mb-6 leading-tight"
            >
              Ready to Own a Pixeltoonz Franchise?
            </motion.h2>
            <OrangeLine className="w-16 mx-auto mb-8" />
            <motion.p
              variants={fadeUp}
              custom={2}
              className="text-white/55 text-sm md:text-base max-w-lg mx-auto mb-10 leading-relaxed"
            >
              Join our network of successful franchise partners and become a
              part of Kerala&apos;s most trusted creative education brand.
            </motion.p>
            <motion.div variants={fadeUp} custom={3}>
              <a
                href="#"
                className="inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary-dark text-white font-heading font-semibold tracking-wide px-10 py-4 text-sm transition-colors duration-300"
              >
                Apply for Franchise
                <svg
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </a>
            </motion.div>
          </RevealSection>
        </div>
      </section>
    </main>
  );
}
