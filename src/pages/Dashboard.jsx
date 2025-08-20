import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Navbar from "../components/navbar";
import axios from "axios";
import ApplicationItem from "../components/ApplicationItem";
import ApplicationForm from "../components/forms/ApplicationForm";

const Dashboard = () => {
  const tabs = ["Dashboard", "My Application", "My Profile"];
  const [activeTab, SetActiveTab] = useState("Dashboard");
  const [formLoading, setFormLoading] = useState(false);

  const user = localStorage.user ? JSON.parse(localStorage.user) : {};

  const [activeCompliance, setActiveCompliance] = useState(false);

  const [isApplicationOpen, setApplicationOpen] = useState(false);

  const navigate = useNavigate();
  const getCompliance = () => {
    setFormLoading(true);
    axios
      .get(
        "https://ibom-mortgage-api.fly.dev" + `/users/${user._id}/compliance`,
        {
          headers: { Authorization: `Bearer ${localStorage.access_token}` },
        }
      )
      .then((res) => {
        setFormLoading(false);
        setActiveCompliance(true);
        localStorage.setItem(
          "compliance",
          JSON.stringify(res.data.data.compliance)
          // setUserEdit(true),
        );
      })
      .catch((err) => {
        // console.log(err);
        if (err?.response?.data?.status === 401) {
          toast.error("Session timeout!");
          navigate("/login");
        } else if (err.response.data.status === 404) setActiveCompliance(false);
        else {
          toast.error("Something went wrong");
        }
        setFormLoading(false);
      });
    // }
  };

  useEffect(() => {
    if (!localStorage.access_token) navigate("/login");
    else getCompliance();
    // eslint-disable-next-line
  }, []);

  return (
    <div className="w-full flex flex-col gap-[81px] justify-center items-center">
      <Navbar />

      <div className="w-full flex justify-center items-center">
        <div className="w-full flex flex-col items-center justify-center gap-[40px] max-w-[840px]">
          {/* <div className="border-b pb-[8px] w-full">
              {tabs.map((tab, index) => (
                <span
                  onClick={() => SetActiveTab(tab)}
                  key={index}
                  className={`px-[16px] py-[8px] cursor-pointer font-[500] text-[14px] ${
                    activeTab === tab
                      ? "bg-[#F1FFF6] text-[#338330] border-b-[3px] border-[#338330]"
                      : "border-none text-[#3D454E]"
                  }`}
                >
                  {tab}
                </span>
              ))}
            </div> */}
          <div className="w-full">
            <div className="w-full pb-[40px] flex flex-col gap-[50px]">
              <div className="flex items-center flex-col px-[20px] gap-[5px]">
                <span className="text-center font-[600] text-[36px] text-[#030812]">
                  Welcome, {user?.first_name}
                </span>
                <span className="text-center text-[14px] font-[400] text-[#3D454E]">
                  {activeCompliance
                    ? "You can now explore your dashboard to review your details and manage your application."
                    : "Sorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis."}
                </span>
              </div>
              {activeCompliance ? (
                <div className="max-w-[840px] flex flex-col gap-[16px] w-full">
                  <div className="flex items-center gap-[16px]">
                    <div className="w-[12px] border-[0.5px] border-[#E6E6E6]"></div>
                    <span>Applications</span>
                    <div className="w-full border-[0.5px] border-[#E6E6E6]"></div>
                  </div>
                  <ApplicationItem />
                </div>
              ) : (
                <div className="flex flex-col w-full gap-[32px]">
                  <div className="flex gap-[16px] items-center">
                    <div className="w-full border-[0.5px] border-[#E6E6E6]"></div>
                    <span className="whitespace-nowrap text-[16px] font-[400] text-[#030812]">
                      Take the next step
                    </span>
                    <div className="w-full border-[0.5px] border-[#E6E6E6]"></div>
                  </div>

                  {isApplicationOpen ? (
                    <div className="w-full flex  flex-col items-center gap-[32px]">
                      <div className="flex flex-col items-center gap-[16px]">
                        <span className="font-[600] text-[24px] text-center text-[#030812]">
                          Become a home Owner Today!
                        </span>
                        <span className="font-[400] text-[14px] max-w-[520px] text-center text-[#3D454E]">
                          Ready to find the ideal home? Click below to start the
                          application process and take the first step towards
                          ownership.
                        </span>
                      </div>
                      <span
                        onClick={() => setApplicationOpen(true)}
                        className="bg-[#3D454E] cursor-pointer flex justify-center items-center sm:max-w-[295px] text-center font-[500] text-[14px] text-[#FAFAFA] w-full rounded-[8px] py-[16px] "
                      >
                        Start Application Process
                      </span>
                    </div>
                  ) : (
                    <ApplicationForm
                      onSubmit={() => setActiveCompliance(true)}
                    />
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* {isApplicationOpen && (
        <div className="w-full flex justify-center items-center">
          <div
            id="applicationForm"
            className="w-full px-[20px] flex flex-col max-w-[840px] items-center justify-center gap-[33px]"
          >
            <div
              onClick={() => setApplicationOpen(false)}
              className="flex cursor-pointer items-center gap-[4px] w-full"
            >
              <img src={leftArrow} alt="" />
              <span className="text-[16px] font-[400] text-[#475467]">
                Dashboard /{" "}
                <span className="font-[500] text-[16px] text-[#338330]">
                  Application
                </span>
              </span>
            </div>
            {!formSubmitted && (
              <div className="w-full max-w-[840px] flex flex-col px-[10px] justify-center items-center gap-[32px] pb-[64px] border-[#D5D5D540]">
                <div className="flex items-center justify-between w-full">
                  <div className="flex w-full max-w-[680px] flex-col gap-[16px]">
                    <span className="font-[600] text-[28px] text-[#030812]">
                      {currentStep.name}
                    </span>
                    <span className="font-[400] text-[14px] text-[#475467]">
                      {currentStep.description}
                    </span>
                  </div>
                  <div className="flex gap-[8px] sm:gap-[16px] items-center">
                    {stepPages.map((page, index) => (
                      <div
                        key={index}
                        className={`w-[8px] h-[8px] rounded-[8px] gap-[8px] ${
                          step === page.step ? "bg-[#338330]" : "bg-[#F3F3F8]"
                        }`}
                      ></div>
                    ))}
                    <span className="font-[400] text-[18px] text-[#475467]">
                      {step}/{stepPages.length}
                    </span>
                  </div>
                </div>

                <div className="w-full max-w-[840px]">
                  {step === 1 && (
                    <ApplicationForm1
                      form1={form1}
                      handleChange={handleChange}
                      formErrors={formErrors}
                      FileUpload={FileUpload}
                      handleDropdownSelect={handleDropdownSelect}
                      handleDateChange={handleDateChange}
                      handleFileSelect={handleFileSelect}
                      nextStep={nextStep}
                      file={identity}
                      setFormErrors={setFormErrors}
                    />
                  )}
                  {step === 2 && (
                    <ApplicationForm2
                      form2={form2}
                      handleChange={handleChange}
                      formErrors={formErrors}
                      handleDropdownSelect={handleDropdownSelect}
                      handleDateChange={handleDateChange}
                      handleFileSelect={handleFileSelect}
                      nextStep={nextStep}
                      previousStep={previousStep}
                      setFormErrors={setFormErrors}
                    />
                  )}
                  {step === 3 && (
                    <ApplicationForm3
                      form3={form3}
                      handleChange={handleChange}
                      formErrors={formErrors}
                      handleDropdownSelect={handleDropdownSelect}
                      handleDateChange={handleDateChange}
                      handleFileSelect={handleFileSelect}
                      nextStep={nextStep}
                      previousStep={previousStep}
                      setFormErrors={setFormErrors}
                      handleSubmit={handleSubmit}
                      loading={loading}
                      file={income}
                    />
                  )}
                </div>
              </div>
            )}
            {formSubmitted && (
              <div className="w-full flex flex-col mt-[32px] items-center justify-center gap-[56px]">
                <div className="flex flex-col gap-[16px] items-center justify-center">
                  <img
                    className="max-w-[150px] w-full mah-h-[150px] h-full"
                    src={check}
                    alt=""
                  />
                  <span className="font-[400] text-[24px] text-[#030812]">
                    Your application has been submitted!
                  </span>
                  <span className="text-[14px] font-[400] text-[#3D454E]">
                    Thank you for completing your application. We’ll notify you
                    once it has been reviewed and guide you through the next
                    steps.
                  </span>
                </div>
                <span
                  onClick={() => setApplicationOpen(false)}
                  className="bg-[#3D454E] cursor-pointer flex justify-center items-center sm:max-w-[295px] text-center font-[500] text-[14px] text-[#FAFAFA] w-full rounded-[8px] py-[16px] "
                >
                  Back To Dashboard
                </span>
              </div>
            )}
          </div>
        </div>
      )} */}
    </div>
  );
};

export default Dashboard;
