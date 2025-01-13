import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { backendUrl } from "./apis";

const Login = () => {
   const [loading,setLoading] = useState(false)
  const [error,setError] = useState('')
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate()
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value});
  };
  const handleSubmit= async(e)=>{
    e.preventDefault()
    setLoading(true) 
    try {
     const {data} =  await axios.post(`${backendUrl}/login`,formData)
      console.log('completed')
      localStorage.setItem('token',data.token)
      localStorage.setItem('isAuthenticate',true)
      navigate('/')
    } catch (error){
      let status = error.response.status
      if(status == 401){
        setError('You are not user, Please register your account')
    }else if(status == 400){
       setError('Please enter valid password')
    }else{
      setError('Something went wrong')
    }
    }
    setLoading(false)
  }
  return (
    
      <div className="max-lg:w-11/12  max-w-md bg-blur bg-white/10 w-full bg-white p-6 h-fit lg:h-96 shadow-xl">
        <h2 className="text-3xl font-semibold font-kanit text-center text-white mb-6">
          Login Your Account
        </h2>
        {error && <p className="text-center font-meri text-red-600 font-semibold">{error}</p>}
        <form className="font-meri flex flex-col gap-2" onSubmit={handleSubmit}>
          <div className="mb-5 flex gap-1 items-center border-b">
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
          <div className="mb-2  flex gap-1 items-center border-b">
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
          <div className="flex items-center mb-5 ">
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
          <p className="text-center text-sm mt-5 text-slate-200">Don't have an Account? <Link to='/register' className="underline">Sign up</Link></p>
          <button  className="flex justify-center bg-blue-500 rounded w-full p-2 text-white hover:bg-blue-600 mb-2 ...">
            {loading ? <div className="w-5 h-5 border-4 border-t-transparent 
            border-white rounded-full animate-spin" 
            role="status"><span className="sr-only">Loading...</span>
            </div>: 'Login'}
            </button> 
        </form>
      </div>
    
  );
};

export default Login;
