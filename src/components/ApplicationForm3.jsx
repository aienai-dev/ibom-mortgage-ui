import React, { useState } from "react";

import Dropdown from "./dropdown";
import Input from "./input";
import Upload from "./Upload";
import {

  employmentStatus,

  monthly_income,
  source_of_income,
} from "../constants/data";
import Loader from "./loader";

const ApplicationForm3 = ({
  form3,
  handleChange,
  formErrors,
  
  handleDropdownSelect,
  
  handleFileSelect,

  previousStep,
  handleSubmit,
  loading,
  file,
  setFormErrors,
}) => {
  const [pendingLoans, setPendingLoans] = useState(false);

  const formValidation = () => {
    const error = {};
    if (form3.employment_status === "") error.employment_status = "Required*";
    if (form3.occupation === "") error.occupation = "Required*";
    if (form3.monthly_income === "") error.monthly_income = "Required*";
    if (form3.source_of_income === "") error.source_of_income = "Required*";
    if (form3.housing_purpose === "") error.housing_purpose = "Required*";
    if (form3.out_standing === "") error.out_standing = "Required*";
    if (form3.loan_type === "" && form3.out_standing === "Yes")
      error.loan_type = "Required*";
    if (form3.loan_amount === "" && form3.out_standing === "Yes")
      error.loan_amount = "Required*";
    if (file === "" && form3.proof_of_income === "") error.proof_of_income = "Required*";
    return error;
  };

  const submit = () => {
    if (Object.keys(formValidation()).length > 0) {
      setFormErrors({ ...formErrors, ...formValidation() });
    } else {
      handleSubmit();
    }
  };
  const previous = () => {
    previousStep(2);
  };

  const handleOutstanding = (value, name) => {

    handleDropdownSelect(value, name, "form3");
    setFormErrors({
      ...formErrors,
      out_standing: "",
      loan_type: "",
      loan_amount: "",
    });
    if (value === "Yes") setPendingLoans(true);
    else setPendingLoans(false);
  };


  return (
    <div className="flex flex-col w-full gap-[56px] items-center justify-center">
      <div className="w-full flex flex-col gap-[32px] max-w-[610px]">
        <div className="grid w-full grid-cols-2 items-center gap-[20px]">
          <Dropdown
            label="Current Employment Status"
            error={formErrors.employment_status}
            isRequired={true}
            name={"employment_status"}
            placeholder="Choose an option"
            options={employmentStatus}
            value={form3?.employment_status}
            onOptionSelect={(value, name) =>
              handleDropdownSelect(value, name, "form3")
            }
          />
          <Input
            label="Occupation"
            type="text"
            name="occupation"
            required={true}
            error={formErrors.occupation}
            value={form3?.occupation}
            handleChange={(e) => handleChange(e, "form3")}
            placeholder={"Enter Occupation"}
          />
        </div>
        <div className="grid w-full grid-cols-2 items-center gap-[20px]">
          <Dropdown
            label="Monthly Income"
            error={formErrors.monthly_income}
            value={form3?.monthly_income}
            name="monthly_income"
            placeholder="Choose an option"
            options={monthly_income}
            isRequired={true}
            onOptionSelect={(value, name) =>
              handleDropdownSelect(value, name, "form3")
            }
          />
          <Dropdown
            label="Source of Income"
            error={formErrors.source_of_income}
            placeholder="Choose an option"
            name="source_of_income"
            value={form3?.source_of_income}
            options={source_of_income}
            isRequired={true}
            onOptionSelect={(value, name) =>
              handleDropdownSelect(value, name, "form3")
            }
          />
        </div>
        <Dropdown
          label="Do you have any existing mortgages?"
          placeholder="Choose an option"
          options={["Yes", "No"]}
          value={form3.out_standing ? 'Yes' : 'No'}
          name="out_standing"
          isRequired={true}
          onOptionSelect={(value, name) => {
            handleOutstanding(value, name);
          }}
        />

        <div className="grid w-full grid-cols-2 items-center gap-[20px]">
          <Input
            label="If yes specify the type"
            type="text"
            name="loan_type"
            error={formErrors.loan_type}
            value={form3?.loan_type}
            required={pendingLoans}
            handleChange={(e) => handleChange(e, "form3")}
            placeholder="Enter type"
          />
          <Input
            label="Amount"
            type="number"
            name="loan_amount"
            error={formErrors.loan_amount}
            value={form3?.loan_amount}
            required={pendingLoans}
            handleChange={(e) => handleChange(e, "form3")}
            placeholder="Enter amount"
          />
        </div>

        <div className="">
          <Upload
            value={file}
            label={"Proof of income"}
            isRequired={true}
            update={form3.proof_of_income}
            handleUpload={(e) => handleFileSelect(e, "income")}
            error={formErrors.proof_of_income}
          />
        </div>
      </div>

      <div className="w-full items-center max-w-[610px] flex gap-[20px]">
        <button
          onClick={previous}
          className="max-w-[295px] w-full bg-[#F3F6F8] text-[#475467] text-[14px] font-[500] rounded-[8px] py-[12px] px-[32px] h-[56px]"
        >
          Previous
        </button>
        <button
          onClick={submit}
          className="max-w-[295px] flex justify-center items-center cursor-pointer w-full bg-[#3D454E] text-[#FAFAFA] text-[14px] font-[500] rounded-[8px] py-[12px] px-[32px] h-[56px]"
        >
          {loading ? <Loader color={"#ffff"} size={[24, 24]} /> : "Proceed"}
        </button>
      </div>
    </div>
  );
};

export default ApplicationForm3;
