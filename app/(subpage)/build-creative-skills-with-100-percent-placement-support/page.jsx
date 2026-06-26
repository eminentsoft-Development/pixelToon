import { getCoursesForSelect } from "@/app/action/get-courses";
import CoursesSection from "@/components/site/CoursesSection";
import { ServiceEnquiry } from "@/components/site/EnquiryPopup";
import GetInTouch from "@/components/site/GetInTouch";
import { FaWhatsapp } from "react-icons/fa";
import ScrollReveal from "@/components/site/ScrollReveal";
import Testimonials from "@/components/site/Testimonials";
import {
  Briefcase,
  Clock,
  Laptop,
  MessageSquareText,
  Rocket,
  Users,
  Zap,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export const metadata = {
  title: "Multimedia Courses in Kerala | 100% Placement Support",
  description:
    "Learn Graphic Design, Animation & VFX, Video Editing, Videography, and Content Creation at Pixeltoonz with industry training and 100% placement support.",
  keywords: [],
  alternates: {
    canonical:
      "https://www.pixeltoonzacademy.com/build-creative-skills-with-100-percent-placement-support",
  },
};

export default async function CreativeHero() {
  const courseList = await getCoursesForSelect(1, 12);

  return (
    <>
      <section className="relative min-h-screen bg-gradient-to-br from-[#F09410] to-[#BC430D] overflow-hidden flex items-center font-sans text-white pt-24 lg:pt-0">
        <div className="container lg:mt-24 mx-auto relative z-10">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center py-12">
            {/* LEFT COLUMN */}
            <div className="lg:col-span-6 space-y-8 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 backdrop-blur-sm">
                <span className="w-2 h-2 rounded-full bg-yellow-300 animate-pulse shadow-[0_0_8px_#FDE047]"></span>
                <span className="text-sm font-semibold tracking-wide text-white uppercase">
                  Admissions Open 2026
                </span>
              </div>

              {/* Main Headline */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.1]">
                Build Creative Skills with{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-yellow-200 drop-shadow-sm">
                  100% Placement Support.
                </span>
              </h1>

              {/* Description */}
              <p className="text-lg sm:text-xl text-white/90 font-medium max-w-xl mx-auto lg:mx-0 leading-relaxed drop-shadow-sm">
                Join Kerala's leading multimedia academy and master Graphic
                Design, Content Creation, Animation & VFX, Video Editing, and
                Videography. Build a professional portfolio and kick-start your
                creative career with 100% placement support.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
                <ServiceEnquiry
                  btnName={"Make An Enquiry"}
                  serviceName=""
                  classname={
                    "w-full md:w-fit px-12 py-5 hover:bg-white hover:text-black"
                  }
                />

                <Link
                  href="https://wa.me/919745678780?text=Hi!%20I'm%20interested%20in%20your%20services.%20Could%20you%20please%20provide%20more%20details%3F"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-12 tracking-widest flex items-center justify-center gap-2 py-4 rounded-xl bg-green-500 text-white font-bold text-base hover:scale-[1.02] transition-all duration-300 w-full sm:w-auto text-center"
                >
                  <FaWhatsapp className="text-3xl text-white" />
                  WhatsApp
                </Link>
              </div>
            </div>

            <div className="lg:col-span-6 relative hidden lg:flex w-full h-[550px] items-center">
              <div className="grid grid-cols-2 gap-4 w-full h-[90%] relative z-10">
                <div className="relative w-full h-full rounded-[2rem] overflow-hidden  border-2 border-white/20 shadow-[0_20px_50px_rgba(0,0,0,0.3)] group">
                  <Image
                    src="/home/designs-brand-7.webp"
                    alt="VFX & Animation"
                    fill
                    sizes="(max-width: 1024px) 50vw, 25vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                </div>

                <div className="flex flex-col gap-4 w-full h-full">
                  <div className="relative w-full h-1/2 rounded-[2rem] overflow-hidden  border-2 border-white/20 shadow-[0_20px_50px_rgba(0,0,0,0.3)] group">
                    <Image
                      src="/home/featured-1.webp"
                      alt="3D Design"
                      fill
                      sizes="(max-width: 1024px) 50vw, 25vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                  </div>

                  <div className="relative w-full h-1/2 rounded-[2rem] overflow-hidden  border-2 border-white/20 shadow-[0_20px_50px_rgba(0,0,0,0.3)] group">
                    <Image
                      src="/home/image1.webp"
                      alt="UI/UX Design"
                      fill
                      sizes="(max-width: 1024px) 50vw, 25vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                  </div>
                </div>
              </div>

              <div className="absolute top-10 -left-6 z-20 bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-2xl shadow-2xl animate-[bounce_4s_infinite]">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-black/40 flex items-center justify-center text-yellow-400 text-xl border border-white/10">
                    💼
                  </div>
                  <div>
                    <p className="text-white font-bold text-sm drop-shadow-md">
                      Top Studios
                    </p>
                    <p className="text-white/80 text-xs font-medium">
                      Hiring Partners
                    </p>
                  </div>
                </div>
              </div>

              {/* Floating Badge 2 (Bottom Right) */}
              <div className="absolute bottom-6 -right-6 z-20 bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-2xl shadow-2xl animate-[bounce_5s_infinite_reverse]">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-black/40 flex items-center justify-center text-yellow-400 text-xl border border-white/10">
                    ⭐
                  </div>
                  <div>
                    <p className="text-white font-bold text-sm drop-shadow-md">
                      4.9/5 Rating
                    </p>
                    <p className="text-white/80 text-xs font-medium">
                      Student Reviews
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Stats Row */}
          <div className="pt-8 border-t border-white/20 grid grid-cols-2 lg:grid-cols-4 gap-6 mx-auto lg:mx-0">
            {/* 15+ Years Legacy */}
            <div>
              <h4 className="text-2xl lg:text-3xl font-bold text-white drop-shadow-sm">
                15+
              </h4>
              <p className="text-sm text-white font-semibold">Years Legacy</p>
              <p className="text-[10px] lg:text-sm text-white/70 mt-1 leading-tight">
                Industry Excellence Since 2009
              </p>
            </div>

            {/* 5000+ Alumni */}
            <div>
              <h4 className="text-2xl lg:text-3xl font-bold text-white drop-shadow-sm">
                5000+
              </h4>
              <p className="text-sm text-white font-semibold">Alumni Placed</p>
              <p className="text-[10px] lg:text-sm text-white/70 mt-1 leading-tight">
                Working at Top Studios
              </p>
            </div>

            {/* 100% Job Support */}
            <div>
              <h4 className="text-2xl lg:text-3xl font-bold text-yellow-300 drop-shadow-sm">
                100%
              </h4>
              <p className="text-sm text-white font-semibold">Job Support</p>
              <p className="text-[10px] lg:text-sm text-white/70 mt-1 leading-tight">
                Career Guarantee Program
              </p>
            </div>

            {/* 4.9/5 Rating */}
            <div>
              <h4 className="text-2xl lg:text-3xl font-bold text-white drop-shadow-sm">
                4.9/5
              </h4>
              <p className="text-sm text-white font-semibold">Rating</p>
              <p className="text-[10px] lg:text-sm text-white/70 mt-1 leading-tight">
                Consistently Top Rated
              </p>
            </div>
          </div>

          {/* Trust Note */}
          <div className="mt-6 mb-8  pt-4 border-t border-white/10 text-center lg:text-left">
            <p className="text-base text-white/60 italic">
              <span className="font-bold text-white not-italic">
                Trust Note:
              </span>{" "}
              Partnerships with top production houses, game studios, and digital
              agencies
            </p>
          </div>
        </div>
      </section>

      <section className="bg-gray-100 container mx-auto py-20 md:py-24 font-sans">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="order-2 lg:order-1 relative w-full h-[500px] lg:h-[650px] rounded-[2rem] overflow-hidden border border-gray-200 shadow-2xl shadow-orange-900/5 group">
            <Image
              src="/image.png"
              alt="Students collaborating in a design studio"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-gray-900/20 to-transparent"></div>

            <div className="absolute bottom-8 left-8 right-8 bg-white/90 backdrop-blur-md border border-white/50 p-6 rounded-2xl shadow-xl flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-bold uppercase tracking-wider mb-1">
                  Placement Rate
                </p>
                <p className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#F09410] to-[#BC430D]">
                  100%
                </p>
              </div>
              <div className="w-12 h-12 rounded-full bg-orange-50 flex items-center justify-center text-[#F09410]">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                  />
                </svg>
              </div>
            </div>
          </div>

          {/* --- RIGHT COLUMN: CONTENT & FEATURES --- */}
          <div className="order-1 lg:order-2 space-y-8 lg:pl-6">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-gray-200 shadow-sm mb-4">
                <span className="text-[#F09410] text-sm font-bold">★</span>
                <span className="text-sm font-bold tracking-wide text-gray-800 uppercase">
                  The Pixeltoonz Edge
                </span>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-gray-900 leading-[1.2]">
                Why Choose Pixeltoonz <br className="hidden md:block" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F09410] to-[#BC430D]">
                  For Creative Training?
                </span>
              </h2>
              <p className="text-gray-600 font-medium text-lg mt-6 leading-relaxed">
                Pixeltoonz Academy is the foremost institution in Kerala
                offering creative education and backed up by more than 5,000
                alumni and 15+ years of industry experience. We do not just
                teach the software; we train professionals.
              </p>
              <p className="text-gray-600 font-medium text-lg mt-6 leading-relaxed">
                We believe in hands-on learning; from the very first day, you
                will be handling actual assignments under the guidance of
                experienced working professionals. Not only that, but we provide
                you with all the latest studios, industry standard tools, and
                creative studios that are always on the lookout for new
                talent.{" "}
              </p>
              <p className="text-gray-600 font-medium text-lg mt-6 leading-relaxed">
                Whatever your goal is—to join an established studio, freelance
                full-time, or even become your own entrepreneur—we have you
                covered. Our alumni work at top-notch agencies, production
                houses, tech companies, and even as independent professionals.
              </p>
            </div>
            <div className="flex flex-col md:flex-row gap-3">
              <ServiceEnquiry
                btnName={"Enquire Now"}
                serviceName={"course.title"}
                classname={
                  "hover:bg-[#BC430D] bg-gray-900 px-16 py-4 rounded-xl text-white font-bold transition-colors text-base"
                }
              />
              <Link
                href="https://wa.me/919745678780?text=Hi!%20I'm%20interested%20in%20your%20services.%20Could%20you%20please%20provide%20more%20details%3F"
                target="_blank"
                rel="noopener noreferrer"
                className="px-12 tracking-widest flex items-center justify-center gap-2 py-3.5 rounded-xl bg-green-500 text-white font-black text-base hover:scale-[1.02] transition-all duration-300 w-full sm:w-auto text-center"
              >
                <FaWhatsapp className="text-3xl text-white" />
                WhatsApp
              </Link>
            </div>

            {/* <div className="space-y-8 pt-4">
              <div className="flex gap-4 group">
                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-white border border-gray-200 shadow-sm flex items-center justify-center text-[#F09410] group-hover:bg-[#F09410] group-hover:text-white group-hover:border-[#F09410] transition-all duration-300">
                  <GraduationCap className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-[#F09410] transition-colors">
                    Learn From Industry Veterans
                  </h4>
                  <p className="text-gray-600 text-sm font-medium leading-relaxed">
                    Our faculty aren&apos;t just instructors—they&apos;re
                    seasoned professionals with decades of combined experience.
                    They&apos;ve worked on Hollywood productions, AAA game
                    titles, and award-winning Indian films and web series.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 group">
                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-white border border-gray-200 shadow-sm flex items-center justify-center text-[#F09410] group-hover:bg-[#F09410] group-hover:text-white group-hover:border-[#F09410] transition-all duration-300">
                  <MonitorPlay className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-[#F09410] transition-colors">
                    Train on Professional Equipment
                  </h4>
                  <p className="text-gray-600 text-sm font-medium leading-relaxed">
                    Learn on the same advanced rendering systems, compositing
                    stations, and editing bays that professional studios use.
                    Our labs have the latest software and hardware systems that
                    mimic the actual studio environment.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 group">
                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-white border border-gray-200 shadow-sm flex items-center justify-center text-[#F09410] group-hover:bg-[#F09410] group-hover:text-white group-hover:border-[#F09410] transition-all duration-300">
                  <BriefcaseBusiness className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-[#F09410] transition-colors">
                    Learn by Creating Real Projects
                  </h4>
                  <p className="text-gray-600 text-sm font-medium leading-relaxed">
                    Forget theory-heavy lectures. You&apos;ll work on live
                    briefs, deadline-driven projects, and portfolio pieces from
                    day one. Build a professional portfolio while still
                    training.
                  </p>
                </div>
              </div>
            </div> */}
          </div>
        </div>
        <ScrollReveal delay={300} direction="up">
          <div className="relative mt-14 md:mt-16 overflow-hidden rounded-[2rem] md:rounded-[3rem] bg-[#0a0a0a] p-6 md:p-16 text-white shadow-2xl">
            <div className="absolute -top-24 -right-24 h-64 md:h-96 w-64 md:w-96 rounded-full bg-yellow-400/5 blur-[100px] pointer-events-none" />

            <div className="grid grid-cols-1 divide-y divide-white/10 md:grid-cols-3 md:divide-x md:divide-y-0 relative z-10">
              <div className="group relative flex flex-col py-6 md:px-10 md:py-0 first:pl-0 last:pr-0">
                <span className="mb-4 font-mono text-[10px] md:text-sm tracking-widest text-yellow-400">
                  01 // MISSION
                </span>
                <h4 className="mb-3 text-2xl md:text-3xl font-black uppercase tracking-tighter">
                  The <span className="text-yellow-400">Bridge</span>
                </h4>
                <p className="text-xs md:text-sm leading-relaxed text-gray-400">
                  Providing consistent high quality training on film and
                  multimedia to bridge the gap by linking students with
                  India&apos;s finest professionals.
                </p>
              </div>

              <div className="group relative flex flex-col py-6 md:px-10 md:py-0">
                <span className="mb-4 font-mono text-[10px] md:text-sm tracking-widest text-yellow-400">
                  02 // VISION
                </span>
                <h4 className="mb-3 text-2xl md:text-3xl font-black uppercase tracking-tighter">
                  The <span className="text-yellow-400">Future</span>
                </h4>
                <p className="text-xs md:text-sm leading-relaxed text-gray-400">
                  Extensive practical and on-job training helps students turn
                  their skills and talent into a promising creative career.
                </p>
              </div>

              <div className="group relative flex flex-col py-6 md:px-10 md:py-0">
                <span className="mb-4 font-mono text-[10px] md:text-sm tracking-widest text-yellow-400">
                  03 // MOTTO
                </span>
                <h4 className="mb-3 text-2xl md:text-3xl font-black uppercase tracking-tighter">
                  Our <span className="text-yellow-400">MOTTO</span>
                </h4>
                <p className="text-base md:text-lg italic font-medium leading-snug text-white">
                  &quot;Every individual is creatively endowed. They just need
                  the right teacher to{" "}
                  <span className="text-yellow-400">ignite the Spark!!</span>
                  &quot;
                </p>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </section>

      <CoursesSection />

      <Testimonials />

      <section className="bg-gray-50 py-20 relative font-sans">
        <div className="container mx-auto w-full relative z-10">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-gray-900 leading-[1.2]">
              From Curious Student To{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F09410] to-[#BC430D]">
                Working Professional
              </span>
            </h2>
            <p className="text-gray-600 font-medium text-base tracking-wider mt-6 max-w-3xl mx-auto">
              Every student follows a proven pathway that takes you from
              foundation to employment. Here's exactly what happens during your
              time at Pixeltoonz.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
            {/* Connecting Line (Desktop) */}
            <div className="hidden lg:block absolute top-12 left-12 right-12 h-[2px] bg-gray-200 -z-0"></div>

            {[
              {
                step: "01",
                title: "Build Strong Basics",
                desc: "You start with fundamentals. Core concepts, software essentials, and design principles. Daily hands-on practice. We focus on timeless principles that outlive software updates, not just button-clicking tutorials.",
                timeline: "2 months",
                whatHappens: [
                  "Theory + practical sessions",
                  "Software tutorials and practice projects",
                  "Beginner portfolio pieces",
                  "Peer feedback and critiques",
                  "Weekly mentor check-ins",
                ],
              },
              {
                step: "02",
                title: "Work Like a Professional",
                desc: "Here is where you enter into a professional setting for the first time. You work on projects that have real deadlines and actual client briefs. You get to experience all those creative processes.",
                timeline: "2 months",
                whatHappens: [
                  "Real client projects",
                  "Group collaboration and teamwork",
                  "Client presentations and feedback",
                  "Industry mentors guide your work",
                  "High-pressure, deadline-driven environment",
                ],
              },
              {
                step: "03",
                title: "Create Your Career Assets",
                desc: "Your portfolio is your resume for the creative world. This is the stage where you collect your best pieces of work and develop powerful case studies. Your portfolio acts as your business card that helps you gain entry.",
                timeline: "2 months",
                whatHappens: [
                  "Portfolio refinement sessions",
                  "Case study writing",
                  "Professional presentation coaching",
                  "Showcase preparation",
                  "Feedback from industry professionals",
                ],
              },
              {
                step: "04",
                title: "Land Your First Role",
                desc: "Our placement team doesn't just give you job board links. They actively pitch you to studios, arrange interviews, conduct mock sessions, and ensure you're ready. We connect you directly with hiring managers.",
                timeline: "Ongoing",
                whatHappens: [
                  "Direct studio introductions",
                  "Interview preparation",
                  "Mock interviews and feedback",
                  "Offer negotiation support",
                  "Career guidance and mentoring",
                ],
              },
            ].map((item, i) => (
              <div
                key={i}
                className="relative z-10 bg-white p-6 rounded-3xl border border-gray-200 shadow-sm hover:shadow-xl transition-shadow duration-300 flex flex-col"
              >
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 rounded-full bg-[#F09410]/10 text-[#F09410] flex items-center justify-center font-bold text-lg border border-[#F09410]/20">
                    {item.step}
                  </div>
                  <span className="text-xs font-bold bg-gray-50 text-gray-600 px-3 py-1.5 rounded-full border border-gray-200 uppercase tracking-wider">
                    {item.timeline}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {item.title}
                </h3>

                <p className="text-gray-600 text-[14px] font-medium leading-relaxed mb-6">
                  {item.desc}
                </p>

                <div className="mt-auto pt-4 border-t border-gray-100">
                  <h4 className="text-xs font-black text-gray-500 uppercase tracking-widest mb-3">
                    What Happens
                  </h4>
                  <ul className="space-y-2">
                    {item.whatHappens.map((action, idx) => (
                      <li
                        key={idx}
                        className="text-sm text-gray-700 flex items-start gap-2 leading-snug"
                      >
                        <span className="text-[#BC430D]">●</span> {action}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>

          {/* Footer CTA Strip 
          <div className="mt-16 bg-gray-100 border p-8 md:p-12 rounded-[2rem] flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
            <div>
              <h4 className="text-xl font-bold text-black mb-1">
                Ready to start your placement journey?
              </h4>
              <p className="text-gray-800">
                Our counselors are waiting to discuss your career goals.
              </p>
            </div>
            <ServiceEnquiry
              btnName={"Schedule Free Counseling"}
              serviceName=""
              classname={
                "w-full md:w-fit px-8 py-5 text-lg bg-gradient-to-r from-[#F09410] to-[#BC430D] rounded-xl text-white font-bold hover:scale-105 transition-transform duration-300"
              }
            />
          </div>*/}
        </div>
      </section>

      <section className="pb-20 container mx-auto">
        <div className="relative z-10 flex flex-col xl:flex-row items-center justify-between gap-8 bg-gradient-to-r from-[#F09410] to-[#BC430D]  p-6 md:p-12 lg:p-16 rounded-3xl md:rounded-[2rem] border border-white/20 backdrop-blur-sm overflow-hidden shadow-2xl">
          {/* Subtle background glow */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#F09410]/10 rounded-full blur-[100px] pointer-events-none -translate-y-1/2 translate-x-1/4"></div>

          {/* Left Content */}
          <div className="text-center xl:text-left max-w-2xl">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white mb-4 leading-tight">
              Ready to start your placement journey?
            </h2>
            <p className="text-white/90 text-[15px] sm:text-base font-medium leading-relaxed">
              Our counselors are waiting to discuss your career goals.
            </p>
          </div>

          {/* Right Content - Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center xl:justify-end gap-3 w-full xl:w-auto shrink-0">
            <ServiceEnquiry
              btnName={"Schedule Free Counseling"}
              serviceName=""
              classname={
                "px-8 py-4 rounded-xl bg-white text-[#F09410] font-bold text-base hover:bg-gray-50 hover:shadow-lg hover:scale-[1.02] transition-all duration-300 w-full sm:w-auto text-center"
              }
            />

            <Link
              href="https://wa.me/919745678780?text=Hi!%20I'm%20interested%20in%20your%20services.%20Could%20you%20please%20provide%20more%20details%3F"
              target="_blank"
              rel="noopener noreferrer"
              className="px-12 tracking-widest flex items-center justify-center gap-2 py-3.5 rounded-xl bg-green-500 text-white font-black text-base hover:scale-[1.02] transition-all duration-300 w-full sm:w-auto text-center"
            >
              <FaWhatsapp className="text-3xl text-white" />
              WhatsApp
            </Link>
          </div>
        </div>
      </section>

      <section className="py-20 bg-black text-white">
        <div className="container mx-auto">
          {/* Grid Layout */}
          <div className="grid lg:grid-cols-12 gap-12">
            {/* Left Column: Title & Main Text (Spans 5 cols) */}
            <div className="lg:col-span-5 space-y-5">
              <h2 className="text-4xl md:text-5xl font-extrabold leading-[1.1] tracking-tight">
                More Than Just <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F09410] to-[#BC430D]">
                  Courses
                </span>
              </h2>
              <p className="text-gray-400 text-lg font-medium">
                Join a vibrant creative community where learning, innovation,
                and collaboration thrive.
              </p>
              <div className="h-px w-20 bg-[#F09410]" />
              <p className="text-gray-300 leading-relaxed text-lg">
                Pixeltoonz is a creative community. Studios, mentors, peers
                pushing each other, real projects, real feedback, and a culture
                that celebrates growth.
              </p>
              <p className="text-gray-300 leading-relaxed text-lg">
                You will learn alongside aspiring artists from diverse
                backgrounds. Peer-to-peer feedback, collaboration, creative
                juices flowing—that’s where true development lies. You’re not
                just getting to know the technology. You’re creating your
                professional and creative networks.
              </p>
            </div>

            <div className="lg:col-span-7 grid sm:grid-cols-2 gap-4">
              {[
                { title: "24/7 studio access for students", icon: Clock },
                {
                  title: "State-of-the-art equipment and software",
                  icon: Laptop,
                },
                { title: "Working professionals as mentors", icon: Briefcase },
                { title: "Collaborative studio environment", icon: Users },
                {
                  title: "Real projects and real feedback",
                  icon: MessageSquareText,
                },
                {
                  title: "Career support and placement assistance",
                  icon: Rocket,
                },
                {
                  title: "Lifetime access to learning materials",
                  icon: Zap,
                },
              ].map((item, idx) => {
                const IconComponent = item.icon; // Assign icon to a component variable

                return (
                  <div
                    key={idx}
                    className="flex items-center pl-4 min-h-20 bg-white/5 border border-white/10 rounded-xl md:rounded-3xl hover:bg-[#F09410]/10 hover:border-[#F09410]/50 transition-all duration-300 gap-4"
                  >
                    <div className="text-[#F09410]">
                      <IconComponent size={24} strokeWidth={1.5} />
                    </div>
                    <span className="font-semibold text-white/90 leading-snug pt-0.5">
                      {item.title}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 container mx-auto">
        <div className="relative z-10 flex flex-col xl:flex-row items-center justify-between gap-8 bg-gradient-to-r from-[#F09410] to-[#BC430D]  p-6 md:p-12 lg:p-16 rounded-3xl md:rounded-[2rem] border border-white/20 backdrop-blur-sm overflow-hidden shadow-2xl">
          {/* Subtle background glow */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#F09410]/10 rounded-full blur-[100px] pointer-events-none -translate-y-1/2 translate-x-1/4"></div>

          {/* Left Content */}
          <div className="text-center xl:text-left max-w-2xl">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white mb-4 leading-tight">
              Ready to Start Your Creative Journey?
            </h2>
            <p className="text-white/90 text-[15px] sm:text-base font-medium leading-relaxed">
              Join thousands of successful alumni who transformed their passion
              into a thriving career at Pixeltoonz Academy. Your future in
              digital creation starts here.
            </p>
          </div>

          {/* Right Content - Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center xl:justify-end gap-3 w-full xl:w-auto shrink-0">
            <ServiceEnquiry
              btnName={"Apply for Admissions"}
              serviceName=""
              classname={
                "px-8 py-4 rounded-xl bg-white text-[#F09410] font-bold text-base hover:bg-gray-50 hover:shadow-lg hover:scale-[1.02] transition-all duration-300 w-full sm:w-auto text-center"
              }
            />

            <Link
              href="https://wa.me/919745678780?text=Hi!%20I'm%20interested%20in%20your%20services.%20Could%20you%20please%20provide%20more%20details%3F"
              target="_blank"
              rel="noopener noreferrer"
              className="px-12 tracking-widest flex items-center justify-center gap-2 py-3.5 rounded-xl bg-green-500 text-white font-black text-base hover:scale-[1.02] transition-all duration-300 w-full sm:w-auto text-center"
            >
              <FaWhatsapp className="text-3xl text-white" />
              WhatsApp
            </Link>
          </div>
        </div>
      </section>

      <GetInTouch courses={courseList?.data} />
    </>
  );
}
