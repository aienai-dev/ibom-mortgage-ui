import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import Landing from "./pages/landing";
// import Home from "./pages/home";
import Login from "./pages/login";
import ForgotPassword from "./pages/forgotPassword";
import Resetpassword from "./pages/resetPassword";
import Createpassword from "./pages/createPassword";
import "react-toastify/dist/ReactToastify.css";
// import { ToastContainer } from "react-toastify";
import Dashboard from "./pages/Dashboard";
import ExpressInterest from "./pages/ExpressInterest";
import { ToastBar, Toaster } from "react-hot-toast";


function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/interest-form" element={<ExpressInterest />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<Resetpassword />} />
        <Route path="/create-password/:token" element={<Createpassword />} />
        <Route path="/test/*" element={<></>} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      {/* <ToastContainer
        position="top-right"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={true}
        theme="light"
      /> */}
      <Toaster position="top-center" />
    </>
  );
}

export default App;
