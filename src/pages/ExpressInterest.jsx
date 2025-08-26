import React, { useEffect } from "react";
import Footer from "../components/new/Footer";
// import InterestForm from "../components/interestForm";
import Nav from "../components/new/Nav";
import InterestForm from "../components/forms/Interests";

const ExpressInterest = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    localStorage.clear();
  }, []);
  return (
    <div className="bg-dark-bg min-h-screen">
      <Nav />
      <div className="w-full  bg-[#fff]">
        <InterestForm />
      </div>
      <Footer />
    </div>
  );
};

export default ExpressInterest;
