"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Send, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

const formSchema = z.object({
  fullname: z.string().min(2, "Name must be at least 2 characters."),
  phone: z.string().regex(/^(\+91[\-\s]?)?[6-9]\d{9}$/, "Enter a valid Indian phone number"),
  course: z.string().min(1, "Please select a course."),
  message: z.string().min(10, "Message must be at least 10 characters."),
});

export default function ContactForm({ courses }) {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: { fullname: "", phone: "", course: "", message: "" },
  });

  const isLoading = form.formState.isSubmitting;

  async function onSubmit(values) {
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      if (response.ok) {
        toast.success("Message sent successfully!");
        form.reset();
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong. Please try again.");
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <FormField control={form.control} name="fullname" render={({ field }) => (
            <FormItem>
              <FormLabel className="uppercase text-xs font-bold tracking-widest text-neutral-500">Full Name</FormLabel>
              <FormControl>
                <Input className="border-0 border-b rounded-none px-0 focus-visible:ring-0 focus-visible:border-yellow-500 transition-all bg-transparent" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )} />
          <FormField control={form.control} name="phone" render={({ field }) => (
            <FormItem>
              <FormLabel className="uppercase text-xs font-bold tracking-widest text-neutral-500">Phone Number</FormLabel>
              <FormControl>
                <Input className="border-0 border-b rounded-none px-0 focus-visible:ring-0 focus-visible:border-yellow-500 transition-all bg-transparent" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )} />
        </div>

        <FormField control={form.control} name="course" render={({ field }) => (
          <FormItem className="space-y-3">
            <FormLabel className="uppercase text-xs font-bold tracking-[0.2em] text-neutral-500">Select Course</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger className="h-14 rounded-2xl border border-neutral-200 bg-white px-5 shadow-sm transition-all duration-300 hover:border-primary focus:ring-2 focus:ring-primary/20 focus:border-primary">
                  <SelectValue placeholder="Choose your interested course" />
                </SelectTrigger>
              </FormControl>
              <SelectContent className="rounded-2xl border border-neutral-200 bg-white shadow-2xl max-h-72 overflow-y-auto">
                {courses?.map((course) => (
                  <SelectItem key={course} value={course} className="cursor-pointer rounded-xl mx-2 my-1 px-4 py-3 text-sm font-medium transition-all duration-200 focus:bg-primary focus:text-black">
                    {course}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )} />

        <FormField control={form.control} name="message" render={({ field }) => (
          <FormItem>
            <FormLabel className="uppercase text-xs font-bold tracking-widest text-neutral-500 italic">Message</FormLabel>
            <FormControl>
              <Textarea className="border-0 border-b rounded-none px-0 focus-visible:ring-0 focus-visible:border-yellow-500 transition-all bg-transparent min-h-[100px] resize-none" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )} />

        <Button type="submit" disabled={isLoading} className="w-full md:w-auto bg-primary hover:bg-neutral-900 text-black hover:text-white font-bold py-6 px-10 rounded-2xl transition-all duration-300 group shadow-xl shadow-yellow-400/20">
          {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Send className="mr-2 h-4 w-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />}
          {isLoading ? "Sending..." : "Send Message"}
        </Button>
      </form>
    </Form>
  );
}