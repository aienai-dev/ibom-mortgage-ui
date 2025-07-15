import React from "react";
import m1 from "../assets/images/frame1.svg";
import m2 from "../assets/images/frame2.svg";
import m3 from "../assets/images/frame3.svg";
import { useNavigate } from "react-router-dom";

const HomeCard = ({ cardData, index }) => {
  const navigate = useNavigate();
  const getSource = () => {
    switch (index) {
      case 0:
        return m1;
      case 1:
        return m2;
      case 2:
        return m3;
      default:
        return m1;
    }
  };
  return (
    <div
      onClick={() => navigate("/interest-form")}
      className="flex w-full flex-col border items-center gap-[18px] md:gap-[44px] border-[#D5D5D540]"
    >
      <img className="w-[70%] md:w-full" src={getSource()} alt="" />
      <div className="flex w-full md:ps-[24px] items-center md:items-start flex-col gap-[16px[">
        <div className="flex gap-[10px] items-center">
          <div className="w-[44px] h-[44px] rounded-[44px] bg-[#F9F9F9]"></div>
          <span className="font-[600[ text-[20px] text-[#030812]">
            {cardData.head}
          </span>
        </div>
        <span className="font-[400] md:text-start text-center text-[16px] text-[#475467]">
          {cardData.body}
        </span>
      </div>
    </div>
  );
};

export default HomeCard;
