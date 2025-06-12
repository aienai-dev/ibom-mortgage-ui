import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { application_stale_data, ui_data } from "../constants/static";
import axios from "axios";
import Navbar from "../components/navbar";
import HomeCard from "../components/homeCard";
import FileUpload from "../components/fileUpload";
import Footer from "../components/footer";
import ApplicationForm1 from "../components/ApplicationForm1";
import ApplicationForm2 from "../components/ApplicationForm2";
import ApplicationForm3 from "../components/ApplicationForm3";
import moment from "moment";
import img from "../assets/images/success.png";
import logobg from "../assets/images/login-bg.svg";
import { PageLoader } from "../components/loader";
import EditUserDetails from "../components/EditUserDetails";

const { videoStyle, stepPages, navItems, card1, card2, card3 } =
  application_stale_data;

const { heroVideo } = ui_data;

const Home = () => {
  const user = localStorage.user ? JSON.parse(localStorage.user) : {};
  const videoRef = useRef(null);

  const [activeCompliance, setActiveCompliance] = useState(false);

  const [identity, setIdentity] = useState(null);

  const [income, setIncome] = useState(null);

  const [formLoading, setFormLoading] = useState(false);

  const [loading, setLoading] = useState(false);

  const [step, setStep] = useState(1);

  const [userEdit, setUserEdit] = useState(false);

  const currentStep = stepPages.find((page) => page.step === step);

  const navigate = useNavigate();
  // console.log(formLoading);

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

  const handleFileSelect = (file, type) => {
    if (type === "identity") {
      setIdentity(file);
      setFormErrors({ ...formErrors, identity_image: "" });
    } else {
      setIncome(file);
      setFormErrors({ ...formErrors, proof_of_income: "" });
    }
  };

  const nextStep = (step_) => {
    setStep(step_);
  };

  const previousStep = (step_) => {
    setStep(step_);
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

  const getCompliance = () => {
    setFormLoading(true);
    axios
      .get(process.env.REACT_APP_BASEURL + `/users/${user._id}/compliance`, {
        headers: { Authorization: `Bearer ${localStorage.access_token}` },
      })
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
        console.log(err);
        if (err.response.data.status === 401) {
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
  const uploadDocs = async (id) => {
    const formData1 = new FormData();
    const formData2 = new FormData();
    try {
      formData1.append("image", identity);
      formData2.append("image", income);
      await axios.post(
        process.env.REACT_APP_BASEURL + `/users/${id}/identity`,
        formData1,
        { headers: { Authorization: "Bearer " + localStorage.access_token } }
      );
      await axios.post(
        process.env.REACT_APP_BASEURL + `/users/${id}/identity`,
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
  const handleSubmit = async () => {
    setLoading(true);
    try {
      const res = await axios.post(
        process.env.REACT_APP_BASEURL + `/users/${user._id}/compliance`,
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
  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  useEffect(() => {
    if (!localStorage.access_token) navigate("/login");
    else getCompliance();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = true;
      videoRef.current.play().catch((error) => {
        console.log("Autoplay prevented:", error);
      });
    }
  }, []);

  return (
    <div className="flex flex-col items-center justify-center">
      <Navbar navItems={navItems} action={logout} actionName={"Log Out"} />
      <div className="w-full min-h-[600px] relative overflow-hidden px-[20px] md:ps-[100px] flex items-center">
        <video
          ref={videoRef}
          loop
          muted
          playsInline
          preload="auto"
          style={videoStyle}
          type="video/mp4"
        >
          <source src={heroVideo} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="w-full flex gap-[56px] flex-col max-w-[880px] ">
          <div className="gap-[20px] flex flex-col">
            <span className="text-[36px] text-center md:text-start font-[400] text-[#FFFFFF]">
              Welcome to Your Renewed Hope Estate Profile Setup
            </span>
            <span className="text-[18px] text-center md:text-start font-[400] text-[#FFFFFF]">
              Thank you for indicating your interest in our housing programs. In
              this stage, we'll gather more detailed information to better
              understand your needs and preferences.
            </span>
          </div>
          <div className="rounded-[8px] cursor-pointer w-full md:max-w-[236px] py-[16px] flex justify-center bg-[#FFFFFF]">
            <a href="#section6">
              <span className="font-[500] text-[14px] text-[#3D454E]">
                Get Started
              </span>
            </a>
          </div>
        </div>
      </div>
      <div className="max-w-[1240px] mb-[100px] pt-[100px] px-[20px] w-full gap-[80px] flex flex-col">
        <div className="flex flex-col md:flex-row gap-[20px] md:gap-[0px] w-full items-center justify-between">
          <div id="howItWorks" className="flex flex-col gap-[16px]">
            <span className="font-[600] text-[36px] text-[#030812]">
              How It Works
            </span>
            <span className="font-[600] text-center md:text-left text-[16px] text-[#475467]">
              Three (3) easy steps{" "}
            </span>
          </div>
          <span className="max-w-[820px] text-center md:text-start text-[18px] text-[400] text-[#475467]">
            By sharing your housing needs and preferences, you help shape the
            future of housing policies and programs that directly impact your
            community. Your input ensures that the real needs of residents are
            heard and addressed.
          </span>
        </div>
        <div className="md:grid md:grid-cols-2 flex flex-col lg:grid-cols-3 gap-[40px] md:gap-[20px] w-full">
          <HomeCard cardData={card1} />
          <HomeCard cardData={card2} />
          <HomeCard cardData={card3} />
        </div>
      </div>
      {/* {formLoading && ( */}
      {/* <div className="w-full min-h-[120px] flex bg-slate-50 justify-center items-center">
        <img src={logo} alt="" />
      </div> */}
      {/* )}
       */}
      {!activeCompliance && !formLoading && (
        <div
          id="applicationForm"
          className="w-full px-[20px] flex flex-col items-center justify-center gap-[57px]"
        >
          <div className="flex flex-col px-[20px] w-full gap-[20px]">
            <span className="text-center text-[36px] font-[600]">
              Housing Application Form
            </span>
            <span className="font-[400] text-[18px] text-center">
              To be considered for an apartment in a public housing development,
              you must submit an application
            </span>
          </div>
          <div className="flex px-[20px] flex-col w-full items-center justify-center">
            <div className="flex w-full items-center border-t border-b border-[#EAECF0] py-[24px] max-w-[820px] justify-center md:justify-between">
              {stepPages.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center justify-center md:justify-start max-w-[220px] w-full gap-[16px]"
                >
                  <span
                    className={`w-[36px] h-[36px] text-[14px] font-[500] rounded-[36px] flex items-center justify-center ${
                      step === item.step
                        ? "text-[#fff] bg-[#338330]"
                        : "text-[#979797] bg-[#EAEEF9]"
                    }`}
                  >
                    {item.step}
                  </span>
                  <span
                    className={`text-[16px] text-[#030812] hidden md:flex whitespace-nowrap ${
                      step === item.step ? "font-[400]" : "font-[300]"
                    }`}
                  >
                    {item.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
          <div className="w-full max-w-[820px] flex flex-col px-[10px] justify-center items-center gap-[70px] py-[64px] border-[#D5D5D540] border rounded-[16px]">
            <div className="flex items-center justify-between max-w-[676px] w-full">
              <div className="flex w-full flex-col gap-[16px]">
                <span className="font-[600] tet-[24px] text-[#030812]">
                  {currentStep.name}
                </span>
                <span className="font-[400] text-[16px] text-[#475467]">
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

            <div className="w-full">
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
        </div>
      )}
      {activeCompliance && !formLoading && (
        <>
          {userEdit ? (
            <div className="w-full max-w-[610px]">
              <EditUserDetails />
            </div>
          ) : (
            <div
              style={{ backgroundImage: `url(${logobg})` }}
              className="w-full h-fit flex items-center justify-center"
            >
              <div className="flex w-full py-[60px] max-w-[500px] min-h-[500px] items-center flex-col ">
                <img className="w-[200px]" src={img} alt="" />
                <span className="text-[32px] text-center font-[600] text-[#11B981]">
                  We Have Received Your Application
                </span>
                <div className="flex flex-col items-center gap-[40px]">
                  <span className="text-center font-[400] text-[20px] text-slate-600">
                    Your application is not being processed and you receive a
                    feedback containing the next steps
                  </span>
                  {/* <span className="h-[40px] flex items-center px-[14px] underline mt-4  text-[#11B981]">
              <a href="https://mail.google.com/mail/u/">Check Your Email</a>
            </span> */}
                  <button
                    onClick={editCompliance}
                    className="max-w-[295px] flex justify-center items-center cursor-pointer w-full bg-[#3D454E] text-[#FAFAFA] text-[14px] font-[500] rounded-[8px] py-[12px] px-[32px] h-[56px]"
                  >
                    Edit Application
                  </button>
                </div>
              </div>
            </div>
          )}
        </>
      )}
      {formLoading && (
        <div className="w-full bg-[#11b98109] gap-[20px] flex-col flex items-center justify-center min-h-[300px] rounded-full max-w-[500px] m-auto ">
          <PageLoader />
          <span className="text-gray-400">Fetching your application...</span>
        </div>
      )}
      <div className="w-full mt-[100px] ">
        <Footer />
      </div>
    </div>
  );
};

export default Home;
// test = ;
