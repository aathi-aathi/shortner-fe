import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from "./home"
import Register from "./register"
import Login from "./login"
import Profile from "./profile"
import OTPVerification from "./otp-verify"
import ProtectedRoute from "./protectedRoute"
import UrlList from "./short-urls"


function App() {
  return (
   <BrowserRouter>
   <Routes>
    <Route path="/" element={<Home/>}>
     <Route index element={<ProtectedRoute component={<Profile/>}/>}/>  
     <Route path="login" element={<Login/>}/>
     <Route path="register" element={<Register/>}/>
     <Route path='otp-verify/:token' element={<OTPVerification/>}/>
    </Route>
    <Route path="/urls" element={<ProtectedRoute component={<UrlList/>}/>}/>
   </Routes>
   </BrowserRouter>
  )
}

export default App
