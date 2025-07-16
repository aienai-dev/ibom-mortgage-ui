import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Navbar from "../components/navbar";
import axios from "axios";
import moment from "moment";
import FileUpload from "../components/fileUpload";
import ApplicationForm1 from "../components/ApplicationForm1";
import ApplicationForm2 from "../components/ApplicationForm2";
import ApplicationForm3 from "../components/ApplicationForm3";
import { application_stale_data } from "../constants/static";
import ApplicationItem from "../components/ApplicationItem";

const Dashboard = () => {
  // const complianceData = localStorage.user
  // ? JSON.parse(localStorage.compliance)
  // : {};
  const { stepPages } = application_stale_data;
  const img1 =
    "https://res.cloudinary.com/dzquobiiy/image/upload/v1724093529/dashboard1_o4nten.svg";
  const leftArrow =
    "https://res.cloudinary.com/dzquobiiy/image/upload/v1724147665/left-arrow_bwmc58.svg";
  const check =
    "https://res.cloudinary.com/dzquobiiy/image/upload/v1724149938/check_jmxfe9.svg";
  // const navItems = [
  //   { name: "Expression of Interest" },
  //   { name: "Our Purpose" },
  //   { name: "FAQs" },
  //   { name: "Contact Us" },
  // ];
  const tabs = ["Dashboard", "My Application", "My Profile"];
  const [activeTab, SetActiveTab] = useState("Dashboard");
  const [formLoading, setFormLoading] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);

  const [loading, setLoading] = useState(false);
  const user = localStorage.user ? JSON.parse(localStorage.user) : {};

  const [activeCompliance, setActiveCompliance] = useState(false);

  const [isApplicationOpen, setApplicationOpen] = useState(false);

  const [identity, setIdentity] = useState(null);

  const [income, setIncome] = useState(null);
  const [step, setStep] = useState(1);

  const [userEdit, setUserEdit] = useState(false);

  const [form1, setForm1] = useState({
    date_of_birth: "",
    marital_status: "",
    // address: {
    state: "",
    city: "",
    street: "",
    //  },
    // home_address: {
    state_of_origin: "",
    lga: "",
    //  },
    // user_identity: {
    identity_type: "",
    identity_number: "",
    identity_image: "",
    // },
  });

  const [form2, setForm2] = useState({
    preferred_state: "",
    preferred_city: "",
    preferred_area: "",
    type_of_housing: "",
    no_of_bedrooms: 0,
    housing_purpose: "",
    budget: "",
    customer_preference_feedback: "",
  });

  const [form3, setForm3] = useState({
    employment_status: "",
    occupation: "",
    monthly_income: "",
    source_of_income: "",
    // loans_and_mortgage: {
    out_standing: "",
    loan_type: "",
    loan_amount: "",
    // },
    proof_of_income: "",
  });

  const [formErrors, setFormErrors] = useState({
    date_of_birth: "",
    marital_status: "",
    state: "",
    city: "",
    street: "",
    state_of_origin: "",
    lga: "",
    identity_type: "",
    identity_number: "",
    identity_image: "",
    preferred_state: "",
    preferred_city: "",
    type_of_housing: "",
    no_of_bedrooms: "",
    housing_purpose: "",
    budget: "",
    preferred_area: "",
    customer_preference_feedback: "",
    employment_status: "",
    occupation: "",
    monthly_income: "",
    source_of_income: "",
    out_standing: false,
    loan_type: "",
    loan_amount: "",
    proof_of_income: "",
  });

  const handleFileSelect = (file, type) => {
    if (type === "identity") {
      setIdentity(file);
      setFormErrors({ ...formErrors, identity_image: "" });
    } else {
      setIncome(file);
      setFormErrors({ ...formErrors, proof_of_income: "" });
    }
  };

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const handleDateChange = (newDate, name, type) => {
    const date = moment(newDate.d).format("l");
    if (type === "form1") setForm1({ ...form1, [name]: date });
    if (type === "form2") setForm2({ ...form2, [name]: date });
    if (type === "form3") setForm3({ ...form2, [name]: date });
    setFormErrors({ ...formErrors, [name]: "" });
  };
  const handleDropdownSelect = (option, name, type) => {
    console.log(option, name);
    if (type === "form1") {
      setForm1({ ...form1, [name]: option });
    } else if (type === "form2") setForm2({ ...form2, [name]: option });
    else if (type === "form3") setForm3({ ...form3, [name]: option });

    setFormErrors({ ...formErrors, [name]: "" });
  };
  const handleChange = (event, formType) => {
    const { name, value } = event.target;
    if (formType === "form1") setForm1({ ...form1, [name]: value });
    if (formType === "form2") setForm2({ ...form2, [name]: value });
    if (formType === "form3") setForm3({ ...form3, [name]: value });
    if (
      value === "" &&
      name !== "preferred_area" &&
      name !== "customer_preference_feedback"
    ) {
      if (
        form3.out_standing === "Yes" &&
        (name === "loan_type" || name === "loan_amount")
      )
        setFormErrors({ ...formErrors, [name]: "Required*" });
      else if (
        form3.out_standing === "No" &&
        (name === "loan_type" || name === "loan_amount")
      )
        setFormErrors({ ...formErrors, [name]: "" });
      else setFormErrors({ ...formErrors, [name]: "Required*" });
    } else if (name === "email" && !validateEmail(value))
      setFormErrors({ ...setFormErrors, [name]: "Invalid Email*" });
    else setFormErrors({ ...formErrors, [name]: "" });
  };
  const uploadDocs = async (id) => {
    const formData1 = new FormData();
    const formData2 = new FormData();
    try {
      formData1.append("image", identity);
      formData2.append("image", income);
      await axios.post(
        "https://ibom-mortgage-api.fly.dev" + +`/users/${id}/identity`,
        formData1,
        { headers: { Authorization: "Bearer " + localStorage.access_token } }
      );
      await axios.post(
        "https://ibom-mortgage-api.fly.dev" + +`/users/${id}/identity`,
        formData2,
        { headers: { Authorization: "Bearer " + localStorage.access_token } }
      );
      toast.success("Application Received");
      setLoading(false);
      setActiveCompliance(true);
    } catch (err) {
      toast.success("Application Received");
      setLoading(false);
      setActiveCompliance(true);
    }
  };

  const currentStep = stepPages.find((page) => page.step === step);

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
  const editCompliance = () => {
    setUserEdit(true);
  };
  const nextStep = (step_) => {
    setStep(step_);
  };

  const previousStep = (step_) => {
    setStep(step_);
  };
  useEffect(() => {
    if (!localStorage.access_token) navigate("/login");
    else getCompliance();
    // eslint-disable-next-line
  }, []);
  const logout = () => {
    localStorage.clear();
    navigate("/");
  };
  const handleSubmit = async () => {
    setLoading(true);
    try {
      const res = await axios.post(
        "https://ibom-mortgage-api.fly.dev" + `/users/${user._id}/compliance`,
        {
          personal_details: {
            date_of_birth: form1.date_of_birth.toLowerCase(),
            marital_status: form1.marital_status.toLowerCase(),
            address: {
              state: form1.state.toLowerCase(),
              city: form1.city.toLowerCase(),
              street: form1.street.toLowerCase(),
            },
            home_address: {
              state_of_origin: form1.state_of_origin.toLowerCase(),
              lga: form1.lga.toLowerCase(),
            },
            user_identity: {
              identity_type: form1.identity_type.toLowerCase(),
              identity_number: form1.identity_number.toLowerCase(),
              identity_image: identity?.name,
            },
          },
          location_preference: {
            preferred_state: form2.preferred_state.toLowerCase(),
            preferred_city: form2.preferred_city.toLowerCase(),
            type_of_housing: form2.type_of_housing.toLowerCase(), //"apartment"|| "detached_house"||"semi_detached"|| "terrace"
            no_of_bedrooms: form2.no_of_bedrooms,
            housing_purpose: form2.housing_purpose.toLowerCase(), //"investment" || "residential"
            budget: form2.budget.toLowerCase(),
            preferred_area: form2.preferred_area,
            customer_preference_feedback: form2.customer_preference_feedback,
          },
          customer_account_profile: {
            employment_status: form3.employment_status.toLowerCase(),
            occupation: form3.occupation.toLowerCase(),
            monthly_income: form3.monthly_income.toLowerCase(),
            source_of_income: form3.source_of_income.toLowerCase(), //"investments" || "salary"
            loans_and_mortgage: {
              out_standing: form3.out_standing === "Yes",
              loan_type: form3.loan_type.toLowerCase(),
              loan_amount: form3.loan_amount.toLowerCase(),
            },
            proof_of_income: income?.name,
          },
        },
        { headers: { Authorization: "Bearer " + localStorage.access_token } }
      );

      uploadDocs(res?.data?.data?.compliance?._id);
    } catch (err) {
      setLoading(false);
      if (err?.response?.data?.status === 401) {
        toast.error("Session timeout");
        // navigate("/login");
      } else {
        toast.error("Something went wrong please try again");
      }
    }
  };
  return (
    <div className="w-full flex flex-col gap-[81px] justify-center items-center">
      <Navbar />
      {!isApplicationOpen && (
        <div className="w-full flex justify-center items-center">
          <div className="w-full flex flex-col items-center justify-center gap-[40px] max-w-[840px]">
            <div className="border-b pb-[8px] w-full">
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
            </div>
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
                  <div className="flex flex-col gap-[32px]">
                    <div className="flex gap-[16px] items-center">
                      <div className="w-full border-[0.5px] border-[#E6E6E6]"></div>
                      <span className="whitespace-nowrap text-[16px] font-[400] text-[#030812]">
                        Take the next step
                      </span>
                      <div className="w-full border-[0.5px] border-[#E6E6E6]"></div>
                    </div>
                    <div className="flex gap-[32px] items-center w-full">
                      <div className="w-full flex max-w-[404px] flex-col gap-[32px]">
                        <div className="flex flex-col w-full gap-[16px]">
                          <span className="font-[600] text-[24px] text-[#030812]">
                            Become a home Owner Today!
                          </span>
                          <span className="font-[400] text-[14px] text-[#3D454E]">
                            Ready to find the ideal home? Click below to start
                            the application process and take the first step
                            towards ownership.
                          </span>
                        </div>
                        <span
                          onClick={() => setApplicationOpen(true)}
                          className="bg-[#3D454E] cursor-pointer flex justify-center items-center sm:max-w-[295px] text-center font-[500] text-[14px] text-[#FAFAFA] w-full rounded-[8px] py-[16px] "
                        >
                          Start Application Process
                        </span>
                      </div>
                      <div className="w-full max-w-[404px]">
                        <img src={img1} alt="" />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
      {isApplicationOpen && (
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
      )}
    </div>
  );
};

export default Dashboard;
