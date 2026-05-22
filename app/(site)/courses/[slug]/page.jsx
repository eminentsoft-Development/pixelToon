import React from "react";
import Breadcrumbs from "@/components/site/Breadcrumbs";
import CourseOverview from "@/components/site/CourseDetails";
import { notFound } from "next/navigation";
import { getCoursesForSelect } from "@/app/action/get-courses";

async function getCourse(slug) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SITE_URL}/api/course/${slug}`,
    {
      next: { revalidate: 60 },
    },
  );

  if (!res.ok) return null;
  return res.json();
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const course = await getCourse(slug);

  if (!course) return {};

  return {
    title: course?.metaTitle,
    description: course?.metaDescription,
    alternates: {
      canonical:
        course?.canonicalUrl || `https://pixeltoonzacademy.com/courses/${slug}`,
    },
  };
}

const Page = async ({ params }) => {
  const sampleOpportunitiesData = {
    opportunitiesDesc:
      "Graduates of this program are highly sought after by top creative agencies and tech companies worldwide. Upon successful completion, you will be well-equipped to transition into the following high-growth roles:",
    opportunities: [
      { value: "Senior UI/UX Designer" },
      { value: "Digital Product Designer" },
      { value: "Frontend Web Developer" },
      { value: "Interactive Art Director" },
      { value: "Visual Designer" },
      { value: "Webflow Expert" },
      { value: "Creative Technologist" },
    ],
  };

  const { slug } = await params;
  const coursePromise = getCourse(slug);
  const listPromise = getCoursesForSelect();

  const [course, courseList] = await Promise.all([coursePromise, listPromise]);

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
      <CourseOverview
        {...course}
        courseList={courseList}
      />
    </div>
  );
};

export default Page;
