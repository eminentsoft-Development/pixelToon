"use client";

import { useState } from "react";
import { EnquiryForm } from "./EnquiryForm";
import { Plus } from "lucide-react";
import ImageGallery from "./ImageGallery";
import { faqs } from "@/contant/faq";
import DOMPurify from "dompurify";

export default function CourseOverview({
  title,
  description,
  images,
  content,
  whyThisCourse,
  acquireItems,
}) {
  const [openFaq, setOpenFaq] = useState(null);

  const cleanHtml =
    typeof window !== "undefined" ? DOMPurify.sanitize(content) : content;

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
              <h1 className="text-[clamp(2.4rem,5vw,4rem)] w-[85%] italic leading-[1.1] text-[#131313] mb-6 tracking-tight">
                {title}
                <br />
                {/* <span className="text-primary not-italic">
                  Full-Stack Engineering
                </span> */}
              </h1>
              <p className="font-sans-dm text-[1.05rem] leading-[1.8] text-textColor max-w-[600px] font-light">
                {description}
              </p>
            </section>

            {/* IMAGES */}
            <section className="mb-[72px]">
              <ImageGallery images={images} />
            </section>

            {/* DESCRIPTION */}
            <section className="mb-[72px]">
              <div
                className="prose prose-slate lg:prose-xl max-w-none 
                   prose-headings:font-serif prose-a:text-primary"
                dangerouslySetInnerHTML={{ __html: cleanHtml }}
              />
            </section>

            {/* WHAT YOU'LL GAIN */}
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
                  <div key={i} className="flex bg-white/[0.03] rounded-lg py-4 px-4 gap-4 items-center ">
                    <div className="text-3xl italic text-primary opacity-40 leading-none shrink-0 w-8">
                      0{i + 1}
                    </div>
                      <h4 className="font-sans-dm text-[0.9rem] font-semibold text-[#f0ede6]">
                        {item.value}
                      </h4>
                  </div>
                ))}
              </div>
            </section>

            {/* ACQUIRE */}
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

            {/* BENEFITS */}
            {/* <section className="mb-[72px]">
              <p className="font-sans-dm text-[10px] tracking-[4px] uppercase text-primary mb-3.5">
                Benefits
              </p>
              <h2 className="text-[2rem] italic text-textColor mb-8 leading-[1.2]">
                Everything you get, day one
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {benefits.map((b, i) => (
                  <div
                    key={i}
                    className="p-8 bg-[#13131a] border border-[#2a2a35] rounded-sm transition-all duration-[250ms] hover:border-[#c9a84c] hover:-translate-y-1 cursor-default"
                  >
                    <div className="text-[1.6rem] text-primary mb-4">
                      {b.icon}
                    </div>
                    <h4 className="font-sans-dm text-[0.95rem] font-semibold text-[#f0ede6] mb-2">
                      {b.title}
                    </h4>
                    <p className="font-sans-dm text-[0.83rem] leading-[1.7] text-[#8a8578] font-light">
                      {b.desc}
                    </p>
                  </div>
                ))}
              </div>
            </section> */}

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
