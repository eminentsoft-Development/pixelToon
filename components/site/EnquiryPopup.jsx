"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Mail, User, Phone, Send, Loader2 } from "lucide-react";
import Image from "next/image";
import { toast } from "sonner";

const formSchema = z.object({
  name: z.string().min(2, "Name is required"),
  phone: z.string().min(10, "Valid phone number is required"),
  email: z.string().email("Invalid email").optional().or(z.literal("")),
  message: z.string().optional(),
});

export function ServiceEnquiry({ btnName, classname, autoOpen = false }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (autoOpen) {
      const timer = setTimeout(() => setIsOpen(true), 500); 
      return () => clearTimeout(timer);
    }
  }, [autoOpen]);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: { name: "", phone: "", email: "", message: "" },
  });

  const onSubmit = async (values) => {
    try {
      setIsSubmitting(true);

      const response = await fetch("/api/enquiry", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        throw new Error("Failed to submit");
      }

      toast.success("Message sent successfully!");

      setIsOpen(false);
      form.reset();
    } catch (error) {
      console.error("Submission error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <button
          className={`flex items-center justify-center gap-2 rounded-xl bg-gray-900 font-bold hover:bg-[#BC430D] transition-all shadow-md ${classname}`}
        >
          <span>{btnName}</span>
          <Send className="w-4 h-4" />
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[850px] p-0 rounded-3xl md:rounded-[2rem] overflow-hidden bg-white border-0 shadow-2xl">
        <div className="flex flex-col md:flex-row h-full">
          {/* Left Section - Image */}
          <div className="hidden md:block md:w-2/5 relative min-h-[500px]">
            <Image
              src="/subpage.jfif"
              alt="Creative studio environment"
              fill
              sizes="(max-width: 768px) 0px, 400px"
              className="object-cover"
            />
            {/* Gradient Overlay & Text */}
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/40 to-transparent flex flex-col justify-end p-6 text-white">
              <span className="inline-block px-3 py-1 bg-[#F09410] text-xs font-bold uppercase tracking-wider rounded-full w-max mb-4">
                Admissions Open
              </span>
              <h2 className="text-3xl font-extrabold mb-2 leading-tight">
                Start Your <br />
                Creative Journey
              </h2>
              <p className="text-gray-300 text-sm leading-relaxed">
                Join Kerala&apos;s #1 Multimedia Academy. Build your portfolio
                and master industry-standard tools.
              </p>
            </div>
          </div>

          {/* Right Section - Form */}
          <div className="p-8 md:p-10 md:w-3/5 flex flex-col justify-center bg-white">
            <DialogTitle className="text-3xl font-black mb-2 text-gray-900">
              Enquire Now
            </DialogTitle>
            <DialogDescription className="mb-8 text-gray-500 text-sm">
              Fill out the form below to learn more about our programs.
            </DialogDescription>

            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-5"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {/* Name (Required) */}
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <div className="relative flex items-center">
                            <User className="absolute left-4 w-4 h-4 text-gray-400" />
                            <Input
                              {...field}
                              className="pl-11 h-12 rounded-xl bg-gray-50 border-gray-200 focus:border-[#F09410] focus:ring-[#F09410]/20 transition-all text-sm"
                              placeholder="Full Name *"
                            />
                          </div>
                        </FormControl>
                        <FormMessage className="text-xs" />
                      </FormItem>
                    )}
                  />

                  {/* Phone (Required) */}
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <div className="relative flex items-center">
                            <Phone className="absolute left-4 w-4 h-4 text-gray-400" />
                            <Input
                              {...field}
                              className="pl-11 h-12 rounded-xl bg-gray-50 border-gray-200 focus:border-[#F09410] focus:ring-[#F09410]/20 transition-all text-sm"
                              placeholder="Phone Number *"
                            />
                          </div>
                        </FormControl>
                        <FormMessage className="text-xs" />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Email (Optional) */}
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <div className="relative flex items-center">
                          <Mail className="absolute left-4 w-4 h-4 text-gray-400" />
                          <Input
                            {...field}
                            className="pl-11 h-12 rounded-xl bg-gray-50 border-gray-200 focus:border-[#F09410] focus:ring-[#F09410]/20 transition-all text-sm"
                            placeholder="Email Address (Optional)"
                          />
                        </div>
                      </FormControl>
                      <FormMessage className="text-xs" />
                    </FormItem>
                  )}
                />

                {/* Message (Optional) */}
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Textarea
                          {...field}
                          className="rounded-xl bg-gray-50 border-gray-200 focus:border-[#F09410] focus:ring-[#F09410]/20 transition-all min-h-[100px] p-4 text-sm resize-none"
                          placeholder="Any questions or specific goals? (Optional)"
                        />
                      </FormControl>
                      <FormMessage className="text-xs" />
                    </FormItem>
                  )}
                />

                <Button
                  type="submit"
                  className="w-full h-12 rounded-xl bg-gradient-to-r from-[#F09410] to-[#BC430D] text-white font-bold text-base hover:shadow-lg hover:scale-[1.01] transition-all duration-300"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="animate-spin mr-2" /> Submiting...
                    </>
                  ) : (
                    "Submit Enquiry"
                  )}
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}