import AboutSection from "@/components/site/AboutSection";
import CourseSection from "@/components/site/CourseSection";
import HeroSection from "@/components/site/heroSection";
import LevelUpSection from "@/components/site/LevelUpSection";
import SuccessStories from "@/components/site/SuccessStories";
import React from "react";

const Home = () => {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <LevelUpSection />
      <CourseSection />
      <SuccessStories />
    </>
  );
};

export default Home;
