import React, {  useState } from "react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

// import TextField from '@mui/material/TextField';
import dayjs from "dayjs";
import moment from "moment";

const Datepicker = ({
  label,
  placeholder,
  handleDateChange,
  name,
  value,
  isRequired,
  error
}) => {
  const calendar = "https://res.cloudinary.com/dzquobiiy/image/upload/v1723102505/calendar-2_gfztyv.svg";
  const [selectedDate, setSelectedDate] = useState(null);
  const [formatted, setFormatted] = useState("DD/MM/YYYY");

  // useEffect(() => {
  //   if (value) {
  //     setSelectedDate(value);
  //   } else {
  //     setSelectedDate(dayjs());
  //   }
  // }, [value]);

  const handleDateSelect = (newDate) => {
    console.log(newDate);
    const currentDate = dayjs();
    // console.log('Current date:', currentDate);
    const day = newDate.$d.toString();
    // console.log("newday", day);
    // alert(moment(day).format("l"));
    setFormatted(moment(day).format("l"));
    setSelectedDate(newDate);
    handleDateChange(day, name, currentDate);
  };

  return (
    <div className="flex flex-col gap-[8px] w-full">
      <div className="flex">
        {label && (
          <span className="font-[500] text-[14px] text-[#3D454E]">{label}</span>
        )}
        {isRequired && <span className="text-[#FF3D00]">*</span>}
      </div>
      <div className="relative">
        <div className="flex flex-col gap-[6px] w-full">
        <div className="flex justify-between items-center border border-[#26A54D4F] rounded-[8px] px-[12px] h-[48px] w-full">
          <span className="border-none w-full text-[#3D454E] text-[14px] font-[400] ">{formatted}</span>
          <span className="bg-[#fff] flex items-center absolute right-[12px] h-[40px] w-[30px]">
            <img className=" bg-[]" src={calendar} alt="" />
          </span>
        </div>
        <span className="text-[12px] text-red-600 h-[16px]">{error}</span>
        </div>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer components={["DatePicker"]}>
            <DatePicker
              sx={{
                height: "48px",
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                opacity: 0,
              }}
              label="Basic date picker"
              value={selectedDate}
              onChange={handleDateSelect}
            />
          </DemoContainer>
        </LocalizationProvider>
      </div>
      {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          label={placeholder}
          sx={{ height: "48px" }}
          value={selectedDate}
          onChange={handleDateSelect}
          inputFormat="yyyy/MM/dd"
          slotProps={{ textField: { size: "small" } }}
          renderInput={(params) => (
            <TextField
              {...params}
              fullWidth
              sx={{
                '& .MuiOutlinedInput-root': {
                  height: '48px',
                  '& fieldset': {
                    borderColor: '#26A54D4F',
                  },
                },
              }}
            />
          )}
        />
      </LocalizationProvider> */}
    </div>
  );
};

export default Datepicker;
