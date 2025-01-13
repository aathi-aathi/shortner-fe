import React, { useState } from 'react'
import { shorterningApi } from './apis'
import { jwtDecode } from 'jwt-decode'

const URLForm = () => {
    const [longUrl,setLongUrl]=useState('')
    const [shortUrl,setShortUrl]=useState('') 
    const [error,setError] = useState('')
    const [copied, setCopied] = useState('copy');
    const [email,setEmail] =useState('')
    const token = localStorage.getItem('token')
    if(token){
      const decoded = jwtDecode(token)
      setEmail(decoded.email)
    }  
    const handleSubmit = async(e)=>{
        e.preventDefault()
        if(!longUrl){
          setError('Please Enter Valid URL')
        }else{
          const data = await shorterningApi({longUrl,email})
          setShortUrl(data.shortUrl)
        }
    }
    const handleChange = (e) =>{
      setLongUrl(e.target.value)
      setError('')
    }
    const handleCopy = () => {
      navigator.clipboard.writeText(shortUrl)
        .then(() => {
          setCopied('copied');
          setTimeout(() => setCopied('copy'), 2000); // Reset copied status after 2 seconds
        })
        .catch((err) => console.error("Failed to copy text: ", err));
    };
  return (
    <div className='flex items-center relative justify-center  w-3/5 max-lg:w-11/12 mb-2'>
    <div className='shadow-md rounded-xl w-full lg:h-80 border-2  lg:border-r-0 flex flex-col gap-2  items-center' style={{maxWidth:'700px',maxHeight:'250px'}}>
        <h1 className='text-2xl font-bold font-kanit text-center m-2 text-white'>Shortern Your URL Here</h1>
         <form onSubmit={handleSubmit} className='font-meri bg-slate-100 shadow-md rounded-md w-9/12 max-lg:w-11/12 flex justify-between p-1 items-center'>
            <input
            className='h-12 w-full bg-inherit focus:outline-none pl-2'
            type='text'
            placeholder='Enter Your Long Url'
            value={longUrl}
            onChange={handleChange}/>
            <button type='submit' className='h-10  bg-blue-500 w-24 hover:bg-blue-600 rounded text-sm text-white font-bold'>Submit</button>
        </form> 
        {error && <p className='text-red-600'>{error}</p>}
        {shortUrl ? <div className='mt-5 flex gap-2  items-center justify-center font-meri flex-wrap'>
          <p className='text-slate-200 break-words ml-2'>short URL : {shortUrl}</p>
          <button className=' rounded-xl bg-gradient-to-r from-teal-500 to-blue-500 font-bold  text-center text-white px-2 p-1 ' onClick={handleCopy} >{copied}</button>
        </div>:<p className='text-slate-200 mt-5'>Your Short URL will be here...</p>}
    </div>
    <img className='w-32 h-56 object-cover absolute right-5 bg-transparent max-lg:hidden' src='https://file.aiquickdraw.com/imgcompressed/img/compressed_82d0aa1122feb7ce2183af484cebb361.webp'/>
    </div>
  )
}
export default URLForm