import { getCoursesForSelect } from "@/app/action/get-courses";
import GetInTouch from "@/components/site/GetInTouch";
import Testimonials from "@/components/site/Testimonials";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default async function CreativeHero() {
  const courseList = await getCoursesForSelect(1, 12);
  return (
    <>
      <section className="relative min-h-screen bg-gradient-to-br from-[#F09410] to-[#BC430D] overflow-hidden flex items-center font-sans text-white pt-24 lg:pt-0">
        <div className="container lg:mt-24 mx-auto relative z-10">
          {/* Changed grid to 12 columns to support 7/5 split */}
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center py-12">
            {/* --- LEFT COLUMN: TYPOGRAPHY & CTA (col-span-7) --- */}
            <div className="lg:col-span-6 space-y-8 text-center lg:text-left">
              {/* Eyebrow Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 backdrop-blur-sm">
                <span className="w-2 h-2 rounded-full bg-yellow-300 animate-pulse shadow-[0_0_8px_#FDE047]"></span>
                <span className="text-sm font-semibold tracking-wide text-white uppercase">
                  Admissions Open 2026
                </span>
              </div>

              {/* Main Headline */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.1]">
                Master The Art Of <br className="hidden lg:block" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-yellow-200 drop-shadow-sm">
                  Digital Creation.
                </span>
              </h1>

              {/* Description */}
              <p className="text-lg sm:text-xl text-white/90 font-medium max-w-xl mx-auto lg:mx-0 leading-relaxed drop-shadow-sm">
                Step into Kerala’s leading multimedia academy. Build a
                world-class portfolio in Animation, VFX, UI/UX, and Graphic
                Design, and launch your career with 100% placement support.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
                <Link
                  href="/courses"
                  className="px-8 py-4 rounded-xl bg-black text-white font-bold text-lg hover:bg-gray-900 hover:scale-105 hover:shadow-xl transition-all duration-300 w-full sm:w-auto text-center"
                >
                  Explore Courses
                </Link>

                <Link
                  href="/showreel"
                  className="group px-8 py-4 rounded-xl bg-white/10 border border-white/20 backdrop-blur-md text-white font-semibold text-lg hover:bg-white/20 transition-all duration-300 flex items-center justify-center gap-3 w-full sm:w-auto"
                >
                  <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center group-hover:bg-white/30 transition-colors">
                    <svg
                      className="w-4 h-4 ml-0.5 text-white"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                  Watch Showreel
                </Link>
              </div>

              {/* Stats Row */}
              <div className="pt-8 border-t border-white/20 grid grid-cols-3 gap-4 max-w-lg mx-auto lg:mx-0">
                <div>
                  <h4 className="text-2xl lg:text-3xl font-bold text-white drop-shadow-sm">
                    15+
                  </h4>
                  <p className="text-sm text-white/80 font-medium">
                    Years Legacy
                  </p>
                </div>
                <div>
                  <h4 className="text-2xl lg:text-3xl font-bold text-white drop-shadow-sm">
                    5000+
                  </h4>
                  <p className="text-sm text-white/80 font-medium">
                    Alumni Placed
                  </p>
                </div>
                <div>
                  <h4 className="text-2xl lg:text-3xl font-bold text-yellow-300 drop-shadow-sm">
                    100%
                  </h4>
                  <p className="text-sm text-white/80 font-medium">
                    Job Support
                  </p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6 relative hidden lg:flex w-full h-[550px] items-center">
              <div className="grid grid-cols-2 gap-4 w-full h-[90%] relative z-10">
                <div className="relative w-full h-full rounded-[2rem] overflow-hidden  border-2 border-white/20 shadow-[0_20px_50px_rgba(0,0,0,0.3)] group">
                  <Image
                    src="https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=1000&auto=format&fit=crop"
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
                      src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1000&auto=format&fit=crop"
                      alt="3D Design"
                      fill
                      sizes="(max-width: 1024px) 50vw, 25vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                  </div>

                  <div className="relative w-full h-1/2 rounded-[2rem] overflow-hidden  border-2 border-white/20 shadow-[0_20px_50px_rgba(0,0,0,0.3)] group">
                    <Image
                      src="https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=1000&auto=format&fit=crop"
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
        </div>
      </section>

      <section className="bg-white py-20 relative border-t border-gray-100 overflow-hidden font-sans">
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-[#F09410]/10 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-[#BC430D]/10 rounded-full blur-[120px] pointer-events-none"></div>

        <div className="container mx-auto w-full relative z-10">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl mb-14 font-extrabold tracking-tight text-gray-900 max-w-3xl leading-[1.2]">
            Master Your Craft Across Our <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F09410] to-[#BC430D]">
              Core Disciplines
            </span>
          </h2>

          {/* --- CARDS GRID --- */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {/* Card 1: Animation & VFX */}
            <div className="bg-white border border-gray-200 p-8 rounded-[2rem] hover:border-[#F09410] hover:shadow-2xl hover:shadow-orange-900/5 transition-all duration-500 group shadow-sm flex flex-col justify-between">
              <div>
                <div className="w-14 h-14 rounded-2xl bg-orange-50 border border-orange-100 flex items-center justify-center text-[#F09410] mb-8 group-hover:scale-110 group-hover:bg-gradient-to-br group-hover:from-[#F09410] group-hover:to-[#BC430D] group-hover:text-white transition-all duration-500">
                  <svg
                    className="w-7 h-7"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-primary transition-colors duration-300">
                  Animation & VFX
                </h3>
                <p className="text-gray-600 text-sm font-medium leading-relaxed mb-8">
                  Bring imagination to life. Master 3D modeling, texturing,
                  rigging, and cinematic visual effects used in blockbuster
                  films.
                </p>
              </div>
              <Link
                href="/enquiry"
                className="w-full py-4 rounded-xl bg-gray-900 text-white font-bold text-sm text-center hover:bg-primary group-hover:bg-primary transition-all duration-300 shadow-md"
              >
                Enquire Now
              </Link>
            </div>

            {/* Card 2: UI/UX Design */}
            <div className="bg-white border border-gray-200 p-8 rounded-[2rem] hover:border-[#F09410] hover:shadow-2xl hover:shadow-orange-900/5 transition-all duration-500 group shadow-sm flex flex-col justify-between">
              <div>
                <div className="w-14 h-14 rounded-2xl bg-orange-50 border border-orange-100 flex items-center justify-center text-[#F09410] mb-8 group-hover:scale-110 group-hover:bg-gradient-to-br group-hover:from-[#F09410] group-hover:to-[#BC430D] group-hover:text-white transition-all duration-500">
                  <svg
                    className="w-7 h-7"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-[#F09410] transition-colors duration-300">
                  UI/UX Design
                </h3>
                <p className="text-gray-600 text-sm font-medium leading-relaxed mb-8">
                  Design intuitive digital experiences. Learn wireframing,
                  prototyping, user psychology, and modern app interface design.
                </p>
              </div>
              <Link
                href="/enquiry"
                className="w-full py-4 rounded-xl bg-gray-900 text-white font-bold text-sm text-center hover:bg-primary group-hover:bg-primary transition-all duration-300 shadow-md"
              >
                Enquire Now
              </Link>
            </div>

            {/* Card 3: Graphic Design */}
            <div className="bg-white border border-gray-200 p-8 rounded-[2rem] hover:border-[#F09410] hover:shadow-2xl hover:shadow-orange-900/5 transition-all duration-500 group shadow-sm flex flex-col justify-between">
              <div>
                <div className="w-14 h-14 rounded-2xl bg-orange-50 border border-orange-100 flex items-center justify-center text-[#F09410] mb-8 group-hover:scale-110 group-hover:bg-gradient-to-br group-hover:from-[#F09410] group-hover:to-[#BC430D] group-hover:text-white transition-all duration-500">
                  <svg
                    className="w-7 h-7"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-[#F09410] transition-colors duration-300">
                  Graphic Design
                </h3>
                <p className="text-gray-600 text-sm font-medium leading-relaxed mb-8">
                  Master visual communication. Create stunning brand identities,
                  digital illustrations, and commercial marketing materials.
                </p>
              </div>
              <Link
                href="/enquiry"
                className="w-full py-4 rounded-xl bg-gray-900 text-white font-bold text-sm text-center hover:bg-primary group-hover:bg-primary transition-all duration-300 shadow-md"
              >
                Enquire Now
              </Link>
            </div>

            {/* Card 4: Game Design */}
            <div className="bg-white border border-gray-200 p-8 rounded-[2rem] hover:border-[#F09410] hover:shadow-2xl hover:shadow-orange-900/5 transition-all duration-500 group shadow-sm flex flex-col justify-between">
              <div>
                <div className="w-14 h-14 rounded-2xl bg-orange-50 border border-orange-100 flex items-center justify-center text-[#F09410] mb-8 group-hover:scale-110 group-hover:bg-gradient-to-br group-hover:from-[#F09410] group-hover:to-[#BC430D] group-hover:text-white transition-all duration-500">
                  <svg
                    className="w-7 h-7"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-[#F09410] transition-colors duration-300">
                  Game Development
                </h3>
                <p className="text-gray-600 text-sm font-medium leading-relaxed mb-8">
                  Build interactive worlds. Learn level design, character
                  modeling, and development using industry-standard game
                  engines.
                </p>
              </div>
              <Link
                href="/enquiry"
                className="w-full py-4 rounded-xl bg-gray-900 text-white font-bold text-sm text-center hover:bg-primary group-hover:bg-primary transition-all duration-300 shadow-md"
              >
                Enquire Now
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gray-100 container mx-auto py-20 font-sans">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="order-2 lg:order-1 relative w-full h-[500px] lg:h-[650px] rounded-[2rem] overflow-hidden border border-gray-200 shadow-2xl shadow-orange-900/5 group">
            <Image
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1000&auto=format&fit=crop"
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
                Why We Are Kerala’s <br className="hidden md:block" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F09410] to-[#BC430D]">
                  #1 Multimedia Academy
                </span>
              </h2>
              <p className="text-gray-600 font-medium text-lg mt-6 leading-relaxed">
                We don&apos;t just teach software; we shape creative
                professionals. From day one, you are immersed in a studio-like
                environment designed to push your creative boundaries.
              </p>
            </div>

            {/* Feature List */}
            <div className="space-y-6 pt-4">
              {/* Feature 1 */}
              <div className="flex gap-4 group">
                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-white border border-gray-200 shadow-sm flex items-center justify-center text-[#F09410] group-hover:bg-[#F09410] group-hover:text-white group-hover:border-[#F09410] transition-all duration-300">
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
                      d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <div>
                  <h4 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-[#F09410] transition-colors">
                    100% Placement Assistance
                  </h4>
                  <p className="text-gray-600 text-sm font-medium leading-relaxed">
                    Our dedicated placement cell works directly with top
                    animation studios, game developers, and tech agencies to
                    launch your career immediately after graduation.
                  </p>
                </div>
              </div>

              {/* Feature 2 */}
              <div className="flex gap-4 group">
                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-white border border-gray-200 shadow-sm flex items-center justify-center text-[#F09410] group-hover:bg-[#F09410] group-hover:text-white group-hover:border-[#F09410] transition-all duration-300">
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
                      d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                    />
                  </svg>
                </div>
                <div>
                  <h4 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-[#F09410] transition-colors">
                    Industry-Expert Faculty
                  </h4>
                  <p className="text-gray-600 text-sm font-medium leading-relaxed">
                    Learn from veteran artists and designers who have real-world
                    experience working on international VFX projects, AAA games,
                    and global brands.
                  </p>
                </div>
              </div>

              {/* Feature 3 */}
              <div className="flex gap-4 group">
                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-white border border-gray-200 shadow-sm flex items-center justify-center text-[#F09410] group-hover:bg-[#F09410] group-hover:text-white group-hover:border-[#F09410] transition-all duration-300">
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
                      d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <div>
                  <h4 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-[#F09410] transition-colors">
                    State-of-the-Art Studios
                  </h4>
                  <p className="text-gray-600 text-sm font-medium leading-relaxed">
                    Train on the exact same high-end rendering rigs, software
                    suites, and studio setups used by professional agencies
                    around the world.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Testimonials />

      <section className="bg-gray-50 py-20 relative font-sans">
        <div className="container mx-auto w-full relative z-10">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-gray-900 leading-[1.2]">
              Our{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F09410] to-[#BC430D]">
                4-Step Pathway
              </span>{" "}
              to Placement
            </h2>
            <p className="text-gray-600 font-medium text-lg mt-6 max-w-2xl mx-auto">
              We guide you from foundational training to final studio placement
              through a structured, industry-proven process.
            </p>
          </div>

          {/* Timeline Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
            {/* Connecting Line (Desktop) */}
            <div className="hidden lg:block absolute top-12 left-12 right-12 h-[2px] bg-gray-200 -z-0"></div>

            {[
              {
                step: "01",
                title: "Foundational Mastery",
                desc: "Deep dive into core software and theory. We build your technical base from the ground up.",
              },
              {
                step: "02",
                title: "Studio-Style Projects",
                desc: "Apply your skills to real-world, deadline-driven briefs that mimic actual studio workflows.",
              },
              {
                step: "03",
                title: "Portfolio Development",
                desc: "Work with mentors to curate a professional-grade portfolio that showcases your best work to recruiters.",
              },
              {
                step: "04",
                title: "Industry Placement",
                desc: "We facilitate interviews, conduct mock sessions, and connect you directly with our studio partners.",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="relative z-10 bg-white p-8 rounded-3xl border border-gray-200 shadow-sm hover:shadow-xl transition-shadow duration-300"
              >
                <div className="w-12 h-12 rounded-full bg-[#F09410]/10 text-[#F09410] flex items-center justify-center font-bold text-lg mb-6 border border-[#F09410]/20">
                  {item.step}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {item.title}
                </h3>
                <p className="text-gray-600 text-sm font-medium leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>

          {/* Footer CTA Strip */}
          <div className="mt-16 bg-black p-8 md:p-12 rounded-[2rem] flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
            <div>
              <h4 className="text-xl font-bold text-white mb-1">
                Ready to start your placement journey?
              </h4>
              <p className="text-gray-400">
                Our counselors are waiting to discuss your career goals.
              </p>
            </div>
            <button className="px-8 py-4 bg-gradient-to-r from-[#F09410] to-[#BC430D] rounded-xl text-white font-bold hover:scale-105 transition-transform duration-300">
              Book a Counseling Session
            </button>
          </div>
        </div>
      </section>

      {/* <section className="bg-white py-20 lg:py-32 font-sans border-t border-gray-100">
        <div className="container mx-auto px-6 lg:px-12 w-full">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div className="space-y-2">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 tracking-tight">
                Explore Our <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F09410] to-[#BC430D]">
                  Professional Programs
                </span>
              </h2>
            </div>
            <Link
              href="/courses"
              className="text-gray-900 font-bold border-b-2 border-gray-900 hover:text-[#F09410] hover:border-[#F09410] transition-colors pb-1 self-start md:self-auto"
            >
              View All Courses →
            </Link>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {courses.map((course, i) => (
              <div
                key={i}
                className="group bg-gray-50 border border-gray-100 p-8 rounded-[2rem] hover:bg-black transition-all duration-500 flex flex-col justify-between min-h-[300px]"
              >
                <div>
                  <span className="text-[#F09410] text-xs font-bold uppercase tracking-widest mb-4 block group-hover:text-yellow-400">
                    {course.level}
                  </span>
                  <h3 className="text-2xl font-bold text-gray-900 group-hover:text-white transition-colors">
                    {course.title}
                  </h3>
                </div>
                <div className="mt-8 flex items-center justify-between">
                  <span className="text-gray-500 group-hover:text-gray-300 text-sm font-medium">
                    {course.duration}
                  </span>
                  <div className="w-10 h-10 rounded-full bg-white group-hover:bg-[#F09410] flex items-center justify-center transition-colors">
                    <svg
                      className="w-4 h-4 text-black group-hover:text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 12h14m-7-7l7 7-7 7"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section> */}

      <section className="bg-white py-20 lg:py-32 font-sans">
        <div className="container mx-auto w-full">
          {/* Section Header */}
          <div className="flex flex-col items-center text-center mb-16">
            <span className="text-[#F09410] font-bold tracking-widest uppercase text-xs mb-4">
              Life at Pixeltoonz
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 tracking-tight leading-tight">
              More Than Just a <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F09410] to-[#BC430D]">
                Classroom Experience
              </span>
            </h2>
          </div>

          {/* Gallery Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 h-[600px]">
            {/* Large Vertical Image */}
            <div className="col-span-2 md:col-span-1 row-span-2 relative rounded-[2rem] overflow-hidden group shadow-lg">
              <Image
                src="https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?q=80&w=800&auto=format&fit=crop"
                alt="Collaborative work"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
            </div>

            {/* Small Square Image */}
            <div className="col-span-1 row-span-1 relative rounded-[2rem] overflow-hidden group shadow-lg">
              <Image
                src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=800&auto=format&fit=crop"
                alt="Studio environment"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
            </div>

            {/* Small Square Image */}
            <div className="col-span-1 row-span-1 relative rounded-[2rem] overflow-hidden group shadow-lg">
              <Image
                src="https://images.unsplash.com/photo-1524178232363-c827376c3746?q=80&w=800&auto=format&fit=crop"
                alt="Students learning"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
            </div>

            {/* Wide Image */}
            <div className="col-span-2 row-span-1 relative rounded-[2rem] overflow-hidden group shadow-lg">
              <Image
                src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=1200&auto=format&fit=crop"
                alt="Creative workshop"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
            </div>
          </div>

          {/* Gallery Caption */}
          <p className="text-center text-gray-500 mt-8 font-medium italic">
            Join a community of creators, innovators, and future industry
            leaders.
          </p>
        </div>
      </section>

      <section className="relative py-20 lg:py-32 bg-gray-900 overflow-hidden font-sans border-t border-gray-800">
        {/* --- AMBIENT BACKGROUND GLOWS --- */}
        <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-[#F09410]/20 rounded-full blur-[150px] pointer-events-none"></div>
        <div className="absolute bottom-[-20%] right-[-10%] w-[600px] h-[600px] bg-[#BC430D]/20 rounded-full blur-[150px] pointer-events-none"></div>

        <div className="container mx-auto px-6 lg:px-12 w-full relative z-10 text-center">
          {/* Headline */}
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white mb-8 leading-[1.1]">
            Ready to Start Your <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F09410] to-[#FFE600]">
              Creative Journey?
            </span>
          </h2>

          {/* Description */}
          <p className="text-gray-400 text-lg sm:text-xl font-medium max-w-2xl mx-auto mb-12 leading-relaxed">
            Join thousands of successful alumni who transformed their passion
            into a profession at Pixeltoonz Academy. Your future in multimedia
            begins here.
          </p>

          {/* Big CTA Button */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/apply-now"
              className="px-10 py-5 rounded-2xl bg-gradient-to-r from-[#F09410] to-[#BC430D] text-white font-bold text-lg hover:scale-105 hover:shadow-[0_0_40px_rgba(240,148,16,0.4)] transition-all duration-300 w-full sm:w-auto text-center shadow-2xl"
            >
              Apply for Admissions 2026
            </Link>

            <Link
              href="/contact"
              className="px-10 py-5 rounded-2xl bg-white/5 border border-white/10 text-white font-bold text-lg hover:bg-white/10 transition-all duration-300 w-full sm:w-auto text-center"
            >
              Speak to a Counselor
            </Link>
          </div>

          {/* Trust Indicator */}
          <p className="mt-8 text-gray-500 text-sm font-medium">
            No application fee • Fast response within 24 hours
          </p>
        </div>
      </section>

      <GetInTouch courses={courseList?.data} />
    </>
  );
}
