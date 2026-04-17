"use client";

import Image from "next/image";
import { useEffect, useRef, useState, useCallback } from "react";

const testimonials = [
  {
    quote:
      "Before joining Pixeltoonz, I do not have an idea about photography, Only here I learned everthing right from the basics to a professional level. The foclities here gave verygood technical training, I am so happy and proud to say that, I am part of Pixeltoonz",
    name: "DON ROY",
    course: "Photography",
    index: "01",
    image: "/testimonials/don-roy.jpg",
  },
  {
    quote:
      "Pixeltoonz helped me to develop my creative skills and learn more about all latest techniques and tools in film editing. Thanks for Pixeltoonz for making my dreams come true",
    name: "RESHMA",
    course: "Film Editing",
    index: "02",
    image: "/testimonials/testimony.jpg",
  },
  {
    quote:
      "My experience at Pixeltoonz was fontastic in terms of learning and foacilities. The facilities take up there best effort to deliver the subject knowledge, both practical and theoretical",
    name: "RINCE SEBASTAIN",
    course: "Photography",
    index: "03",
    image: "/testimonials/rince-1.jpg",
  },
  {
    quote:
      "My experience at Pixeltoonz was full of learning and grooming. Before Joining Pixeltoonz, I have no idea about turning my passion into profession.Pixeltoonz shaped me as a designer and lam proud of who l am today. l am thankful to all the faculties and mentors for providing us with quality education. ",
    name: "Nithin Chandran",
    course: "Graphics & Web Development",
    index: "04",
    image: "/testimonials/Nithin.jpg",
  },
  {
    quote:
      "Great experience from Pixeltoonz. You get a lot of opportunities. Work hard to get it. Maintain your attendance.",
    name: "Vijiljith",
    course: "Graphic Design",
    index: "05",
    image: "/testimonials/vijiljith.jpg",
  },
  {
    quote:
      "The faculties at Pixeltoonz have put in all the efforts to groom us and make us corporate professionals. It was a wonderful experience at Pixeltoonz.",
    name: "Jomet Abraham",
    course: "Graphic Design",
    index: "06",
    image: "/testimonials/jomet.jpg",
  },
  {
    quote:
      "I definitely would recommend Pixeltoonz and would encourage students to study hard and inform themselves as much as possible about the several academic opportunities the Institution offers. Our collage takes the educational mission to heart, here you will find people that will support you guide you on the path to your dream.",
    name: "Jisna T Benny",
    course: "Photography/Graphic Design",
    index: "07",
    image: "/testimonials/jisna.jpg",
  },
  {
    quote:
      "I’m a proud student of Pixeltoonz, the college that helps you stand stronger for what’s coming in the future. What they teach you here is not just knowledge, it’s experiences.",
    name: "Jishnu K.S",
    course: "Media Production",
    index: "08",
    image: "/testimonials/JISHNU.jpg",
  },
  {
    quote:
      "At Pixeltoonz, the teachers always believe in you and they make sure you try your hardest on everything you do. I had studied Diploma in Graphic Design here and got placement within one week after my examination.",
    name: "Anoop Krishnan",
    course: "Graphic Design",
    index: "09",
    image: "/testimonials/anoop.jpg",
  },
  {
    quote:
      "The best institute in Kerala , Which offers you all Multimedia courses including VFX & Animation, I highly recommend Pixeltoonz Academy for their quality of education and dedicated teaching . I had completed my graphic designing course from here. I express my gratitude towards Akhil sir for the way he taught me the course. I guarantee that you will get 100% of your ROI. I can never find an alternative for this institution.",
    name: "Dijo Philip",
    course: "Digital Marketing Expert",
    index: "10",
    image: "/testimonials/dijo-philip1.jpg",
  },
  {
    quote:
      "The Photography course offered by Pixeltoonz has been a phenomenal experience. The curriculum and syllabus is well structured in the course offered.The faculty are outstanding and they made the learning easy and enthusiastic. They used to teach in more efficient way which helped me to build skills and made me more confident. The knowledge from faculty and support from the placement cell helped me to get placed in one of the most reputed company and also becoming a freelance Photographer. I am very much thankful to the faculty who helped me gain knowledge and placement cell who helped me to get placed.",
    name: "Fegi Poulose",
    course: "Photography",
    index: "11",
    image: "/testimonials/fegi1.jpg",
  },
  {
    quote:
      "Pixeltoonz is a place where you can find an amalgamation of learning. I feel great studying at Pixeltoonz as it gives great opportunity as well as support from faculties and placement officers. Getting placed in Infopark is an achievement for me for which i would like to thank Pixeltoonz.",
    name: "Suryajith M.S",
    course: "Graphic Design",
    index: "12",
    image: "/testimonials/33-scaled.jpg",
  },
  {
    quote:
      "My experience at Pixeltoonz is great and memorable. The teachers and mentors are really helpful and helped me to improve my academic and interpersonal skills.",
    name: "Aishwarya Y",
    course: "Graphic Design",
    index: "13",
    image: "/testimonials/11-scaled.jpg",
  },
  {
    quote:
      "I studied graphic designing here. And I'm now a graphic designer. It has a very good coaching and the faculties are so friendly and helpful at all times. I had a great time doing this course. Pixeltoonz have given me the opportunity to make my dream of becoming a graphic designer a reality.",
    name: "Hitha Sukesh",
    course: "Graphic Design",
    index: "14",
    image: "/testimonials/123-scaled.jpg",
  },
  {
    quote:
      "Excellent teaching in photography and videography. Had a really good experience in the institution. Teaching staffs are really good.",
    name: "Abin D'Cruz",
    course: "Graphic Design",
    index: "15",
    image: "/testimonials/22-scaled.jpg",
  },
  {
    quote:
      "Best Academy in town, I did Photography and videography course from this institute...All faculties are well experienced and knowledge with subject....gained core tactics of photography and videography, Academy is great in going cultural activities...had wonderful memories from pixeltoonz....Actually iam belongs to mallu family settled in bangalore...entire bangalore i failed to get govt authorised institute.....finally my friend Vishnu suggested this institute.....Thanks to vishnu...pixeltoonz is something wow... And I got good friends like Aromal,sujal,fahad,irfan,ebin,jithu many more.....I would recommend everyone who is interested in taking up photography as a hobby or profession to consult and take the courses from pixeltoonz Academy. Special Thanks to Tjin sir, Amal sir, Akhil sir, for the training and sharing your knowledge on photography and videography, Big thanks to pixeltoonz Academy....cheers!!!!!",
    name: "C. Nizamudheen",
    course: "Photography",
    index: "16",
    image: "/testimonials/12-scaled.jpg",
  },
  {
    quote:
      "I thank Pixeltoonz faculties for putting in all the efforts to groom us and make us professionals. It was a wonderful experience at Pixeltoonz.",
    name: "Murshid Manikfan",
    course: "Photography",
    index: "17",
    image: "/testimonials/44-scaled.jpg",
  },
  {
    quote:
      "I had received a lot of opportunities to groom myself, thanks to my ever inspiring mentors who helped me to discover the talented part of myself. No wonder Pixeltoonz is new and is still striving to achieve excellence, but in the due time it has definitely set some benchmarks in the academia and is relentlessly trying to achieve the heights in rendering the world class education.",
    name: "Abin Peter",
    course: "Graphic Design",
    index: "18",
    image: "/testimonials/13-scaled.jpg",
  },
  {
    quote:
      "I had received a lot of opportunities to groom myself, thanks to my ever inspiring mentors who helped me to discover the talented part of myself. No wonder Pixeltoonz is new and is still striving to achieve excellence, but in the due time it has definitely set some benchmarks in the academia and is relentlessly trying to achieve the heights in rendering the world class education.",
    name: "Abin Peter",
    course: "Graphic Design",
    index: "18",
    image: "/testimonials/13-scaled.jpg",
  },
];

