"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion } from "framer-motion";
import { toast } from "sonner";

// Zod Schema enforcement matching required input rules
const franchiseFormSchema = z.object({
  fullName: z
    .string()
    .min(2, "Full name must be at least 2 characters")
    .max(50, "Name is too long"),
  phoneNumber: z
    .string()
    .regex(
      /^[6-9]\d{9}$/,
      "Enter a valid 10-digit Indian phone number starting with 6-9",
    ),
  preferredLocation: z
    .string()
    .min(3, "Please specify a location (minimum 3 characters)"),
});

export default function FranchiseForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(franchiseFormSchema),
    defaultValues: {
      fullName: "",
      phoneNumber: "",
      preferredLocation: "",
    },
  });

  const onFormSubmit = async (data) => {
    const submitPromise = async () => {
      const response = await fetch("/api/franchise-apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to submit application");
      }

      return await response.json();
    };

    // 2. Trigger the toast sequence linked directly to the promise workflow
    toast.promise(submitPromise(), {
      loading: "Submitting your application...",
      success: () => {
        reset(); // Clear input elements on server success
        return "Application Submitted Successfully!";
      },
      error: (err) => err.message || "Something went wrong. Please try again.",
    });
  };

  return (
    <motion.div
      className="lg:col-span-5 bg-white/20 backdrop-blur-xl border border-white/10 rounded-2xl p-6 sm:p-8 shadow-2xl shadow-[#F09410]/5"
      initial={{ opacity: 0, scale: 0.95, x: 20 }}
      animate={{ opacity: 1, scale: 1, x: 0 }}
      transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
    >
      <h3 className="text-xl font-bold mb-2">Request Information Brochure</h3>
      <p className="text-sm text-white mb-6">
        Discover investment brackets, territory availability, and setup
        timelines.
      </p>

      <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-4">
        {/* Full Name Field */}
        <div>
          <label className="block text-xs font-semibold text-white uppercase tracking-wider mb-2">
            Full Name
          </label>
          <input
            type="text"
            placeholder="John Doe"
            {...register("fullName")}
            className={`w-full bg-white/5 border rounded-xl px-4 py-3 text-sm text-white placeholder-white/50 focus:outline-none transition-colors ${
              errors.fullName
                ? "border-red-500 focus:border-red-500"
                : "border-white/10 focus:border-[#F09410]"
            }`}
          />
          {errors.fullName && (
            <p className="text-xs text-red-200 mt-1 font-medium">
              {errors.fullName.message}
            </p>
          )}
        </div>

        {/* Phone Number Field */}
        <div>
          <label className="block text-xs font-semibold text-white uppercase tracking-wider mb-2">
            Phone Number
          </label>
          <input
            type="tel"
            placeholder="9876543210"
            {...register("phoneNumber")}
            className={`w-full bg-white/5 border rounded-xl px-4 py-3 text-sm text-white placeholder-white/50 focus:outline-none transition-colors ${
              errors.phoneNumber
                ? "border-red-500 focus:border-red-500"
                : "border-white/10 focus:border-[#F09410]"
            }`}
          />
          {errors.phoneNumber && (
            <p className="text-xs text-red-200 mt-1 font-medium">
              {errors.phoneNumber.message}
            </p>
          )}
        </div>

        {/* Preferred Location Field */}
        <div>
          <label className="block text-xs font-semibold text-white uppercase tracking-wider mb-2">
            Preferred Location
          </label>
          <input
            type="text"
            placeholder="e.g., Kochi, Calicut"
            {...register("preferredLocation")}
            className={`w-full bg-white/5 border rounded-xl px-4 py-3 text-sm text-white placeholder-white/50 focus:outline-none transition-colors ${
              errors.preferredLocation
                ? "border-red-500 focus:border-red-500"
                : "border-white/10 focus:border-[#F09410]"
            }`}
          />
          {errors.preferredLocation && (
            <p className="text-xs text-red-200 mt-1 font-medium">
              {errors.preferredLocation.message}
            </p>
          )}
        </div>

        {/* Submit Action Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-bgColor text-white font-bold text-base tracking-wider py-4 rounded-xl hover:bg-bgColor/90 transition-colors mt-2 disabled:opacity-50 flex items-center justify-center gap-2"
        >
          {isSubmitting ? (
            <>
              <svg
                className="animate-spin h-5 w-5 text-white"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
              Processing...
            </>
          ) : (
            "Get Free Consultation"
          )}
        </button>
      </form>
    </motion.div>
  );
}
