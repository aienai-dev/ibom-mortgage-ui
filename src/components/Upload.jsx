import React, { useState } from "react";
import { FaFilePdf, FaImage } from "react-icons/fa";
import { IoDocumentText } from "react-icons/io5";

const Upload = ({ value, label, isRequired, handleUpload, error, update }) => {
  const upload =
    "https://res.cloudinary.com/dzquobiiy/image/upload/v1723102507/Upload_ws4mqt.svg";
  const [selectedFile, setSelectedFile] = useState(null);
  const [file, setFile] = useState(false);

  const handleChange = (e) => {
    setSelectedFile(e.target.files[0]);
    handleUpload(e.target.files[0]);
    setFile(false);
    setProgress(0);
    increaseTo100(0);
  };
  const [progress, setProgress] = useState(0);
  function increaseTo100(value) {
    // Base case: If the value is 100 or more, stop the recursion
    if (value >= 100) {
      console.log("Final value:", value);
      setFile(true);
      return;
    } else {
      console.log("Current value:", value);
      setProgress(value);
      setTimeout(() => {
        increaseTo100(value + 10);
      }, 100);
    }
  }

  return (
    <div className="flex flex-col gap-[8px] w-full ">
      <div className="flex items-center justify-between">
        <span className="font-[500] text-[14px] text-[#3D454E]">
          {label} {isRequired && <span className="text-[#FF3D00]">*</span>}
        </span>
        <span className="text-[#FF3D00] font-[500] text-[14px] ">{error}</span>
      </div>
      <div className="flex flex-col border border-dashed border-[#DED8D8]  relative gap-[16px] justify-center items-center min-h-[175px] rounded-[10px] w-full">
        <span className="w-[48px] h-[48p] bg-[#F9FAFB] flex items-center justify-center rounded-full">
          <img className="w-[48px] h-[48px]" src={upload} alt="" />
        </span>
        <span className="font-[400] text-[16px] text-[#475467]">
          <span className="font-[500] text-[#338330]">Click to Upload </span>
        </span>
        {!selectedFile && !update ? (
          <>
            <div className="w-full px-[15px] flex flex-col gap-[8px] items-center justify-center">
              <span className="font-[300] text-[14px] text-center sm:text-start text-[#475467]">
                {selectedFile
                  ? selectedFile?.name
                  : " JPEG, PNG, or PDF formats (max file size. 10MB)"}
              </span>
              {/* <img src={file} /> */}
            </div>
          </>
        ) : (
          <div
            className={`${
              file ? "" : "w-full h-[48px]"
            }   flex items-center justify-center`}
          >
            <div className="flex flex-col max-w-[338px] items-center w-full gap-[16px] ">
              {!file && selectedFile && (
                <span className="text-[12px] text-[#475467] font-[400]">
                  Uploading Document
                </span>
              )}

              {!file && selectedFile && (
                <div className="flex bg-[#F3F6F8] h-[8px] w-full max-w-[338px] overflow-hidden rounded-[8px]">
                  <div
                    style={{ width: progress + "%" }}
                    className=" bg-[#338330] h-full transition-all ease duration-300"
                  ></div>
                </div>
              )}

              {selectedFile?.type && (
                <div className="flex items-center gap-[10px]">
                  {!selectedFile?.type?.includes("image") ? (
                    <FaFilePdf className="text-[#C3281B] text-[24px]" />
                  ) : (
                    <FaImage className=" text-[24px]" />
                  )}
                  <span className="text-[#475467] text-[12px] font-[400] whitespace-nowrap truncate">
                    {selectedFile?.name}
                  </span>
                </div>
              )}
              {!selectedFile?.type && (
                <div className="flex items-center gap-[10px]">
                  <IoDocumentText className=" text-[24px]" />
                  <span className="text-[#475467]  text-[12px] font-[400] whitespace-nowrap truncate">
                    {update}
                  </span>
                </div>
              )}
            </div>
          </div>
        )}
        <input
          type="file"
          onChange={handleChange}
          className="absolute left-0 opacity-0 top-0 bottom-0 right-0 w-full h-full"
        />
      </div>
      {/* <div className="w-full h-[88px]  flex items-center justify-between">
        <flex className="flex flex-col max-w-[338px] w-full gap-[16px] ">
          <span className="text-[12px] text-[#475467] font-[400]">
            Uploading Document
          </span>

          <div className="flex bg-[#F3F6F8] h-[8px] w-full max-w-[338px] overflow-hidden rounded-[8px]">
            <div
              style={{ width: increaseTo100(0) + "%" }}
              className=" bg-[#338330] h-full transition-all ease duration-300"
            ></div>
          </div>

          <div className="flex items-center gap-[10px]">
            {!selectedFile?.type?.includes("image") ? (
              <FaFilePdf className="text-[#C3281B] text-[24px]" />
            ) : (
              <FaImage className=" text-[24px]" />
            )}
            <span className="text-[#475467] text-[12px] font-[400] whitespace-nowrap truncate">
              {selectedFile?.name}
            </span>
          </div>
        </flex>
      </div> */}
    </div>
  );
};

export default Upload;
