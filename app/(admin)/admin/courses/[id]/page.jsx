"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { toast } from "sonner";
import CourseForm from "@/components/admin/CourseForm";
import { ChevronLeft, Loader2, Pencil, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const EditCoursePage = () => {
  const router = useRouter();
  const params = useParams();

  // Clear, simple state names
  const [initialData, setInitialData] = useState(null);
  const [isFetching, setIsFetching] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // 1. Fetch course data when the page loads
  useEffect(() => {
    const controller = new AbortController();

    const fetchCourse = async () => {
      try {
        const response = await fetch(`/api/course/${params.id}`, { 
          signal: controller.signal 
        });
        
        if (!response.ok) throw new Error("Course not found");

        const data = await response.json();
        setInitialData(data);
      } catch (error) {
        if (error.name !== "AbortError") {
          toast.error("Could not load course details");
        }
      } finally {
        // Fix: Only stop the loading screen if the fetch wasn't cancelled
        if (!controller.signal.aborted) {
          setIsFetching(false);
        }
      }
    };

    if (params?.id) {
      fetchCourse();
    }

    return () => controller.abort(); // Cleanup if user leaves page early
  }, [params?.id]);

  // 2. Handle form save
  const onSubmit = async (values) => {
    setIsSubmitting(true);
    try {
      const response = await fetch(`/api/course/${params.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      if (!response.ok) throw new Error("Failed to update course");

      toast.success("Course updated successfully!");
      router.push("/admin/courses");
      router.refresh();
    } catch (error) {
      toast.error(error.message || "Error updating course");
    } finally {
      setIsSubmitting(false);
    }
  };

  // 3. Loading Screen
  if (isFetching) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4">
        <Loader2 className="h-10 w-10 animate-spin text-slate-400" />
        <p className="text-slate-500 text-sm animate-pulse">Loading course data...</p>
      </div>
    );
  }

  // 4. Error Screen (if fetch fails)
  if (!initialData) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-2">
        <AlertCircle className="h-10 w-10 text-destructive" />
        <p className="text-slate-500">Course not found.</p>
        <Link href="/admin/courses" className="text-blue-500 underline text-sm">
          Back to courses
        </Link>
      </div>
    );
  }

  // 5. Main Form Screen
  return (
    <div className="min-h-screen pb-20">
      <div className="bg-white border-b mb-14 border-slate-200">
        <div className="max-w-7xl mx-auto py-4 px-4 flex items-center gap-2">
          <Button
            asChild
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-slate-500 hover:text-slate-800"
          >
            <Link href="/admin/courses">
              <ChevronLeft size={18} />
            </Link>
          </Button>
          
          <div className="flex items-center gap-3">
            <div className="p-2 bg-slate-900 rounded-lg">
              <Pencil size={18} className="text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-slate-900 leading-tight">Edit Course</h1>
              <p className="text-xs text-slate-400">
                Update the details for <span className="font-medium text-slate-600 italic">&quot;{initialData.title}&quot;</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4">
        <CourseForm
          onSubmit={onSubmit}
          loading={isSubmitting}
          initialData={initialData}
        />
      </div>
    </div>
  );
};

export default EditCoursePage;