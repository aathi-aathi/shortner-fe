import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { backendUrl } from './apis'
import { jwtDecode } from 'jwt-decode'
import { useNavigate } from 'react-router-dom'

const UrlList = () => {
    const [urls,seturls] = useState([])
    const token = localStorage.getItem('token')
    const decoded = jwtDecode(token)
    const email = decoded.email
    const navigate = useNavigate()
    const deleteUrl = async(index,id)=>{
       let filtered = urls.filter((val,i)=> index != i)
       seturls(filtered)
       await axios.delete(`${backendUrl}/url-list/${id}`)
    }
    const getList = async()=>{
        const response = await axios.get(`${backendUrl}/url-list/${email}`)
        seturls(response.data.reverse())
    }
    useEffect(()=>{
        getList()
    },[])
  return (
   <div className='bg-gradient-to-b from-teal-900 to-blue-900 min-h-screen flex justify-center'>
    {urls.length <1 ?<div className='pt-10 text-2xl text-slate-100 h-screen items-center justify-center flex flex-col '>
        <img src='https://cdn-icons-png.flaticon.com/128/13543/13543082.png'/>
        <p className='text-orange-300'>URL not found</p>
        </div>:
    <div className='pt-10 w-9/12 flex flex-col gap-2 pb-12'>
    {urls.map((val,index)=>
    <div key={val.id} className='font-meri text-white/90'>
        <p>{val.date}</p>
        <div className='border mt-1 p-2 flex justify-between items-center rounded-xl'>
            <div> <p className='break-words'>Long URL :<a href={val.longUrl} className='underline' target='_blank'>{val.longUrl}</a></p>
            <p className='break-words'>Short URL :<a  href={val.shortUrl} className='underline' target='_blank'>{val.shortUrl}</a></p></div>
           <button onClick={()=>deleteUrl(index,val.id)}  className='p-1 bg-white rounded text-black w-20 text-sm font-bold'> <i className="fa-solid fa-trash-can mr-1 text-red-600"></i>Delete</button>
        </div>
    </div>  
    )}
    </div>}
    <button onClick={()=>navigate('/')} className='bg-slate-200 text-blue-900 z-1 fixed bottom-1 border p-1 w-32 font-bold text-white/90 rounded'><i className="fa-solid fa-arrow-left mr-2"></i>back</button>
   </div>
  )
}

export default UrlList