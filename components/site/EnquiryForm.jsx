"use client";

import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

export function EnquiryForm({ courseList = [], currentCourse }) {
  const [form, setForm] = useState({
    fullname: "",
    phone: "",
    course: currentCourse || "",
    message: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (key, value) => {
    setForm((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleSubmit = async () => {
    if (!form.fullname || !form.phone || !form.course || !form.message) {
      return;
    }

    try {
      setLoading(true);

      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      if (response.ok) {
        toast.success("Message sent successfully!");

        
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#131313] border border-[#2a2a35] rounded-sm overflow-hidden">
      <div
        className="px-7 pt-7 pb-6 border-b border-[#2a2a35]"
        style={{
          background: "linear-gradient(135deg,#1a1508 0%,#13131a 100%)",
        }}
      >
        <p className="font-sans-dm text-[9px] tracking-[3px] uppercase text-primary mb-2">
          Enquire Now
        </p>
        <h3 className="text-[1.3rem] italic text-[#f0ede6] leading-[1.3]">
          Please fill in your details below to receive a callback.
        </h3>
      </div>
      <div className="p-6">
        {/* Full Name */}
        <div className="mb-4">
          <label className="font-sans-dm text-[0.72rem] tracking-[1.5px] uppercase text-[#f0ede6] block mb-1.5">
            Full Name
          </label>

          <input
            type="text"
            placeholder="John Doe"
            value={form.fullname}
            onChange={(e) => handleChange("fullname", e.target.value)}
            className="w-full px-4 py-3 bg-white/[0.03] border border-[#2a2a35] rounded-[2px] text-[#f0ede6] font-sans-dm text-[0.88rem] outline-none transition-all duration-200 focus:border-[#c9a84c] focus:bg-[rgba(201,168,76,0.03)] placeholder-[#8a8578]/50"
          />
        </div>

        {/* Phone */}
        <div className="mb-4">
          <label className="font-sans-dm text-[0.72rem] tracking-[1.5px] uppercase text-[#f0ede6] block mb-1.5">
            Phone Number
          </label>

          <input
            type="tel"
            placeholder="+91 98765 43210"
            value={form.phone}
            onChange={(e) => handleChange("phone", e.target.value)}
            className="w-full px-4 py-3 bg-white/[0.03] border border-[#2a2a35] rounded-[2px] text-[#f0ede6] font-sans-dm text-[0.88rem] outline-none transition-all duration-200 focus:border-[#c9a84c] focus:bg-[rgba(201,168,76,0.03)] placeholder-[#8a8578]/50"
          />
        </div>

        {/* Course */}
        <div className="mb-4">
          <label className="font-sans-dm text-[0.72rem] tracking-[1.5px] uppercase text-[#f0ede6] block mb-1.5">
            Select Course
          </label>

          <Select
            value={form.course}
            onValueChange={(value) => handleChange("course", value)}
          >
            <SelectTrigger className="w-full h-[50px] px-4 bg-white/[0.03] border border-[#2a2a35] rounded-[2px] text-[#f0ede6] font-sans-dm text-[0.88rem] outline-none transition-all duration-200 focus:border-[#c9a84c] focus:bg-[rgba(201,168,76,0.03)]">
              <SelectValue placeholder="Choose your interested course" />
            </SelectTrigger>

            <SelectContent className="bg-[#131313] border border-[#2a2a35] text-[#f0ede6] max-h-72">
              {courseList?.map((course, index) => (
                <SelectItem
                  key={index}
                  value={course}
                  className="focus:bg-primary focus:text-black"
                >
                  {course}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Message */}
        <div className="mb-4">
          <label className="font-sans-dm text-[0.72rem] tracking-[1.5px] uppercase text-[#f0ede6] block mb-1.5">
            Message
          </label>

          <textarea
            placeholder="Tell us about your goals..."
            value={form.message}
            onChange={(e) => handleChange("message", e.target.value)}
            rows={4}
            className="w-full px-4 py-3 bg-white/[0.03] border border-[#2a2a35] rounded-[2px] text-[#f0ede6] font-sans-dm text-[0.88rem] outline-none transition-all duration-200 focus:border-[#c9a84c] focus:bg-[rgba(201,168,76,0.03)] placeholder-[#8a8578]/50 resize-none"
          />
        </div>

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full py-4 flex gap-2 justify-center items-center bg-primary text-black font-sans-dm font-bold text-[0.82rem] tracking-[2px] uppercase border-0 rounded-[2px] cursor-pointer mt-2 transition-colors duration-200 hover:bg-[#e8c97a]"
        >
          {loading ? (
            <>
              <Loader2 /> Sending...
            </>
          ) : (
            "Send Enquiry"
          )}
        </button>
      </div>
    </div>
  );
}
