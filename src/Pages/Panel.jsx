import React, { useEffect, useState } from "react";
import "../App.css"
import  {createApiInstance} from '../axiosConfig.js'
import { useNavigate } from "react-router-dom";
import Loader from "./Loader.jsx";

const Panel = () => {
    const [users,setUsers]=useState(0)
    const [admins,setAdmins]=useState(0)
    const [posts,setPosts]=useState(0)
    const [activePosts,setActivePosts]=useState(0)
    const [inactivePosts,setInactivePosts]=useState(0)
    const [categories,setCategories]=useState(0)
    const [activeUsers,setActiveUsers]=useState(0)
    const [inactiveUsers,setInactiveUsers]=useState(0)
    const [loading,setLoading]=useState(false)

    const navigate=useNavigate()

    const  api=createApiInstance(navigate);


    
    
    const fetchData = async () => {
        try {
          setLoading(true)
          const { data } = await api.get(`/admin/get-all-admin-details`);
          setLoading(false)
          setUsers(data?.data?.numberOfUsers)
          setAdmins(data?.data?.numberOfAdmins)
          setPosts(data?.data?.numberOfBlogs)
          setActivePosts(data?.data?.numberOfActiveBlogs)
          setInactivePosts(data?.data?.numberOfInactiveBlogs)
          setCategories(data?.data?.numberOfCategories)
          setActiveUsers(data?.data?.numberOfActiveUser)
          setInactiveUsers(data?.data?.numberOfInactiveUser)

          
          console.log(data?.data);
        } catch (error) {
          setLoading(false)
          console.error(error)
          navigate("/login")
        }
      };

      useEffect(()=>{
        fetchData();
      },[])

   

   
    
  return (
    <>


    {loading && <Loader/>}



<div className='panel'  style={{marginLeft:"0px",width:"100%"}} >
        <div className="panel_card">
            <div>
            
            <h1 className='panel_card_title'>Total Admins  <i  style={{marginLeft:"5px"}} className="fa-solid fa-user"></i>  </h1>
            </div>
            
            <h1 className='panel_card_title'>{admins}</h1>  
        </div>
        <div className="panel_card">
            <h1 className='panel_card_title'>Total Users  <i  style={{marginLeft:"5px"}} className="fa-solid fa-user-group"></i>  </h1>
            <h1 className='panel_card_title'>{users}</h1>

        </div>
        <div className="panel_card">
            <h1 className='panel_card_title'>Total Active Users  <i  style={{marginLeft:"5px"}} className="fa-solid fa-user"></i>  </h1>
            <h1 className='panel_card_title'>{activeUsers}</h1>

        </div>
        <div className="panel_card">
            <h1 className='panel_card_title'>Total Inactive Users  <i  style={{marginLeft:"5px"}} className="fa-solid fa-user"></i> </h1>
            <h1 className='panel_card_title'>{inactiveUsers}</h1>

        </div>
        <div className="panel_card">
            <h1 className='panel_card_title'>Total Posts  <i  style={{marginLeft:"5px"}} className="fa-solid fa-user"></i></h1>
            <h1 className='panel_card_title'>{posts}</h1>
        </div>
        <div className="panel_card">
            <h1 className='panel_card_title'>Total Active Posts  <i  style={{marginLeft:"5px"}} className="fa-solid fa-user"></i></h1>
            <h1 className='panel_card_title'>{activePosts}</h1>
        </div>
        <div className="panel_card ">
            <h1 className='panel_card_title'>Total In-Active Posts  <i  style={{marginLeft:"5px"}} className="fa-solid fa-user"></i> </h1>
            <h1 className='panel_card_title'>{inactivePosts}</h1>
        </div>
        <div className="panel_card ">
            <h1 className='panel_card_title'>Total Categories <i  style={{marginLeft:"5px"}} className="fa-solid fa-user"></i> </h1>
            <h1 className='panel_card_title'>{categories}</h1>
        </div>
        
      
    </div>
    
    
    
    </>


    
  )
}

export default Panel
