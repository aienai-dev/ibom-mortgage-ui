import React from "react";
import { FaQuoteRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import bg from "../../assets/images/outdoor.jpg";

const testimonials = [
  {
    id: 1,
    text: "Ibom Mortgage Bank made my dream of owning a home a reality. The process was seamless and the team was incredibly helpful.",
    author: "Jane Doe",
  },
  {
    id: 2,
    text: "Their mortgage plans are flexible and tailored to my needs. I couldn't have asked for a better experience.",
    author: "John Smith",
  },
  {
    id: 3,
    text: "The customer service is outstanding. They guided me through every step of the way with clear communication.",
    author: "Maria Okon",
  },
];

const TestimonialsSection = () => {
  const navigate = useNavigate();
  return (
    <section
      style={{
        backgroundImage: `url(${bg})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
      }}
      className=" py-[100px] px-4 md:px-16 relative flex flex-col gap-[20px] min-h-[600px]"
    >
      <div className="absolute top-0  left-0 w-full h-full bg-dark-bg bg-opacity-70"></div>
      <div className="flex md:ms-[100px] z-[999999] max-w-[670px]  w-fit flex-col gap-[12px]">
        <span className="text-[30px] md:text-[40px] text-center md:text-start font-[700] text-[#FFFFFF]">
          Collecting Data to Shape Housing Policies and Meet National Needs
        </span>
        <span className="font-[400] text-center md:text-start text-[14px] md:text-[18px] text-[#FFFFFF]">
          Our mission is to gather comprehensive data on housing requirements to
          inform policy decisions, enhance housing programs, and ensure that
          every citizen has access to safe, affordable, and suitable housing.
        </span>
        <button
          onClick={() => navigate("/interest-form")}
          className=" max-w-[250px] mt-[40px] flex justify-center items-center cursor-pointer w-full bg-[#FAFAFA] text-[#3D454E] text-[14px] font-[500] rounded-[8px] py-[12px] px-[32px] h-[56px]"
        >
          Express Your Interest
        </button>
      </div>
    </section>
  );
};

export default TestimonialsSection;
