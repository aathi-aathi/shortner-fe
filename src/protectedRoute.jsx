import { Navigate } from "react-router-dom"
const ProtectedRoute = ({component}) =>{
  const isAuthenticate = Boolean(localStorage.getItem('isAuthenticate',true))
  if(isAuthenticate){
    return component
  } else{
    return <Navigate to='/login'/>
  }
}
export default ProtectedRoute;