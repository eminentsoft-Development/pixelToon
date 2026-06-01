"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { toast } from "sonner";
import { ChevronLeft, Loader2, Pencil, AlertCircle } from "lucide-react";

import BlogForm from "@/components/admin/BlogForm";
import { Button } from "@/components/ui/button";

const EditBlogPage = () => {
  const router = useRouter();
  const params = useParams();

  // Clear state naming
  const [initialData, setInitialData] = useState(null);
  const [isFetching, setIsFetching] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // 1. Fetch Blog Data Safely
  useEffect(() => {
    const controller = new AbortController();

    const fetchBlog = async () => {
      try {
        const response = await fetch(`/api/blogs/${params.id}`, {
          signal: controller.signal,
        });
        
        if (!response.ok) throw new Error("Blog not found");

        const data = await response.json();
        setInitialData(data);
      } catch (error) {
        if (error.name !== "AbortError") {
          toast.error("Could not load blog details");
        }
      } finally {
        // Prevents loading state bugs if component unmounts early
        if (!controller.signal.aborted) {
          setIsFetching(false);
        }
      }
    };

    if (params?.id) {
      fetchBlog();
    }

    return () => controller.abort(); // Cleanup
  }, [params?.id]);

  // 2. Handle Form Submission
  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      const response = await fetch(`/api/blogs/${params.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error("Failed to update Blog");

      toast.success("Blog updated successfully!");
      router.push("/admin/blogs");
      router.refresh(); // Tells Next.js to re-fetch server data
    } catch (error) {
      toast.error(error.message || "Error updating Blog");
    } finally {
      setIsSubmitting(false);
    }
  };

  // 3. Loading UI
  if (isFetching) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4">
        <Loader2 className="h-10 w-10 animate-spin text-slate-400" />
        <p className="text-slate-500 text-sm animate-pulse">Loading blog data...</p>
      </div>
    );
  }

  // 4. Error / Not Found UI
  if (!initialData) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-2">
        <AlertCircle className="h-10 w-10 text-destructive" />
        <p className="text-slate-500">Blog post not found.</p>
        <Link href="/admin/blogs" className="text-blue-500 underline text-sm">
          Back to blogs
        </Link>
      </div>
    );
  }

  // 5. Main Form UI
  return (
    <div className="min-h-screen pb-20">
      <header className="bg-white border-b mb-14 border-slate-200">
        <div className="max-w-7xl mx-auto py-4 px-4 flex items-center gap-2">
          <Button
            asChild
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-slate-500 hover:text-slate-800"
          >
            <Link href="/admin/blogs">
              <ChevronLeft size={18} />
            </Link>
          </Button>
          
          <div className="flex items-center gap-3">
            <div className="p-2 bg-slate-900 rounded-lg">
              <Pencil size={18} className="text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-slate-900 leading-tight">Edit Blog Post</h1>
              <p className="text-xs text-slate-400">
                Update the details for <span className="font-medium text-slate-600 italic">&quot;{initialData.title}&quot;</span>
              </p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4">
        <BlogForm
          onSubmit={onSubmit}
          loading={isSubmitting}
          initialData={initialData}
        />
      </main>
    </div>
  );
};

export default EditBlogPage;