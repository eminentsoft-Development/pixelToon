import AboutSection from "@/components/site/AboutSection";
import CourseSection from "@/components/site/CourseSection";
import GetInTouch from "@/components/site/GetInTouch";
import HeroSection from "@/components/site/heroSection";
import LatestNews from "@/components/site/LatestNews";
import LevelUpSection from "@/components/site/LevelUpSection";
import SuccessStories from "@/components/site/SuccessStories";
import Testimonials from "@/components/site/Testimonials";
import WhyJoinPixeltoonz from "@/components/site/Whyjoinpixeltoonz";
import React from "react";

const Home = () => {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <CourseSection />
      <LevelUpSection />
      <WhyJoinPixeltoonz />
      <Testimonials />
      {/* <SuccessStories /> */}
      <LatestNews />
      <GetInTouch />
    </>
  );
};

export default Home;
