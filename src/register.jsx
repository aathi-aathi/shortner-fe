import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { backendUrl } from "./apis";

const Register = () => {
  const navigate = useNavigate()
  const [loading,setLoading] = useState(false)
  const [error,setError] = useState('')
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = async(e) =>{
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
     const {data} = await axios.post(`${backendUrl}/user`,formData)
      navigate(`/otp-verify/${data.token}`)
    } catch (error) {
      let status = error.response.status
      if(status == 400){
        setError('User Already Exist')
      }
    }
    setLoading(false)
  }
  return (
    
      <div className="max-lg:w-11/12  max-w-md bg-blur bg-white/10 w-full bg-white p-6 h-fit shadow-xl">
        <h2 className="text-3xl font-semibold font-kanit text-center text-white mb-6">
          Create an Account
        </h2>
        {error && <p className="text-center font-meri text-red-600 font-semibold">{error}</p>}
        <form className="font-meri" onSubmit={handleSubmit}>
          <div className="mb-4  flex gap-1 items-center border-b">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-600 mb-1"
            >
                 <i className="fa-solid mt-2 fa-user text-slate-200 "></i>
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-3 py-2  opacity-90 text-slate-100  bg-inherit  focus:outline-none focus:outline-none"
              placeholder="Enter your name"
            />
          </div>
          <div className="mb-4 flex gap-1 items-center border-b">
            <label
              htmlFor="email"
              className="block text-sm font-medium mb-1"
            >
                <i className="fa-regular fa-envelope mt-2 text-slate-200"></i>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-3 py-2 opacity-90 text-slate-100 bg-inherit focus:outline-none focus:outline-none"
              placeholder="Enter your email"
            />
          </div>
          <div className="mb-4  flex gap-1 items-center border-b">
            <label
              htmlFor="password"
              className="block text-sm font-medium  text-gray-600 mb-1"
            >
                <i className="fa-solid fa-lock text-slate-200 mt-2"></i>
            </label>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-3 py-2 opacity-90 text-slate-100 bg-inherit focus:outline-none focus:outline-none"
              placeholder="Enter your password"
            />
          </div>
          <div className="flex items-center mb-4 ">
            <input
              type="checkbox"
              id="showPassword"
              checked={showPassword}
              onChange={() => setShowPassword(!showPassword)}
              className="mr-2 h-4 w-4 text-blue-600   focus:ring-blue-500 border-gray-300 rounded-full "
            />
            <label htmlFor="showPassword" className="text-sm text-slate-100">
              Show Password
            </label>
          </div>
          <p className="text-center text-sm mb-2 text-slate-200">Do you already have an Account? 
          <Link to='/login' className="underline">Login</Link></p>
          <button  className="flex justify-center bg-blue-500 rounded w-full p-2 text-white hover:bg-blue-600 mb-2 ...">
            {loading ? <div className="w-5 h-5 border-4 border-t-transparent 
            border-white rounded-full animate-spin" 
            role="status"><span className="sr-only">Loading...</span>
            </div>: 'Signup'}
            </button> 
        </form>
      </div>
    
  );
};

export default Register;
