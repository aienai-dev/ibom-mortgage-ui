import React, { useState } from "react";

const Accordion = ({ data }) => {
  const plus =
    "https://res.cloudinary.com/dzquobiiy/image/upload/v1723102505/accordion-plus_zeymgo.svg";
  const minus =
    "https://res.cloudinary.com/dzquobiiy/image/upload/v1723102505/accordion-minus_i988j5.svg";
  const [activeIndex, setActiveIndex] = useState(null);

  const handleToggle = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };
  return (
    <div className="flex w-full px-[20px] max-w-[768px] flex-col items-center justify-center">
      {data.map((item, index) => (
        <div key={index} className=" border-b w-full border-[#EAECF0]">
          <div
            className=" cursor-pointer pt-[24px] pb-[32px] w-full flex justify-between items-center transition-all duration-300 ease-in-out"
            onClick={() => handleToggle(index)}
          >
            <span className="font-[600] text-[18px] text-[#030812]">
              {item.question}
            </span>
            <img src={activeIndex === index ? minus : plus} alt="" />
          </div>
          <div
            className={`w-full pt-[8px] pb-[32px] ${
              activeIndex === index ? "block" : "hidden"
            }`}
          >
            <p className="font-[400] text-[16px] text-[#475467]">
              {item.answer}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Accordion;
