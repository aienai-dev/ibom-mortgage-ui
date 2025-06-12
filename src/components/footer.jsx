import React from "react";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <div className="w-full h-[80px] bg-[#1e1f1e] text-center px-[20px] flex items-center justify-center"><span className=" w-fit text-[16px] font-[400] text-[#FFFFFF]">© {year} FHA Renewed Hope Estates Portal. All rights reserved</span></div>
  );
};

export default Footer;
