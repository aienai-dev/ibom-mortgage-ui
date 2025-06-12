import React, { useState, } from "react";

const FileUpload = ({ label, isRequired, name, value }) => {
  const upload =
    "https://res.cloudinary.com/dzquobiiy/image/upload/v1723102507/Upload_ws4mqt.svg";
  const [selectedFile, ] = useState(value);
  // eslint-disable-next-line
  const [file, setFile] = useState()

  // const handleFileChange = (event, name) => {
  //   const file = event.target.files[0];
  //   setSelectedFile(file);
  //   onFileSelect(file, name);
  //   console.log(file, name);
  // };

  function handleChange(e) {
    console.log(e.target.files);
        setFile(URL.createObjectURL(e.target.files[0]));
  }
  // useEffect(() => {
  //   setSelectedFile(value);
  // }, []);

  return (
    <div className="flex flex-col gap-[8px]">
      <div className="flex">
        {label && (
          <span className="font-[500] text-[14px] text-[#3D454E]">{label}</span>
        )}
        {isRequired && <span className="text-[#FF3D00]">*</span>}
      </div>
      <input
        type="file"
        onChange={handleChange}
        className="hidden"
        id="file-input"
      />
      <label
        htmlFor="file-input"
        className="cursor-pointer border border-dashed rounded-[8px] py-[30px] border-[#DED8D8]  flex items-center justify-center"
      >
        <div className="flex flex-col gap-[16px] justify-center items-center max-w-[368px] w-full">
          <img className="w-[48px] h-[48px]" src={upload} alt="" />
          <div className="w-full px-[15px] flex flex-col gap-[8px] items-center justify-center">
            <span className="font-[400] text-[16px] text-[#475467]">
              {selectedFile ? (
                selectedFile?.name
              ) : (
                <span className="font-[500] text-[#338330]">
                  Click to Upload{" "}
                  <span className="font-[400] text-[16px] text-[#475467]">
                    or drag and drop
                  </span>
                </span>
              )}
            </span>
            <span className="font-[300] text-[14px] text-center sm:text-start text-[#475467]">
              JPEG, PNG, or PDF formats (max file size. 10MB)
            </span>
            {/* <img src={file} /> */}
          </div>
        </div>
      </label>
    </div>
  );
};

export default FileUpload;
