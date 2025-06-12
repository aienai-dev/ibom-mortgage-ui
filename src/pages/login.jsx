import React, { useState } from "react";
import Input, { PasswordInput } from "../components/input";
import Loader from "../components/loader";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const loginBg =
    "https://res.cloudinary.com/dzquobiiy/image/upload/v1723102733/login-bg_mjwhg1.svg";
  const logo =
    "https://res.cloudinary.com/dzquobiiy/image/upload/v1723102728/fha-logo-nav_v2xtz0.svg";
  // const { token } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formError, setFormError] = useState({
    email: "",
    password: "",
  });
  const [formData, setFormData] = useState({
    email: "",
    password: "",
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
  const forgotPassword = () => {
    navigate("/forgot-password");
  };
  const register = () => {
    navigate("/interest-form");
  };
  const handleSubmit = () => {
    // if (Object.keys(formValidation()).length > 0) {
    //   setFormError({ ...formError, ...formValidation() });
    // } else {
    // console.log(formData)
    setLoading(true);
    axios
      .post(process.env.REACT_APP_BASEURL + "/auth/login", {
        ...formData,
      })
      .then((res) => {
        setLoading(false);
        localStorage.setItem("access_token", res.data.data.access_token);
        localStorage.setItem("user", JSON.stringify(res.data.data.user));
        navigate("/dashboard");
        toast.success("Login Successful");
      })
      .catch((err) => {
        if (err.response.status === 401) {
          toast.error("Invalid Email or Password!");
          setLoading(false);
          return;
        }
        toast.error("Something went wrong, Please try again!");
        setLoading(false);
      });
    // }
  };
  return (
    <div className="w-full flex flex-col items-center justify-center py-[80px] px-[16px] h-screen min-h-[700px]">
      <img className="w-[150px]" src={logo} alt="" />
      <div
        className="flex w-full  justify-center items-center"
        style={{
          backgroundImage: `url(${loginBg})`,
          backgroundPosition: "center",
          backgroundSize: "auto",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="max-w-[505px] w-full pt-[40px] pb-[60px] flex flex-col gap-[40px] rounded-[8px] border-[#D5D5D540] justify-center items-center sm:border bg-[#fff]">
          <div className="max-w-[378px] flex-col flex gap-[5px] w-full">
            <span className="font-[600] text-center text-[24px] text-[#101828]">
              Login to your Account
            </span>
            <span className="font-[400] text-center text-[14px] text-[#475467]">
              Please login with your credentials
            </span>
          </div>

          <div className="w-full flex flex-col justify-center items-center">
            <div className="w-full max-w-[378px] justify-center items-center flex flex-col gap-[32px]">
              <Input
                label="Email"
                name="email"
                value={formData.email}
                error={formError.email}
                handleChange={handleChange}
                placeholder="Enter email"
              />
              <div className="flex w-full flex-col">
                <PasswordInput
                  label="Password"
                  name="password"
                  value={formData.password}
                  error={formError.password}
                  handleChange={handleChange}
                  placeholder="Enter password"
                />
                <span
                  onClick={forgotPassword}
                  className="text-right text-[16px] cursor-pointer font-[500] text-[#475467]"
                >
                  Forgot password
                </span>
              </div>
            </div>
            <div className="w-full flex flex-col gap-[30px] sm:px-[20px] items-center justify-center">
              <span
                onClick={handleSubmit}
                className="bg-[#3D454E] max-w-[378px] mt-[10px] flex justify-center items-center cursor-pointer text-center font-[500] text-[14px] text-[#FAFAFA] w-full rounded-[8px] py-[16px] "
              >
                {loading ? <Loader size={[20, 20]} color={"#fff"} /> : "Login"}
              </span>
              <div className="flex flex-col gap-[5px] w-full max-w-[378px]">
                <span className="text-right text-[16px] font-[400] text-[#475467]">
                  Don't have an account?{" "}
                  <span
                    onClick={register}
                    className="font-[500] cursor-pointer"
                  >
                    Register
                  </span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
