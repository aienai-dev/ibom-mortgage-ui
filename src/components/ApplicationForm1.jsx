import React from "react";
import Datepicker from "./datePicker";
import Dropdown from "./dropdown";
import Input, { PhoneInput } from "./input";
// import { lgas, states } from "naija-state-local-government";
import location from "naija-state-local-government";
import {
  ageRange,
  employmentStatus,
  formOfIdentification,
  maritalStatus,
} from "../constants/data";
import Upload from "./Upload";

const ApplicationForm1 = ({
  form1,
  handleChange,
  formErrors,
  FileUpload,
  handleDropdownSelect,
  handleDateChange,
  handleFileSelect,
  nextStep,
  file,
  setFormErrors,
}) => {
  const user = localStorage.user ? JSON.parse(localStorage.user) : {};
  const gender = ["Female", "Male"];
  const states = location.states();

  const getCities = (state) => {
    return location.lgas(state);
  };

  const formValidation = () => {
    const error = {};
    if (form1.date_of_birth === "") error.date_of_birth = "Required*";
    if (form1.marital_status === "") error.marital_status = "Required*";
    if (form1.state === "") error.state = "Required*";
    if (form1.city === "") error.city = "Required*";
    if (form1.street === "") error.street = "Required*";
    if (form1.state_of_origin === "") error.state_of_origin = "Required*";
    if (form1.lga === "") error.lga = "Required*";
    if (form1.identity_type === "") error.identity_type = "Required*";
    if (form1.identity_number === "") error.identity_number = "Required*";
    if (file === "" && form1.identity_image === "") error.identity_image = "Required*";
    // if (form2.preferred_state === "") error.preferred_state = "Required*";
    // if (form2.preferred_city === "") error.preferred_city = "Required*";
    // if (form2.type_of_housing === "") error.type_of_housing = "Required*";
    // if (form2.no_of_bedrooms == 0) error.no_of_bedrooms = "Required*";
    // if (form2.housing_purpose === "") error.housing_purpose = "Required*";
    // if (form2.budget === "") error.budget = "Required*";
    // if (form2.preferred_area === "") error.preferred_area = "Required*";
    // if (form2.customer_preference_feedback === "")
    //   error.customer_preference_feedback = "Required*";
    // if (form3.employment_status === "") error.employment_status = "Required*";
    // if (form3.occupation === "") error.occupation = "Required*";
    // if (form3.monthly_income === "") error.monthly_income = "Required*";
    // if (form3.source_of_income === "") error.source_of_income = "Required*";
    // if (
    //   form3.loans_and_mortgage.out_standing == false &&
    //   form3.loans_and_mortgage.loan_type === ""
    // )
    //   error.loan_type = "Required*";
    // if (
    //   form3.loans_and_mortgage.out_standing == false &&
    //   form3.loans_and_mortgage.loan_amount === ""
    // )
    //   error.loan_amount = "Required*";
    // if (form3.proof_of_income === "") error.proof_of_income = "Required*";
    return error;
  };

  const getNextStep = () => {
    if (Object.keys(formValidation()).length > 0) {
      setFormErrors({ ...formErrors, ...formValidation() });
    } else {
      nextStep(2);
    }
  };

  return (
    <div className="flex w-full flex-col gap-[56px] items-center justify-center">
      <div className="w-full flex flex-col gap-[32px] max-w-[610px]">
        <div className="sm:grid w-full flex flex-col sm:grid-cols-3 items-center gap-[20px]">
          <Input
            label="First Name"
            type="text"
            name="first_name"
            isDisabled={true}
            required={true}
            value={user?.first_name}
            disabled={true}
            onChange={(e) => handleChange(e, "form1")}
            placeholder="Enter your first name"
          />
          <Input
            label="Middle Name"
            type="text"
            name="middle_name"
            value={user?.middle_name}
            disabled={true}
            onChange={(e) => handleChange(e, "form1")}
            placeholder="Enter middle name"
          />
          <Input
            label="Surname"
            type="text"
            name="surname"
            required={true}
            value={user?.last_name}
            disabled={true}
            onChange={(e) => handleChange(e, "form1")}
            placeholder="Enter your email"
          />
        </div>
        <div className=" sm:grid w-full flex flex-col sm:grid-cols-2 items-center gap-[20px]">
          <Input
            label="Email Address"
            type="email"
            name="email"
            required={true}
            value={user?.email}
            disabled={true}
            handleChange={(e) => handleChange(e, "form1")}
            placeholder="Enter your surname"
          />
          <PhoneInput
            label="Phone Number"
            type="text"
            name="phone_number"
            required={true}
            value={user?.phone_number?.slice(3)}
            disabled={true}
            handleChange={(e) => handleChange(e, "form1")}
            placeholder="Enter Phone Number"
          />
        </div>
        <div className=" sm:grid w-full flex flex-col sm:grid-cols-2 items-center gap-[20px]">
          <PhoneInput
            label="Whatsapp Number"
            type="text"
            name="whatsapp_number"
            value={user?.whatsapp_number ? user?.whatsapp_number?.slice(3) : ""}
            disabled={true}
            handleChange={(e) => handleChange(e, "form1")}
            placeholder="Enter Whatsapp Number"
          />
          <Dropdown
            label="Gender"
            isRequired={true}
            name={"gender"}
            isDisabled={true}
            placeholder="Choose an option"
            value={user?.gender}
            options={gender}
            onOptionSelect={(value, name) =>
              handleDropdownSelect(value, name, "form1")
            }
          />
        </div>
        <div className=" sm:grid w-full flex flex-col sm:grid-cols-2 items-center gap-[20px]">
          <Dropdown
            label="Age range"
            isRequired={true}
            placeholder="Choose an option"
            options={ageRange}
            name={"age_range"}
            isDisabled={true}
            value={
              user?.age_range === "60+"
                ? "61 years and above "
                : user?.age_range + " years"
            }
            onOptionSelect={(value, name) =>
              handleDropdownSelect(value, name, "form1")
            }
          />
          <Dropdown
            label="Employment Status"
            isRequired={true}
            isDisabled={true}
            name={"employment_status"}
            placeholder="Choose an option"
            options={employmentStatus}
            value={user.employment_status?.replace("-", " ")}
            onOptionSelect={(value, name) =>
              handleDropdownSelect(value, name, "form1")
            }
          />
        </div>
      </div>
      <div className="w-full border-[0.5px] max-w-[610px] border-[#EAECF0]"></div>
      <div className="w-full flex flex-col gap-[32px] max-w-[610px]">
        <div className="sm:grid w-full flex flex-col sm:grid-cols-2 items-center gap-[20px]">
          <Datepicker
            label="Date of Birth"
            isRequired={true}
            error={formErrors.date_of_birth}
            placeholder="Choose a date"
            handleDateChange={(e) =>
              handleDateChange(e, "date_of_birth", "form1")
            }
            name="dateField" // Pass a unique identifier for the date field
            value={form1.date_of_birth} // Pass the current value to the date picker
          />

          <Dropdown
            label="Marital Status"
            isRequired={true}
            placeholder="Choose an option"
            error={formErrors.marital_status}
            name="marital_status"
            value={form1.marital_status}
            options={maritalStatus}
            onOptionSelect={(value, name) => {
              handleDropdownSelect(value, name, "form1");
            }}
          />
        </div>
        <div className="sm:grid w-full flex flex-col sm:grid-cols-2 items-center gap-[20px]">
          <Dropdown
            label="State of Residence"
            isRequired={true}
            error={formErrors.state}
            placeholder="Choose an option"
            name="state"
            value={form1.state}
            options={states}
            onOptionSelect={(value, name) =>
              handleDropdownSelect(value, name, "form1")
            }
          />
          <Dropdown
            label="City of Residence"
            isRequired={true}
            error={formErrors.city}
            placeholder="Choose an option"
            value={form1.city}
            options={
              getCities(
                form1.state === "" ? "Federal Capital Territory" : form1.state
              ).lgas
            }
            name="city"
            onOptionSelect={(value, name) =>
              handleDropdownSelect(value, name, "form1")
            }
          />
        </div>
        <div className="w-full">
          <Input
            label="Home Address"
            type="text"
            name="street"
            error={formErrors.street}
            value={form1?.street}
            required={true}
            placeholder={"e.g 12 palm groove street"}
            handleChange={(e) => handleChange(e, "form1")}
          />
        </div>
        <div className="sm:grid w-full flex flex-col sm:grid-cols-2 items-center gap-[20px]">
          <Dropdown
            label="State of Origin"
            isRequired={true}
            error={formErrors.state_of_origin}
            value={form1.state_of_origin}
            name="state_of_origin"
            placeholder="Choose an option"
            options={states}
            onOptionSelect={(value, name) =>
              handleDropdownSelect(value, name, "form1")
            }
          />
          <Dropdown
            label="LGA"
            isRequired={true}
            error={formErrors.lga}
            value={form1.lga}
            name="lga"
            placeholder="Choose an option"
            options={
              getCities(
                form1.state_of_origin === ""
                  ? "Federal Capital Territory"
                  : form1.state_of_origin
              ).lgas
            }
            onOptionSelect={(value, name) =>
              handleDropdownSelect(value, name, "form1")
            }
          />
        </div>
        <div className="sm:grid w-full flex flex-col sm:grid-cols-2 items-center gap-[20px]">
          <Dropdown
            label="Form of Identification"
            isRequired={true}
            error={formErrors.identity_type}
            value={form1.identity_type}
            placeholder="Choose an option"
            name="identity_type"
            options={formOfIdentification}
            onOptionSelect={(value, name) =>
              handleDropdownSelect(value, name, "form1")
            }
          />
          <Input
            label="Enter Identification Number"
            required={true}
            type="text"
            name="identity_number"
            error={formErrors.identity_number}
            value={form1.identity_number}
            handleChange={(e) => handleChange(e, "form1")}
            placeholder="Enter your ID number"
          />
        </div>
        <div>
          <Upload
            label={"Proof Of Identity"}
            name="identity_image"
            isRequired={true}
            value={file}
            required={true}
            update={form1.identity_type}
            handleUpload={(e) => handleFileSelect(e, "identity")}
          />
        </div>
      </div>
      <div className="w-full max-w-[610px] flex justify-end">
        <button
          onClick={getNextStep}
          className="max-w-[295px] w-full bg-[#3D454E] cursor-pointer text-[#FAFAFA] text-[14px] font-[500] rounded-[8px] py-[12px] px-[32px] h-[56px]"
        >
          Proceed
        </button>
      </div>
    </div>
  );
};

export default ApplicationForm1;
