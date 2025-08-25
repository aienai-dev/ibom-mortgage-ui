import React from "react";

const ApplicationItem = () => {
  const complianceData = localStorage.user
    ? JSON.parse(localStorage.compliance)
    : {};
  const applicationIcon =
    "https://res.cloudinary.com/dzquobiiy/image/upload/v1724098057/application-icon_sqpx1h.svg";
  return (
    <div className="w-full px-[32px] py-[16px] flex items-center gap-[16px]">
      <img className="w-full max-w-[35px]" src={applicationIcon} alt="" />
      <div className="flex w-full flex-col gap-[8px]">
        <div className="flex items-center gap-[12px]">
          <span className="font-[600] text-[16px] text-[#338330]">
            Application ({complianceData?._id})
          </span>
          <span
            className={`py-[4px] px-[12px] whitespace-nowrap font-[400] text-[12px] rounded-[22px] ${
              complianceData?.status === "pending-review"
                ? "text-[#FFA500] bg-[#ffa6002f]"
                : complianceData?.status === "rejected"
                ? "text-[#FF3D00] bg-[#ff3c0034]"
                : "text-[#26A54D] bg-[#26a54c34]"
            }`}
          >
            {complianceData?.status === "pending-review" && "Pending Approval"}
            {complianceData?.status === "rejected" && "Rejected"}
            {complianceData?.status === "approved" && "Approved"}
          </span>
        </div>
        <span className="font-[400] max-w-[500px] text-[14px] text-[#3D454E]">
          {complianceData?.status === "pending-review" &&
            "Your application has been successfully submitted and is currently being reviewed. You will be notified as once complete and you can proceed to the nest stage."}
          {/* {complianceData?.status ==='approved' && 'Your application has been successfully submitted and is currently being reviewed. You will be notified as once complete and you can proceed to the nest stage.'}
          {complianceData?.status ==='rejected' && 'Your application has been successfully submitted and is currently being reviewed. You will be notified as once complete and you can proceed to the nest stage.'} */}
        </span>
      </div>
    </div>
  );
};

export default ApplicationItem;
