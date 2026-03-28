"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Lock, Mail, Eye, EyeOff, ArrowRight, ShieldCheck } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { handleAdminLogin } from "@/app/action/auth";
import { useRouter } from "next/navigation";

// 1. Precise Validation Schema
const loginSchema = z.object({
  email: z.string().email("A valid credential email is required"),
  password: z.string().min(8, "Access key must be at least 8 characters"),
});

export default function AdminLogin() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // 2. Initialize Hook Form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  // 3. Optimized Submission Handler
  const onSubmit = async (data) => {
    setIsLoading(true);

    try {
      // Mapping Zod data to FormData for the Server Action
      const formData = new FormData();
      formData.append("email", data.email);
      formData.append("password", data.password);

      const result = await handleAdminLogin(null, formData);

      if (result?.success === false) {
        toast.error("Authentication Failed", {
          description: result.message,
        });
        setIsLoading(false); // Stop loading only on failure
      } else if (result?.success === true) {
        // 1. SHOW THE SUCCESS MESSAGE
        toast.success("Access Granted", {
          description: "Initializing digital ecosystem...",
        });

        // 2. WAIT 1.5 SECONDS SO THEY CAN READ THE TOAST, THEN REDIRECT
        setTimeout(() => {
          router.push("/admin");
          router.refresh(); // Ensure middleware picks up the new cookies
        }, 300);
      }
    } catch (error) {
      console.log(error);
      toast.error("System Error", {
        description: "Unable to reach the security portal. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen grid grid-cols-1 lg:grid-cols-2 bg-white font-body">
      {/* Left Side: Brand Imagery & Narrative */}
      <div className="hidden lg:block relative bg-dark-forest overflow-hidden">
        <Image
          src="/admin-portal.jpg"
          alt="Revolnix Heritage"
          fill
          className="object-cover"
          priority
        />

        {/* <div className="absolute inset-0 bg-gradient-to-t from-dark-forest via-transparent to-transparent" /> */}

        <div className="absolute bottom-16 left-16 right-16 z-10 space-y-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-5xl font-heading text-white leading-tight">
              Admin Access <br />
              <span className="italic text-primary">Secure Login</span>
            </h2>
            <div className="mt-6 h-[1px] w-24 bg-sage" />
          </motion.div>

          <p className="text-gray-400 text-sm font-light tracking-wide max-w-sm leading-relaxed">
            Welcome to the PixelToonz Academy Admin Portal. Authenticate to
            manage your data.
          </p>
        </div>

        <div className="absolute top-12 left-12 flex items-center gap-3">
          <Image
            src={"/logo-icon.png"}
            width={50}
            height={50}
            alt="logo-icon"
          ></Image>

          <span className="font-extrabold tracking-widest text-primary uppercase text-lg whitespace-nowrap">
            Admin Portal
          </span>
        </div>
      </div>

      {/* Right Side: Elegant Login Form */}
      <div className="flex items-center justify-center p-8 md:p-12 lg:p-24 bg-light-bg">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-sm space-y-12"
        >
          <div className="space-y-4">
            <span className="text-sage text-[10px] tracking-[0.5em] uppercase font-bold">
              Security Portal
            </span>
            <h1 className="text-4xl font-heading text-dark-forest">
              Authorized <span className="italic opacity-70">Entry Only</span>
            </h1>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-10">
            <div className="space-y-6">
              {/* Email Field */}
              <div className="space-y-2 group">
                <div className="flex justify-between items-end">
                  <label className="text-[11px] tracking-widest uppercase group-focus-within:text-primary transition-colors">
                    Email
                  </label>
                  {errors.email && (
                    <span className="text-[9px] text-red-500 uppercase tracking-tighter">
                      {errors.email.message}
                    </span>
                  )}
                </div>
                <div className="relative">
                  <Mail
                    className="absolute left-0 bottom-3 text-muted-foreground"
                    size={16}
                    strokeWidth={1.5}
                  />
                  <input
                    {...register("email")}
                    type="email"
                    className="w-full bg-transparent border-b border-primary/30 py-2 pl-8 text-sm outline-none focus:border-primary transition-all placeholder:text-gray-300"
                    placeholder="Enter Email"
                  />
                </div>
              </div>

              {/* Password Field */}
              <div className="space-y-2 group">
                <div className="flex justify-between items-end">
                  <label className="text-[11px] tracking-widest uppercase group-focus-within:text-primary transition-colors">
                    Password
                  </label>
                  {errors.password ? (
                    <span className="text-[9px] text-red-500 uppercase tracking-tighter">
                      {errors.password.message}
                    </span>
                  ) : (
                    <Link
                      href="#"
                      className="text-xs underline text-red-500 tracking-widest text-sage hover:text-red-600 hover:scale-105 transition-all ease-in-out duration-300"
                    >
                      forgot password
                    </Link>
                  )}
                </div>
                <div className="relative">
                  <Lock
                    className="absolute left-0 bottom-3 text-muted-foreground"
                    size={16}
                    strokeWidth={1.5}
                  />
                  <input
                    {...register("password")}
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter Password"
                    className="w-full bg-transparent border-b border-primary/30 py-2 pl-8 text-sm outline-none focus:border-primary transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-0 bottom-3 text-muted-foreground hover:text-dark-forest"
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#080808] text-white py-5 text-xs tracking-[0.4em] uppercase font-bold flex items-center justify-center gap-4 transition-all shadow-xl disabled:opacity-50"
            >
              {isLoading ? "Submiting..." : "Submit"}
              {!isLoading && <ArrowRight size={14} />}
            </button>
          </form>

          <div className="flex items-center gap-4 p-5 bg-white border border-border">
            <ShieldCheck size={20} className="text-sage" />
            <p className="text-[10px] text-muted-foreground leading-relaxed uppercase tracking-widest">
              Encrypted session active. All attempts are logged for security.
            </p>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
