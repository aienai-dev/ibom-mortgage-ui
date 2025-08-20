import React, {
  useState,
  createContext,
  useContext,
  useEffect,
  useRef,
} from "react";
import { ChevronLeft, Upload, CheckCircle } from "lucide-react";
import { citiesByState, stateOptions } from "../../assets/constants/location";
import axiosInstance from "../../api/axios";
import CustomToast from "../common/CustomToast";
import Loader from "../common/Loader";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// Form Context for state management
const FormContext = createContext();

// Nigerian States and Cities

const genderOptions = ["Male", "Female"];
const ageRanges = [
  "18-25 years",
  "26-35 years",
  "36-45 years",
  "46-55 years",
  "55+ years",
];
const employmentStatus = [
  "Employed",
  "Self-employed",
  "Unemployed",
  "Student",
  "Retired",
];
const maritalStatus = ["Single", "Married", "Divorced", "Widowed", "Separated"];
const identificationTypes = [
  "National ID",
  "International Passport",
  "Driver's License",
  "Voter's Card",
];
const housingTypes = [
  "Apartment",
  "Duplex",
  "Bungalow",
  "Studio",
  "Shared Accommodation",
];
const purposeOptions = [
  "Personal Residence",
  "Family Home",
  "Investment",
  "Temporary Housing",
];
const budgetRanges = [
  "₦50,000 - ₦100,000",
  "₦100,000 - ₦200,000",
  "₦200,000 - ₦300,000",
  "₦300,000+",
];
const incomeRanges = [
  "₦50,000 - ₦100,000",
  "₦100,000 - ₦200,000",
  "₦200,000 - ₦500,000",
  "₦500,000+",
];
const incomeSource = ["Salary", "Business", "Investment", "Pension", "Other"];

const Input = ({
  label,
  name,
  value,
  onChange,
  type = "text",
  error,
  placeholder,
  required,
  disabled,
}) => (
  <div className={`flex flex-col gap-2 w-full  ${disabled && "opacity-[0.5]"}`}>
    <label
      htmlFor={name}
      className="block text-sm font-medium leading-6 text-gray-900"
    >
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <input
      id={name}
      name={name}
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      disabled={disabled}
      className="block w-full rounded-lg bg-gray-50 h-12 px-4 border border-gray-300 focus:outline-none focus:ring-1 focus:ring-green-600/50"
    />
    <span className="text-xs text-red-600 h-4">{error}</span>
  </div>
);

