import React from "react";
import Dropdown from "./dropdown";
import Input, { TextArea } from "./input";
import location from "naija-state-local-government";
import {
  numberOfBedrooms,
  preferredBudget,
  purposeOfHousing,
  typeOfHousing,
} from "../constants/data";

const ApplicationForm2 = ({
  form2,
  handleChange,
  formErrors,
  handleDropdownSelect,
  nextStep,
  previousStep,
  setFormErrors,
}) => {
  const states = location.states();

  const getCities = (state) => {
    return location.lgas(state);
  };

  const formValidation = () => {
    const error = {};
    if (form2.preferred_state === "") error.preferred_state = "Required*";
    if (form2.preferred_city === "") error.preferred_city = "Required*";
    if (form2.type_of_housing === "") error.type_of_housing = "Required*";
    if (form2.no_of_bedrooms === 0) error.no_of_bedrooms = "Required*";
    if (form2.housing_purpose === "") error.housing_purpose = "Required*";
    if (form2.budget === "") error.budget = "Required*";
    return error;
  };

  const getNextStep = () => {
    if (Object.keys(formValidation()).length > 0) {
      setFormErrors({ ...formErrors, ...formValidation() });
    } else {
      nextStep(3);
    }
  };
  const previous = () => {
    previousStep(1);
  };

  return (
    <div className="flex flex-col w-full gap-[56px] items-center justify-center">
      <div className="w-full flex flex-col gap-[32px] max-w-[610px]">
        <div className=" sm:grid w-full flex flex-col sm:grid-cols-2 items-center gap-[20px]">
          <Dropdown
            label="Preferred State"
            error={formErrors.preferred_state}
            name="preferred_state"
            isRequired={true}
            placeholder="Enter State"
            value={form2?.preferred_state}
            options={states}
            onOptionSelect={(value, name) =>
              handleDropdownSelect(value, name, "form2")
            }
          />
          <Dropdown
            label="Preferred City"
            error={formErrors.preferred_city}
            isRequired={true}
            placeholder="Enter City"
            name="preferred_city"
            value={form2?.preferred_city}
            options={
              getCities(
                form2.preferred_state === ""
                  ? "Federal Capital Territory"
                  : form2.preferred_state
              ).lgas
            }
            onOptionSelect={(value, name) =>
              handleDropdownSelect(value, name, "form2")
            }
          />
        </div>
        <Input
          label="Specify area (if any)"
          type="text"
          name="preferred_area"
          error={formErrors.preferred_area}
          value={form2?.preferred_area}
          handleChange={(e) => handleChange(e, "form2")}
          placeholder={"Enter preferred area"}
        />
        <div className=" sm:grid w-full flex flex-col sm:grid-cols-2 items-center gap-[20px]">
          <Dropdown
            label="Type of Housing Required"
            isRequired={true}
            placeholder="Choose an option"
            error={formErrors.type_of_housing}
            options={typeOfHousing}
            value={form2?.type_of_housing}
            name="type_of_housing"
            onOptionSelect={(value, name) =>
              handleDropdownSelect(value, name, "form2")
            }
          />
          <Dropdown
            label="Number of Bedrooms"
            error={formErrors.no_of_bedrooms}
            placeholder="Choose an option"
            isRequired={true}
            options={numberOfBedrooms}
            value={form2?.no_of_bedrooms}
            name="no_of_bedrooms"
            onOptionSelect={(value, name) => {
              console.log(value, name);
              handleDropdownSelect(value, name, "form2");
            }}
          />
        </div>
        <div className=" sm:grid w-full flex flex-col sm:grid-cols-2 items-center gap-[20px]">
          <Dropdown
            label="Purpose of Housing"
            error={formErrors.housing_purpose}
            placeholder="Choose an option"
            name="housing_purpose"
            isRequired={true}
            value={form2?.housing_purpose}
            options={purposeOfHousing}
            onOptionSelect={(value, name) =>
              handleDropdownSelect(value, name, "form2")
            }
          />
          <Dropdown
            label="Preferred Budget"
            error={formErrors.budget}
            placeholder="Choose an option"
            options={preferredBudget}
            isRequired={true}
            name="budget"
            value={form2?.budget}
            onOptionSelect={(value, name) =>
              handleDropdownSelect(value, name, "form2")
            }
          />
        </div>
        <TextArea
          label="Any specific requirements or preferences"
          type="text"
          name="customer_preference_feedback"
          error={formErrors.customer_preference_feedback}
          value={form2?.customer_preference_feedback}
          handleChange={(e) => handleChange(e, "form2")}
          placeholder="Whats your preference?"
        />
      </div>

      <div className="w-full items-center max-w-[610px] flex gap-[20px]">
        <button
          onClick={previous}
          className="max-w-[295px] w-full bg-[#F3F6F8] text-[#475467] text-[14px] font-[500] rounded-[8px] py-[12px] px-[32px] h-[56px]"
        >
          Previous
        </button>
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

export default ApplicationForm2;
