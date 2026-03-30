"use client";

import { useState } from "react";
import { EnquiryForm } from "./EnquiryForm";

const faqs = [
  { q: "Who is this course designed for?", a: "This course is crafted for beginners, career-switchers, and professionals looking to deepen their expertise. No prior experience is required — just curiosity and commitment." },
  { q: "How long do I have access to the course materials?", a: "Lifetime access. Once enrolled, all content — including future updates — is yours forever." },
  { q: "Is there a certificate upon completion?", a: "Yes! You'll receive an industry-recognized certificate of completion that you can share on LinkedIn and your portfolio." },
  { q: "What if I'm not satisfied with the course?", a: "We offer a 30-day money-back guarantee, no questions asked. Your satisfaction is our priority." },
  { q: "Are there live sessions or is it fully self-paced?", a: "The course is fully self-paced with recorded sessions, but we host monthly live Q&A webinars for all enrolled students." },
];

const benefits = [
  { icon: "◈", title: "Expert Instructors", desc: "Learn from practitioners with 10+ years of real-world experience." },
  { icon: "◉", title: "Hands-On Projects", desc: "Build 6 portfolio-ready projects from day one." },
  { icon: "◐", title: "Community Access", desc: "Join 12,000+ learners in our private Discord community." },
  { icon: "◑", title: "Career Support", desc: "Resume reviews, mock interviews & job placement assistance." },
];

const whyItems = [
  { title: "Curriculum Designed by CTOs", desc: "Syllabus co-created with engineering leaders from top-tier tech companies." },
  { title: "Real Codebase, Not Toys", desc: "You work inside a production codebase — PRs, reviews, CI/CD and all." },
  { title: "Outcome-First Approach", desc: "Every lesson maps to a skill that hiring managers actively look for." },
  { title: "Ongoing Updates", desc: "Content refreshes every quarter to stay current with the industry." },
];

const acquireItems = [
  "Master core concepts from fundamentals to advanced patterns",
  "Build production-ready applications with modern tooling",
  "Understand industry best practices and scalable architecture",
  "Deploy, monitor, and optimize real-world systems",
  "Collaborate effectively in professional team environments",
  "Craft a compelling portfolio that stands out to recruiters",
];

