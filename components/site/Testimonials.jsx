import React from "react";
import ScrollReveal from "./ScrollReveal";
import TestimonialCarousel from "./TestimonialCarousel";

const testimonials = [
  {
    quote: "Before joining Pixeltoonz, I do not have an idea about photography, Only here I learned everthing right from the basics to a professional level. The foclities here gave verygood technical training, I am so happy and proud to say that, I am part of Pixeltoonz",
    name: "DON ROY", course: "Photography", index: "01", image: "/testimonials/don-roy.jpg",
  },
  {
    quote: "Pixeltoonz helped me to develop my creative skills and learn more about all latest techniques and tools in film editing. Thanks for Pixeltoonz for making my dreams come true",
    name: "RESHMA", course: "Film Editing", index: "02", image: "/testimonials/testimony.jpg",
  },
  {
    quote: "My experience at Pixeltoonz was fontastic in terms of learning and foacilities. The facilities take up there best effort to deliver the subject knowledge, both practical and theoretical",
    name: "RINCE SEBASTAIN", course: "Photography", index: "03", image: "/testimonials/rince-1.jpg",
  },
  {
    quote: "My experience at Pixeltoonz was full of learning and grooming. Before Joining Pixeltoonz, I have no idea about turning my passion into profession.Pixeltoonz shaped me as a designer and lam proud of who l am today. l am thankful to all the faculties and mentors for providing us with quality education.",
    name: "Nithin Chandran", course: "Graphics & Web Development", index: "04", image: "/testimonials/Nithin.jpg",
  },
  {
    quote: "Great experience from Pixeltoonz. You get a lot of opportunities. Work hard to get it. Maintain your attendance.",
    name: "Vijiljith", course: "Graphic Design", index: "05", image: "/testimonials/vijiljith.jpg",
  },
  {
    quote: "The faculties at Pixeltoonz have put in all the efforts to groom us and make us corporate professionals. It was a wonderful experience at Pixeltoonz.",
    name: "Jomet Abraham", course: "Graphic Design", index: "06", image: "/testimonials/jomet.jpg",
  },
  {
    quote: "I definitely would recommend Pixeltoonz and would encourage students to study hard and inform themselves as much as possible about the several academic opportunities the Institution offers.",
    name: "Jisna T Benny", course: "Photography/Graphic Design", index: "07", image: "/testimonials/jisna.jpg",
  },
  {
    quote: "I'm a proud student of Pixeltoonz, the college that helps you stand stronger for what's coming in the future. What they teach you here is not just knowledge, it's experiences.",
    name: "Jishnu K.S", course: "Media Production", index: "08", image: "/testimonials/JISHNU.jpg",
  },
  {
    quote: "At Pixeltoonz, the teachers always believe in you and they make sure you try your hardest on everything you do. I had studied Diploma in Graphic Design here and got placement within one week after my examination.",
    name: "Anoop Krishnan", course: "Graphic Design", index: "09", image: "/testimonials/anoop.jpg",
  },
  {
    quote: "The best institute in Kerala, Which offers you all Multimedia courses including VFX & Animation. I highly recommend Pixeltoonz Academy for their quality of education and dedicated teaching.",
    name: "Dijo Philip", course: "Digital Marketing Expert", index: "10", image: "/testimonials/dijo-philip1.jpg",
  },
  {
    quote: "The Photography course offered by Pixeltoonz has been a phenomenal experience. The curriculum and syllabus is well structured. The faculty are outstanding and they made the learning easy and enthusiastic.",
    name: "Fegi Poulose", course: "Photography", index: "11", image: "/testimonials/fegi1.jpg",
  },
  {
    quote: "Pixeltoonz is a place where you can find an amalgamation of learning. I feel great studying at Pixeltoonz as it gives great opportunity as well as support from faculties and placement officers.",
    name: "Suryajith M.S", course: "Graphic Design", index: "12", image: "/testimonials/33-scaled.jpg",
  },
  {
    quote: "My experience at Pixeltoonz is great and memorable. The teachers and mentors are really helpful and helped me to improve my academic and interpersonal skills.",
    name: "Aishwarya Y", course: "Graphic Design", index: "13", image: "/testimonials/11-scaled.jpg",
  },
  {
    quote: "I studied graphic designing here. And I'm now a graphic designer. It has a very good coaching and the faculties are so friendly and helpful at all times.",
    name: "Hitha Sukesh", course: "Graphic Design", index: "14", image: "/testimonials/123-scaled.jpg",
  },
  {
    quote: "Excellent teaching in photography and videography. Had a really good experience in the institution. Teaching staffs are really good.",
    name: "Abin D'Cruz", course: "Graphic Design", index: "15", image: "/testimonials/22-scaled.jpg",
  },
  {
    quote: "Best Academy in town. I did Photography and videography course from this institute. All faculties are well experienced and knowledgeable. I would recommend everyone interested in photography to consult Pixeltoonz.",
    name: "C. Nizamudheen", course: "Photography", index: "16", image: "/testimonials/12-scaled.jpg",
  },
  {
    quote: "I thank Pixeltoonz faculties for putting in all the efforts to groom us and make us professionals. It was a wonderful experience at Pixeltoonz.",
    name: "Murshid Manikfan", course: "Photography", index: "17", image: "/testimonials/44-scaled.jpg",
  },
  {
    quote: "I had received a lot of opportunities to groom myself, thanks to my ever inspiring mentors who helped me to discover the talented part of myself.",
    name: "Abin Peter", course: "Graphic Design", index: "18", image: "/testimonials/13-scaled.jpg",
  },
];

export default function Testimonials() {
  // Pre-calculate pairs on the server
  const testimonialPairs = [];
  for (let i = 0; i < testimonials.length; i += 2) {
    testimonialPairs.push(testimonials.slice(i, i + 2));
  }

  return (
    <section className="relative overflow-hidden bg-[#080808] font-outfit">
      {/* Background Gradients */}
      <div 
        className="absolute pointer-events-none top-[20%] left-[30%] w-[60%] h-[60%] animate-[glowPulse_4s_ease-in-out_infinite]"
        style={{ background: "radial-gradient(ellipse at center, rgba(251,146,60,0.18) 0%, transparent 70%)" }}
      />
      <div 
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{ backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.12) 1px, transparent 1px)", backgroundSize: "32px 32px" }}
      />

      {/* Header Bar */}
      <ScrollReveal delay={0} direction="up">
        <div className="relative border-b border-white/[0.06] px-4 md:px-16 py-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-1.5 h-1.5 rounded-full bg-orange-400" style={{ boxShadow: "0 0 8px rgba(251,146,60,0.8)" }} />
            <span className="font-outfit text-white text-xs tracking-[0.3em] uppercase">Testimonials</span>
          </div>
          <span className="text-white/15 text-xs tracking-widest font-mono">PIXELTOONZ ACADEMY</span>
        </div>
      </ScrollReveal>

      {/* Main Content (Interactive) */}
      <div className="relative pt-12 pb-16">
        <div className="container mx-auto">
          <ScrollReveal delay={100} direction="up">
            <TestimonialCarousel pairs={testimonialPairs} />
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}