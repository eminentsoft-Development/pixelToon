"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { toast } from "sonner";
import CourseForm from "@/components/admin/CourseForm";
import { Loader2 } from "lucide-react"; // For a nice loading spinner

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


  console.log("data :", initialData)

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
        <p className="text-slate-500 text-sm animate-pulse">Loading course data...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 tracking-tight">
          Edit Course
        </h1>
        <p className="text-slate-400 text-sm mt-1">
          Update the details for &quot;{initialData?.title || "this course"}&quot;.
        </p>
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