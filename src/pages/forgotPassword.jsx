import React, { useState } from "react";
import Input from "../components/input";
import Loader from "../components/loader";
import { toast } from "react-toastify";
import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import { useParams } from "react-router-dom";
import img from "../assets/images/success.png";

const ForgotPassword = () => {
  const loginBg =
    "https://res.cloudinary.com/dzquobiiy/image/upload/v1723102733/login-bg_mjwhg1.svg";
  const logo =
    "https://res.cloudinary.com/dzquobiiy/image/upload/v1723102728/fha-logo-nav_v2xtz0.svg";
  // const { token } = useParams();
  // const navigate = useNavigate();
  const [emailSent, setEmailSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formError, setFormError] = useState({
    email: "",
  });
  const [formData, setFormData] = useState({
    email: "",
    confirm_password: "",
  });
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
    if (value === "") setFormError({ ...formError, [name]: "Required*" });
    // if (name === "email" && value !== formData.password)
    //   setFormError({ ...formError, [name]: "Passwords do not match*" });
    else setFormError({ ...formError, [name]: "" });
  };

  // const formValidation = () => {
  //   const error = {};
  //   if (formData.password === "") error.password = "Required*";
  //   if (formData.confirm_password === "") error.confirm_password = "Required*";
  //   else if (formData.confirm_password !== formData.password)
  //     error.confirm_password = "Password do not match*";
  //   return error;
  // };
  const handleSubmit = () => {
    // if (Object.keys(formValidation()).length > 0) {
    //   setFormError({ ...formError, ...formValidation() });
    // } else {
    setLoading(true);
    axios
      .post(process.env.REACT_APP_BASEURL + "/auth/forgot-password", {
        auth: {
          ...formData,
          // reg_token: token,
        },
      })
      .then((res) => {
        setLoading(false);
        // navigate("/home");
        setEmailSent(true);
        toast.success("Email Sent Successfully");
      })
      .catch((err) => {
        setLoading(false);
        toast.error("Something went wrong, Please try again!");
      });
    // }
  };
  return (
    <div className="w-full flex flex-col items-center justify-center py-[80px] px-[16px] h-screen min-h-[700px]">
      {!emailSent && <img className="w-[150px]" src={logo} alt="" />}
      <div
        className="flex w-full  justify-center items-center"
        style={{
          backgroundImage: `url(${loginBg})`,
          backgroundPosition: "center",
          backgroundSize: "auto",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="max-w-[505px] w-full pt-[40px] pb-[60px] flex flex-col  rounded-[8px] border-[#D5D5D540] justify-center items-center border bg-[#fff]">
          {!emailSent ? (
            <div className="w-full flex items-center gap-[40px] justify-center flex-col">
              <div className="max-w-[378px] flex-col flex gap-[5px] w-full">
                <span className="font-[600] text-center text-[24px] text-[#101828]">
                  Forgot Password
                </span>
                <span className="font-[400] text-center text-[14px] text-[#475467]">
                  Enter the email associated with your account and we'll resend
                  you a link to reset your password
                </span>
              </div>

              <div className="w-full flex flex-col justify-center items-center gap-[40px]">
                <div className="w-full max-w-[378px] justify-center items-center flex flex-col gap-[32px]">
                  <Input
                    label="Email"
                    name="email"
                    value={formData.email}
                    error={formError.email}
                    handleChange={handleChange}
                    placeholder="Enter email"
                  />
                  {/* <PasswordInput
              label="Confirm Password"
              name="confirm_password"
              error={formError.confirm_password}
              value={formData.confirm_password}
              handleChange={handleChange}
              placeholder="Enter password"
            /> */}
                </div>
                <span
                  onClick={handleSubmit}
                  className="bg-[#3D454E] max-w-[378px] flex justify-center items-center cursor-pointer text-center font-[500] text-[14px] text-[#FAFAFA] w-full rounded-[8px] py-[16px] "
                >
                  {loading ? (
                    <Loader size={[20, 20]} color={"#fff"} />
                  ) : (
                    "Send Email"
                  )}
                </span>
              </div>
            </div>
          ) : (
            <div className="flex w-full py-[60px]  bg-[#fff] min-h-[500px] items-center flex-col ">
              <img className="w-[200px]" src={img} alt="" />
              <span className="text-[32px] text-center font-[600] text-[#11B981]">
                Request Successful
              </span>
              <span className="text-center font-[400] text-[20px] text-slate-600">
                You will receive an email containing the next steps.
              </span>
              <span className="h-[40px] flex items-center px-[14px] underline mt-4  text-[#11B981]">
                <a href="https://mail.google.com/mail/u/">Check Your Email</a>
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
