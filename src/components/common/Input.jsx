import { useEffect, useRef, useState } from "react";
import { countries } from "../../assets/constants/countries";
import { EyeIcon, EyeOffIcon } from "./Icons";

export const Input = ({
  label,
  name,
  value,
  handleChange,
  type = "text",
  error,
  placeholder,
  required,
}) => (
  <div className="flex flex-col gap-2 w-full">
    <label
      htmlFor={name}
      className="block text-sm font-medium leading-6 text-gray-900"
    >
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <input
      id={name}
      name={name}
      type={type}
      value={value}
      onChange={handleChange}
      placeholder={placeholder}
      className="block w-full rounded-lg bg-gray-50 h-12 px-4 border border-gray-300 focus:outline-none focus:ring-1 focus:ring-green-600/50"
    />
    <span className="text-xs text-red-600 h-4">{error}</span>
  </div>
);

// Password Input Component with show/hide toggle
export const PasswordInput = ({
  label,
  name,
  value,
  handleChange,
  error,
  placeholder,
  required,
}) => {
  const [type, setType] = useState("password");
  return (
    <div className="flex flex-col gap-2 w-full">
      <label
        htmlFor={name}
        className="block text-sm font-medium leading-6 text-gray-900"
      >
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <div className="relative">
        <input
          id={name}
          name={name}
          type={type}
          value={value}
          onChange={handleChange}
          placeholder={placeholder}
          className="block w-full rounded-lg bg-gray-50 h-12 px-4 border border-gray-300 focus:outline-none focus:ring-1 focus:ring-green-600/50 pr-10"
        />
        <span
          className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-400"
          onClick={() => setType(type === "password" ? "text" : "password")}
        >
          {type === "password" ? (
            <EyeOffIcon size={20} />
          ) : (
            <EyeIcon size={20} />
          )}
        </span>
      </div>
      <span className="text-xs text-red-600 h-4">{error}</span>
    </div>
  );
};

// Phone Input Component with country code dropdown
export const PhoneInput = ({
  label,
  name,
  value,
  handleChange,
  error,
  placeholder,
  required,
  countryCode,
  setCountryCode,
}) => {
  const [showCodes, setShowCodes] = useState(false);
  const ref = useRef();
  const maxLength = countryCode === "234" ? 10 : 14;

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setShowCodes(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [ref, showCodes]);

  const onChange = (e) => {
    const sanitizedValue = e.target.value.replace(/\D/g, "");
    // console.log(sanitizedValue);
    handleChange(sanitizedValue);
  };

  return (
    <div className="flex flex-col gap-2 w-full">
      <label
        htmlFor={name}
        className="block text-sm font-medium leading-6 text-gray-900"
      >
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <div className="flex items-center h-12 rounded-lg border border-gray-300 focus-within:ring-1 focus-within:ring-green-600/50 bg-gray-50">
        <div ref={ref} className="relative pl-3">
          <span
            onClick={() => setShowCodes(!showCodes)}
            className="flex items-center gap-1 cursor-pointer text-sm text-gray-500"
          >
            (+{countryCode})
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-chevron-down"
            >
              <path d="m6 9 6 6 6-6" />
            </svg>
          </span>
          {showCodes && (
            <div className="absolute z-50 bg-white w-48 top-8 left-0 rounded-md shadow-lg max-h-60 overflow-y-auto">
              {countries
                .sort((a, b) => a.name.common.localeCompare(b.name.common))
                .map((c, index) => (
                  <div
                    key={index}
                    onClick={() => {
                      setCountryCode(c.callingCodes[0]);
                      setShowCodes(false);
                    }}
                    className="p-2 cursor-pointer hover:bg-gray-100 flex justify-between items-center text-sm"
                  >
                    <span>{c.name.common}</span>
                    <span className="text-xs text-gray-500">
                      +{c.callingCodes[0]}
                    </span>
                  </div>
                ))}
            </div>
          )}
        </div>
        <input
          id={name}
          name={name}
          type="tel"
          value={value}
          placeholder={placeholder}
          onChange={onChange}
          required={required}
          maxLength={maxLength}
          className="block w-full h-full placeholder:text-gray-400 bg-transparent border-none outline-none "
        />
      </div>
      <span className="text-xs text-red-600 h-4">{error}</span>
    </div>
  );
};

// Dropdown/Select Component
export const Dropdown = ({
  label,
  name,
  options,
  value,
  onOptionSelect,
  error,
  required,
  placeholder = "Select  option",
}) => {
  const [open, setOpen] = useState(false);
  const ref = useRef();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [ref, open]);

  return (
    <div ref={ref} className="flex flex-col gap-2 w-full relative">
      <label className="block text-sm font-medium leading-6 text-gray-900">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <div
        onClick={() => setOpen(!open)}
        className="flex items-center justify-between gap-2 w-full rounded-lg h-12 px-4 border border-gray-300 cursor-pointer bg-gray-50 focus:outline-none focus:ring-1 focus:ring-green-600/50"
      >
        <span className={`${!value ? "text-gray-400" : "text-gray-900 "}`}>
          {value || placeholder}
        </span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={`lucide lucide-chevron-down transform transition-transform ${
            open ? "rotate-180" : "rotate-0"
          }`}
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </div>
      {open && (
        <div className="absolute top-full left-0 mt-1 w-full max-h-48 overflow-y-auto rounded-lg shadow-md bg-white z-50">
          {options.map((option, index) => (
            <div
              key={index}
              onClick={() => {
                onOptionSelect(option, name);
                setOpen(false);
              }}
              className="p-3 cursor-pointer hover:bg-gray-100 transition-colors"
            >
              {option}
            </div>
          ))}
        </div>
      )}
      <span className="text-xs text-red-600 h-4">{error}</span>
    </div>
  );
};
