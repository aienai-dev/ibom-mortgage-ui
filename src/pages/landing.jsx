import React from "react";
import Accordion from "../components/accordion";
import { faqData } from "../constants/static";
import Header from "../components/new/Header";
import HeroSection from "../components/new/HeroSection";
import Footer from "../components/new/Footer";
import AboutSection from "../components/new/AboutSection";
import Featured from "../components/new/Featured";
import TestimonialsSection from "../components/new/TestimonialsSection";

const Landing = () => {
  return (
    <div className="bg-dark-bg min-h-screen">
      <Header />
      <HeroSection />
      <Featured />
      <TestimonialsSection />
      <AboutSection />
      <div className=" w-full flex flex-col items-center bg-[#fff] gap-[80px]">
        <div
          id="FAQ"
          className="flex flex-col w-full gap-[20px] justify-center items-center"
        >
          <span className="font-[600] md:text-[36px] text-[26px] text-[#030812]">
            Frequently Asked Questions
          </span>
          <span className="text-[14px] md:text-[18px] font-[400] text-[#475467]">
            Everything you need to know about us
          </span>
        </div>
        <Accordion data={faqData} />
      </div>
      <Footer />
    </div>
  );
};

export default Landing;
