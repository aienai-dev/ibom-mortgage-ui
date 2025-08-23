import React from "react";
import HomeCard from "../homeCard";
import { application_stale_data } from "../../constants/static";
const properties = [
  {
    id: 1,
    name: "Luxury Villa in Abuja",
    imageUrl: "https://placehold.co/400x250/E5E7EB/4B5563?text=Villa+in+Abuja",
    price: "₦150M",
    location: "Abuja",
  },
  {
    id: 2,
    name: "Modern Home in Lagos",
    imageUrl: "https://placehold.co/400x250/E5E7EB/4B5563?text=Home+in+Lagos",
    price: "₦95M",
    location: "Lagos",
  },
  {
    id: 3,
    name: "Cozy Bungalow in Port Harcourt",
    imageUrl: "https://placehold.co/400x250/E5E7EB/4B5563?text=Bungalow+in+PH",
    price: "₦60M",
    location: "Port Harcourt",
  },
];

const Featured = () => {
  const { card1, card2, card3 } = application_stale_data;
  return (
    <div
      id="how-it-works"
      className=" bg-[#fff]  py-[100px] px-[40px] w-full gap-[80px] flex flex-col"
    >
      <div className="flex flex-col lg:flex-row gap-[20px] lg:gap-[0px] w-full items-center justify-between">
        <div id="howItWorks" className="flex flex-col gap-[16px]">
          <span className="font-[600] text-[36px] text-[#030812]">
            How It Works
          </span>
          <span className="font-[600] text-center md:text-left text-[16px] text-[#475467]">
            Three (3) easy steps{" "}
          </span>
        </div>
        <span className="max-w-[820px] text-center md:text-start text-[18px] text-[400] text-[#475467]">
          By sharing your housing needs and preferences, you help shape the
          future of housing policies and programs that directly impact your
          community. Your input ensures that the real needs of residents are
          heard and addressed.
        </span>
      </div>
      <div className="md:grid md:grid-cols-2 flex flex-col lg:grid-cols-3 gap-[20px] w-full">
        <HomeCard cardData={card1} index={1} />
        <HomeCard cardData={card2} index={2} />
        <HomeCard cardData={card3} index={3} />
      </div>
    </div>
  );
};

export default Featured;
