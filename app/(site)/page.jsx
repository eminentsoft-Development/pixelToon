import React from "react";
import AboutSection from "@/components/site/AboutSection";
import CourseSection from "@/components/site/CourseSection";
import GetInTouch from "@/components/site/GetInTouch";
import HeroSection from "@/components/site/heroSection";
import LevelUpSection from "@/components/site/LevelUpSection";
import Testimonials from "@/components/site/Testimonials";
import WhyJoinPixeltoonz from "@/components/site/Whyjoinpixeltoonz";
import { getBlogs } from "@/lib/get-blogs";
import LatestBlogs from "@/components/site/LatestBlogs";


const Home = async () => {
  const { blogs } = await getBlogs(1, 9);
  return (
    <>
      <HeroSection />
      <AboutSection />
      <CourseSection />
      <LevelUpSection />
      <WhyJoinPixeltoonz />
      <Testimonials />
      <LatestBlogs blogs={blogs} />
      <GetInTouch />
    </>
  );
};

export default Home;
