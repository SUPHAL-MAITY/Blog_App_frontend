import { useState }  from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import axios from "axios";





const Signup = () => {


  const apiUrl = process.env.REACT_APP_API_URL;


  const [name,setName]=useState("")
  const [email,setEmail]=useState("")
  const [password,setPasword]=useState("")
  const [phone,setPhone]=useState("")
  const[countryCode,setCountryCode]=useState("")
  // const [role,setRole]=useState("")
  const [profileUrl,setProfileUrl]=useState("")






  function isValidUrl(url){
    try {
      if(new URL(url)){
        return true;
      }
      
    } catch (error) {
      return false;
      
    }
   
    
    }
    
  
  
   





 const handleSubmit=async(e)=>{
  e.preventDefault()
  console.log(name,email,password,phone,countryCode,profileUrl)


  //validation for email address

  const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  if(!emailPattern.test(email)){
   
    toast("Invalid email address")
    return;
  }

  ///validation for password
// eslint-disable-next-line
  const passwordPattern= /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+={}\[\]:;"'<>,.?/\\|`~]).{6,}$/;
  if(!passwordPattern.test(password)){
  
    toast("Password must be at least 6 characters long and contain at least one uppercase letter, one lowercase letter, one digit, and one special character.")
    return;
  }


  //validation for url

  if(!isValidUrl(profileUrl)){
    toast("url is not valid")
    return;
  
   }



  try {


    const response=await axios.post(`${apiUrl}/api/v1/admin/create-user`,{name,email,password,phone,countryCode,profileUrl})
    console.log(response)
    if(response.statusText==="OK"){

      setName("")
      setEmail("")
      
      setProfileUrl("")
      setPhone("")
      setCountryCode("")
      setPasword("")
      toast("user created successfully")
    
    }
    
  } catch (error) {
    console.log(error)
    toast("something went wrong")
    
  }


 }


  return (
    <>
    <ToastContainer />
      <div className="logout_form_container">
      
        <div className="wrapper">
        
          <form onSubmit={handleSubmit}>
            <h2>Sign Up</h2>
            <div className="input-field">
              <input type="text" value={name}  onChange={(e)=>setName(e.target.value)} required />
              <label>Enter your name</label>
            </div>

            <div className="input-field">
              <input type="text" value={email} onChange={(e)=>setEmail(e.target.value)} required />
              <label>Enter your email</label>
            </div>

            <div className="input-field">
              <input type="password" title="at least 6 characters , at least one uppercase letter, one lowercase letter, one digit, and one special character." value={password} onChange={(e)=>setPasword(e.target.value)} required />
              <label>Enter your password</label>
            </div>
            <div className="input-field">
              <input type="number" value={countryCode} onChange={(e)=>setCountryCode(e.target.value)}  required />
              <label>Enter your country-code</label>
            </div>
            <div className="input-field">
              <input type="tel" value={phone} onChange={(e)=>setPhone(e.target.value)} required />
              <label>Enter your phone</label>
            </div>
            {/* <div className="input-field">
              <input type="text" value={role} onChange={(e)=>setRole(e.target.value)} required />
              <label>Enter your role</label>
            </div> */}
            <div className="input-field last-input">
              <input type="text" value={profileUrl} onChange={(e)=>setProfileUrl(e.target.value)} required />
              <label>Enter your  profile url</label>
            </div>
           
       

            <button type="submit">Log In</button>
            {/* <div className="register">
              <p>
                You have an account? <Link to="/login">Sign in</Link>
              </p>
            </div> */}
          </form>
        </div>
      </div>
    </>
  );
};

export default Signup;