export default function Testimonials() {
  const [active, setActive] = useState(0);
  const [animDir, setAnimDir] = useState(null);
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef(null);
  const autoRef = useRef(null);

  const go = useCallback(
    (index, dir = "next") => {
      if (index === active) return;
      setAnimDir(dir);
      setTimeout(() => {
        setActive(index);
        setAnimDir(null);
      }, 400);
    },
    [active],
  );

  const next = useCallback(
    () => go((active + 1) % testimonials.length, "next"),
    [active, go],
  );
  const prev = () =>
    go((active - 1 + testimonials.length) % testimonials.length, "prev");

  useEffect(() => {
    autoRef.current = setInterval(next, 5500);
    return () => {
      if (autoRef.current) clearInterval(autoRef.current);
    };
  }, [next]);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setVisible(true);
      },
      { threshold: 0.1 },
    );
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  const t = testimonials[active];

  return (
    <section
      ref={sectionRef}
      className={`relative overflow-hidden bg-[#080808] font-['Outfit',sans-serif] transition-opacity duration-1000 ${
        visible ? "opacity-100" : "opacity-0"
      }`}
    >
      {/* Ambient glow */}
      <div
        className="absolute pointer-events-none top-[20%] left-[30%] w-[60%] h-[60%] animate-[glowPulse_4s_ease-in-out_infinite]"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(251,146,60,0.18) 0%, transparent 70%)",
        }}
      />

      {/* Dot grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(255,255,255,0.12) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      {/* Top label bar */}
      <div
        className={`relative border-b border-white/[0.06] px-4 md:px-16 py-5 flex items-center justify-between transition-all duration-700 delay-100 ${
          visible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2.5"
        }`}
      >
        <div className="flex items-center gap-3">
          <div
            className="w-1.5 h-1.5 rounded-full bg-orange-400"
            style={{ boxShadow: "0 0 8px rgba(251,146,60,0.8)" }}
          />
          <span className="text-white/30 text-xs tracking-[0.3em] uppercase font-['Outfit',sans-serif]">
            Testimonials
          </span>
        </div>
        <span className="text-white/15 text-xs tracking-widest font-mono">
          PIXELTOONZ ACADEMY
        </span>
      </div>

      <div className="relative px-4 md:px-16 pt-16 pb-20">
        <div className="max-w-7xl mx-auto">
          {/* Heading row */}
          <div
            className={`flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 transition-all duration-700 delay-200 ${
              visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
            }`}
          >
            <h2 className="text-white font-['Cormorant_Garamond',serif] font-light leading-[1.05] tracking-[-0.02em] text-[clamp(2.8rem,6vw,5.5rem)]">
              What our{" "}
              <span className="italic font-semibold bg-gradient-to-br from-orange-400 to-amber-400 bg-clip-text text-transparent">
                students
              </span>
              <br />
              have to say
            </h2>

            {/* Nav arrows */}
            <div className="flex items-center gap-3 mb-2">
              <button
                onClick={prev}
                className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white/30 hover:border-orange-400/50 hover:text-orange-400 transition-all duration-300"
                aria-label="Previous"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>
              <button
                onClick={next}
                className="w-12 h-12 rounded-full border border-orange-400/40 flex items-center justify-center text-orange-400 hover:bg-orange-400 hover:text-black transition-all duration-300"
                aria-label="Next"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </div>
          </div>

          {/* Main card area */}
          <div
            className={`grid grid-cols-1 lg:grid-cols-[auto_1fr] gap-0 transition-all duration-700 delay-300 ${
              visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            {/* Left: big index number */}
            <div className="hidden lg:flex flex-col items-center pr-12 pt-2">
              <div
                key={active}
                className="animate-[numberFade_0.5s_ease_forwards] font-['Cormorant_Garamond',serif] text-[7rem] font-semibold leading-none select-none w-20 text-center"
                style={{
                  color: "transparent",
                  WebkitTextStroke: "1px rgba(251,146,60,0.25)",
                }}
              >
                {t.index}
              </div>
              <div
                className="flex-1 w-px mt-4 min-h-[80px]"
                style={{
                  background:
                    "linear-gradient(to bottom, rgba(251,146,60,0.2), transparent)",
                }}
              />
            </div>

            {/* Center: quote */}
            <div className="relative">
              {/* Top accent line */}
              <div
                key={`line-${active}`}
                className="animate-[lineGrow_0.8s_cubic-bezier(0.22,1,0.36,1)_forwards] h-px mb-10 origin-left"
                style={{
                  background:
                    "linear-gradient(90deg, #fb923c, #fbbf24 60%, transparent)",
                  width: "100%",
                }}
              />

              {/* Quote block */}
              <div
                key={`quote-${active}`}
                className="animate-[quoteEnter_0.5s_cubic-bezier(0.22,1,0.36,1)_forwards]"
              >
                <blockquote className="font-['Cormorant_Garamond',serif] font-light italic text-white/85 leading-relaxed tracking-[0.01em] mb-10 text-[clamp(1.35rem,2.8vw,2.1rem)]">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>

                {/* Author */}
                <div className="flex items-center gap-5">
                  {/* Avatar with spinning dashed ring */}
                  <div className="relative w-20 h-20 flex-shrink-0">
                    <svg
                      className="animate-[ringSpin_8s_linear_infinite] absolute inset-0 w-full h-full"
                      viewBox="0 0 56 56"
                      fill="none"
                    >
                      <circle
                        cx="28"
                        cy="28"
                        r="26"
                        stroke="url(#ringGrad)"
                        strokeWidth="1"
                        strokeDasharray="4 4"
                        opacity="0.6"
                      />
                      <defs>
                        <linearGradient
                          id="ringGrad"
                          x1="0"
                          y1="0"
                          x2="56"
                          y2="56"
                        >
                          <stop stopColor="#fb923c" />
                          <stop offset="1" stopColor="#fbbf24" />
                        </linearGradient>
                      </defs>
                    </svg>
                    <div className="absolute inset-1.5 rounded-full overflow-hidden flex items-center justify-center bg-gradient-to-br from-orange-400 to-amber-400">
                      <Image
                        src={t.image}
                        alt="profile"
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>

                  <div>
                    <p className="text-white font-semibold text-base mb-0.5 font-['Outfit',sans-serif]">
                      {t.name}
                    </p>
                    <p className="text-sm text-orange-400/70 font-['Outfit',sans-serif]">
                      {t.course}
                    </p>
                  </div>

                  {/* Stars */}
                  <div className="ml-auto hidden sm:flex gap-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <svg
                        key={i}
                        className="w-4 h-4 text-orange-400"
                        style={{ opacity: 0.8 + i * 0.04 }}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                </div>
              </div>

              {/* Bottom line */}
              <div className="mt-10 h-px bg-white/5" />
            </div>
          </div>

          {/* Name pills */}
          {/* <div
            className={`mt-10 flex flex-wrap gap-2 transition-opacity duration-700 delay-500 ${
              visible ? "opacity-100" : "opacity-0"
            }`}
          >
            {testimonials.map((item, i) => (
              <button
                key={i}
                onClick={() => go(i, i > active ? "next" : "prev")}
                className={`rounded-full border px-4 py-1.5 text-xs font-medium transition-all duration-200 font-['Outfit',sans-serif] ${
                  i === active
                    ? "bg-orange-400/[0.12] border-orange-400/40 text-orange-400"
                    : "border-white/10 text-white/30 hover:bg-orange-400/[0.15] hover:border-orange-400/50 hover:text-orange-400"
                }`}
              >
                {item.name}
              </button>
            ))}

            <div className="ml-auto flex items-center gap-2 self-center">
              <span className="text-xs text-white/20 font-mono tracking-widest">
                {String(active + 1).padStart(2, "0")} /{" "}
                {String(testimonials.length).padStart(2, "0")}
              </span>
            </div>
          </div> */}
        </div>
      </div>
    </section>
  );
}
