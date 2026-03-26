"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { CheckCircle2, Clock, Users, Award, BookOpen, Send } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";



const CourseDetailsPage = ({ course }) => {
  const form = useForm({
    resolver: zodResolver(enquireSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      course: course.title,
      message: "",
    },
  });

  const onSubmit = (data) => {
    console.log("Enquiry Sent:", data);
    // Add your API call here (e.g., to WordPress or Formspree)
    alert("Enquiry submitted successfully!");
  };

  return (
    <div className="bg-white min-h-screen">
      {/* Cinematic Hero Header */}
      <section className="relative h-[50vh] bg-slate-900 overflow-hidden">
        <img 
          src={course.image} 
          className="w-full h-full object-cover opacity-50 transition-transform duration-1000 hover:scale-105" 
          alt={course.title}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-black/20" />
        <div className="absolute bottom-12 left-0 w-full px-6">
          <div className="max-w-7xl mx-auto">
            <motion.h1 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-4xl md:text-6xl font-black text-slate-900 tracking-tighter uppercase"
            >
              {course.title}
            </motion.h1>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid lg:grid-cols-3 gap-16">
          
          {/* LEFT CONTENT: Course Information */}
          <div className="lg:col-span-2 space-y-12">
            
            {/* Quick Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: "Duration", value: course.duration, icon: <Clock size={18}/> },
                { label: "Batch Cap", value: course.batchSize, icon: <Users size={18}/> },
                { label: "Format", value: "Production Oriented", icon: <BookOpen size={18}/> },
                { label: "Accreditation", value: course.certification, icon: <Award size={18}/> },
              ].map((stat, idx) => (
                <div key={idx} className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                  <div className="text-[#BC430D] mb-2">{stat.icon}</div>
                  <p className="text-[10px] uppercase font-bold text-slate-400 tracking-widest">{stat.label}</p>
                  <p className="font-black text-sm text-slate-900">{stat.value}</p>
                </div>
              ))}
            </div>

            {/* About Section */}
            <div>
              <h2 className="text-3xl font-black mb-6 uppercase">Course Overview</h2>
              <p className="text-slate-600 leading-relaxed text-lg">
                {course.description}
              </p>
            </div>

            {/* Syllabus Section */}
            <div>
              <h2 className="text-3xl font-black mb-8 uppercase">What you will learn</h2>
              <div className="grid md:grid-cols-2 gap-4">
                {course.syllabus.map((item, idx) => (
                  <motion.div 
                    whileHover={{ x: 5 }}
                    key={idx} 
                    className="flex items-center gap-3 p-4 bg-white border border-slate-100 rounded-2xl shadow-sm hover:shadow-md transition-shadow"
                  >
                    <CheckCircle2 className="text-[#F09410]" size={20} />
                    <span className="font-bold text-slate-700">{item}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT CONTENT: Sticky Enquire Form */}
          <div className="relative">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="sticky top-24 bg-white rounded-[2.5rem] p-8 shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-slate-100"
            >
              <h3 className="text-2xl font-black mb-2 uppercase italic text-[#BC430D]">Enquire Now</h3>
              <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-8">Limited Seats: Only 12 per batch</p>
              
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  
                  <FormField
                    control={form.control}
                    name="fullName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-bold text-xs uppercase tracking-widest">Full Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter your name" className="rounded-xl bg-slate-50" {...field} />
                        </FormControl>
                        <FormMessage className="text-[10px]" />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-1 gap-4">
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="font-bold text-xs uppercase tracking-widest">Email</FormLabel>
                          <FormControl>
                            <Input placeholder="you@example.com" className="rounded-xl bg-slate-50" {...field} />
                          </FormControl>
                          <FormMessage className="text-[10px]" />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="font-bold text-xs uppercase tracking-widest">Phone</FormLabel>
                          <FormControl>
                            <Input placeholder="+91" className="rounded-xl bg-slate-50" {...field} />
                          </FormControl>
                          <FormMessage className="text-[10px]" />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="course"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-bold text-xs uppercase tracking-widest">Selected Program</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="rounded-xl bg-slate-50">
                              <SelectValue placeholder="Select a course" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className="rounded-xl">
                            <SelectItem value="Film Editing">Film Editing</SelectItem>
                            <SelectItem value="VFX & 3D">VFX & 3D Animation</SelectItem>
                            <SelectItem value="Graphic Design">Graphic Design</SelectItem>
                            <SelectItem value="Photography">Photography</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage className="text-[10px]" />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-bold text-xs uppercase tracking-widest">Message (Optional)</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Tell us about your creative goals" 
                            className="rounded-xl bg-slate-50 resize-none min-h-[100px]" 
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage className="text-[10px]" />
                      </FormItem>
                    )}
                  />

                  <Button 
                    type="submit" 
                    className="w-full bg-[#BC430D] hover:bg-[#F09410] text-white font-black py-6 rounded-2xl shadow-lg transition-all transform active:scale-95 flex gap-2"
                  >
                    SEND ENQUIRY <Send size={18} />
                  </Button>
                </form>
              </Form>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetailsPage;