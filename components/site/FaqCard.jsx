"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, MessageCircleQuestion } from "lucide-react";

const FaqList = ({ faqs }) => {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="space-y-3"
    >
      {faqs.map((faq, index) => {
        const isOpen = openIndex === index;

        return (
          <motion.div
            key={index}
            initial={false}
            className={`border rounded-2xl overflow-hidden transition-all duration-300 ${
              isOpen
                ? "bg-bgColor border-slate-200 shadow-md shadow-slate-200/50"
                : "bg-slate-50/50 border-slate-100 hover:bg-slate-50 hover:border-slate-200"
            }`}
          >
            <button
              // If it's already open, click it again to set to null (close it). Otherwise, set it to this index.
              onClick={() => setOpenIndex(isOpen ? null : index)}
              className="flex items-center justify-between w-full px-6 py-5 text-left focus:outline-none"
            >
              <div
                className={`flex items-center gap-3 text-lg font-semibold transition-colors ${
                  isOpen
                    ? "text-white"
                    : "text-slate-900 group-hover:text-indigo-600"
                }`}
              >
                {/* The new FAQ icon added here */}
                <MessageCircleQuestion
                  className={`flex-shrink-0 w-6 h-6 transition-colors ${
                    isOpen ? "text-indigo-200" : "text-indigo-500"
                  }`}
                />
                <span>{faq.question}</span>
              </div>
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
                    className={`px-6 pb-5 text-base leading-relaxed ${
                      isOpen ? "text-white" : "text-slate-600"
                    }`}
                  >
                    {faq.answer} {/* Referencing the mapped item */}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        );
      })}
    </motion.div>
  );
};

export default FaqList;
