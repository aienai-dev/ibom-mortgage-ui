import React, { useEffect, useRef, useState } from "react";
// import { FaEye, FaEyeSlash } from "react-icons/fa";
import arrow from "../assets/icons/dropdown-arrow.svg";
import { countries } from "../assets/constants/countries";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";

// const Input_ = ({
//   label,
//   type,
//   name,
//   value,
//   onChange,
//   placeholder,
//   isRequired,
//   style,
//   isDisabled,
//   section,
//   subSection,
// }) => {
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     onChange(name, value, section, subSection);
//   };
//   const [showPassword, setShowPassword] = useState(false);

//   const handleTogglePassword = () => {
//     setShowPassword((prevShowPassword) => !prevShowPassword);
//   };
//   return (
//     <div className="flex w-full flex-col gap-[8px]">
//       <div className="flex">
//         {label && (
//           <span className="font-[500] text-[14px] text-[#3D454E]">{label}</span>
//         )}
//         {isRequired && <span className="text-[#FF3D00]">*</span>}
//       </div>
//       {type !== "password" && (
//         <input
//           className={`border-[1px] focus:outline-none border-[#26A54D4F] font-[500] text-[14px] text-[#A18D8E] rounded-[8px] h-[48px] py-[12px] px-[18px] ${style}`}
//           type={type}
//           name={name}
//           value={value}
//           onChange={handleChange}
//           placeholder={placeholder}
//           disabled={isDisabled}
//           id={name}
//         />
//       )}
//       {type === "password" && (
//         <div className="relative">
//           <input
//             className="border-[1px] focus:outline-none border-[#26A54D4F] font-[500] text-[14px] text-[#A18D8E] rounded-[8px] h-[48px] py-[12px] px-[18px] w-full"
//             type={showPassword ? "text" : "password"}
//             name={name}
//             value={value}
//             onChange={handleChange}
//             placeholder={placeholder}
//             id={name}
//           />
//           <button
//             type="button"
//             onClick={handleTogglePassword}
//             className="absolute right-[12px] top-1/2 transform -translate-y-1/2 text-[#A18D8E] focus:outline-none"
//           >
//             {showPassword ? <FaEyeSlash /> : <FaEye />}
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

export const Input = ({
  label,
  name,
  value,
  handleChange,
  autocomplete,
  type,
  helper,
  error,
  placeholder,
  required,
  disabled,
}) => {
  return (
    <div className="flex flex-col gap-[6px] w-full">
      <div className="flex w-full justify-between items-center">
        <label
          htmlFor={name}
          className="block text-sm font-medium leading-6 text-[#111]"
        >
          {label} <span className="text-red-500">{required && "*"}</span>
        </label>
        {helper}
      </div>

      <input
        id={name}
        name={name}
        type={type}
        autoComplete={autocomplete}
        value={value}
        disabled={disabled}
        onChange={handleChange}
        placeholder={placeholder}
        className="block w-full rounded-[8px] bg-[#F8FAFC] h-[48px] px-[12px] border-0 outline-[#26A54D4F] transition-all ease-in-out duration-200 shadow-sm ring-1 ring-inset ring-[#D0D5DD] placeholder:text-[#A18D8E] focus:ring-1 focus:ring-inset focus:ring-[#26A54D4F]"
      />

      <span className="text-[12px] text-red-600 h-[16px]">{error}</span>
    </div>
  );
};

