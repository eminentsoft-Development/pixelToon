import React from "react";
import { Phone, Mail, MapPin } from "lucide-react";
import ScrollReveal from "./ScrollReveal";
import ContactForm from "./ContactForm";

function ContactMethod({ Icon, title, detail }) {
  return (
    <div className="flex items-start gap-5 group">
      <div className="p-3 rounded-2xl bg-white/5 text-primary group-hover:bg-yellow-400 group-hover:text-black transition-all duration-300">
        <Icon size={22} />
      </div>
      <div>
        <p className="text-xs uppercase tracking-widest text-neutral-500 font-bold mb-1">{title}</p>
        <p className="text-base font-medium">{detail}</p>
      </div>
    </div>
  );
}

export default function GetInTouch({ courses = [] }) {
  return (
    <section className="relative min-h-screen bg-[#F8F9FA] flex flex-col items-center py-20 px-4 overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-[50vh] bg-[#E3F2FD]/50 -z-10 rounded-b-[100px]" />

      <div className="max-w-6xl w-full text-center mb-16">
        <ScrollReveal delay={0} direction="up">
          <h2 className="text-4xl md:text-6xl font-black text-neutral-900 mb-6 tracking-tight">
            Get In <span className="text-primary">Touch</span>
          </h2>
          <p className="text-neutral-500 max-w-2xl mx-auto text-lg leading-relaxed">
            Ready to elevate your creative career? Reach out and let&apos;s build something extraordinary together.
          </p>
        </ScrollReveal>
      </div>

      <div className="md:container w-full">
        <ScrollReveal delay={100} direction="up">
          <div className="bg-white rounded-[40px] shadow-2xl shadow-neutral-200/50 flex flex-col lg:flex-row w-full overflow-hidden md:p-6">
            
            {/* Left Side: Static Info */}
            <div className="lg:w-[40%] bg-neutral-900 rounded-[32px] p-8 md:p-12 relative overflow-hidden flex flex-col justify-between text-white">
              <div className="relative z-10">
                <h3 className="text-3xl font-bold mb-6">Contact Information</h3>
                <p className="text-neutral-400 mb-12">
                  Fill out the form and our team will get back to you within 24 hours.
                </p>
                <div className="space-y-10">
                  <ContactMethod Icon={Phone} title="Call Us" detail="+91 9745678780" />
                  <ContactMethod Icon={Mail} title="Email Us" detail="pixeltoonzacademy@gmail.com" />
                  <ContactMethod 
                    Icon={MapPin} 
                    title="Visit Us" 
                    detail="Pixeltoonz Academy, 1st Floor 65, 3028-A, Azad Rd, near PC Road, Kaloor, Kochi, Ernakulam, Kerala 682017" 
                  />
                </div>
              </div>
              <div className="absolute -bottom-16 -right-16 w-64 h-64 bg-yellow-400/10 rounded-full blur-3xl pointer-events-none" />
            </div>

            {/* Right Side: Interactive Client Form */}
            <div className="lg:w-[60%] p-6 md:p-14">
              <ContactForm courses={courses} />
            </div>

          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}