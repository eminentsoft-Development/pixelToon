"use client"

import React, { useState } from "react";
import { ServiceEnquiry } from "./EnquiryPopup";

// --- If using Next.js App Router, ensure you have "use client"; at the top of your file ---

const courses = [
  {
    title: "Graphic Design",
    description:
      "Brand identities, logo systems, marketing collateral, packaging designs, digital illustrations, and design systems that communicate powerfully.",
    skills: [
      "Visual storytelling and brand strategy",
      "Typography and layout principles",
      "Color theory and design psychology",
      "Logo design and brand guidelines",
      "Adobe Creative Suite mastery (Photoshop, Illustrator, InDesign)",
      "Figma and design systems",
      "Client presentations and feedback management",
    ],
    demand:
      "Graphic designers are essential across every industry—tech companies, advertising agencies, e-commerce brands, publishing houses. Entry-level: ₹3-5 lakh/year. Experienced designers: ₹8-15 lakh+/year.",
    duration: "6-9 months",
    batchType: "Full-time / Part-time available",
    ctaPrimary: "Enquire Now",
    ctaSecondary: "View Syllabus",
  },
  {
    title: "Video Editing & videography",
    description:
      "Professional cinematic videos, commercial content, social media videos, documentaries, YouTube content, and broadcast-quality productions.",
    skills: [
      "Camera fundamentals and videography techniques",
      "Professional lighting for different scenarios",
      "Audio recording and sound mixing",
      "Professional editing software (DaVinci Resolve, Adobe Premiere Pro)",
      "Color grading and color correction",
      "Motion graphics and animated titles",
      "Video marketing and platform optimization",
      "Scriptwriting and storyboarding",
    ],
    demand:
      "Video production is booming. Digital agencies, production studios, corporate media, and content creators constantly hire. Entry-level editors: ₹2.5-4.5 lakh/year. Experienced cinematographers: ₹6-12 lakh+/year. Short-form content = consistent demand.",
    duration: "6-9 months",
    batchType: "Full-time / Part-time available",
    ctaPrimary: "Enquire Now",
    ctaSecondary: "Watch Showreel",
  },
  {
    title: "Animation & VFX",
    description:
      "3D characters, visual effects for films and advertising, character animations for games, motion graphics, and cinematic visual effects.",
    skills: [
      "3D modeling and sculpting (Maya, Blender, Cinema 4D)",
      "Character rigging and skeletal animation",
      "Animation principles and motion capture",
      "Lighting and professional rendering workflows",
      "VFX compositing (After Effects, Nuke)",
      "Particle systems and simulations",
      "Game engine basics (Unity, Unreal)",
      "Industry pipeline and team collaboration",
    ],
    demand:
      "Animation & VFX is the most important export of creativity from India. Studios in Bangalore, Mumbai, and Hyderabad employ thousands every year. The need for more content in streaming services. International companies outsource work to Indian studios. Junior-level: ₹3-6 lakh/year. VFX Senior-Level: ₹10-25 lakh ",
    duration: "9-12 months",
    batchType: "Full-time / Part-time available",
    ctaPrimary: "Enquire Now",
    ctaSecondary: "View VFX Reel",
  },
  {
    title: "Content Creation Diploma",
    description:
      "YouTube videos, Instagram/TikTok content, podcasts, blog posts, personal brands, audience communities, and monetized creative businesses.",
    skills: [
      "Content strategy and audience psychology",
      "Photography and videography for content",
      "Social media management and growth strategies",
      "Video editing for short-form and long-form content",
      "Podcast production and distribution",
      "SEO optimization and discoverability",
      "Analytics and audience insights",
      "Monetization strategies (ads, sponsorships, products)",
      "Personal branding and positioning",
      "Community building and engagement",
    ],
    demand:
      "Content creators are entrepreneurs. Brands need creators, agencies need content strategists, platforms share revenue. Starting: ₹0-50k/month. Established creators: ₹5-50 lakh+/month. Highest earning potential.",
    duration: "6-9 months",
    batchType: "Full-time / Part-time available",
    ctaPrimary: "Enquire Now",
    ctaSecondary: "Creator Stories",
  },
];

// Sub-component to manage the expand/collapse state of individual cards
const CourseCard = ({ course }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="bg-white border border-gray-200 px-6 py-8 rounded-[2rem] hover:border-[#F09410] hover:shadow-2xl transition-all duration-500 group shadow-sm flex flex-col h-full">
      {/* INITIAL LOAD CONTENT */}
      <h3 className="text-2xl font-bold text-gray-900 mb-4">{course.title}</h3>

      <div className="mb-4">
        <p className="text-gray-600 text-base leading-relaxed">
          {course.description}
        </p>
      </div>

      <p className="text-[13px] font-semibold text-gray-800 flex items-center gap-2 mb-4">
        <span className="text-[#BC430D]">●</span> Duration: {course.duration}
      </p>

      {/* EXPANDABLE CONTENT */}
      <div
        className={`grid transition-all duration-500 ease-in-out ${
          isExpanded ? "grid-rows-[1fr] opacity-100 mt-2" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          <div className="pb-6">
            <h4 className="text-xs font-black text-gray-500 uppercase tracking-widest mb-3">
              Course Highlights
            </h4>
            <ul className="space-y-2 mb-6">
              {course.skills.map((skill, i) => (
                <li
                  key={i}
                  className="text-sm text-gray-700 flex items-start gap-2 leading-snug"
                >
                  <span className="text-[#F09410] mt-0.5">✦</span> {skill}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* BOTTOM ACTION BUTTONS */}
      <div className="mt-auto flex flex-col gap-3 pt-2 border-t border-gray-100">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-sm font-bold text-[#F09410] hover:text-[#BC430D] transition-colors py-2 flex items-center justify-center gap-2"
        >
          {isExpanded ? "Show Less" : "Explore More"}
          <svg
            className={`w-4 h-4 transition-transform duration-300 ${
              isExpanded ? "rotate-180" : "rotate-0"
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>

        <ServiceEnquiry
          btnName={"Make An Enquiry"}
          serviceName={course.title}
          classname={
            "hover:bg-[#BC430D] bg-gray-900 w-full py-4 rounded-xl text-white font-bold transition-colors text-sm"
          }
        />
      </div>
    </div>
  );
};

// Main Section Component
export default function CoursesSection() {
  return (
    <section
      id="courses"
      className="bg-white py-20 relative border-t border-gray-100 overflow-hidden font-sans"
    >
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-[#F09410]/10 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-[#BC430D]/10 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="container mx-auto w-full relative z-10">
        <section className="flex flex-col md:flex-row items-center justify-between mx-auto gap-8 px-4 lg:px-0">
          {/* Left Content */}
          <div className="flex-1">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-gray-900 leading-[1.2]">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F09410] to-[#BC430D]">
                Our Core Programs
              </span>
            </h2>

            <p className="mt-6 text-sm md:text-base text-gray-600 max-w-2xl leading-relaxed">
              Choose your creative path. Whether you&apos;re passionate about
              visual branding, cinematic storytelling, motion graphics, or
              digital content creation, we have a specialized program for you.
            </p>
          </div>
        </section>

        {/* --- CARDS GRID --- */}
        <div className="mt-12 grid md:grid-cols-2 xl:grid-cols-4 gap-4 items-start">
          {courses.map((course, index) => (
            <CourseCard key={index} course={course} />
          ))}
        </div>
      </div>
    </section>
  );
}