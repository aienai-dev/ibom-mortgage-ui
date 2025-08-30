import { useState } from "react";
import CustomToast from "../common/CustomToast";
import { AlertCircleIcon, CheckCircleIcon } from "../common/Icons";
import { Input, PhoneInput, Dropdown } from "../common/Input";
import Loader from "../common/Loader";
import axiosInstance from "../../api/axios";
import toast from "react-hot-toast";

const InterestForm = () => {
  const [loading, setLoading] = useState(false);
  const [accountCreated, setAccountCreated] = useState(false);
  const [countryCode, setCountryCode] = useState("234");
  const [countryCode_, setCountryCode_] = useState("234");
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState("");

  const [formData, setFormData] = useState({
    first_name: "",
    middle_name: "",
    last_name: "",
    email: "",
    phone_number: "",
    whatsapp_number: "",
    age_range: "",
    employment_status: "",
    gender: "",
  });

  const [formError, setFormError] = useState({
    first_name: "",
    middle_name: "",
    last_name: "",
    email: "",
    phone_number: "",
    whatsapp_number: "",
    age_range: "",
    employment_status: "",
    gender: "",
  });

  const gender = ["Female", "Male"];
  const ageRange = ["18-25", "26-35", "36-45", "46-55", "56-60", "61+"];
  const employmentStatus = [
    "Employed",
    "Self Employed",
    "Unemployed",
    "Retired",
  ];

  const showToast = (message, type) => {
    setToastMessage(message);
    setToastType(type);
  };

  const handleDropdownSelect = (option, name) => {
    setFormData((prevFormData) => ({ ...prevFormData, [name]: option }));
    setFormError({ ...formError, [name]: "" });
  };

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
    if (value === "") {
      setFormError({ ...formError, [name]: "Required*" });
    } else if (name === "email" && !validateEmail(value)) {
      setFormError({ ...formError, [name]: "Invalid Email*" });
    } else {
      setFormError({ ...formError, [name]: "" });
    }
  };
  const handlePhoneInput = (name, value) => {
    setFormData({ ...formData, [name]: value });
    setFormError({ ...formError, [name]: "" });
  };

  const formValidation = () => {
    const error = {};
    if (formData.first_name === "") error.first_name = "Required*";
    if (formData.last_name === "") error.last_name = "Required*";
    if (formData.email === "") error.email = "Required*";
    else if (!validateEmail(formData.email)) error.email = "Invalid email*";
    if (formData.phone_number === "") error.phone_number = "Required*";
    if (formData.phone_number.length !== 10)
      error.phone_number = "Invalid phone number";
    if (formData.age_range === "") error.age_range = "Required*";
    if (formData.employment_status === "")
      error.employment_status = "Required*";
    if (formData.gender === "") error.gender = "Required*";
    if (
      formData.whatsapp_number !== "" &&
      formData.whatsapp_number.length !== 10
    )
      error.whatsapp_number = "Invalid phone number*";
    return error;
  };

  const handleSubmit = async () => {
    const errors = formValidation();
    if (Object.keys(errors).length > 0) {
      setFormError({ ...formError, ...errors });
      showToast("Please fill out all required fields correctly.", "error");
    } else {
      setLoading(true);
      try {
        const res = await axiosInstance.post("/auth/register", {
          user: {
            ...formData,
            email: formData.email.toLowerCase(),
            employment_status: formData.employment_status
              .toLowerCase()
              .replace(" ", "-"),
            gender: formData.gender.toLowerCase(),
            phone_number: countryCode + formData.phone_number,
            whatsapp_number:
              formData.whatsapp_number !== ""
                ? countryCode_ + formData.whatsapp_number
                : formData.whatsapp_number,
          },
        });
        setLoading(false);
        toast.success("Thank you for your interest", "success");

        setAccountCreated(true);
      } catch (err) {
        // console.log(err);
        if (err?.status === 405) {
          console.log(err);
          toast.error(err?.response?.data?.error);

          setLoading(false);
          return;
        }
        setLoading(false);
        showToast("Something went wrong. Please try again later.", "error");
      }
    }
  };

  return (
    <div className="w-full px-5 flex items-center pt-24 pb-32 justify-center">
      <div className="max-w-3xl w-full rounded-3xl sm:border border-gray-200 shadow-xl">
        {!accountCreated ? (
          <div className="w-full bg-white rounded-3xl flex flex-col gap-6 items-center sm:p-10 p-5 justify-center">
            <div className="w-full flex flex-col gap-8 max-w-2xl">
              <div className="flex flex-col">
                <span className="font-semibold text-2xl text-center md:text-left text-gray-900">
                  Expression of Interest
                </span>
                <span className="text-sm text-center md:text-left text-gray-600 mt-1">
                  Start the process of getting early access to IBOM MORTGAGEs.
                </span>
              </div>
              <div className="grid sm:grid-cols-3 gap-5 w-full">
                <Input
                  label="First Name"
                  name="first_name"
                  value={formData.first_name}
                  handleChange={handleChange}
                  placeholder="e.g. John"
                  required={true}
                  error={formError.first_name}
                />
                <Input
                  label="Middle Name"
                  name="middle_name"
                  value={formData.middle_name}
                  handleChange={handleChange}
                  placeholder="e.g. Blue"
                />
                <Input
                  label="Surname"
                  name="last_name"
                  value={formData.last_name}
                  handleChange={handleChange}
                  placeholder="e.g. Doe"
                  required={true}
                  error={formError.last_name}
                />
              </div>

              <div className="grid sm:grid-cols-2 gap-5 w-full">
                <Input
                  label="Email Address"
                  name="email"
                  type="email"
                  value={formData.email}
                  handleChange={handleChange}
                  placeholder="example@gmail.com"
                  required={true}
                  error={formError.email}
                />
                <PhoneInput
                  label="Phone Number"
                  name="phone_number"
                  value={formData.phone_number}
                  handleChange={(e) => handlePhoneInput("phone_number", e)}
                  error={formError.phone_number}
                  placeholder="Enter Phone Number"
                  required={true}
                  countryCode={countryCode}
                  setCountryCode={setCountryCode}
                />
              </div>

              <div className="grid sm:grid-cols-2 gap-5 w-full">
                <PhoneInput
                  label="Whatsapp Number"
                  name="whatsapp_number"
                  value={formData.whatsapp_number}
                  error={formError.whatsapp_number}
                  placeholder="Enter Phone Number"
                  handleChange={(e) => handlePhoneInput("whatsapp_number", e)}
                  countryCode={countryCode_}
                  setCountryCode={setCountryCode_}
                />
                <Dropdown
                  label="Gender"
                  name="gender"
                  options={gender}
                  value={formData.gender}
                  onOptionSelect={handleDropdownSelect}
                  error={formError.gender}
                  required={true}
                  placeholder="Select Gender"
                />
              </div>

              <div className="grid sm:grid-cols-2 gap-5 w-full">
                <Dropdown
                  label="Age range"
                  name="age_range"
                  options={ageRange}
                  value={formData.age_range}
                  onOptionSelect={handleDropdownSelect}
                  error={formError.age_range}
                  required={true}
                  placeholder="Select Age Range"
                />
                <Dropdown
                  label="Employment Status"
                  name="employment_status"
                  options={employmentStatus}
                  value={formData.employment_status}
                  onOptionSelect={handleDropdownSelect}
                  error={formError.employment_status}
                  required={true}
                  placeholder="Select Employment Status"
                />
              </div>
            </div>

            <div className="max-w-2xl w-full flex flex-col gap-8">
              <div className="w-full items-start bg-gray-100 py-4 px-6 flex gap-2 rounded-lg text-gray-600 text-sm">
                <AlertCircleIcon className="flex-shrink-0 mt-0.5 w-4 h-4" />
                <span>
                  An email to confirm submission will be sent to the email
                  provided within 24 hours.
                </span>
              </div>
              <div className="w-full flex justify-end">
                <button
                  onClick={handleSubmit}
                  className="w-full py-4 text-base font-medium rounded-lg text-white bg-gray-900 hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:pointer-events-none"
                  disabled={loading}
                >
                  {loading ? <Loader /> : "Submit"}
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex w-full py-16 bg-white min-h-[500px] items-center flex-col justify-center">
            <CheckCircleIcon
              size={100}
              className="text-green-500 animate-in fade-in zoom-in w-24 h-24"
            />
            <span className="text-3xl text-center font-semibold text-green-600 mt-4">
              Registration Successful
            </span>
            <span className="text-center font-normal text-lg text-gray-600 mt-2">
              You will receive an email containing the next steps.
            </span>
            <a
              href="https://mail.google.com/mail/u/"
              className="h-10 flex items-center px-4 underline mt-4 text-green-600 hover:text-green-700 transition-colors"
            >
              Check Your Email
            </a>
          </div>
        )}
      </div>
      <CustomToast message={toastMessage} type={toastType} />
    </div>
  );
};

export default InterestForm;
