"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Users,
  Award,
  Film,
  CheckCircle2,
  Sparkles,
  Camera,
  PenTool,
  Monitor,
  Lightbulb,
} from "lucide-react";
import Breadcrumbs from "@/components/site/Breadcrumbs";
import Image from "next/image";

const AboutUs = () => {
  const stats = [
    {
      icon: <Users size={24} />,
      label: "Max Batch Size",
      value: "12 Students",
    },
    {
      icon: <Award size={24} />,
      label: "Certification",
      value: "ISO 9001:2008",
    },
    {
      icon: <CheckCircle2 size={24} />,
      label: "Affiliation",
      value: "STED Council",
    },
    {
      icon: <Sparkles size={24} />,
      label: "Method",
      value: "Production Oriented",
    },
  ];

  const courses = [
    "Animation & VFX",
    "3D Design",
    "Film Editing",
    "Photography",
    "Cinematography",
    "Graphics Design",
    "Web Technologies",
  ];

  return (
    <div className="bg-white text-slate-900 font-sans">
      
      <Breadcrumbs />

      <section className="py-24 container mx-auto">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="aspect-[4/5] rounded-[3rem] overflow-hidden shadow-2xl relative">
              <Image
                src="https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=2070&auto=format&fit=crop"
                alt="Creative Workspace"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
                priority={false}
              />

              <div className="absolute inset-0 bg-gradient-to-t from-[#BC430D]/60 to-transparent" />

              <div className="absolute bottom-10 left-10 text-white">
                <p className="text-5xl font-black mb-2 italic">ISO</p>
                <p className="text-sm font-bold uppercase tracking-widest opacity-80 text-[#F09410]">
                  Certified Excellence
                </p>
              </div>
            </div>
            {/* Floating Graphic Element */}
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-[#F09410] rounded-full blur-[80px] opacity-20 -z-10" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-black mb-8 leading-tight">
              About <span className="text-[#BC430D]">Pixeltoonz Academy</span>{" "}
              of Film & Media Design
            </h2>
            <p className="text-lg text-slate-600 mb-8 leading-relaxed">
              Based in Kerala, Pixeltoonz is a top-tier educational institution
              providing premium multimedia courses. We personally understand
              each student&apos;s natural ability, inculcating{" "}
              <span className="text-slate-900 font-bold italic">
                “Creativity”
              </span>{" "}
              with a blend of motivation and technology.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {courses.map((course, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-3 text-sm font-bold text-slate-700 bg-slate-50 p-3 rounded-xl border border-slate-100"
                >
                  <div className="w-2 h-2 rounded-full bg-[#F09410]" />
                  {course}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* --- THE 12-STUDENT PROMISE (STATS BAR) --- */}
      <section className="bg-slate-950 py-20 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 lg:grid-cols-4 gap-12 relative z-10">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group text-center"
            >
              <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center mx-auto mb-6 text-[#F09410] group-hover:bg-[#F09410] group-hover:text-white transition-all duration-300">
                {stat.icon}
              </div>
              <h4 className="text-3xl font-black text-white mb-2">
                {stat.value}
              </h4>
              <p className="text-white/40 text-xs font-bold uppercase tracking-widest">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* --- PHILOSOPHY & ADMISSION --- */}
      <section className="py-24 px-6 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white rounded-[4rem] p-10 md:p-20 shadow-xl border border-slate-100 grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-block px-4 py-1 rounded-full bg-[#BC430D]/10 text-[#BC430D] text-xs font-bold mb-6 uppercase tracking-widest">
                Admission & Reservation
              </div>
              <h3 className="text-4xl font-black mb-6 italic">
                Maintaining Quality.
              </h3>
              <p className="text-slate-600 text-lg mb-8 leading-relaxed">
                To keep the quality of the program, we take{" "}
                <span className="text-[#BC430D] font-bold underline decoration-wavy underline-offset-4">
                  only 12 students in a batch
                </span>
                . This allows us to give special attention to each student and
                ensures a personalized training environment where doubts are
                clarified instantly.
              </p>
              <div className="flex flex-col gap-4">
                <div className="flex items-start gap-4 p-4 bg-slate-50 rounded-2xl">
                  <Monitor className="text-[#BC430D]" />
                  <div>
                    <h5 className="font-black text-sm uppercase italic">
                      Work Ready
                    </h5>
                    <p className="text-xs text-slate-500">
                      Industry partnerships empower our students for a
                      fast-paced economy.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="bg-[#BC430D] rounded-[3rem] p-8 text-white relative z-10 shadow-2xl overflow-hidden">
                <div className="absolute top-0 right-0 p-10 opacity-10">
                  <Lightbulb size={120} />
                </div>
                <h4 className="text-3xl font-black mb-6 leading-tight">
                  &quot;The Human mind is a beautiful place... it just needs the
                  right teacher to ignite the Spark!&quot;
                </h4>
                <div className="h-1 w-20 bg-white/40 rounded-full mb-4" />
                <p className="text-white/80 font-bold text-sm uppercase tracking-widest">
                  Pixeltoonz Philosophy
                </p>
              </div>
              {/* Decorative Blur */}
              <div className="absolute -bottom-10 -left-10 w-full h-full bg-[#BC430D]/20 blur-[100px] -z-10" />
            </div>
          </div>
        </div>
      </section>

      {/* --- FOOTER AFFILIATION --- */}
      <footer className="py-16 text-center border-t border-slate-100">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <Image
            src="https://www.stedcouncil.com/logo.png"
            alt="STED Council"
            width={160}
            height={48}
            className="mx-auto mb-6 grayscale opacity-50 hover:opacity-100 transition-opacity"
            onError={(e) => (e.currentTarget.style.display = "none")}
            priority={false}
          />

          <p className="text-slate-400 text-sm font-medium leading-relaxed">
            All professional Diploma and Master Diploma courses at Pixeltoonz
            Academy are affiliated with the{" "}
            <span className="text-slate-900 font-bold">
              Scientific and Technical Education Development Council (STED
              Council)
            </span>
            , an ISO 9001:2008 Certified organization under the Government of
            India.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default AboutUs;
