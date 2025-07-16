import React, { useState } from "react";
import ApplicationForm1 from "./ApplicationForm1";
import ApplicationForm2 from "./ApplicationForm2";
import ApplicationForm3 from "./ApplicationForm3";
import moment from "moment";
import FileUpload from "../components/fileUpload";
import axios from "axios";
import { toast } from "react-toastify";

const EditUserDetails = () => {
  // const editIcon =
  //   "https://res.cloudinary.com/dzquobiiy/image/upload/v1723808963/edit-icon_ntyxbl.svg";
  const user = localStorage.user ? JSON.parse(localStorage.user) : {};

  const complianceData = localStorage.user
    ? JSON.parse(localStorage.compliance)
    : {};

  const tabs = [
    "Personal Details",
    "Housing Preferences",
    "Affordability Profiling",
  ];
  const [activeTab, SetActiveTab] = useState("Personal Details");

  const [identity, setIdentity] = useState(null);

  const [income, setIncome] = useState(null);

  const [loading, setLoading] = useState(false);

  const [form1, setForm1] = useState({
    date_of_birth: complianceData?.personal_details?.date_of_birth,
    marital_status: complianceData?.personal_details?.marital_status,
    // address: {
    state: complianceData?.personal_details.address.state,
    city: complianceData?.personal_details.address.city,
    street: complianceData?.personal_details.address.street,
    //  },
    // home_address: {
    state_of_origin:
      complianceData?.personal_details.home_address.state_of_origin,
    lga: complianceData?.personal_details.home_address.lga,
    //  },
    // user_identity: {
    identity_type: complianceData?.personal_details.user_identity.identity_type,
    identity_number:
      complianceData?.personal_details.user_identity.identity_number,
    identity_image:
      complianceData?.personal_details.user_identity.identity_image,
    // },
  });

  const [form2, setForm2] = useState({
    preferred_state: complianceData.location_preference.preferred_state,
    preferred_city: complianceData.location_preference.preferred_city,
    preferred_area: complianceData.location_preference.preferred_area,
    type_of_housing: complianceData.location_preference.type_of_housing,
    no_of_bedrooms: complianceData.location_preference.no_of_bedrooms,
    housing_purpose: complianceData.location_preference.housing_purpose,
    budget: complianceData.location_preference.budget,
    customer_preference_feedback:
      complianceData.location_preference.customer_preference_feedback,
  });

  const [form3, setForm3] = useState({
    employment_status:
      complianceData.customer_account_profile.employment_status,
    occupation: complianceData.customer_account_profile.occupation,
    monthly_income: complianceData.customer_account_profile.monthly_income,
    source_of_income: complianceData.customer_account_profile.source_of_income,
    // loans_and_mortgage: {
    out_standing:
      complianceData.customer_account_profile.loans_and_mortgage.out_standing,
    loan_type:
      complianceData.customer_account_profile.loans_and_mortgage.loan_type,
    loan_amount:
      complianceData.customer_account_profile.loans_and_mortgage.loan_amount,
    // },
    proof_of_income: complianceData.customer_account_profile.proof_of_income,
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

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const res = await axios.put(
        "https://ibom-mortgage-api.fly.dev" +
          `/users/${user._id}/compliance/${complianceData._id}`,
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
              identity_image: identity?.name || form1.identity_image,
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
            proof_of_income: income?.name || form3.proof_of_income,
          },
        },
        { headers: { Authorization: "Bearer " + localStorage.access_token } },
        toast.success("Profile successfuly updated"),
        setLoading(false)
      );

      // uploadDocs(res?.data?.data?.compliance?._id);
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

  const nextStep = () => {
    if (activeTab === "Personal Details") {
      SetActiveTab("Housing Preferences");
    } else if (activeTab === "Housing Preferences") {
      SetActiveTab("Affordability Profiling");
    } else SetActiveTab("Affordability Profiling");
  };
  const previousStep = () => {
    if (activeTab === "Affordability Profiling") {
      SetActiveTab("Housing Preferences");
    } else if (activeTab === "Housing Preferences") {
      SetActiveTab("Personal Details");
    }
  };
  return (
    <div className="w-full flex flex-col gap-[40px]">
      <span className="font-[600] text-[30px] text-[#030812]">
        Welcome, {user.first_name}
      </span>
      <span></span>
      <div className="w-full">
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
        <div className="w-full pt-[42px]">
          {activeTab === "Personal Details" && (
            <div className="w-full flex flex-col">
              {/* <div className="w-full border-b bg-[#F1FFF6] px-[24px] py-[14px] flex gap-[10px] items-center justify-between">
                <span className="text-[#030812] text-[24px] font-[600]">
                  {activeTab}
                </span>{" "}
                <div className="border border-[#338330] px-[24px] cursor-pointer py-[8px] flex gap-[7px] rounded-[4px]">
                  <span className="text-[#338330] text-[16px] font-[500]">
                    Edit
                  </span>
                  <img src={editIcon} alt="" />
                </div>
              </div> */}
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
            </div>
          )}
          {activeTab === "Housing Preferences" && (
            <div className="w-full flex flex-col">
              {/* <div className="w-full border-b bg-[#F1FFF6] px-[24px] py-[14px] flex gap-[10px] items-center justify-between">
                <span className="text-[#030812] text-[24px] font-[600]">
                  {activeTab}
                </span>{" "}
                <div className="border border-[#338330] px-[24px] cursor-pointer py-[8px] flex gap-[7px] rounded-[4px]">
                  <span className="text-[#338330] text-[16px] font-[500]">
                    Edit
                  </span>
                  <img src={editIcon} alt="" />
                </div>
              </div> */}
              <ApplicationForm2
                form2={form2}
                handleChange={handleChange}
                formErrors={formErrors}
                handleDropdownSelect={handleDropdownSelect}
                handleDateChange={handleDateChange}
                nextStep={nextStep}
                previousStep={previousStep}
                handleFileSelect={handleFileSelect}
                setFormErrors={setFormErrors}
              />
            </div>
          )}
          {activeTab === "Affordability Profiling" && (
            <div className="w-full flex flex-col">
              {/* <div className="w-full border-b bg-[#F1FFF6] px-[24px] py-[14px] flex gap-[10px] items-center justify-between">
                <span className="text-[#030812] text-[24px] font-[600]">
                  {activeTab}
                </span>{" "}
                <div className="border border-[#338330] px-[24px] cursor-pointer py-[8px] flex gap-[7px] rounded-[4px]">
                  <span className="text-[#338330] text-[16px] font-[500]">
                    Edit
                  </span>
                  <img src={editIcon} alt="" />
                </div>
              </div> */}
              <ApplicationForm3
                form3={form3}
                handleChange={handleChange}
                formErrors={formErrors}
                handleDropdownSelect={handleDropdownSelect}
                handleDateChange={handleDateChange}
                handleFileSelect={handleFileSelect}
                setFormErrors={setFormErrors}
                handleSubmit={handleSubmit}
                previousStep={previousStep}
                loading={loading}
                file={income}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EditUserDetails;
