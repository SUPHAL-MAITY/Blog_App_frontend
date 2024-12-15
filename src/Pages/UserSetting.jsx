import React, { useEffect, useState } from "react";
import "../styles/editProfile.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faEnvelope, faPhone, faLink } from '@fortawesome/free-solid-svg-icons';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';




import  {createApiInstance} from '../axiosConfig.js'
import { useNavigate } from "react-router-dom";



const UserSetting = () => {


    const [name,setName]=useState("")
    const [email,setEmail]=useState("")
    const [phone,setPhone]=useState("")
    const [profileUrl,setProfileUrl]=useState("")


 
  const navigate=useNavigate()
  const  api=createApiInstance(navigate);

   ////own data fetching
  const fetchData = async () => {
    try {
      const { data } = await api.get(`/admin/get-own-details`);   
      console.log(data?.data);
      setName(data?.data?.name)
      setEmail(data?.data?.email)
      setPhone(data?.data?.phone)
      setProfileUrl(data?.data?.profileUrl)
    } catch (error) {
      console.error(error)
      
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  


  ////////////function to check name
  function checkName(name) {
    const regex = /^[A-Za-z\s]+$/; // Allows letters and spaces
    if (regex.test(name)) {
      return true; // Name is valid
    } else {
      return false; // Name is invalid
    }
  }

  ///////function to check phone
  function checkPhone(phone) {
    const regex = /^\d{3}[-\s]?\d{3}[-\s]?\d{4}$/;

    if (regex.test(phone)) {
      return true; // Phone number is valid
    } else {
      return false; // Phone number is invalid
    }
  }

  ////handle submit function



  const handleSubmit = async(e) => {
    e.preventDefault();

    try {

      console.log(name,email,phone,profileUrl)
       ///validation

      ///nothing blank

      if (
        [name, email, phone, profileUrl].some(
          (value) => String(value).trim() === ""
        )
      ) {
        toast.error("Please fill all the fields", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
        fetchData();
        return;
      }

       ///name must contain character only A-z and space
       if (!checkName(name)) {
        return toast.error("Name must contain  A-z and space only", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });

        return;
      }

      ///phone number must be properly formatted
      if (!checkPhone(phone)) {
        toast.error("Phone number must be properly formatted", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
        fetchData();
        return;
      }

      ///if validation successful

    

        const { data } = await api.post(`/admin/update-user`,{name,email,phone,profileUrl});   
        if(data?.success){
          toast.success("Profile updated successfully", {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",

            });
            fetchData()
            console.log("successfull",data);

          return
        }
       
        
    } catch (error) {

      console.log(error.status);
      console.log(error);
      toast.error("something went wrong , please try again", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
        
    }
   
  };


  return (
    <div className="profile_card">
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



      <div className="profile_image">
        <img
          src={profileUrl}
          alt=""
        />
      </div>

      {/* control form here  */}

      <div className="profile_form_container">
      <div className="form-container">
      <form onSubmit={handleSubmit} className="form">
        <div className="input-group">
          <FontAwesomeIcon icon={faUser} className="icon" />
          <input
            type="text"
            id="name"
            placeholder="Enter your name"
            value={name}
            onChange={(e)=>setName(e.target.value)}
          />
        </div>

        <div className="input-group">
          <FontAwesomeIcon icon={faEnvelope} className="icon" />
          <input
            type="email"
            id="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
          />
        </div>

        <div className="input-group">
          <FontAwesomeIcon icon={faPhone} className="icon" />
          <input
            type="tel"
            id="phone"
            placeholder="Enter your phone number"
            value={phone}
            onChange={(e)=>setPhone(e.target.value)}
          />
        </div>

       

        <div className="input-group">
          <FontAwesomeIcon icon={faLink} className="icon" />
          <input
            type="url"
            id="profileUrl"
            placeholder="Enter your profile URL"
            value={profileUrl}
            onChange={(e)=>setProfileUrl(e.target.value)}
          />
        </div>

        <button type="submit" className="submit-btn">Update Profile</button>
      </form>
    </div>
      </div>
    </div>
  )
}

export default UserSetting
