import axios from "axios";
import { jwtDecode } from "jwt-decode";
import React, { useState, useRef, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { backendUrl } from "./apis";


const OTPVerification = () => {
    const navigate = useNavigate()
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [error, setError] = useState("");
  const [timer, setTimer] = useState(30); // Resend timer (seconds)
  const inputsRef = useRef([]);
  const pathparam = useParams()
  const token = pathparam.token
const decoded = jwtDecode(token)
const email = decoded.email
  useEffect(() => {
    if (timer > 0) {
      const countdown = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
      return () => clearInterval(countdown); // Cleanup on component unmount
    }
  }, [timer]);

  const handleChange = (value, index) => {
    if (/^[0-9]?$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      setError("");
      // Focus the next input
      if (value && index < 3) {
        inputsRef.current[index + 1].focus();
      }
    }
  };

  const handleBackspace = (e, index) => {
    if (e.key === "Backspace" && otp [index] === "" && index > 0) {
      inputsRef.current[index - 1].focus();
    }
  };

  const handleVerify = async(e) => {
    e.preventDefault()
    const enteredOtp = otp.join("");
    if (enteredOtp.length !== 4) {
      setError("Please enter all 4 digits of the OTP.");
    } else {
      setError("");
      let otpnum = Number(enteredOtp)
      try {
        await axios.post(`${backendUrl}/check-otp`,{email,otpnum})
        navigate(`/login`)
      } catch (error) {
        setError('Incorrect OTP')
      }
    }
  };

  const handleResendOtp = async(e) => {
    e.preventDefault()
    setOtp(["", "", "", ""]); // Clear the inputs
    setTimer(30); // Reset the timer
    setError("");
    await forgotPassword({email})
    // Add your resend OTP API logic here
  };

  return (
   
    <div className="max-lg:w-11/12  max-w-md bg-blur flex flex-col items-center justify-center bg-white/10 w-full bg-white p-6 h-96 shadow-xl">
     <h2 className="text-3xl font-semibold font-kanit text-center text-white mb-6">
          Verify Your Account
        </h2>
    <p className="text-sm text-slate-200 w-4/5 text-center">Enter the OTP you received at
    <strong> {email}</strong>
    </p>
      <div className="flex gap-2 mb-4 mt-4">
        {otp.map((digit, index) => (
          <input
            key={index}
            type="text"
            maxLength="1"
            value={digit}
            ref={(el) => (inputsRef.current[index] = el)}
            onChange={(e) => handleChange(e.target.value, index)}
            onKeyDown={(e) => handleBackspace(e, index)}
            className="w-12 bg-inherit h-12 text-center text-xl text-slate-200 border border-gray-300 rounded-md  focus:outline-none"
          />
        ))}
      </div>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <button
        onClick={handleVerify}
        className="px-6 py-2 mb-4 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
      >
        Verify
      </button>
      <div className="text-center mb-4">
        {timer > 0 ? (
          <p className="text-slate-200">Resend OTP in {timer}s</p>
        ) : (
          <button
            onClick={handleResendOtp}
            className="text-slate-200 hover:underline focus:outline-none"
          >
            Resend OTP
          </button>
        )}
      </div>
    </div>
  
  );
};

export default OTPVerification;