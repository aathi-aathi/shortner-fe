import React, { useState } from 'react'
import { getLongUrlApi, shorterningApi } from './apis'
import { useParams } from 'react-router-dom'

const Home = () => {
    const [longUrl,setLongUrl]=useState('')
    const [shortUrl,setShortUrl]=useState('') 
    const [copied, setCopied] = useState('copy');
    const pathparams = useParams()
    console.log(pathparams)
    const handleSubmit = async(e)=>{
        e.preventDefault()
       const data = await shorterningApi({longUrl})
       setShortUrl(data.shortUrl)
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
    <div className='flex items-center justify-center h-screen bg-gradient-to-r from-violet-500 to-fuchsia-500'>
    <div className='shadow-md rounded-xl w-full h-full bg-white flex flex-col gap-2 items-center' style={{maxWidth:'700px',maxHeight:'250px'}}>
        <h1 className='text-4xl font-bold text-center m-2 text-indigo-600'>Shortly</h1>
         <form onSubmit={handleSubmit} className=' border shadow-md rounded-md w-11/12 flex justify-between p-1 items-center'>
            <input
            className='h-12 w-full focus:outline-none pl-2'
            type='text'
            placeholder='Enter Your Long Url'
            value={longUrl}
            onChange={(e)=>setLongUrl(e.target.value)}/>
            <button type='submit' className='h-10 bg-gradient-to-r from-violet-500 to-fuchsia-500 w-24 rounded-md text-white font-bold'>Submit</button>
        </form> 
        {shortUrl && <div className='mt-5 rounded-full shadow-md p-3 flex gap-2 items-center'>
          <p className='text-xl text-violet-700 '>short URL : {shortUrl}</p>
          <button className='text-lg rounded-full bg-violet-700  text-center text-white px-2 p-1' onClick={handleCopy} >{copied}</button>
        </div>}
       
    </div>
    </div>
  )
}
export default Home