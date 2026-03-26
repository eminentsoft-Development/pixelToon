"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Send, Loader2 } from "lucide-react";
import { toast } from "sonner";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

// 1. Define Validation Schema
const formSchema = z.object({
  fullname: z.string().min(2, "Name must be at least 2 characters."),
  email: z.string().email("Please enter a valid email address."),
  subject: z.string().min(5, "Subject should be more descriptive."),
  message: z.string().min(10, "Message must be at least 10 characters."),
});

export default function PixelContact() {
  // 2. Initialize Form
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullname: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  const isLoading = form.formState.isSubmitting;

  // 3. Handle Submit
  async function onSubmit(values) {
    try {
      // Simulate API Call
      await new Promise((resolve) => setTimeout(resolve, 2000));
      console.log(values);
      toast.success("Message sent successfully!");
      form.reset();
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    }
  }

  return (
    <section className="relative min-h-screen bg-[#F8F9FA] flex flex-col items-center py-20 px-4 overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-[50vh] bg-[#E3F2FD]/50 -z-10 rounded-b-[100px]" />

      <div className="max-w-6xl w-full text-center mb-16">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-6xl font-black text-neutral-900 mb-6 tracking-tight"
        >
          Get In <span className="text-yellow-500">Touch</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="text-neutral-500 max-w-2xl mx-auto text-lg leading-relaxed"
        >
          Ready to elevate your creative career? Reach out and let&apos;s build 
          something extraordinary together.
        </motion.p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        className="bg-white rounded-[40px] shadow-2xl shadow-neutral-200/50 flex flex-col lg:flex-row w-full max-w-7xl overflow-hidden p-3 md:p-6"
      >
        {/* Left Side: Contact Info */}
        <div className="lg:w-[40%] bg-neutral-900 rounded-[32px] p-8 md:p-12 relative overflow-hidden flex flex-col justify-between text-white">
          <div className="relative z-10">
            <h3 className="text-3xl font-bold mb-6">Contact Information</h3>
            <p className="text-neutral-400 mb-12">
              Fill out the form and our team will get back to you within 24 hours.
            </p>

            <div className="space-y-10">
              <ContactMethod 
                icon={<Phone/>} 
                title="Call Us" 
                detail="+91 98765 43210" 
              />
              <ContactMethod 
                icon={<Mail/>} 
                title="Email Us" 
                detail="support@pixeltoonz.com" 
              />
              <ContactMethod 
                icon={<MapPin />} 
                title="Visit Us" 
                detail="Kochi, Kerala, India" 
              />
            </div>
          </div>
          
          {/* Abstract background shape */}
          <div className="absolute -bottom-16 -right-16 w-64 h-64 bg-yellow-400/10 rounded-full blur-3xl" />
        </div>

        {/* Right Side: Form */}
        <div className="lg:w-[60%] p-8 md:p-14">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <FormField
                  control={form.control}
                  name="fullname"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="uppercase text-xs font-bold tracking-widest text-neutral-500">Full Name</FormLabel>
                      <FormControl>
                        <Input placeholder="John Doe" className="border-0 border-b rounded-none px-0 focus-visible:ring-0 focus-visible:border-yellow-500 transition-all bg-transparent" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="uppercase text-xs font-bold tracking-widest text-neutral-500">Email Address</FormLabel>
                      <FormControl>
                        <Input placeholder="hello@pixeltoonz.com" className="border-0 border-b rounded-none px-0 focus-visible:ring-0 focus-visible:border-yellow-500 transition-all bg-transparent" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="subject"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="uppercase text-xs font-bold tracking-widest text-neutral-500">Subject</FormLabel>
                    <FormControl>
                      <Input placeholder="I want to join a course" className="border-0 border-b rounded-none px-0 focus-visible:ring-0 focus-visible:border-yellow-500 transition-all bg-transparent" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="uppercase text-xs font-bold tracking-widest text-neutral-500 italic ">Message</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Tell us about your project..." 
                        className="border-0 border-b rounded-none px-0 focus-visible:ring-0 focus-visible:border-yellow-500 transition-all bg-transparent min-h-[100px] resize-none" 
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full md:w-auto bg-yellow-400 hover:bg-neutral-900 text-black hover:text-white font-bold py-6 px-10 rounded-2xl transition-all duration-300 group shadow-xl shadow-yellow-400/20"
              >
                {isLoading ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Send className="mr-2 h-4 w-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                )}
                {isLoading ? "Sending..." : "Send Message"}
              </Button>
            </form>
          </Form>
        </div>
      </motion.div>
    </section>
  );
}

// Helper Component for Contact Items
function ContactMethod({ icon, title, detail }) {
  return (
    <div className="flex items-start gap-5 group">
      <div className="p-3 rounded-2xl bg-white/5 text-yellow-400 group-hover:bg-yellow-400 group-hover:text-black transition-all duration-300">
        {React.cloneElement(icon, { size: 22 })}
      </div>
      <div>
        <p className="text-xs uppercase tracking-widest text-neutral-500 font-bold mb-1">{title}</p>
        <p className="text-base font-medium">{detail}</p>
      </div>
    </div>
  );
}