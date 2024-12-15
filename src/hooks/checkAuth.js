import  { useState,useEffect } from "react";
import { createApiInstance } from "../axiosConfig.js";








export const useAuth=(navigate)=>{

    const api=createApiInstance()

    const [role,setRole]=useState("viewer")
    const[loading,setLoading]=useState(true)
    const[error,setError]=useState(null)

  

  const checkAuth=async()=>{

    
    try {
        const {data}=await api.get("/check-auth")
        console.log("hook data",data)
        console.log("role",data?.data?.role)
        if(data?.data?.role==="admin"){
          setRole("admin")
          
        }else{
          setRole("viewer")
          
        }
  
        
      
        
      } catch (error) {
        console.log(error)
        setRole("none")
        if(error.status===401){
          setError(401)

        }
       
        
        
        
      }finally{
          setLoading(false)
      }
  
  
     


  }


  useEffect(()=>{
    checkAuth()

  },[navigate])
   







    

       

    
  

    return { role,loading,error }




}