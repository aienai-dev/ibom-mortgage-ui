import { useEffect, useState } from "react";

const CustomToast = ({ message, type }) => {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    if (message) {
      setVisible(true);
      const timer = setTimeout(() => setVisible(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  if (!visible) return null;

  const bgColor = type === "success" ? "bg-green-500" : "bg-red-500";
  const textColor = "text-white";

  return (
    <div
      className={`fixed top-4 right-4 p-4 rounded-lg shadow-lg ${bgColor} ${textColor} transition-transform duration-300 transform z-50`}
    >
      {message}
    </div>
  );
};

export default CustomToast;
