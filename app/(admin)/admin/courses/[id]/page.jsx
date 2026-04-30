"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { toast } from "sonner";
import CourseForm from "@/components/admin/CourseForm";
import { ChevronLeft, Loader2, Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const EditCoursePage = () => {
  const [loading, setLoading] = useState(false);
  const [initialData, setInitialData] = useState(null);
  const [fetching, setFetching] = useState(true);

  const router = useRouter();
  const params = useParams();

  // 1. FETCH THE COURSE DATA ON MOUNT
  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await fetch(`/api/course/${params.id}`);
        if (!response.ok) throw new Error("Course not found");

        const data = await response.json();
        setInitialData(data);
      } catch (error) {
        toast.error("Could not load course details");
        router.push("/admin/courses");
      } finally {
        setFetching(false);
      }
    };

    if (params.id) fetchCourse();
  }, [params.id, router]);

  console.log("data :", initialData);

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const response = await fetch(`/api/course/${params.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error("Failed to update course");

      toast.success("Course updated successfully!");
      router.push("/admin/courses");
      router.refresh();
    } catch (error) {
      toast.error("Error updating course");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4">
        <Loader2 className="h-10 w-10 animate-spin text-slate-400" />
        <p className="text-slate-500 text-sm animate-pulse">
          Loading course data...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen">

      <div className="bg-white border-b mb-14 border-slate-200">
        <div className="max-w-7xl mx-auto py-4 flex items-center gap-2">
          <Link href="/admin/courses">
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
              <Pencil  size={18} className="text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-slate-900 leading-tight">
                Edit Course
              </h1>
              <p className="text-xs text-slate-400">
                Update the details for &quot;
                {initialData?.title || "this course"}&quot;.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CourseForm will automatically fill fields because of initialData */}
      <CourseForm
        onSubmit={onSubmit}
        loading={loading}
        initialData={initialData}
      />
    </div>
  );
};

export default EditCoursePage;
