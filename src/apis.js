import axios from "axios"
const backendUrl = import.meta.env.VITE_BACKEND_URL
 
const shorterningApi = async(userData)=>{
   const response =await axios.post(`${backendUrl}/short-url`,userData)
   return await response.data  
}
export {shorterningApi,backendUrl}