export const Select = ({
  label,
  value,
  handleChange,
  options,
  className,
  border,
  style,
  icon,
  changeDefault,
  disabled,
  search,
  handleSearch,
}) => {
  const [open, setOpen] = useState(false);
  const selectRef = useRef();
  const toggle = () => {
    // console.log(options);
    setOpen(!open);
  };
  useEffect(() => {
    window.addEventListener("click", (e) => {
      if (open && !selectRef?.current?.contains(e.target)) setOpen(false);
    });
  });
  // console.log("value", value);
  return (
    <div
      ref={selectRef}
      style={style ? style : {}}
      className={`relative h-fit ${className}`}
    >
      <div
        onClick={() => !changeDefault && toggle()}
        className={`flex items-center justify-between gap-[8px] relative w-full rounded-[8px] h-[40px] px-[12px] transition-all ease-in-out duration-200 shadow-sm border ${
          border ? border : "border-[#D0D5DD]"
        } focus:ring-1 focus:ring-inset focus:ring-[#FF3B30] `}
      >
        {value === "" ? (
          label
        ) : (
          <span className="text-[16px] h-full flex items-center text-[#111]">
            {value}
          </span>
        )}
        {icon !== "" && (
          <span onClick={toggle}>
            <img src={arrow} alt="" />
          </span>
        )}
      </div>
      {open && !disabled && (
        <div className="absolute top-[40.1px] max-h-[50vh] h-fit overflow-auto rounded-b-[8px] py-[10px] w-full flex flex-col bg-[#fff] z-[1111] shadow-md">
          {options?.map((option, n) => (
            <span
              className="h-[40px] text-[14px] px-[12px]  flex text-[#111] items-center cursor-pointer hover:bg-[rgba(234,236,240,0.50)] transition-all ease-in-out duration-200"
              onClick={() => {
                handleChange(option);
                setOpen(false);
              }}
              key={n}
            >
              {option.title}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};
export const PhoneInput = ({
  label,
  name,
  value,
  handleChange,
  autocomplete,
  type,
  helper,
  error,
  placeholder,
  required,
  countryCode = "234",
  setCountryCode,
}) => {
  const [showCodes, setShowCodes] = useState(false);
  // console.log(countries);
  const ref = useRef();

  window.addEventListener("click", (e) => {
    if (showCodes && !ref.current?.contains(e.target)) setShowCodes(false);
  });
  const onChange = (e) => {
    if (!isNaN(e.target.value)) {
      handleChange(e);
    }
  };

  return (
    <div className="flex flex-col gap-[6px] w-full">
      <div className="flex w-full justify-between items-center">
        <label
          htmlFor={name}
          className="block text-sm font-medium leading-6 text-[#111]"
        >
          {label}
          <span className="text-red-500">{required && "*"}</span>
        </label>
        {helper}
      </div>
      <div className="flex items-center rounded-[8px] gap-[6px]  bg-[#F8FAFC] h-[48px] px-[12px] border-0 outline-[#26A54D4F] transition-all ease-in-out duration-200 shadow-sm ring-1 ring-inset ring-[#D0D5DD]  focus:ring-1 focus:ring-inset focus:ring-[#26A54D4F]">
        <div
          ref={ref}
          className="text-[#A18D8E] relative min-w-[76px] text-[14px] flex items-center gap-[4px]"
        >
          <span
            onClick={() => setShowCodes(!showCodes)}
            className="flex items-center gap-[4px] cursor-pointer"
          >
            ({countryCode}) <img src={arrow} alt="" />
          </span>
          {showCodes && (
            <div className="absolute z-[99999] bg-[#fff] w-fit top-[30px] px-[10px] border flex flex-col max-h-[400px] max-w-[330px] overflow-auto">
              {countries
                .sort((a, b) => {
                  let nameA = a.name.common.toUpperCase();
                  let nameB = b.name.common.toUpperCase();
                  if (nameA < nameB) return -1;
                  if (nameA > nameB) return 1;
                  return 0;
                })
                .map((c) => (
                  <span
                    onClick={() => {
                      setCountryCode(c.callingCodes[0]);
                      setShowCodes(false);
                    }}
                    className="whitespace-nowrap cursor-pointer inline-flex gap-[16px]"
                  >
                    (+{c.callingCodes[0]})<span> {c.name.common}</span>
                  </span>
                ))}
            </div>
          )}
        </div>
        <input
          id={name}
          name={name}
          type={type}
          autoComplete={autocomplete}
          value={value}
          maxLength={countryCode === "234" ? 10 : 20}
          placeholder={placeholder}
          onChange={onChange}
          required
          className="block w-full rounded-[8px] h-full placeholder:text-[#A18D8E] placeholder:text-[14px] bg-transparent border-none outline-none "
        />
      </div>
      <span className="text-[12px] text-red-600 h-[16px] ">{error}</span>
    </div>
  );
};
export const PasswordInput = ({
  label,
  name,
  value,
  handleChange,
  autocomplete,
  helper,
  error,
  placeholder,
  required,
}) => {
  const [type, setType] = useState("password");
  return (
    <div className="flex flex-col gap-[6px] w-full">
      <div className="flex w-full justify-between items-center">
        <label
          htmlFor={name}
          className="block text-sm font-medium leading-6 text-[#111]"
        >
          {label}
          <span className="text-red-500">{required && "*"}</span>
        </label>
        {helper}
      </div>
      <div className="flex items-center  justify-between rounded-[8px] gap-[6px] overflow-hidden bg-[#F8FAFC] h-[48px] px-[12px] border-0 outline-[#26A54D4F] transition-all ease-in-out duration-200 shadow-sm ring-1 ring-inset ring-[#D0D5DD]  focus:ring-1 focus:ring-inset focus:ring-[#26A54D4F]">
        <input
          id={name}
          name={name}
          type={type}
          autoComplete={autocomplete}
          value={value}
          placeholder={placeholder}
          onChange={handleChange}
          required
          className="block w-full rounded-[8px] h-full placeholder:text-[#A18D8E] placeholder:text-[14px] bg-transparent border-none outline-none "
        />
        {type === "password" ? (
          <IoEyeOutline
            onClick={() => setType("text")}
            className="text-[20px] text-[#A18D8E] cursor-pointer"
          />
        ) : (
          <IoEyeOffOutline
            onClick={() => setType("password")}
            className="text-[20px] text-[#A18D8E] cursor-pointer"
          />
        )}
      </div>
      <span className="text-[12px] text-red-600 h-[16px] ">{error}</span>
    </div>
  );
};

export const TextArea = ({
  label,
  name,
  value,
  handleChange,
  autocomplete,
  type,
  helper,
  error,
  placeholder,
  required,
  disabled,
}) => {
  return (
    <div className="flex flex-col gap-[6px] w-full">
      <div className="flex w-full justify-between items-center">
        <label
          htmlFor={name}
          className="block text-sm font-medium leading-6 text-[#111]"
        >
          {label} <span className="text-red-500">{required && "*"}</span>
        </label>
        {helper}
      </div>

      <textarea
        id={name}
        name={name}
        type={type}
        autoComplete={autocomplete}
        value={value}
        disabled={disabled}
        rows={5}
        onChange={handleChange}
        placeholder={placeholder}
        className="block w-full rounded-[8px] bg-[#F8FAFC] min-h-[48px] px-[12px] border-0 outline-[#26A54D4F] transition-all ease-in-out duration-200 shadow-sm ring-1 ring-inset ring-[#D0D5DD] placeholder:text-[#A18D8E] focus:ring-1 focus:ring-inset focus:ring-[#26A54D4F]"
      />

      <span className="text-[12px] text-red-600 h-[16px]">{error}</span>
    </div>
  );
};

export default Input;