const Dropdown = ({
  label,
  name,
  options,
  value,
  onChange,
  error,
  required,
  placeholder = "Select option",
  disabled,
}) => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (option) => {
    onChange({ target: { name, value: option } });
    setOpen(false);
  };

  return (
    <div
      ref={dropdownRef}
      className={`flex flex-col gap-2 w-full relative ${
        disabled && "opacity-[0.5]"
      }`}
    >
      <label className="block text-sm font-medium leading-6 text-gray-900">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <div
        onClick={() => !disabled && setOpen(!open)}
        className="flex items-center justify-between gap-2 w-full rounded-lg h-12 px-4 border border-gray-300 cursor-pointer bg-gray-50 focus:outline-none focus:ring-1 focus:ring-green-600/50"
      >
        <span className={`${!value ? "text-gray-400" : "text-gray-900"}`}>
          {value || placeholder}
        </span>
        <svg
          className={`w-4 h-4 transform transition-transform ${
            open ? "rotate-180" : "rotate-0"
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </div>
      {open && (
        <div className="absolute top-full left-0 mt-1 w-full max-h-48 overflow-y-auto rounded-lg shadow-md bg-white z-50 border">
          {options.map((option, index) => (
            <div
              key={index}
              onClick={() => handleSelect(option)}
              className="p-3 cursor-pointer hover:bg-gray-100 transition-colors"
            >
              {option}
            </div>
          ))}
        </div>
      )}
      <span className="text-xs text-red-600 h-4">{error}</span>
    </div>
  );
};

const FileUpload = ({ label, name, onChange, error, required }) => {
  const [fileName, setFileName] = useState("");

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFileName(file.name);
      onChange(e);
    }
  };

  return (
    <div className="flex flex-col gap-2 w-full">
      <label className="block text-sm font-medium leading-6 text-gray-900">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-green-400 transition-colors">
        <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
        <input
          type="file"
          id={name}
          name={name}
          onChange={handleFileChange}
          className="hidden"
          accept=".jpg,.jpeg,.png,.pdf"
        />
        <label htmlFor={name} className="cursor-pointer">
          <span className="text-green-600 hover:text-green-500">
            Click to Upload
          </span>
          <span className="text-gray-500"> or drag and drop</span>
        </label>
        <p className="text-xs text-gray-500 mt-1">
          JPEG, PNG, or PDF (max file size: 10MB)
        </p>
        {fileName && (
          <p className="text-sm text-green-600 mt-2">Selected: {fileName}</p>
        )}
      </div>
      <span className="text-xs text-red-600 h-4">{error}</span>
    </div>
  );
};

// Form Step 1: Personal Details
const Form1 = ({ formData, handleChange, handleFileChange, errors }) => {
  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900">Personal Details</h2>
        <p className="text-gray-600 mt-2">
          Provide more details about yourself
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        <Input
          label="First name"
          name="first_name"
          value={formData.first_name}
          onChange={handleChange}
          required
          placeholder="John"
          error={errors.first_name}
          disabled
        />
        <Input
          label="Middle name"
          name="middle_name"
          value={formData.middle_name}
          onChange={handleChange}
          placeholder="Chidi"
          error={errors.middle_name}
        />
        <Input
          label="last_name"
          name="last_name"
          value={formData.last_name}
          onChange={handleChange}
          required
          placeholder="Muhammad"
          error={errors.last_name}
          disabled
        />
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <Input
          label="Email address"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          required
          placeholder="bolade@gmail.com"
          error={errors.email}
          disabled
        />
        <Input
          label="Phone number"
          name="phone"
          type="tel"
          value={formData.phone}
          onChange={handleChange}
          required
          placeholder="08012345678"
          error={errors.phone}
          disabled
        />
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <Input
          label="WhatsApp number"
          name="whatsapp_number"
          type="tel"
          value={formData.whatsapp_number}
          onChange={handleChange}
          placeholder="08012345678"
          error={errors.whatsapp_number}
        />
        <Dropdown
          label="Gender"
          name="gender"
          options={genderOptions}
          value={formData.gender}
          onChange={handleChange}
          required
          error={errors.gender}
          disabled
        />
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <Dropdown
          label="Age range"
          name="age_range"
          options={ageRanges}
          value={formData.age_range}
          onChange={handleChange}
          required
          error={errors.age_range}
          disabled
        />
        <Dropdown
          label="Employment status"
          name="employment_status"
          options={employmentStatus}
          value={formData.employment_status}
          onChange={handleChange}
          required
          error={errors.employment_status}
          disabled
        />
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <Input
          label="Date of birth"
          name="date_of_birth"
          type="date"
          value={formData.date_of_birth}
          onChange={handleChange}
          required
          error={errors.date_of_birth}
        />
        <Dropdown
          label="Marital status"
          name="marital_status"
          options={maritalStatus}
          value={formData.marital_status}
          onChange={handleChange}
          required
          error={errors.marital_status}
        />
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <Dropdown
          label="State of residence"
          name="state_of_residence"
          options={stateOptions}
          value={formData.state_of_residence}
          onChange={handleChange}
          required
          error={errors.state_of_residence}
        />
        <Dropdown
          label="City of residence"
          name="city_of_residence"
          options={
            formData.state_of_residence
              ? citiesByState[formData.state_of_residence] || []
              : []
          }
          value={formData.city_of_residence}
          onChange={handleChange}
          required
          error={errors.city_of_residence}
        />
      </div>

      <Input
        label="Home address"
        name="home_address"
        value={formData.home_address}
        onChange={handleChange}
        required
        placeholder="Enter Street address"
        error={errors.home_address}
      />

      <div className="grid md:grid-cols-2 gap-4">
        <Dropdown
          label="State of origin"
          name="state_of_origin"
          options={stateOptions}
          value={formData.state_of_origin}
          onChange={handleChange}
          required
          error={errors.state_of_origin}
        />
        <Dropdown
          label="LGA"
          name="lga"
          options={
            formData.state_of_origin
              ? citiesByState[formData.state_of_origin] || []
              : []
          }
          value={formData.lga}
          onChange={handleChange}
          required
          error={errors.lga}
        />
      </div>
      <div className="grid md:grid-cols-2 gap-4">
        <Dropdown
          label="Form of identification"
          name="identification_type"
          options={identificationTypes}
          value={formData.identification_type}
          onChange={handleChange}
          required
          error={errors.identification_type}
        />

        <Input
          label="Enter identification number"
          name="identification_number"
          value={formData.identification_number}
          onChange={handleChange}
          required
          placeholder="Enter Digits"
          error={errors.identification_number}
        />
      </div>

      <FileUpload
        label="Proof of Identity"
        name="proof_of_identity"
        onChange={(e) => {
          console.log(e.target.files[0]);
          handleFileChange(e);
        }}
        required
        error={errors.proof_of_identity}
      />
    </div>
  );
};

// Form Step 2: Housing Preferences
const Form2 = ({ formData, handleChange, errors }) => {
  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900">
          Housing Preferences
        </h2>
        <p className="text-gray-600 mt-2">
          Let us know your preferred locations, housing types, and other
          preferences.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <Dropdown
          label="Preferred state"
          name="preferred_state"
          options={stateOptions}
          value={formData.preferred_state}
          onChange={handleChange}
          required
          error={errors.preferred_state}
        />
        <Dropdown
          label="Preferred city"
          name="preferred_city"
          options={
            formData.preferred_state
              ? citiesByState[formData.preferred_state] || []
              : []
          }
          value={formData.preferred_city}
          onChange={handleChange}
          required
          error={errors.preferred_city}
        />
      </div>

      <Input
        label="Specify area"
        name="specific_area"
        value={formData.specific_area}
        onChange={handleChange}
        placeholder="Enter area"
        error={errors.specific_area}
      />

      <div className="grid md:grid-cols-2 gap-4">
        <Dropdown
          label="Type of housing required"
          name="housing_type"
          options={housingTypes}
          value={formData.housing_type}
          onChange={handleChange}
          required
          error={errors.housing_type}
        />
        <Input
          label="Number of bedrooms needed"
          name="bedrooms_needed"
          type="number"
          value={formData.bedrooms_needed}
          onChange={handleChange}
          required
          placeholder="0"
          error={errors.bedrooms_needed}
        />
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <Dropdown
          label="Purpose of housing"
          name="purpose_of_housing"
          options={purposeOptions}
          value={formData.purpose_of_housing}
          onChange={handleChange}
          required
          error={errors.purpose_of_housing}
        />
        <Dropdown
          label="Preferred budget"
          name="preferred_budget"
          options={budgetRanges}
          value={formData.preferred_budget}
          onChange={handleChange}
          required
          error={errors.preferred_budget}
        />
      </div>

      <div>
        <label className="block text-sm font-medium leading-6 text-gray-900 mb-2">
          Any specific requirements or preferences
        </label>
        <textarea
          name="specific_requirements"
          value={formData.specific_requirements}
          onChange={handleChange}
          placeholder="Enter Information"
          rows={4}
          className="block w-full rounded-lg bg-gray-50 p-4 border border-gray-300 focus:outline-none focus:ring-1 focus:ring-green-600/50 resize-none"
        />
        <span className="text-xs text-red-600 h-4">
          {errors.specific_requirements}
        </span>
      </div>
    </div>
  );
};

// Form Step 3: Affordability Profiling
const Form3 = ({
  formData,
  handleChange,
  handleFileChange,
  errors,
  loading,
}) => {
  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900">
          Affordability Profiling
        </h2>
        <p className="text-gray-600 mt-2">
          Share your financial background to help us find suitable housing
          options.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <Dropdown
          label="Current employment status"
          name="current_employment_status"
          options={employmentStatus}
          value={formData.current_employment_status}
          onChange={handleChange}
          required
          error={errors.current_employment_status}
        />
        <Input
          label="Occupation"
          name="occupation"
          value={formData.occupation}
          onChange={handleChange}
          required
          placeholder="Enter Occupation"
          error={errors.occupation}
        />
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <Dropdown
          label="Monthly income"
          name="monthly_income"
          options={incomeRanges}
          value={formData.monthly_income}
          onChange={handleChange}
          required
          error={errors.monthly_income}
        />
        <Dropdown
          label="Source of income"
          name="source_of_income"
          options={incomeSource}
          value={formData.source_of_income}
          onChange={handleChange}
          required
          error={errors.source_of_income}
        />
      </div>

      <Dropdown
        label="Do you have any existing loans or mortgages?"
        name="existing_loans"
        options={["Yes", "No"]}
        value={formData.existing_loans}
        onChange={handleChange}
        required
        error={errors.existing_loans}
      />

      {formData.existing_loans === "Yes" && (
        <div className="grid md:grid-cols-2 gap-4">
          <Input
            label="If yes specify the type"
            name="loan_type"
            value={formData.loan_type}
            onChange={handleChange}
            placeholder="Enter type"
            error={errors.loan_type}
          />
          <Input
            label="Amount"
            name="loan_amount"
            value={formData.loan_amount}
            onChange={handleChange}
            placeholder="Enter amount"
            error={errors.loan_amount}
          />
        </div>
      )}

      <FileUpload
        label="Proof of income (Upload Recent Payslip/Bank Statement)"
        name="proof_of_income"
        onChange={handleFileChange}
        required
        error={errors.proof_of_income}
      />
    </div>
  );
};

// Progress Bar Component
const ProgressBar = ({ currentStep, totalSteps }) => {
  return (
    <div className="mb-8">
      <div className="flex items-center justify-center space-x-4">
        {[1, 2, 3].map((step) => (
          <div key={step} className="flex items-center">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                step <= currentStep
                  ? "bg-green-600 text-white"
                  : step === currentStep + 1
                  ? "bg-green-100 text-green-600 border-2 border-green-600"
                  : "bg-gray-200 text-gray-500"
              }`}
            >
              {step < currentStep ? <CheckCircle className="w-4 h-4" /> : step}
            </div>
            {step < 3 && (
              <div
                className={`w-12 h-0.5 ${
                  step < currentStep ? "bg-green-600" : "bg-gray-200"
                }`}
              />
            )}
          </div>
        ))}
      </div>
      <div className="flex justify-between text-xs text-gray-500 mt-2 px-4">
        <span>Personal Details</span>
        <span>Housing Preferences</span>
        <span>Affordability Profiling</span>
      </div>
    </div>
  );
};

