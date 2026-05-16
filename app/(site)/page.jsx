import { Suspense } from "react";
import AboutSection from "@/components/site/AboutSection";
import CourseSection from "@/components/site/CourseSection";
import GetInTouch from "@/components/site/GetInTouch";
import HeroSection from "@/components/site/heroSection";
import LevelUpSection from "@/components/site/LevelUpSection";
import Testimonials from "@/components/site/Testimonials";
import WhyJoinPixeltoonz from "@/components/site/Whyjoinpixeltoonz";
import { getBlogs } from "@/lib/get-blogs";
import LatestBlogs from "@/components/site/LatestBlogs";
import { getFullCourses } from "@/lib/get-courses";
import GoogleReviewsCarousel from "@/components/site/GoogleReviewsCarousel";

const Home = async () => {
  const [{ blogs }, { courses }] = await Promise.all([
    getBlogs(1, 9),
    getFullCourses(1, 12),
  ]);

  const courseTitles = courses.map((c) => c.title);

  return (
    <>
      {/* Above the fold — render immediately */}
      <HeroSection />
      <AboutSection />
      <CourseSection courses={courses} />
      <LevelUpSection />
      <WhyJoinPixeltoonz />

      {/* Below the fold — streamed in as they resolve */}
      <Suspense fallback={null}>
        <Testimonials />
      </Suspense>
      <Suspense fallback={null}>
        <LatestBlogs blogs={blogs} />
      </Suspense>
      <Suspense fallback={null}>
        <GoogleReviewsCarousel />
      </Suspense>
      <Suspense fallback={null}>
        <GetInTouch courses={courseTitles} />
      </Suspense>
    </>
  );
};

export default Home;