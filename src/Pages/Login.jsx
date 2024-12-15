import React,{useState} from 'react'
import '../App.css'
import axios from "axios"
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {

  const [phone,setPhone]=useState("")
  
  const navigate=useNavigate()

  const apiUrl = process.env.REACT_APP_API_URL;



const handleSubmit=async(e)=>{
  e.preventDefault()

  try {
    const {data}=await axios.post(`${apiUrl}/api/v1/login`,{phone})
    console.log(data)
    sessionStorage.setItem("otpToken",data?.data?.otpToken)
    navigate("/otp")

    
  } catch (error) {
    console.log(error)
    toast.error("Invalid credentials, try again!", {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      
      });
      setPhone("")

    
  }
}






  return (
  <>


<div className="login_form_container">
<ToastContainer
    position="top-center"
    autoClose={5000}
    hideProgressBar={false}
    newestOnTop={false}
    closeOnClick
    rtl={false}
    pauseOnFocusLoss
    draggable
    pauseOnHover
    theme="dark"

/>
<div className="wrapper">
    <form  onSubmit={handleSubmit}>
      <h2>Login</h2>
        <div className="input-field">
        <input type="number" value={phone} onChange={(e)=>setPhone(e.target.value)} required/>
        <label>Enter your phone number</label>
      </div>
     
     
      <button type="submit">Log In</button>
      
    </form>
  </div>

</div>
 

  
  
  </>

  )
}

export default Login