// Main Multi-Step Form Component
const MultiStepForm = ({ onSubmit }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState("");
  const [formData, setFormData] = useState({
    // Personal Details
    first_name: "",
    middle_name: "",
    last_name: "",
    email: "",
    phone_number: "",
    whatsapp_number: "",
    gender: "",
    age_range: "",
    employment_status: "",
    date_of_birth: "",
    marital_status: "",
    state_of_residence: "",
    city_of_residence: "",
    home_address: "",
    state_of_origin: "",
    lga: "",
    identification_type: "",
    identification_number: "",
    proof_of_identity: null,

    // Housing Preferences
    preferred_state: "",
    preferred_city: "",
    specific_area: "",
    housing_type: "",
    bedrooms_needed: "",
    purpose_of_housing: "",
    preferred_budget: "",
    specific_requirements: "",

    // Affordability Profiling
    current_employment_status: "",
    occupation: "",
    monthly_income: "",
    source_of_income: "",
    existing_loans: "",
    loan_type: "",
    loan_amount: "",
    proof_of_income: null,
  });

  const user = localStorage.user ? JSON.parse(localStorage.user) : {};

  const [identity, setIdentity] = useState(null);
  const [income, setIncome] = useState(null);

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => {
      const newData = { ...prev, [name]: value };

      // Reset dependent city when state changes
      if (name === "state_of_residence" && prev.state_of_residence !== value) {
        newData.city_of_residence = "";
      }
      if (name === "preferred_state" && prev.preferred_state !== value) {
        newData.preferred_city = "";
      }

      return newData;
    });

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleFileChange = (e, type) => {
    const { name, files } = e.target;
    const file = files[0];

    setFormData((prev) => ({ ...prev, [name]: file }));
    type === "identity" ? setIdentity(file) : setIncome(file);
    // Clear error when user selects a file
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateStep = (step) => {
    const newErrors = {};

    if (step === 0) {
      // Personal Details validation
      if (!formData.first_name.trim())
        newErrors.first_name = "First name is required";
      if (!formData.last_name.trim())
        newErrors.last_name = "last_name is required";
      if (!formData.email.trim()) newErrors.email = "Email is required";
      else if (!/\S+@\S+\.\S+/.test(formData.email))
        newErrors.email = "Email is invalid";
      if (!formData.phone.trim()) newErrors.phone = "Phone number is required";
      if (!formData.gender) newErrors.gender = "Gender is required";
      if (!formData.age_range) newErrors.age_range = "Age range is required";
      if (!formData.employment_status)
        newErrors.employment_status = "Employment status is required";
      if (!formData.date_of_birth)
        newErrors.date_of_birth = "Date of birth is required";
      if (!formData.marital_status)
        newErrors.marital_status = "Marital status is required";
      if (!formData.state_of_residence)
        newErrors.state_of_residence = "State of residence is required";
      if (!formData.city_of_residence)
        newErrors.city_of_residence = "City of residence is required";
      if (!formData.home_address.trim())
        newErrors.home_address = "Home address is required";
      if (!formData.state_of_origin)
        newErrors.state_of_origin = "State of origin is required";
      if (!formData.lga) newErrors.lga = "LGA is required";
      if (!formData.identification_type)
        newErrors.identification_type = "Identification type is required";
      if (!formData.identification_number.trim())
        newErrors.identification_number = "Identification number is required";
      if (!formData.proof_of_identity)
        newErrors.proof_of_identity = "Proof of identity is required";
    } else if (step === 1) {
      // Housing Preferences validation
      if (!formData.preferred_state)
        newErrors.preferred_state = "Preferred state is required";
      if (!formData.preferred_city)
        newErrors.preferred_city = "Preferred city is required";
      if (!formData.housing_type)
        newErrors.housing_type = "Housing type is required";
      if (!formData.bedrooms_needed)
        newErrors.bedrooms_needed = "Number of bedrooms is required";
      if (!formData.purpose_of_housing)
        newErrors.purpose_of_housing = "Purpose of housing is required";
      if (!formData.preferred_budget)
        newErrors.preferred_budget = "Preferred budget is required";
    } else if (step === 2) {
      // Affordability Profiling validation
      if (!formData.current_employment_status)
        newErrors.current_employment_status = "Employment status is required";
      if (!formData.occupation.trim())
        newErrors.occupation = "Occupation is required";
      if (!formData.monthly_income)
        newErrors.monthly_income = "Monthly income is required";
      if (!formData.source_of_income)
        newErrors.source_of_income = "Source of income is required";
      if (!formData.existing_loans)
        newErrors.existing_loans = "Please specify if you have existing loans";
      if (!formData.proof_of_income)
        newErrors.proof_of_income = "Proof of income is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => Math.min(prev + 1, 2));
    }
  };

  const handlePrevious = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  };

  const showToast = (message, type) => {
    setToastMessage(message);
    setToastType(type);
  };
  const uploadDocs = async (id) => {
    const formData1 = new FormData();
    const formData2 = new FormData();
    // try {
    formData1.append("image", identity);
    formData2.append("image", income);
    await axiosInstance.post(`/users/${id}/identity`, formData1, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    await axiosInstance.post(+`/users/${id}/income`, formData2, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    // } catch (err) {
    //   //   throw err;
    // }
  };
  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  const handleSubmit = async () => {
    if (validateStep(currentStep)) {
      console.log("Form submitted:", formData);

      try {
        setLoading(true);
        console.log("try cacth");
        const res = await axiosInstance.post(`/users/${user._id}/compliance`, {
          personal_details: {
            date_of_birth: formData.date_of_birth,
            marital_status: formData.marital_status.toLowerCase(),
            address: {
              state: formData.state_of_residence,
              city: formData.city_of_residence,
              street: formData.home_address,
            },
            home_address: {
              state_of_origin: formData.state_of_origin,
              lga: formData.lga,
            },
            user_identity: {
              identity_type: formData.identification_type,
              identity_number: formData.identification_number,
              identity_image: identity?.name,
            },
          },
          location_preference: {
            preferred_state: formData.preferred_state,
            preferred_city: formData.preferred_city,
            type_of_housing: formData.housing_type, //"apartment"|| "detached_house"||"semi_detached"|| "terrace"
            no_of_bedrooms: formData.bedrooms_needed,
            housing_purpose: formData.purpose_of_housing, //"investment" || "residential"
            budget: formData.preferred_budget,
            preferred_area: formData.specific_area,
            customer_preference_feedback: formData.specific_requirements,
          },
          customer_account_profile: {
            employment_status: formData.employment_status.toLowerCase(),
            occupation: formData.occupation.toLowerCase(),
            monthly_income: formData.monthly_income.toLowerCase(),
            source_of_income: formData.source_of_income.toLowerCase(), //"investments" || "salary"
            loans_and_mortgage: {
              out_standing: formData.out_standing === "Yes",
              loan_type: formData.loan_type.toLowerCase(),
              loan_amount: formData.loan_amount.toLowerCase(),
            },
            proof_of_income: income?.name,
          },
        });
        await uploadDocs(res?.data?.data?.compliance?._id);
        setLoading(false);
        showToast("Application submitted successfully", "success");
        onSubmit();
      } catch (err) {
        console.log(err);
        setLoading(false);
        showToast("Failed to submit application", "error");
      }
    }
  };

  const renderCurrentForm = () => {
    switch (currentStep) {
      case 0:
        return (
          <Form1
            formData={formData}
            handleChange={handleChange}
            handleFileChange={(e) => handleFileChange(e, "identity")}
            errors={errors}
          />
        );
      case 1:
        return (
          <Form2
            formData={formData}
            handleChange={handleChange}
            errors={errors}
          />
        );
      case 2:
        return (
          <Form3
            formData={formData}
            handleChange={handleChange}
            handleFileChange={(e) => handleFileChange(e, "income")}
            errors={errors}
          />
        );
      default:
        return null;
    }
  };

  console.log(user);
  useEffect(() => {
    setFormData({
      ...formData,
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      phone: user.phone_number,
      gender: user.gender,
      employment_status: user.employment_status,
      age_range: user.age_range,
    });
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900">
              Housing Application Form
            </h1>
            <p className="text-gray-600 mt-2">
              To be considered for an apartment in a public housing development,
              you must submit an application
            </p>
          </div>

          <ProgressBar currentStep={currentStep + 1} totalSteps={3} />

          {renderCurrentForm()}

          <div className="flex justify-between mt-8 pt-6 border-t border-gray-200">
            {currentStep > 0 && (
              <button
                onClick={handlePrevious}
                className="flex items-center gap-2 px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
                Previous
              </button>
            )}

            <div className="ml-auto">
              {currentStep < 2 ? (
                <button
                  onClick={handleNext}
                  className="px-8 py-3 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors"
                >
                  Proceed
                </button>
              ) : (
                <button
                  onClick={handleSubmit}
                  className="px-8 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  {loading ? <Loader /> : "Submit"}
                </button>
              )}
            </div>
          </div>
        </div>

        <div className="text-center mt-8">
          <p className="text-sm text-gray-500">
            © 2024 FHA Renewed Hope Housing Portal. All rights reserved
          </p>
        </div>
      </div>
      <CustomToast message={toastMessage} type={toastType} />
    </div>
  );
};

export default MultiStepForm;
