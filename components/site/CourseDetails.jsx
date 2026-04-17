"use client";

import { useState } from "react";
import { EnquiryForm } from "./EnquiryForm";
import { Plus } from "lucide-react";
import ImageGallery from "./ImageGallery";
import { faqs } from "@/contant/faq";
import ContentRenderer from "./ContentRenderer";

export default function CourseOverview({
  title,
  description,
  images,
  content,
  whyThisCourse,
  acquireItems,
  curriculum,
  bonus,
  projects,
}) {
  const [openFaq, setOpenFaq] = useState(null);

  return (
    <div
      className="min-h-screen text-black"
      style={{ fontFamily: "'DM Serif Display', Georgia, serif" }}
    >
      <div className="container py-10">
        <div className="page-layout">
          {/* ── MAIN COLUMN ── */}
          <main className="main-col pl-6">
            {/* HERO */}

            {/* IMAGES */}
            <section className="">
              <ImageGallery images={images} />
            </section>
            <section className="relative pt-12 pb-6 border-b border-[#58585c] mb-16">
              <h1 className="text-[clamp(2.4rem,5vw,4rem)] w-[85%] italic leading-[1.1] text-[#131313] mb-6 tracking-tight">
                {title}
              </h1>
            </section>

            {/* DESCRIPTION */}
            <section className="mb-[72px]">
              <ContentRenderer content={content} />
            </section>

            {acquireItems.length > 0 && (
              <section className="mb-[72px] p-12 bg-[#13131a] border border-[#2a2a35] rounded-sm relative">
                <span
                  className="absolute right-8 -top-5 text-[200px] text-[#c9a84c] opacity-[0.04] italic leading-none pointer-events-none select-none"
                  aria-hidden="true"
                >
                  &ldquo;
                </span>
                <p className="font-sans-dm text-[10px] tracking-[4px] uppercase text-primary mb-3.5">
                  What You&apos;ll Gain
                </p>
                <h2 className="text-[2rem] italic text-[#f0ede6] mb-9 leading-[1.2]">
                  What you acquire from this Course ?
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {acquireItems.map((item, i) => (
                    <div
                      key={i}
                      className="flex bg-white/[0.03] rounded-lg py-4 px-4 gap-4 items-center "
                    >
                      <div className="text-3xl italic text-primary opacity-40 leading-none shrink-0 w-8">
                        {i < 9 ? "0" : ""}
                        {i + 1}
                      </div>
                      <h4 className="font-sans-dm text-[0.9rem] font-semibold text-[#f0ede6]">
                        {item.value}
                      </h4>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* whyThisCourse */}
            {whyThisCourse.length > 0 && (
              <section className="mb-[72px]">
                <p className="font-sans-dm text-[10px] tracking-[4px] uppercase text-primary mb-3.5">
                  Why This Course
                </p>
                <h2 className="text-[2rem] italic text-textColor mb-8 leading-[1.2]">
                  Why {title} in Kochi at Pixeltoonz Academy?
                </h2>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 list-none">
                  {whyThisCourse.map((item, i) => (
                    <li
                      key={i}
                      className="flex min-h-20 gap-3 items-center font-sans-dm text-[0.88rem] leading-[1.6] text-textColor font-light p-4 border border-primary/50 rounded-sm transition-all duration-200 hover:border-[#c9a84c] hover:bg-[rgba(201,168,76,0.03)] hover:text-primary cursor-default"
                    >
                      <span className="text-primary text-[0.9rem] shrink-0 mt-px">
                        ◆
                      </span>
                      {item?.value}
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {/* curriculum */}
            {curriculum?.length > 0 && (
              <section className="mb-[72px]">
                <div className="mb-16 max-w-2xl">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-10 h-[1px] bg-primary"></div>
                    <p className="font-sans-dm text-[10px] tracking-[4px] uppercase text-primary">
                      Curriculum
                    </p>
                  </div>
                  <h2 className="text-[2.5rem] italic text-textColor leading-[1.1] mb-6">
                    A comprehensive roadmap to <br />
                    <span className="text-primary">Digital Mastery.</span>
                  </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0 border-t border-l border-gray-400">
                  {curriculum.map((item, i) => (
                    <div
                      key={i}
                      className="group relative p-8 border-r border-b border-gray-400 hover:bg-[#c9a84c]/[0.02] transition-all duration-500 overflow-hidden"
                    >
                      {/* Animated Background Element */}
                      <div className="absolute bottom-0 left-0 w-full h-0.5 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>

                      <div className="relative z-10 flex flex-col gap-4">
                        <div className="flex justify-between items-start">
                          <span className="font-sans-dm text-[0.7rem] tracking-[2px] text-primary group-hover:text-primary transition-colors">
                            PHASE — 0{i + 1 < 10 ? `0${i + 1}` : i + 1}
                          </span>
                          <span className="text-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <svg
                              width="20"
                              height="20"
                              viewBox="0 0 24 24"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M7 17L17 7M17 7H7M17 7V17"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </span>
                        </div>

                        <h3 className="text-textColor text-xl font-light leading-snug  group-hover:text-primary transition-colors">
                          {item.value}
                        </h3>

                        <div className="border-t border-white/5 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
                          <p className="text-[0.7rem] text-textColor/70 uppercase tracking-widest font-sans-dm">
                            Professional Training
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Common Section: Bonus / Optional Modules */}
            {bonus?.length > 0 && (
              <section className="mb-[72px] p-8 md:p-12 bg-[#13131a] border border-primary/20 rounded-sm bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent">
                <div className="mb-10">
                  <p className="font-sans-dm text-[10px] tracking-[4px] uppercase text-primary mb-3.5">
                    Extra Value
                  </p>
                  <h2 className="text-[2rem] italic text-[#f0ede6] leading-[1.2]">
                    Bonus & Optional Modules
                  </h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {bonus.map((bonus, i) => (
                    <div
                      key={i}
                      className="p-5 bg-white/[0.03] border border-white/5 rounded-md hover:bg-white/[0.05] transition-all"
                    >
                      <div className="w-6 h-6 mb-3 flex items-center justify-center rounded-full bg-primary/10 text-primary text-[10px]">
                        ✦
                      </div>
                      <h4 className="text-[#f0ede6] text-[0.88rem] font-sans-dm leading-snug">
                        {bonus.value}
                      </h4>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Common Section: Capstone Project */}
            {projects?.length > 0 && (
              <section className="mb-[72px]">
                <div className="mb-10 text-center">
                  <p className="font-sans-dm text-[10px] tracking-[4px] uppercase text-primary mb-3.5">
                    Hands-on Experience
                  </p>
                  <h2 className="text-[2rem] italic text-textColor leading-[1.2]">
                    Capstone Project & Certification
                  </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-px bg-[#2a2a35] border border-[#2a2a35]">
                  {projects.map((step, i) => (
                    <div
                      key={i}
                      className="bg-[#0f0f15] p-8 flex flex-col items-center text-center"
                    >
                      <div className="text-primary font-extrabold text-4xl mb-4">
                        0{i + 1}
                      </div>
                      <p className="text-white text-[0.85rem] leading-relaxed">
                        {step.value}
                      </p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* CTA */}
            <section
              className="mb-[72px] py-16 px-12 border border-[rgba(201,168,76,0.2)] rounded-sm text-center relative"
              style={{
                background: "linear-gradient(135deg,#1a1508 0%,#0d1520 100%)",
              }}
            >
              <div
                className="absolute -top-20 left-1/2 -translate-x-1/2 w-[300px] h-[300px] pointer-events-none"
                style={{
                  background:
                    "radial-gradient(circle,rgba(201,168,76,.08) 0%,transparent 70%)",
                }}
              />
              <h2 className="text-[2.2rem] text-primary italic mb-4 relative">
                Your future self starts here
              </h2>
              <p className="font-sans-dm text-[#8a8578] text-[0.95rem] mb-9 font-light relative">
                Enrolment closes on April 15th. Secure your seat before
                it&apos;s gone.
              </p>
              <div className="flex gap-4 justify-center flex-wrap relative">
                <button className="px-12 py-3.5 bg-primary text-[#0a0a0f] font-sans-dm font-semibold text-[0.85rem] tracking-[1.5px] uppercase rounded-[2px] border-0 cursor-pointer transition-all duration-200 hover:bg-[#e8c97a] hover:-translate-y-0.5">
                  Enrol Now
                </button>
                {/* <button className="px-9 py-3.5 bg-transparent text-[#f0ede6] font-sans-dm font-medium text-[0.85rem] tracking-[1.5px] uppercase border border-primary rounded-[2px] cursor-pointer transition-all duration-200 hover:border-[#c9a84c] hover:text-[#c9a84c]">Download Syllabus</button> */}
              </div>
            </section>

            {/* FAQ */}
            <section className="mb-[72px]">
              <p className="font-sans-dm text-[10px] tracking-[4px] uppercase text-primary mb-3.5">
                Frequently Asked
              </p>
              <h2 className="text-[2rem] italic text-textColor mb-8 leading-[1.2]">
                Questions, answered
              </h2>

              {faqs.map((faq, i) => (
                <div key={i} className="border-b border-[#2a2a35]">
                  <button
                    className={`w-full text-left py-6 bg-transparent border-0 cursor-pointer flex items-center justify-between gap-4 font-sans-dm  text-base font-bold text-textColor transition-colors duration-200 hover:text-primary`}
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  >
                    {faq.q}
                    <span
                      className={`faq-indicator mr-2 text-primary text-[1.2rem] shrink-0 italic${
                        openFaq === i ? " open" : ""
                      }`}
                    >
                      <Plus className="w-5 h-5" />
                    </span>
                  </button>

                  <div
                    className={`faq-body${openFaq === i ? " open mb-6 " : ""}`}
                  >
                    <div className="font-sans-dm  text-[0.88rem] leading-[1.8] text-bgColor font-bold">
                      {faq.a.includes("\n") ? (
                        <ul className="list-disc pl-5 space-y-1">
                          {faq.a.split("\n").map((item, index) => (
                            <li key={index}>{item}</li>
                          ))}
                        </ul>
                      ) : (
                        <p>{faq.a}</p>
                      )}
                    </div>
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
