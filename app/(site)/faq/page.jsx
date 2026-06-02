import Link from "next/link";
import Breadcrumbs from "@/components/site/Breadcrumbs";
import FaqCard from "@/components/site/FaqCard";

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
    question:
      "What are the skills and software's taught in Graphics and Web Development Course at Pixeltoonz?",
    answer:
      "Adobe Photoshop, Adobe Illustrator, Adobe Indesign, corel draw, Photography, Adobe Dreamweaver, HTML, CSS, Java, jQuery, Bootstrap, Adobe Flash, Hosting etc are some of the software’s and skills taught in Graphics and Web Development courses at Pixeltoonz.",
  },
  {
    question:
      "Does Pixeltoonz provide Job placement opportunities to its students?",
    answer:
      "Pixeltoonz provides job placement assistance to students on successfully completing their course. It has a dedicated placement cell that assists students to connect with recruiters. Pixeltoonz also offers Internship with stipend facility to students before completing the course.",
  },
  {
    question:
      "What is the duration of Film Editing course at Pixeltoonz?",
    answer:
      "Duration of Film Editing course varies depending upon course type. To know the exact course duration, visit Pixeltoonz.",
  },
  {
    question:
      "Does Pixeltoonz provide Part Time job opportunities to its students?",
    answer:
      "Pixeltoonz provide part time job assistance to students, which helps them financially as well as help them to get familiar with working environment, how to tackle on the job challenges etc.",
  },
  {
    question:
      "Which is the best Institute offers 3D Design course in Kochi?",
    answer:
      "There are several institutes offering 3D Design courses in Kochi. Pixeltoonz is one of the best institutes offering basic and advanced 3D Design courses in Kochi. To enquire, visit Pixeltoonz.",
  },
  {
    question:
      "Are there any courses for working professionals?",
    answer:
      "Yes! Pixeltoonz Academy understands the importance of updating your skills & knowledge. Pixeltoonz offers a range of short courses for graduates and working professionals. Click here to know more.",
  },
  {
    question:
      "How much does Graphic Design course at Pixeltoonz?",
    answer:
      "The cost of Graphic Design course varies on the basis of course type and course duration. To know the exact Graphic Design course fee visit Pixeltoonz, or you can call - +91 9745678780.",
  },
  {
    question:
      "How Pixeltoonz help students to get job?",
    answer:
      "At Pixeltoonz, students receive special training to prepare for job interviews. Students prepare projects, portfolios & a show reel of their work before venturing out for interviews at various studios and companies. Pixeltoonz also promotes students works through online platforms, which also help them to get hired.",
  },
  {
    question:
      "What are the career options in web, graphics & multimedia industries?",
    answer:
      "On completing Pixeltoonz  diploma in Graphics & Web Development course , you may work as: Web Designer, Web Developer, Photographer, Image Editor, Graphic Designer, UI Designer, Layout Designer, Flash Animator, Flash Designer, Illustrator, Visualizer",
  },
  {
    question:
      "Where can I work after completing a course with Pixeltoonz?",
    answer:
      "After completing a course with Pixeltoonz, you could work with: Animation studios, Film production, Television production houses, Multimedia production houses, Design studios, Website development companies, Ad production houses, Gaming companies, E-learning companies, E-commerce websites, Digital marketing companies, Print & publishing houses, Corporate organisations",
  },
  {
    question:
      "I wish to join Pixeltoonz Academy. How do I apply?",
    answer:
      "Fill this form or give a call on +91-97456-78780 and let us know what you are looking for. Pixeltoonz’s career counselors will help you with the admissions process.",
  },
  {
    question:
      "How can I schedule a meet with a career adviser?",
    answer:
      "Counseling benefits candidates in better understanding the various program options at Pixeltoonz Academy so as to make an informed choice. You are welcome to visit us and meet our trained counselors. Please get in touch with our Counseling team at hotline No. +91-97456-78780 to fix an appointment with the Career Adviser.",
  },
  {
    question:
      "Can a student with little knowledge in computers join Pixeltoonz?",
    answer:
      "Pixeltoonz offers industry-approved, career-oriented courses preparing you for jobs in animation, multimedia, Photography, web designing – and more! Yes you can very much join this course with the basic knowledge of computers. To know how Pixeltoonz can guide your career, call +91 97456 78780 or visit our center.",
  },
  {
    question:
      "How is Pixeltoonz different from other institutes?",
    answer:
      "The Multimedia programs are unlike many programs available to young professionals. Our Association with Film,Television and Media industry empowers our students with cutting-edge technology and overwhelming confidence to learn and earn .Ours is the only Academy which offers internship with stipend even before the completion of courses .Our students receive support and mentor-ship from our staff and variety of professionals working in the field. In Pixeltoonz academy there is no time bound, rather you have the freedom to practice at any hour. We believe in giving an Industrial work environment to our students.",
  },
];


export const metadata = {
  title: "FAQ - Pixeltoonz",
  description:
    "FAQs (Frequently asked Questions) What all courses are offered at Pixeltoonz Academy? Graphics Design Web Design Web Development Photography Cinematography Film Editing UI/UX Design PHP Python 3D Design Animation Visual Effects Which are the best institute for Photography course in Kerala?",
  keywords: [],
  alternates: {
    canonical: "https://www.pixeltoonzacademy.com/faq",
  },
};



const FaqPage = () => {
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
        <FaqCard faqs={faqs} />

        {/* Bottom Contact Prompt */}
        <div className="mt-16 text-center">
          <p className="text-slate-400 text-sm">
            Still have questions?{" "}
            <Link
              href="/contact-us"
              className="text-primary hover:text-indigo-400 transition-colors font-medium border-b border-white/20 hover:border-blue-500 pb-0.5"
            >
              Contact our admissions team
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default FaqPage;
