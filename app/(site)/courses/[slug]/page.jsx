import React from "react";
import Breadcrumbs from "@/components/site/Breadcrumbs";
import CourseOverview from "@/components/site/CourseDetails";
import { notFound } from "next/navigation";

async function getCourse(slug) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/course/${slug}`, {
    // This now works correctly to cache the data on the server
    // next: { revalidate: 3600 } 
  });
  
  if (!res.ok) return null;
  return res.json();
}

const Page = async({ params }) => {
  const { slug } = await params;
  const course = await getCourse(slug);

  if (!course) {
    notFound();
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
