import React from "react";
import { FaQuoteLeft, FaQuoteRight } from "react-icons/fa";

const Quotebox = ({ text }) => {
  return (
    <div className="w-fit relative flex items-center justify-center">
      <div
        style={{ position: "absolute" }}
        className=" top-[-10px] left-[-19px]"
      >
        {" "}
        <FaQuoteLeft className="w-[18px] h-[18px] lg:w-[32px] lg:h-[32px]" />
      </div>
      <div
        style={{ position: "absolute" }}
        className=" bottom-[-10px] right-[-19px]"
      >
        <FaQuoteRight className="w-[18px] h-[18px] lg:w-[32px] lg:h-[32px]" />
      </div>
      <div className="p-[8px] lg:p-[14px] w-full leading-[12px] lg:leading-[18px] bg-[#fff] max-w-[276px] font-[700] lg:text-[14px] text-[8px] italic text-[#475467]">
        {text}
      </div>
    </div>
  );
};

export default Quotebox;
