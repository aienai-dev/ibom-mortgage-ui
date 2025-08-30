import React, { useEffect, useState } from "react";
import { PasswordInput } from "../components/input";
import Loader from "../components/loader";
import { toast } from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import logo from "../assets/images/logo.svg";
import Nav from "../components/new/Nav";
import Footer from "../components/new/Footer";
import axiosInstance from "../api/axios";

const CreatePassword = () => {
  const loginBg =
    "https://res.cloudinary.com/dzquobiiy/image/upload/v1723102733/login-bg_mjwhg1.svg";

  const check =
    "https://res.cloudinary.com/dzquobiiy/image/upload/v1723229957/black-check_pj9sun.svg";
  const { token } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formError, setFormError] = useState({
    password: "",
    confirm_password: "",
  });
  const [formData, setFormData] = useState({
    password: "",
    confirm_password: "",
  });

  const [passwordConditions, setPasswordConditions] = useState({
    length: false,
    uppercase: false,
    lowercase: false,
    // number: false,
    specialChar: false,
  });
  const isPasswordStrong = Object.values(passwordConditions).every(Boolean);
  const checkPasswordStrength = (password) => {
    return {
      length: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      // number: /[0-9]/.test(password),
      specialChar: /[^a-zA-Z0-9]/.test(password),
    };
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
    if (name === "password") {
      const conditions = checkPasswordStrength(value);

      setPasswordConditions(conditions);
    }
    if (value === "") setFormError({ ...formError, [name]: "Required*" });
    if (name === "confirm_password" && value !== formData.password)
      setFormError({ ...formError, [name]: "Passwords do not match*" });
    else setFormError({ ...formError, [name]: "" });
  };

  const formValidation = () => {
    const error = {};
    if (formData.password === "") error.password = "Required*";
    if (formData.confirm_password === "") error.confirm_password = "Required*";
    if (!isPasswordStrong) error.password = "Password not strong*";
    else if (formData.confirm_password !== formData.password)
      error.confirm_password = "Password do not match*";
    return error;
  };
  const handleSubmit = async () => {
    if (Object.keys(formValidation()).length > 0) {
      setFormError({ ...formError, ...formValidation() });
    } else {
      setLoading(true);
      try {
        await axiosInstance.post("/auth/create-password", {
          auth: {
            ...formData,
            reg_token: token,
          },
        });

        setLoading(false);
        navigate("/login");
        toast.success("Password  Created Successfully");
      } catch (err) {
        console.log(err);
        setLoading(false);
        toast.error("Something went wrong, Please try again!");
      }
    }
  };
  useEffect(() => {
    localStorage.clear();
  }, []);
  return (
    <div className="bg-dark-bg min-h-screen">
      <Nav />
      <div className="w-full  bg-[#fff]">
        <div
          className="flex w-full  justify-center items-center"
          style={{
            backgroundImage: `url(${loginBg})`,
            backgroundPosition: "center",
            backgroundSize: "auto",
            backgroundRepeat: "no-repeat",
          }}
        >
          <div className="max-w-[505px] w-full pt-[40px] pb-[60px] flex flex-col gap-[40px] rounded-[8px] border-[#D5D5D540] justify-center items-center border bg-[#fff]">
            <div className="max-w-[378px] flex-col flex gap-[5px] w-full">
              <span className="font-[600] text-center center text-[24px] text-[#101828]">
                Create Password
              </span>
              <span className="font-[400] text-center text-[14px] text-[#475467]">
                Please create a secure password
              </span>
            </div>

            <div className="w-full flex flex-col justify-center items-center gap-[16px]">
              <div className="w-full max-w-[378px] justify-center items-center flex flex-col gap-[16px]">
                <PasswordInput
                  label="New Password"
                  name="password"
                  value={formData.password}
                  error={formError.password}
                  handleChange={handleChange}
                  placeholder="Enter password"
                />
                <PasswordInput
                  label="Confirm Password"
                  name="confirm_password"
                  error={formError.confirm_password}
                  value={formData.confirm_password}
                  handleChange={handleChange}
                  placeholder="Enter password"
                />
              </div>
              <div className="w-full justify-center items-center flex flex-col gap-[50px]">
                <div className="flex max-w-[378px] w-full flex-col gap-[4px]">
                  <div
                    className={`flex items-center gap-[5px] ${
                      passwordConditions.length ? "opacity-100" : "opacity-50"
                    }`}
                  >
                    <img src={check} alt="" />
                    <span className="font-[400] text-[12px] text-[#030812]">
                      Password must be at least 8 characters long
                    </span>
                  </div>
                  <div
                    className={`flex items-center gap-[5px] ${
                      passwordConditions.uppercase
                        ? "opacity-100"
                        : "opacity-50"
                    }`}
                  >
                    <img src={check} alt="" />
                    <span className="font-[400] text-[12px] text-[#030812]">
                      Must contain at least one uppercase character
                    </span>
                  </div>
                  <div
                    className={`flex items-center gap-[5px] ${
                      passwordConditions.specialChar
                        ? "opacity-100"
                        : "opacity-50"
                    }`}
                  >
                    <img src={check} alt="" />
                    <span className="font-[400] text-[12px] text-[#030812]">
                      Must contain at least one special character
                    </span>
                  </div>
                  <div
                    className={`flex items-center gap-[5px] ${
                      passwordConditions.lowercase
                        ? "opacity-100"
                        : "opacity-50"
                    }`}
                  >
                    <img src={check} alt="" />
                    <span className="font-[400] text-[12px] text-[#030812]">
                      Must contain at least one lowecase character
                    </span>
                  </div>
                </div>
                <span
                  onClick={handleSubmit}
                  className="bg-[#3D454E] max-w-[378px] flex justify-center items-center cursor-pointer text-center font-[500] text-[14px] text-[#FAFAFA] w-full rounded-[8px] py-[16px] "
                >
                  {loading ? (
                    <Loader size={[20, 20]} color={"#fff"} />
                  ) : (
                    "Create Password"
                  )}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CreatePassword;
