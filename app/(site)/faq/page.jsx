"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Sparkles } from "lucide-react";
import Link from "next/link";
import Breadcrumbs from "@/components/site/Breadcrumbs";

// --- FAQ Data ---
const faqs = [
  {
    question: "What all courses are offered at Pixeltoonz Academy?",
    answer:
      "Graphics Design, Web Design, Web Development, Photography, Cinematography, Film Editing, UI/UX Design, PHP, Python, 3D Design, Animation, Visual Effects",
  },
  {
    question: "Which are the best institute for Photography course in Kerala?",
    answer:
      "There are several institutes offering Photography courses in Kerala. You can join Pixeltoonz if you want to pursue Photography course. It is one of the best institutes for Photography courses in Kerala. For your convenience, join Pixeltoonz.",
  },
  {
    question: "What is the Eligibility criteria to join Pixeltoonz?",
    answer:
      "You need to complete class 12 or 10 to be eligible to join Pixeltoonz.",
  },
  {
    question: "How much are the fees for Animation Course in Kerala?",
    answer:
      "Animation course fees depend on course type and course duration. The fees also vary from institute to institute. To know the exact fees, you need to visit a Animation training institute.",
  },
  {
    question: "What are the skills and software's taught in Graphics and Web Development Course at Pixeltoonz?",
    answer:
      "Adobe Photoshop, Adobe Illustrator, Adobe Indesign, corel draw, Photography, Adobe Dreamweaver, HTML, CSS, Java, jQuery, Bootstrap, Adobe Flash, Hosting etc are some of the software’s and skills taught in Graphics and Web Development courses at Pixeltoonz.",
  },
];

const FaqItem = ({ question, answer, isOpen, onClick }) => {
  return (
    <motion.div
      initial={false}
      className={`border rounded-2xl overflow-hidden transition-all duration-300 ${
        isOpen
          ? "bg-bgColor border-slate-200 shadow-md shadow-slate-200/50"
          : "bg-slate-50/50 border-slate-100 hover:bg-slate-50 hover:border-slate-200"
      }`}
    >
      <button
        onClick={onClick}
        className="flex items-center justify-between w-full px-6 py-5 text-left focus:outline-none"
      >
        <span
          className={`text-lg font-semibold ${isOpen ? "text-white" : "text-slate-900"}`}
        >
          {question}
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className={`flex-shrink-0 ml-4 p-1.5 rounded-full border transition-colors ${
            isOpen
              ? "bg-indigo-50 border-indigo-100 text-indigo-600"
              : "bg-white border-slate-200 text-slate-400"
          }`}
        >
          <ChevronDown size={16} />
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <div
              className={`px-6 pb-5 text-base leading-relaxed ${isOpen ? "text-white" : "text-slate-600"}`}
            >
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
// --- Main Page Component ---
const FaqPage = () => {
  const [openIndex, setOpenIndex] = useState(0); // First item open by default

  return (
    <div className="min-h-screen">
      <Breadcrumbs items={[{ label: "Frequently Asked Questions" }]} />

      <div className="container mx-auto py-16 md:py-20">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <h1 className="text-4xl md:text-5xl font-black font-sans text-slate-900 tracking-tighter mb-4 uppercase">
              Have <span className="text-[#BC430D]">Questions?</span>
            </h1>
            <p className="text-slate-500 max-w-xl font-medium">
              Everything you need to know about our admissions, class schedules,
              course modules, and hands-on professional placement support.
            </p>
          </div>
        </div>
        {/* FAQ Accordion List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="space-y-3"
        >
          {faqs.map((faq, index) => (
            <FaqItem
              key={index}
              question={faq.question}
              answer={faq.answer}
              isOpen={openIndex === index}
              onClick={() => setOpenIndex(openIndex === index ? -1 : index)}
            />
          ))}
        </motion.div>

        {/* Bottom Contact Prompt */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-16 text-center"
        >
          <p className="text-slate-400 text-sm">
            Still have questions?{" "}
            <Link
              href="/contact-us"
              className="text-primary hover:text-indigo-400 transition-colors font-medium border-b border-white/20 hover:border-blue-500 pb-0.5"
            >
              Contact our admissions team
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default FaqPage;
