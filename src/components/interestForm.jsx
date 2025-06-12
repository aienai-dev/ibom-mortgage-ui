import React, { useState } from "react";
import Dropdown from "../components/dropdown";
import Input, { PhoneInput } from "../components/input";
import { toast } from "react-toastify";
import axios from "axios";
import Loader from "./loader";
import { stale_form_data } from "../constants/static";
import img from "../assets/images/success.png";
import infoCircle from "../assets/icons/info-circle.svg";

const InterestForm = () => {
  const loginBg =
    "https://res.cloudinary.com/dzquobiiy/image/upload/v1723102733/login-bg_mjwhg1.svg";
  // const [selectedOption, setOption] = useState("");
  const { background, lagosOutline, formBackground } = stale_form_data;
  const [loading, setLoading] = useState(false);

  const [accountCreated, setAccountCreated] = useState(false);
  // const [token, setToken] = useState("");
  const gender = ["Female", "Male"];
  const ageRange = ["18-25", "26-35", "36-45", "46-55", "56-60", "61+"];
  const employmentStatus = [
    "Employed",
    "Self Employed",
    "Unemployed",
    "Retired",
  ];
  const [countryCode, setCountryCode] = useState("234");
  const [countryCode_, setCountryCode_] = useState("234");
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

  const handleDropdownSelect = (option, name) => {
    setFormData((prevFormData) => ({ ...prevFormData, [name]: option }));
    setFormError({ ...formError, [name]: "" });
  };

  // const handlePhone = (e) => {
  //   setFormData({ ...formData, phone_number: e });
  //   if (e)
  //     setFormError({
  //       ...formError,
  //       phone_number: "Required*",
  //     });
  //   else setFormError({ ...formError, phone_number: "" });
  // };

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    if (value === "")
      setFormError({
        ...formError,
        [name]: "Required*",
      });
    else if (name === "email" && !validateEmail(value))
      setFormError({
        ...formError,
        [name]: "Invalid Email*",
      });
    else
      setFormError({
        ...formError,
        [name]: "",
      });
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

  const handleSubmit = () => {
    if (Object.keys(formValidation()).length > 0) {
      setFormError({ ...formError, ...formValidation() });
    } else {
      setLoading(true);

      axios
        .post(process.env.REACT_APP_BASEURL + "/auth/register", {
          user: {
            ...formData,
            phone_number: countryCode + formData.phone_number,
            whatsapp_number:
              formData.whatsapp_number !== ""
                ? countryCode_ + formData.phone_number
                : formData.whatsapp_number,
          },
        })
        .then((res) => {
          setLoading(false);
          setAccountCreated(true);
          toast.success();
        })

        .catch((err) => {
          if (err.response.data.status === 405) {
            toast.error(err.response.data.error);
            setLoading(false);
            return;
          } else {
            toast.error("Something went wrong");
          }
          setLoading(false);
        });
    }
  };
  return (
    <div
      style={{
        backgroundImage: `url(${loginBg})`,
        backgroundPosition: "bottom",
        backgroundSize: "auto",
        backgroundRepeat: "no-repeat",
        width: "100%",
      }}
      className="w-full px-[20px] flex items-center pt-[100px] pb-[130px] justify-center"
    >
      <div className="max-w-[820px] rounded-[32px] sm:border w-full">
        {!accountCreated ? (
          <div
            style={{
              backgroundImage: `url(${formBackground})`,
              backgroundPosition: "center",
              backgroundSize: "auto",
              backgroundRepeat: "no-repeat",
              width: "100%",
              height: "100%",
            }}
            className="w-full bg-[#fff] rounded-[32px] flex flex-col gap-[24px] items-center sm:p-[40px] justify-center"
          >
            <div className="w-full flex flex-col gap-[32px] max-w-[760px]">
              <div className="flex flex-col">
                <span className="font-[600] text-center md:text-left text-[24px] text-[#101828]">
                  Expression of Interest
                </span>
                <span className="text-[14px] text-center md:text-left font-[400] text-[#475467]">
                  Start the process of getting early access to IBOM MORTGAGEs.
                </span>
              </div>
              <div className="sm:grid flex flex-col w-full sm:grid-cols-3 items-center gap-[20px]">
                <Input
                  label="First Name"
                  type="text"
                  name="first_name"
                  error={formError.first_name}
                  value={formData.first_name}
                  handleChange={handleChange}
                  required={true}
                  placeholder={"e.g John"}
                />
                <Input
                  label="Middle Name"
                  type="text"
                  name="middle_name"
                  value={formData.middle_name}
                  handleChange={handleChange}
                  placeholder={"e.g Blue"}
                />
                <Input
                  label="Surname"
                  type="text"
                  name="last_name"
                  error={formError.last_name}
                  value={formData.last_name}
                  handleChange={handleChange}
                  required={true}
                  placeholder={"e.g Doe"}
                />
              </div>
              <div className="sm:grid flex flex-col sm:grid-cols-2 w-full items-center gap-[20px]">
                <Input
                  label="Email Address"
                  type="email"
                  name="email"
                  error={formError.email}
                  value={formData.email}
                  handleChange={handleChange}
                  required={true}
                  placeholder={"example@gmail.com"}
                />
                <PhoneInput
                  label="Phone Number"
                  type="text"
                  error={formError.phone_number}
                  name="phone_number"
                  value={formData.phone_number}
                  required={true}
                  handleChange={handleChange}
                  countryCode={countryCode}
                  setCountryCode={setCountryCode}
                  placeholder={"Enter Phone Number"}
                />
              </div>
              <div className="sm:grid flex flex-col sm:grid-cols-2 w-full items-center gap-[20px]">
                <PhoneInput
                  label="Whatsapp Number"
                  type="text"
                  error={formError.whatsapp_number}
                  name="whatsapp_number"
                  value={formData.whatsapp_number}
                  handleChange={handleChange}
                  countryCode={countryCode_}
                  setCountryCode={setCountryCode_}
                  placeholder={"Enter Phone Number"}
                />
                <Dropdown
                  label="Gender"
                  isRequired={true}
                  placeholder="Choose an option"
                  name="gender"
                  error={formError.gender}
                  options={gender}
                  value={formData.gender}
                  onOptionSelect={(value, name) =>
                    handleDropdownSelect(value, name)
                  }
                />
              </div>
              <div className="sm:grid flex flex-col sm:grid-cols-2 w-full items-center gap-[20px]">
                <Dropdown
                  label="Age range"
                  isRequired={true}
                  placeholder="Choose an option"
                  name="age_range"
                  error={formError.age_range}
                  options={ageRange}
                  value={formData.age_range}
                  onOptionSelect={(value, name) =>
                    handleDropdownSelect(value, name)
                  }
                />
                <Dropdown
                  label="Employment Status"
                  isRequired={true}
                  error={formError.employment_status}
                  placeholder="Choose an option"
                  options={employmentStatus}
                  value={formData.employment_status}
                  name="employment_status"
                  onOptionSelect={(value, name) =>
                    handleDropdownSelect(value, name)
                  }
                />
              </div>
            </div>
            <div className="max-w-[760px] w-full flex flex-col gap-[50px]">
              <div className="w-full items-start bg-[#91989320] py-[17px] px-[24px] flex gap-[8px] rounded-[8px]">
                <img src={infoCircle} alt="" />
                <span>
                  An email to confirm submission will be sent to the email
                  provided within 24hours
                </span>
              </div>
              <div className="w-full flex justify-end">
                <span
                  onClick={handleSubmit}
                  className="bg-[#3D454E] cursor-pointer flex justify-center items-center text-center font-[500] text-[14px] text-[#FAFAFA] w-full rounded-[8px] py-[16px] "
                >
                  {loading ? (
                    <Loader size={[20, 20]} color={"#fff"} />
                  ) : (
                    "Submit"
                  )}
                </span>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex w-full py-[60px]  bg-[#fff] min-h-[500px] items-center flex-col ">
            <img className="w-[200px]" src={img} alt="" />
            <span className="text-[32px] text-center font-[600] text-[#11B981]">
              Registration Successful
            </span>
            <span className="text-center font-[400] text-[20px] text-slate-600">
              You will receive an email containing the next steps
            </span>
            <span className="h-[40px] flex items-center px-[14px] underline mt-4  text-[#11B981]">
              <a href="https://mail.google.com/mail/u/">Check Your Email</a>
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default InterestForm;
