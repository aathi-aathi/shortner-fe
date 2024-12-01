import axios from "axios"
const backendUrl = import.meta.env.VITE_BACKEND_URL
console.log(backendUrl)
 
const shorterningApi = async(userData)=>{
   const response =await axios.post(`${backendUrl}/short-url`,userData)
   return await response.data  
}
const getLongUrlApi = async(id)=>{
    const response =await axios.post(`${backendUrl}/short-url/${id}`)  
}
export {shorterningApi,getLongUrlApi}
