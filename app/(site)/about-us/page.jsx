"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Users,
  Award,
  CheckCircle2,
  Sparkles,
  CheckCircle,
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

  return (
    <div className="bg-white text-slate-900 font-sans">
      <Breadcrumbs />

      <section className="py-16 md:py-24 container overflow-hidden bg-white">
        <div className="mx-auto">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            {/* LEFT IMAGE COLUMN */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              {/* Adjusted min-height for mobile to prevent massive empty space */}
              <div className="min-h-[450px] lg:min-h-[830px] rounded-3xl lg:rounded-[3rem] overflow-hidden shadow-2xl relative">
                <Image
                  src="https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=2070&auto=format&fit=crop"
                  alt="Creative Workspace"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                  priority={false}
                />

                <div className="absolute inset-0 bg-gradient-to-t from-[#BC430D]/60 to-transparent" />

                <div className="absolute bottom-10 left-6 lg:left-10 text-white">
                  <p className="text-5xl font-black mb-2 italic">ISO</p>
                  <p className="text-sm font-bold uppercase tracking-widest opacity-80 text-[#F09410]">
                    Certified Excellence
                  </p>
                </div>
              </div>

              {/* Floating Graphic Element - Adjusted z-index and position */}
              <div className="absolute -top-10 -right-5 lg:-right-10 w-40 h-40 bg-[#F09410] rounded-full blur-[80px] opacity-20 -z-10" />
            </motion.div>

            {/* RIGHT TEXT COLUMN */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex flex-col gap-4"
            >
              <h2 className="text-4xl md:text-5xl font-black mb-8 leading-tight">
              About <span className="text-[#BC430D]">Pixeltoonz Academy</span>{" "}
              of Film & Media Design
            </h2>
            <p className="text-base text-slate-600 mb-4 tracking-wider leading-relaxed">
              Pixeltoonz, an ISO certified company, is one among the top
              educational institution in Kerala, providing the best multimedia
              courses in Animation, VFX, 3D Design, Film Editing, Photography,
              Cinematography, Graphics Design and Web Technologies, we
              personally understand the student’s natural ability and
              accordingly inculcate{" "}
              <span className="text-slate-900 font-bold italic">
                “Creativity”
              </span>{" "}
              with the right blend of motivation & inspiration towards Art,
              Design & Technology. Join us for the top tier best graphic design
              course in kerala, upgrade and master your creativity and skills in
              a vibrant learning environment.
            </p>
            <p className="text-base text-slate-600 mb-4 tracking-wider leading-relaxed">
              Our Production Oriented training and Industry Partnerships empower
              Students, to unlock their creative potential and become ‘work
              ready’, in this fast-paced, creative skills industry and economy.
            </p>

            <p className="text-base text-slate-600 mb-4 tracking-wider leading-relaxed">
              Pixeltoonz has already gained a reputation within the industry for
              focusing more on quality than on quantity. All courses are capped
              at 12 students per class, We assure all our trainees the
              personalized training so that they can get a chance to clarify
              their doubts and work more.
            </p>

            <p className="text-base border-l-4 pl-4 font-bold py-3 rounded-xl bg-primary/5 border-primary text-slate-600 mb-4 tracking-wider leading-relaxed">
              We at Pixeltoonz believe that the Human mind is a beautiful place
              and every individual is creatively endowed. They just need the
              right teacher to ignite the Spark!!
            </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* --- THE 12-STUDENT PROMISE (STATS BAR) --- */}
      <section className="bg-slate-950 py-24 relative overflow-hidden">
        {/* Subtle top/bottom borders that fade out */}
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

        <div className="container mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
            {stats.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="group flex flex-col items-center text-center lg:items-start lg:text-left"
              >
                {/* Icon with a "Soft Glow" background */}
                <div className="relative mb-8">
                  <div className="absolute inset-0 bg-yellow-500/20 blur-2xl rounded-full scale-0 group-hover:scale-150 transition-transform duration-700" />
                  <div className="relative w-14 h-14 bg-white/[0.03] border border-white/10 rounded-2xl flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-black group-hover:rotate-[10deg] transition-all duration-500 ease-out">
                    {stat.icon}
                  </div>
                </div>

                {/* Content */}
                <div className="space-y-1">
                  <p className="text-primary text-[10px] font-bold uppercase tracking-[0.3em] mb-2">
                    {stat.label}
                  </p>
                  <h4 className="text-2xl md:text-3xl font-bold text-white group-hover:text-primary transition-colors duration-300">
                    {stat.value}
                  </h4>
                </div>

                {/* Minimalist Separator Line */}
                <div className="mt-6 w-8 h-1 bg-white/10 rounded-full group-hover:w-16 group-hover:bg-primary transition-all duration-500" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-24">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.06)] rounded-[3rem] overflow-hidden border border-neutral-100">
            {/* Section 1: Affiliates - Bold & Dark */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="bg-neutral-950 p-10 md:p-16 flex flex-col justify-center relative overflow-hidden group"
            >
              {/* Subtle Pattern Background */}
              <div className="absolute inset-0 opacity-10 group-hover:opacity-20 transition-opacity duration-700 pointer-events-none bg-[radial-gradient(#eab308_1px,transparent_1px)] [background-size:24px_24px]" />

              <div className="relative z-10 h-full flex flex-col">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary text-black mb-8">
                  <Award size={24} />
                </div>

                <h3 className="text-3xl md:text-4xl font-bold text-white mb-6 leading-tight">
                  Affiliates & <br />
                  <span className="text-primary underline decoration-primary/70 underline-offset-8">
                    Certification
                  </span>
                </h3>

                <p className="text-neutral-400 text-lg leading-relaxed mb-8 flex-grow">
                  All professional Diploma, Master diploma courses at pixeltoonz
                  academy are affiliated to scientific and technical education
                  development council (STED Council), an ISO 9001:2008.
                  Certified organization under Government of India.
                </p>

                <div className="flex items-center gap-2 text-white/40 text-[10px] font-black uppercase tracking-[0.4em]">
                  <CheckCircle size={12} className="text-primary" /> Authorized
                  Institution
                </div>
              </div>
            </motion.div>

            {/* Section 2: Admission - Light & Clean */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-slate-50 p-10 md:p-16 flex flex-col justify-center group"
            >
              <div className="flex flex-col h-full">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-neutral-900 text-white mb-8 group-hover:bg-primary group-hover:text-black transition-colors duration-500">
                  <Users size={24} />
                </div>

                <h3 className="text-3xl md:text-4xl font-bold text-neutral-950 mb-6 leading-tight">
                  Admission & <br />
                  <span className="text-primary">Reservation</span>
                </h3>

                <p className="text-neutral-600 text-lg leading-relaxed mb-8 flex-grow">
                  To keep the quality of the program, we take only 12 students
                  in a batch to maintian the quality if the course and also to
                  give special attention to the students in particular.
                </p>

                <div className="flex items-center gap-2 text-neutral-400 text-[10px] font-black uppercase tracking-[0.4em]">
                  <CheckCircle size={12} className="text-primary" /> Individual
                  Mentorship
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
