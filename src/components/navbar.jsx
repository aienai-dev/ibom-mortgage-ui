import React, { useState, useRef, useEffect } from "react";
import logo from "../assets/images/logo.svg";
import { useNavigate } from "react-router-dom";
import downArrow from "../assets/icons/dropdown-arrow.svg";
import { FaUser } from "react-icons/fa";
import { CiMenuFries } from "react-icons/ci";
import { IoChevronDown } from "react-icons/io5";

const Navbar = ({ navItems, action, actionName, isEmpty }) => {
  const user = localStorage.user ? JSON.parse(localStorage.user) : {};
  const compliance = localStorage.compliance
    ? JSON.parse(localStorage.compliance)
    : {};
  const navigate = useNavigate();
  // const dropdownRef = useRef()
  // const logo =
  //   "https://res.cloudinary.com/dzquobiiy/image/upload/v1723102728/fha-logo-nav_v2xtz0.svg";
  const navIcon =
    "https://res.cloudinary.com/dzquobiiy/image/upload/v1723102733/nav-icon_p7uo9a.svg";
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setIsDropdownOpen((prevState) => !prevState);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsDropdownOpen(false);
    }
  };
  // console.log(navItems);
  const login = () => {
    navigate("/login");
  };
  const expressInterest = () => {
    navigate("/interest-form");
  };
  //  const logout = ()=>{
  //   localStorage.clear();
  //   navigate("/");
  //  }
  window.addEventListener("click", (e) => {
    if (isDropdownOpen && !dropdownRef.current?.contains(e.target))
      setIsDropdownOpen(false);
  });

  // useEffect(() => {
  //   document.addEventListener("mousedown", handleClickOutside);
  //   return () => {
  //     document.removeEventListener("mousedown", handleClickOutside);
  //   };
  // }, []);
  return (
    <div className="w-full flex pt-[0px] justify-center relative">
      <div className="absolute bg-[#1e1f1f] border-b-[1px] border-[#AFE155] w-full top-0 right-0 left-0 z-[-2] h-[124px]"></div>
      <div className="flex w-full h-[124px] px-[20px] max-w-[1240px] gap-[10px] justify-between">
        <div className="flex w-full items-center relative">
          <div className="absolute max-w-[192px] pt-[10px] w-[80px] h-[80px] sm:w-[120px] sm:h-[120px] lg:w-full lg:h-full max-h-[192px]">
            <a href="/">
              <img src={logo} alt="" />
            </a>
          </div>
        </div>
        <div
          ref={dropdownRef}
          className="flex w-full items-center relative justify-end gap-[34px]"
        >
          <div
            onClick={() => setIsDropdownOpen(true)}
            className="flex items-center cursor-pointer"
          >
            <span className="w-[45px] mr-2 h-[45px] bg-[#ffffff43] flex items-center justify-center text-white rounded-full">
              <FaUser />
            </span>
            <div className="flex flex-col text-[#fff] max-w-[150px] overflow-hidden ">
              <span className="whitespace-nowrap truncate ">
                {user?.first_name} {user?.last_name}
              </span>
              <span className="text-[12px] whitespace-nowrap truncate">
                {user?.email}
              </span>
            </div>
            <IoChevronDown className="text-[#fff]" />
          </div>
          {isDropdownOpen && (
            <div className="flex flex-col items-center bg-[#fff] shadow-sm absolute top-[100px] p-[20px] border border-e-gray-500 rounded-md w-[300px]">
              <span className="w-[45px] mr-2 h-[45px] bg-[#00000072] flex items-center justify-center text-white rounded-full">
                <FaUser />
              </span>
              <div className="flex flex-col items-center overflow-hidden ">
                <span className="whitespace-nowrap truncate text-center ">
                  {user?.first_name} {user?.last_name}
                </span>
                <span className="text-[12px] whitespace-nowrap truncate">
                  {user?.email}, {user?.phone_number}
                </span>
              </div>
              <span
                onClick={() => {
                  localStorage.clear();
                  navigate("/");
                }}
                className="bg-[#000] cursor-pointer h-[42px] flex items-center justify-center w-full text-[#fff] mt-4"
              >
                Logout
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
