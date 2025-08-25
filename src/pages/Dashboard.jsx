import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
// The following components are assumed to be available in the project structure
// Since the original code had these imports, we will keep them as they are
// If the user's project does not have these files, the error will persist
import Navbar from "../components/navbar";
import ApplicationItem from "../components/ApplicationItem";
import ApplicationForm from "../components/forms/ApplicationForm";
import axiosInstance from "../api/axios";
import Loader from "../components/common/Loader";

// Dashboard component to manage user's application process
const Dashboard = () => {
  // Tabs for dashboard navigation (although only 'Dashboard' is active here)
  const tabs = ["Dashboard", "My Application", "My Profile"];
  const [activeTab, setActiveTab] = useState("Dashboard");
  const [formLoading, setFormLoading] = useState(false);
  const [activeCompliance, setActiveCompliance] = useState(false);
  const [isApplicationOpen, setApplicationOpen] = useState(false);
  const [loadingAccount, setLoadingAccount] = useState(false);
  const [account, setAccount] = useState({});
  const [hidePayment, setHidePayment] = useState(false);
  const [user, setUser] = useState({});
  const [firstTimer, setFirstTimer] = useState(false);
  const [compliance, setCompliance] = useState({});

  // Get user data from local storage
  // const user =

  const navigate = useNavigate();

  // Function to fetch user's compliance status
  const getCompliance = async () => {
    setFormLoading(true);
    try {
      const res = await axiosInstance.get(`/users/${user._id}/compliance`);
      setFormLoading(false);
      setActiveCompliance(true);
      setCompliance(res.data.data.compliance);
      let u = localStorage.user ? JSON.parse(localStorage.user) : {};
      localStorage.setItem(
        "compliance",
        JSON.stringify(res.data.data.compliance)
      );
      localStorage.setItem(
        "user",
        JSON.stringify({
          ...u,
          compliance_status: res.data.data.status,
        })
      );
    } catch (err) {
      setFormLoading(false);
      if (err?.response?.data?.status === 401) {
        toast.error("Session timeout!");
        navigate("/login");
      } else if (err.response?.data?.status === 404) {
        setActiveCompliance(false);
      }
    }
  };

  const validatePayment = async () => {
    try {
      setLoadingAccount(true);
      const res = await axiosInstance.get(`/users/validate-payment`);
      if (
        res.data.data?.message &&
        res.data.data?.message === "Payment Received"
      ) {
        setHidePayment(true);
        // setUser({ ...user, payment_details: res.data.data?.payment_details });
        localStorage.setItem(
          "user",
          JSON.stringify({
            ...user,
            payment_details: res.data.data?.payment_details,
          })
        );
      }
      console.log(res);
      setLoadingAccount(false);
    } catch (err) {
      setLoadingAccount(false);
      if (err?.response?.data?.status === 401) {
        toast.error("Session timeout!");
        navigate("/login");
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    }
  };

  const getVirtualAccount = async () => {
    try {
      setLoadingAccount(true);
      const res = await axiosInstance.get(`/users/initiate-payment`);
      if (
        res.data.data?.message &&
        res.data.data?.message === "Payment Received"
      ) {
        setHidePayment(true);
        localStorage.setItem(
          "user",
          JSON.stringify({
            ...user,
            payment_details: res.data.data?.payment_details,
          })
        );
      } else {
        setAccount(res.data.data);
        setHidePayment(false);
      }
      console.log(res);
      setLoadingAccount(false);
    } catch (err) {
      setLoadingAccount(false);
      if (err?.response?.data?.status === 401) {
        toast.error("Session timeout!");
        navigate("/login");
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    }
  };

  useEffect(() => {
    if (!localStorage.access_token) {
      navigate("/login");
    } else {
      let u = localStorage.user ? JSON.parse(localStorage.user) : {};
      setUser(u);
      if (u.payment_details.status === "unpaid") setFirstTimer(true);
      getCompliance();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="w-full flex flex-col gap-[81px] justify-center items-center">
      <Navbar />

      <div className="w-full flex justify-center items-center">
        <div className="w-full flex flex-col   gap-[40px] max-w-[840px]">
          <div className="w-full pb-[40px] flex flex-col gap-[50px]">
            <div className="flex  flex-col px-[20px] gap-[5px]">
              <span className=" font-[600] text-[36px] text-[#030812]">
                Welcome, {user?.first_name}
              </span>
              <span className=" text-[14px] font-[400] text-[#3D454E]">
                {activeCompliance
                  ? "Your application has been received! You can explore your dashboard to review your details and manage your applications."
                  : ""}
              </span>
            </div>
            {/* Conditional rendering for application item based on user status */}
            {localStorage.compliance && localStorage.compliance !== "null" ? (
              <div className="max-w-[840px] flex flex-col gap-[16px] w-full">
                <div className="flex items-center gap-[16px]">
                  <div className="w-[12px] border-[0.5px] border-[#E6E6E6]"></div>
                  <span>Applications</span>
                  <div className="w-full border-[0.5px] border-[#E6E6E6]"></div>
                </div>
                <ApplicationItem />
              </div>
            ) : (
              <>
                {firstTimer ? (
                  <div className="w-full  flex items-center p-[30px] bg-[#0000000a]">
                    <div className="flex flex-col items-center gap-[10px] min-w-[200px] w-fit h-fit ">
                      <span className="text-[16px] font-[700]">
                        Account Setup
                      </span>
                      <div className="flex justify-center items-center w-[70px] h-[70px] rounded-full border-4 border-r-orange-500 text-orange-600 font-bold">
                        25%
                      </div>
                    </div>
                    {hidePayment ? (
                      <PaymentSuccess
                        startApplication={() => {
                          setApplicationOpen(true);
                          setFirstTimer(false);

                          setUser({
                            ...user,
                            payment_details: {
                              ...user?.payment_details,
                              status: "paid",
                            },
                          });
                          localStorage.setItem(
                            "user",
                            JSON.stringify({
                              ...user,
                              payment_details: {
                                ...user.payment_details,
                                status: "paid",
                              },
                            })
                          );
                          window.location.reload();
                        }}
                      />
                    ) : (
                      <PaymentFinalization
                        onPayNow={getVirtualAccount}
                        onUploadReceipt={validatePayment}
                        loading={loadingAccount}
                        account={account}
                        setAccount={setAccount}
                      />
                    )}
                  </div>
                ) : (
                  <>
                    <div className="flex flex-col w-full bg-[#00000007] p-[20px] gap-[32px]">
                      <div className="flex gap-[16px] items-center">
                        <div className="w-full border-[0.5px] border-[#E6E6E6]"></div>
                        <span className="whitespace-nowrap text-[16px] font-[400] text-[#030812]">
                          Take the next step
                        </span>
                        <div className="w-full border-[0.5px] border-[#E6E6E6]"></div>
                      </div>

                      {!isApplicationOpen ? (
                        <div className="w-full flex  flex-col  gap-[32px]">
                          <div className="flex flex-col gap-[16px]">
                            <span className="font-[600] text-[24px]  text-[#030812]">
                              Start Your Application
                            </span>
                            <span className="font-[400] text-[14px] max-w-[520px]  text-[#3D454E]">
                              Ready to get started? Your journey to
                              homeownership begins here. Click the button below
                              to complete your application.
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
                          loadCompliance={getCompliance}
                          onSubmit={() => {
                            setActiveCompliance(true);
                          }}
                        />
                      )}
                    </div>
                  </>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
const PaymentFinalization = ({
  onPayNow,
  onUploadReceipt,
  loading,
  account,
  setAccount,
}) => {
  return (
    <div className="flex flex-col items-center justify-center p-8 bg-white rounded-lg shadow-lg  my-8">
      <div className="w-full">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Start your application
        </h2>
        <p className="text-gray-600 text-[12px] mb-6">
          You are required to pay a non-refundable fee of NGN 20,000 to start
          this application. Please review the details below. If you've already
          made the payment, upload your receipt to proceed.
        </p>

        <div className="border border-gray-200 rounded-lg overflow-hidden mb-6">
          <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-800">
              Payment Summary
            </h3>
          </div>
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Description
                </th>
                <th
                  scope="col"
                  className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Amount
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              <tr>
                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                  Base Application Fee
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-sm text-right font-medium text-gray-900">
                  NGN 20,000.00
                </td>
              </tr>
              {account?.accountNumber && (
                <>
                  <tr>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                      Bank Name
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-right font-medium text-gray-900">
                      {"Ibom Mortgage Checkout"}
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                      Account Name
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-right font-medium text-gray-900">
                      {account?.accountName}
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                      Account Number
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-right font-medium text-gray-900">
                      {account?.accountNumber}
                    </td>
                  </tr>
                </>
              )}
            </tbody>
          </table>
        </div>
        {account?.accountNumber && (
          <CountdownTimer reset={() => setAccount({})} />
        )}
        <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
          {!account?.accountNumber ? (
            <button
              onClick={onPayNow}
              className="flex-1 px-6 py-3 text-sm font-medium rounded-lg text-white bg-[#030812] hover:bg-gray-800 transition-colors"
            >
              {loading ? <Loader /> : "Pay Now"}
            </button>
          ) : (
            <button
              onClick={onUploadReceipt}
              className="flex-1 px-6 py-3 text-sm font-medium rounded-lg text-gray-700 bg-white border border-gray-300 hover:bg-gray-100 transition-colors"
            >
              {loading ? <Loader /> : "I have made payment"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
const CountdownTimer = ({ reset }) => {
  // Initial time in seconds (19 minutes * 60 seconds/minute)
  const initialTime = 19 * 60;
  // State to hold the remaining time in seconds
  const [timeLeft, setTimeLeft] = useState(initialTime);

  useEffect(() => {
    // Exit if the countdown is finished
    if (timeLeft <= 0) {
      reset();
      return;
    }

    const timerId = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);

    return () => clearInterval(timerId);
  }, [timeLeft]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;

  return (
    <div className="text-center ">
      <span>{minutes}</span>:<span>{formattedSeconds}</span>
    </div>
  );
};
const PaymentSuccess = ({ startApplication }) => {
  return (
    <div className="flex flex-col items-center justify-center bg-gray-100 p-4">
      <div className="text-center bg-white p-8 rounded-xl shadow-lg max-w-lg w-full">
        {/* Success Icon */}
        <div className="flex justify-center mb-6">
          <svg
            className="w-20 h-20 text-green-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 12l2 2l4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            ></path>
          </svg>
        </div>

        {/* Success Message */}
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Payment Successful!
        </h1>
        <p className="text-gray-600 mb-6">
          Thank you for your payment. Your transaction has been completed, and a
          receipt has been sent to your email.
        </p>

        {/* Action Button */}
        <button
          onClick={startApplication}
          className="w-full px-6 py-3 text-sm font-medium rounded-lg text-white bg-[#030812] hover:bg-gray-800 transition-colors"
        >
          Start Your Application
        </button>
      </div>
    </div>
  );
};
export default Dashboard;
