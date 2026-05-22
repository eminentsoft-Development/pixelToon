import { Suspense } from "react";
import AboutSection from "@/components/site/AboutSection";
import CourseSection from "@/components/site/CourseSection";
import HeroSection from "@/components/site/heroSection";
import LevelUpSection from "@/components/site/LevelUpSection";
import Testimonials from "@/components/site/Testimonials";
import WhyJoinPixeltoonz from "@/components/site/Whyjoinpixeltoonz";
import { getBlogs } from "@/lib/get-blogs";
import LatestBlogs from "@/components/site/LatestBlogs";
import { getFullCourses } from "@/lib/get-courses";
import GoogleReviews from "@/components/site/GoogleReviews";
import GetInTouch from "@/components/site/GetInTouch";

export async function generateMetadata() {
  return {
    title: "Photography Courses in Kochi | VFX, Animation & Graphic Design",
    description:
      "Photography Courses in Kochi offer expert training in VFX, animation, and graphic design. Master your skills with our comprehensive courses and elevate your creativity.",
    alternates: {
      canonical: "https://pixeltoonzacademy.com",
    },
  };
}

const Home = async () => {
  // Parallel data fetching for maximum speed
  const [{ blogs }, { courses }] = await Promise.all([
    getBlogs(1, 9),
    getFullCourses(1, 12),
  ]);

  const courseTitles = courses.map((c) => c.title);

  return (
    <>
      <HeroSection />
      <AboutSection />
      <CourseSection courses={courses} />
      <LevelUpSection />
      <WhyJoinPixeltoonz />

      <Testimonials />
      <LatestBlogs blogs={blogs} />

      <Suspense fallback={<div className="min-h-[300px]" />}>
        <GoogleReviews />
      </Suspense>

      <GetInTouch courses={courseTitles} />
    </>
  );
};

export default Home;
