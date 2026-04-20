"use client";

import React, { useState } from "react";
import BlogForm from "@/components/admin/BlogForm";
import { useRouter } from "next/navigation";
import { BookPlus, ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { toast } from "sonner";

export default function AddBlogPage() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const onSubmit = async (data) => {
    console.log(data)
    setLoading(true);
    try {
      const response = await fetch("/api/blogs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const err = await response.json().catch(() => ({}));
        throw new Error(err?.message || "Failed to blog course");
      }

      toast.success("Blog created successfully!", {
        description: "The blog is now saved and ready to publish.",
      });

      router.push("/admin/courses");
      router.refresh();
    } catch (error) {
      toast.error("Something went wrong", {
        description: error.message || "Please try again.",
      });
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="bg-white border-b border-slate-200">
        <div className="mx-auto py-4 flex items-center gap-4">
          <Link href="/admin/blogs">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-slate-500 hover:text-slate-800 hover:bg-slate-100"
            >
              <ChevronLeft size={18} />
            </Button>
          </Link>
          <div className="flex items-center gap-3">
            <div className="p-2 bg-slate-900 rounded-lg">
              <BookPlus size={18} className="text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-slate-900 leading-tight">
                Create New Blog
              </h1>
              <p className="text-xs text-slate-400">
                Fill in all required fields and save when ready.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-10">
        <BlogForm onSubmit={onSubmit} loading={loading} />
      </div>
    </div>
  );
}
