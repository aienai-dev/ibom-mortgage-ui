import React, { useState, useRef, useEffect } from "react";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";

const Dropdown = ({
  placeholder,
  options,
  onOptionSelect,
  label,
  isRequired,
  name,
  value,
  isDisabled,
  error,
}) => {
  const arrow =
    "https://res.cloudinary.com/dzquobiiy/image/upload/v1723102505/dropdown-arrow_ggqlnp.svg";
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");
  const dropdownRef = useRef(null);

  useEffect(() => {
    if (value) {
      setSelectedOption(value);
    }
  }, [value]);

  const toggleDropdown = () => {
    if (!isDisabled) {
      setIsOpen(!isOpen);
    }
  };
  function formatString(input) {
    // Convert to lowercase and replace spaces with dashes
    return input.toLowerCase().replace(/\s+/g, "-");
  }

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    console.log(option);
    onOptionSelect(option, name);
    setIsOpen(false);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  return (
    <div className="flex w-full flex-col gap-[8px]">
      <div className="flex">
        {label && (
          <span className="font-[500] text-[14px] text-[#3D454E]">{label}</span>
        )}
        {isRequired && <span className="text-[#FF3D00]">*</span>}
      </div>
      <div className="relative" ref={dropdownRef}>
        <div className="w-full flex flex-col gap-[6px]">
          <div
            className={`border-[1px] bg-[#fff] focus:outline-none border-[#26A54D4F] cursor-pointer flex justify-between items-center rounded-[8px] h-[48px] py-[12px] px-[18px] ${
              isDisabled ? "bg-slate-50" : null
            }`}
            onClick={toggleDropdown}
          >
            <span
              className={`font-[400] capitalize  ${
                selectedOption === "" ? "text-[#A18D8E] text-[14px]" : ""
              }`}
            >
              {selectedOption === "" ? placeholder : selectedOption}
            </span>
            <FiChevronDown className="w-[16px] h-[16px] text-slate-400" />
          </div>
          <span className="text-[12px] text-red-600 h-[16px]">{error}</span>
        </div>
        {isOpen && (
          <div className="w-full absolute shadow-md overflow-y-auto rounded-[8px] top-[48px] z-[20] left-0 right-0 max-h-[580px]">
            {options.map((option, index) => (
              <div
                className="py-[6px] hover:bg-slate-100 cursor-pointer font-[400] text-[14px] text-[#475467] bg-[#fff] px-[16px]"
                key={index}
                onClick={() => handleOptionClick(formatString(option))}
              >
                {option}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dropdown;
