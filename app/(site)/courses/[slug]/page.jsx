"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Breadcrumbs from "@/components/site/Breadcrumbs";
import CourseOverview from "@/components/site/CourseDetails";
import { Loader2, AlertCircle } from "lucide-react";

const Page = () => {
  const { slug } = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!slug) return;

    const fetchCourseData = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/course/${slug}`);

        if (!res.ok) {
          throw new Error("Course not found or failed to fetch");
        }

        const data = await res.json();
        setCourse(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCourseData();
  }, [slug]);

  // Loading State
  if (loading) {
    return (
      <>
        <Breadcrumbs
          items={[
            { label: "Courses", href: "/courses" },
            { label: course?.title },
          ]}
        />
        <div className="min-h-screen flex items-center justify-center">
          <Loader2 className="w-10 h-10 animate-spin text-primary" />
        </div>
      </>
    );
  }

  // Error State
  if (error) {
    return (
      <>
        <Breadcrumbs
          items={[
            { label: "Courses", href: "/courses" },
            { label: course?.title },
          ]}
        />

        <div className="min-h-screen flex flex-col items-center justify-center gap-4 text-rose-600">
          <AlertCircle className="w-12 h-12" />
          <p className="text-xl font-semibold">{error}</p>
        </div>
      </>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Pass custom label to breadcrumbs if your component supports it */}
      <Breadcrumbs
        items={[
          { label: "Courses", href: "/courses" },
          { label: course?.title },
        ]}
      />

      {/* Pass the fetched data to your overview component */}
      <CourseOverview {...course} />
    </div>
  );
};

export default Page;
