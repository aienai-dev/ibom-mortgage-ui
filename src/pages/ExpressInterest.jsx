import React from "react";
import Footer from "../components/new/Footer";
// import InterestForm from "../components/interestForm";
import Nav from "../components/new/Nav";
import InterestForm from "../components/forms/Interests";

const ExpressInterest = () => {
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
