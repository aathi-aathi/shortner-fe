import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { backendUrl } from './apis'
import { jwtDecode } from 'jwt-decode'

const Profile = () => {
    const navigate = useNavigate()
    const token = localStorage.getItem('token')
    const decoded = jwtDecode(token)
    const email = decoded.email
    const [name,setName] = useState('')
    const getUserData = async()=>{
      const {data} = await axios.get(`${backendUrl}/get-info/${email}`)
      setName(data.name)
    }
    
    const logout = ()=>{
      localStorage.removeItem('isAuthenticate')
      navigate('/login')
    }
    useEffect(()=>{
      getUserData()
    },[])
  return (
    <div className="max-lg:w-11/12  max-w-md bg-blur bg-white/10 w-full flex flex-col gap-1 items-center bg-white p-6 h-fit lg:h-96 shadow-xl">
        <h2 className="text-3xl font-semibold font-kanit text-center text-white mb-6">
          User Info
        </h2>
        <img className='h-20 w-20 rounded-full border-4 border-double' src='https://cdn-icons-png.flaticon.com/128/3237/3237472.png'/>
        <div className='flex flex-col items-start'>
        <p className='  text-center text-white mt-5'><i className="fa-solid mt-2 fa-user text-slate-200 mr-2"></i>{name}</p>
        <p className=' text-center text-white mb-6'><i className="fa-regular fa-envelope mt-2 text-slate-200 mr-2"></i>{email}</p>
        </div>
       
        <button onClick={()=>navigate('/urls')} className=' rounded duration-200 border  hover:bg-blue-600 font-bold font-meri text-center text-white  px-2 p-1 ' >
            Shortened URLs
        </button>
        <div className='text-red-500 mt-5 cursor-pointer' onClick={logout}>
        <i className="fa-solid fa-right-from-bracket mr-2"></i>
        <span>Logout</span>
        </div>
    </div>
  )
}

export default Profile