import React, { useState, useRef, useEffect } from "react";
import logo from "../assets/images/logo.svg";
import { useNavigate } from "react-router-dom";
import downArrow from "../assets/icons/dropdown-arrow.svg";
import { FaUser } from "react-icons/fa";
import { CiMenuFries } from "react-icons/ci";

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
          {navItems && !isEmpty && (
            <div className="lg:flex hidden items-center gap-[34px]">
              {navItems.map((item, index) => (
                <a
                  className="font-[500] whitespace-nowrap text-[16px] text-[#FAFAFA]"
                  href={`${item.id}`}
                  key={index}
                >
                  {item.name}
                </a>
              ))}
            </div>
          )}
          <div className="flex items-center">
            {!user._id && !isEmpty && (
              <div className="lg:flex hidden items-center gap-[18px]">
                <span
                  onClick={login}
                  className="border-[#E6E6E6] cursor-pointer border rounded-[8px] px-[32px] py-[16px] text-[#FFFFFF] whitespace-nowrap font-[500] text-[16px]"
                >
                  Login
                </span>
                <span
                  onClick={expressInterest}
                  className="bg-[#fff] rounded-[8px] px-[32px] py-[16px] cursor-pointer text-[#3D454E] whitespace-nowrap font-[500] text-[16px]"
                >
                  Get Started
                </span>
              </div>
            )}
            {user._id && !isEmpty && (
              <div className="flex items-center gap-[8px]">
                {/* <div className="w-[25px] h-[25px] bg-[#fff] rounded-[25px]"></div> */}
                <span className="font-[500] text-[12px] md:text-[16px] text-[#FAFAFA]">
                  Hello, <span className="truncate">{user.first_name}</span>
                </span>
              </div>
            )}
            {navItems && (
              <CiMenuFries
                onClick={toggleDropdown}
                className="flex lg:hidden text-[#fff] text-[25px] cursor-pointer ms-[10px]"
              />
            )}
          </div>
          {isDropdownOpen && (
            <div className="flex lg:hidden absolute top-[90px] shadow-md py-[15px] gap-[15px] right-0 bg-[#fff] z-[5] rounded-[8px] flex-col ">
              {navItems.map((item, index) => (
                <a
                  onClick={toggleDropdown}
                  className="font-[500] whitespace-nowrap hover:bg-slate-100 px-[20px] text-[16px] text-[#6e6b6b]"
                  href={`${item.id}`}
                  key={index}
                >
                  {item.name}
                </a>
              ))}
              {!user._id && !isEmpty && (
                <div className="flex flex-col px-[20px] gap-[15px]">
                  <span
                    onClick={login}
                    className="border-[#E6E6E6] cursor-pointer rounded-[8px] text-[#3D454E] whitespace-nowrap font-[800] text-[16px]"
                  >
                    Login
                  </span>
                  <span
                    onClick={expressInterest}
                    className="rounded-[8px] cursor-pointer py-[8px] px-[20px] bg-slate-800  text-[#fff] whitespace-nowrap font-[800] text-[16px]"
                  >
                    Get Started
                  </span>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
