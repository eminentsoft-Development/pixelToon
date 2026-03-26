"use client";

import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Send } from "lucide-react";

export default function PixelContact() {
  return (
    <section className="relative min-h-screen bg-[#F8F9FA] flex flex-col items-center py-20 px-4">
      {/* Dual Tone Background Decor */}
      <div className="absolute top-0 left-0 w-full h-[50vh] bg-[#E3F2FD]/50 -z-10 rounded-b-[100px]" />

      <div className="max-w-6xl w-full text-center mb-12">
        <motion.h2 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-5xl font-bold text-neutral-900 mb-4"
        >
          Get In Touch
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="text-neutral-500 max-w-2xl mx-auto leading-relaxed"
        >
          We&apos;ll create high-quality content and build your creative career path, 
          paving the way for you to grow your skills and improve your brand.
        </motion.p>
      </div>

      {/* Main Floating Card */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-[40px] shadow-2xl shadow-neutral-200/50 flex flex-col lg:flex-row w-full max-w-7xl overflow-hidden p-4 min-h-[550px]"
      >
        
        {/* Left Side: Contact Information (Dark Theme) */}
        <div className="lg:w-[40%] bg-neutral-900 rounded-[32px] p-10 relative overflow-hidden flex flex-col justify-between text-white">
          {/* Background Decorative Circle */}
          <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-yellow-400/20 rounded-full blur-3xl" />
          
          <div className="relative z-10">
            <h3 className="text-2xl font-bold mb-4">Contact Information</h3>
            <p className="text-neutral-400 text-sm leading-relaxed mb-10">
              Reach out to us directly and let&apos;s start planning your production-oriented training.
            </p>

            <div className="space-y-8">
              <div className="flex items-center gap-4 group">
                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-yellow-400 group-hover:text-black transition-all">
                  <Phone size={18} />
                </div>
                <div className="text-sm">
                  <p>+91 98765 43210</p>
                  <p>+91 98867 83638</p>
                </div>
              </div>

              <div className="flex items-center gap-4 group">
                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-yellow-400 group-hover:text-black transition-all">
                  <Mail size={18} />
                </div>
                <p className="text-sm">support@pixeltoonz.com</p>
              </div>

              <div className="flex items-center gap-4 group">
                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-yellow-400 group-hover:text-black transition-all">
                  <MapPin size={18} />
                </div>
                <p className="text-sm">Kochi, Kerala, India</p>
              </div>
            </div>
          </div>

          {/* Decorative Shape */}
          <div className="w-32 h-32 bg-primary rounded-full absolute -bottom-8 -right-8 opacity-90" />
        </div>

        {/* Right Side: Form (Clean Theme) */}
        <div className="lg:w-[60%] p-10 md:p-14">
          <form className="space-y-10" onSubmit={(e) => e.preventDefault()}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div className="relative group">
                <label className="text-xs font-bold text-neutral-400 uppercase tracking-widest mb-1 block">Your Name</label>
                <input type="text" placeholder="John Doe" className="w-full py-2 bg-transparent border-b border-neutral-200 outline-none focus:border-yellow-500 transition-colors" />
              </div>
              <div className="relative group">
                <label className="text-xs font-bold text-neutral-400 uppercase tracking-widest mb-1 block">Your Email</label>
                <input type="email" placeholder="hello@pixeltoonz.com" className="w-full py-2 bg-transparent border-b border-neutral-200 outline-none focus:border-yellow-500 transition-colors" />
              </div>
            </div>

            <div className="relative">
              <label className="text-xs font-bold text-neutral-400 uppercase tracking-widest mb-1 block">Your Subject</label>
              <input type="text" placeholder="I want to join a course" className="w-full py-2 bg-transparent border-b border-neutral-200 outline-none focus:border-yellow-500 transition-colors" />
            </div>

            <div className="relative">
              <label className="text-xs font-bold text-yellow-500 uppercase tracking-widest mb-1 block italic">Message</label>
              <textarea placeholder="Write here your message" className="w-full py-2 bg-transparent border-b border-neutral-200 outline-none focus:border-yellow-500 transition-colors resize-none" rows={1} />
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="bg-yellow-400 hover:bg-neutral-900 hover:text-white text-black font-bold px-8 py-3 rounded-xl transition-all duration-300 shadow-lg shadow-yellow-400/20"
            >
              Send Message
            </motion.button>
          </form>
        </div>
      </motion.div>
    </section>
  );
}