export default function CourseOverview() {
  const [openFaq, setOpenFaq] = useState(null);

  return (
    <div
      className="min-h-screen text-black"
      style={{ fontFamily: "'DM Serif Display', Georgia, serif" }}
    >

      <div className="container mx-auto py-10">
        <div className="page-layout">

          {/* ── MAIN COLUMN ── */}
          <main className="main-col">

            {/* HERO */}
            <section className="relative pt-16 pb-12 border-b border-[#2a2a35] mb-16">
              <p className="font-sans-dm text-[11px] font-semibold tracking-[3px] uppercase text-primary mb-5 flex items-center gap-3">
                <span className="block w-8 h-px bg-primary" />
                Professional Development
              </p>
              <h1 className="text-[clamp(2.4rem,5vw,4rem)] italic leading-[1.1] text-[#131313] mb-6 tracking-tight">
                Master the Art of<br />
                <span className="text-primary not-italic">Full-Stack Engineering</span>
              </h1>
              <p className="font-sans-dm text-[1.05rem] leading-[1.8] text-textColor max-w-[600px] font-light">
                A rigorous, career-defining program built for those who refuse to settle for ordinary.
                From foundations to production — learn the way professionals actually build.
              </p>
              
            </section>

            {/* IMAGES */}
            <section className="mb-[72px]">
              <div className="grid grid-cols-[2fr_1fr] grid-rows-[220px_180px] gap-3">
                <div className="row-span-2 rounded-sm overflow-hidden relative">
                  <div className="w-full h-full flex items-center justify-center font-sans-dm text-[0.75rem] tracking-[2px] uppercase text-[#8a8578] border border-[#2a2a35] rounded-sm relative overflow-hidden" style={{ background: "linear-gradient(135deg,#13131a 0%,#1e1e2a 100%)" }}>
                    <div className="absolute inset-0" style={{ background: "linear-gradient(to top,rgba(10,10,15,.6) 0%,transparent 60%)" }} />
                    <span className="relative z-10">Course Preview</span>
                    <span className="absolute bottom-4 left-4 font-sans-dm text-[0.7rem] tracking-[2px] uppercase text-[#c9a84c] z-20">Live Sessions</span>
                  </div>
                </div>
                {[{ label: "Workspace", tag: "Projects" }, { label: "Community", tag: "Mentorship" }].map(({ label, tag }) => (
                  <div key={label} className="rounded-sm overflow-hidden relative">
                    <div className="w-full h-full flex items-center justify-center font-sans-dm text-[0.75rem] tracking-[2px] uppercase text-[#8a8578] border border-[#2a2a35] rounded-sm relative overflow-hidden" style={{ background: "linear-gradient(135deg,#13131a 0%,#1e1e2a 100%)" }}>
                      <div className="absolute inset-0" style={{ background: "linear-gradient(to top,rgba(10,10,15,.6) 0%,transparent 60%)" }} />
                      <span className="relative z-10">{label}</span>
                      <span className="absolute bottom-4 left-4 font-sans-dm text-[0.7rem] tracking-[2px] uppercase text-[#c9a84c] z-20">{tag}</span>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* DESCRIPTION */}
            <section className="mb-[72px]">
              <p className="font-sans-dm text-[10px] tracking-[4px] uppercase text-primary mb-3.5">About the Course</p>
              <h2 className="text-[2rem] italic text-textColor mb-4 leading-[1.2]">Built different, by design</h2>
              <p className="font-sans-dm text-[1rem] leading-[1.9] text-textColor font-light">
                This isn&apos;t a surface-level tutorial. Every module is engineered around how software is
                actually written in professional environments — with code reviews, architectural decisions,
                and the hard tradeoffs that define great engineers.
              </p>
              <blockquote className="border-l-2 border-[#c9a84c] pl-7 py-5 my-5 bg-[rgba(201,168,76,0.04)]">
                <p className="font-sans-dm text-[1.15rem] text-textColor font-extrabold italic">
                  &quot;The gap between knowing and doing is where most courses fail. This one bridges it.&quot;
                </p>
              </blockquote>
              <p className="font-sans-dm text-[1rem] leading-[1.9] text-textColor font-light mb-5">
                Over 48 structured hours, you&apos;ll move from foundational concepts to deploying a full-scale
                application — understanding not just the &apos;how&apos;, but the &apos;why&apos; behind every choice.
              </p>
              <div className="w-12 h-px bg-[#c9a84c] opacity-40 mt-8" />
            </section>

            {/* WHY THIS COURSE */}
            <section className="mb-[72px] p-12 bg-[#13131a] border border-[#2a2a35] rounded-sm relative">
              <span className="absolute right-8 -top-5 text-[200px] text-[#c9a84c] opacity-[0.04] italic leading-none pointer-events-none select-none" aria-hidden="true">&ldquo;</span>
              <p className="font-sans-dm text-[10px] tracking-[4px] uppercase text-primary mb-3.5">Why This Course</p>
              <h2 className="text-[2rem] italic text-[#f0ede6] mb-9 leading-[1.2]">Four reasons this changes everything</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-7">
                {whyItems.map((item, i) => (
                  <div key={i} className="flex gap-4 items-start">
                    <div className="text-[2rem] italic text-primary opacity-40 leading-none shrink-0 w-8">0{i + 1}</div>
                    <div>
                      <h4 className="font-sans-dm text-[0.9rem] font-semibold text-[#f0ede6] mb-1.5">{item.title}</h4>
                      <p className="font-sans-dm text-[0.83rem] leading-[1.7] text-[#8a8578] font-light">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* ACQUIRE */}
            <section className="mb-[72px]">
              <p className="font-sans-dm text-[10px] tracking-[4px] uppercase text-primary mb-3.5">What You&apos;ll Gain</p>
              <h2 className="text-[2rem] italic text-textColor mb-8 leading-[1.2]">Skills you&apos;ll take into the world</h2>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 list-none">
                {acquireItems.map((item, i) => (
                  <li key={i} className="flex gap-3 items-start font-sans-dm text-[0.88rem] leading-[1.6] text-textColor font-light p-4 border border-primary/50 rounded-sm transition-all duration-200 hover:border-[#c9a84c] hover:bg-[rgba(201,168,76,0.03)] hover:text-[#f0ede6] cursor-default">
                    <span className="text-primary text-[0.9rem] shrink-0 mt-px">◆</span>
                    {item}
                  </li>
                ))}
              </ul>
            </section>

            {/* BENEFITS */}
            <section className="mb-[72px]">
              <p className="font-sans-dm text-[10px] tracking-[4px] uppercase text-primary mb-3.5">Benefits</p>
              <h2 className="text-[2rem] italic text-textColor mb-8 leading-[1.2]">Everything you get, day one</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {benefits.map((b, i) => (
                  <div key={i} className="p-8 bg-[#13131a] border border-[#2a2a35] rounded-sm transition-all duration-[250ms] hover:border-[#c9a84c] hover:-translate-y-1 cursor-default">
                    <div className="text-[1.6rem] text-primary mb-4">{b.icon}</div>
                    <h4 className="font-sans-dm text-[0.95rem] font-semibold text-[#f0ede6] mb-2">{b.title}</h4>
                    <p className="font-sans-dm text-[0.83rem] leading-[1.7] text-[#8a8578] font-light">{b.desc}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* CTA */}
            <section
              className="mb-[72px] py-16 px-12 border border-[rgba(201,168,76,0.2)] rounded-sm text-center relative"
              style={{ background: "linear-gradient(135deg,#1a1508 0%,#0d1520 100%)" }}
            >
              <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-[300px] h-[300px] pointer-events-none" style={{ background: "radial-gradient(circle,rgba(201,168,76,.08) 0%,transparent 70%)" }} />
              <h2 className="text-[2.2rem] text-primary italic mb-4 relative">Your future self starts here</h2>
              <p className="font-sans-dm text-[#8a8578] text-[0.95rem] mb-9 font-light relative">
                Enrolment closes on April 15th. Secure your seat before it&apos;s gone.
              </p>
              <div className="flex gap-4 justify-center flex-wrap relative">
                <button className="px-12 py-3.5 bg-primary text-[#0a0a0f] font-sans-dm font-semibold text-[0.85rem] tracking-[1.5px] uppercase rounded-[2px] border-0 cursor-pointer transition-all duration-200 hover:bg-[#e8c97a] hover:-translate-y-0.5">Enrol Now</button>
                {/* <button className="px-9 py-3.5 bg-transparent text-[#f0ede6] font-sans-dm font-medium text-[0.85rem] tracking-[1.5px] uppercase border border-primary rounded-[2px] cursor-pointer transition-all duration-200 hover:border-[#c9a84c] hover:text-[#c9a84c]">Download Syllabus</button> */}
              </div>
            </section>

            {/* FAQ */}
            <section className="mb-[72px]">
              <p className="font-sans-dm text-[10px] tracking-[4px] uppercase text-primary mb-3.5">Frequently Asked</p>
              <h2 className="text-[2rem] italic text-textColor mb-8 leading-[1.2]">Questions, answered</h2>
              {faqs.map((faq, i) => (
                <div key={i} className="border-b border-[#2a2a35]">
                  <button
                    className="w-full text-left py-6 bg-transparent border-0 cursor-pointer flex items-center justify-between gap-4 font-sans-dm text-[0.95rem] font-medium text-textColor transition-colors duration-200 hover:text-primary"
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  >
                    {faq.q}
                    <span className={`faq-indicator text-primary text-[1.2rem] shrink-0 italic${openFaq === i ? " open" : ""}`}>+</span>
                  </button>
                  <div className={`faq-body${openFaq === i ? " open" : ""}`}>
                    <p className="font-sans-dm text-[0.88rem] leading-[1.8] text-[#8a8578] font-light">{faq.a}</p>
                  </div>
                </div>
              ))}
            </section>

            {/* Mobile form */}
            <div className="mobile-form mb-16">
              <EnquiryForm />
            </div>

          </main>

          {/* ── STICKY SIDEBAR ── */}
          <aside className="sidebar-col">
            <EnquiryForm />
          </aside>

        </div>
      </div>
    </div>
  );
}