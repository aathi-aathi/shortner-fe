import React from 'react'
import URLForm from './url-form'
import { Outlet } from 'react-router-dom'

const Home = () => {
  return (
    <div className='bg-gradient-to-b from-teal-900 to-blue-900 min-h-screen flex flex-col gap-5  justify-evenly'>
    <div className='flex flex-col items-center mt-2'>
    <div className='flex justify-center items-center'>
    <div className='border-double border-4 justify-center rounded-full h-16 w-16 flex items-center'>
    <i className="fa-solid  fa-link fa-2xl text-white"></i>
    </div>
    <h1 className='text-5xl text-white font-kanit font-bold bg-teal-900 pl-1 relative right-2'>Shortly</h1>
    </div>
    <p className='text-white font-meri px-1 text-center'>Transform long links into shareable short URLs – secure, easy, and always accessible!</p>
    </div> 
    <div className='flex flex-wrap items-center gap-5 justify-center'>
    <Outlet/>
    <URLForm/>
    </div>
  </div>
  )
}

export default Home