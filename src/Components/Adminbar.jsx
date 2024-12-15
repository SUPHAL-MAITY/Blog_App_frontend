import React,{useEffect, useState} from 'react'
import Sidebar from './Sidebar'

const Adminbar = () => {

    const [isVisible,setVisible]=useState( true)
    

const handlAdminMenuToggle=()=>{
      

        setVisible(!isVisible)

}





useEffect(()=>{
    window.addEventListener("resize",()=>{
        console.log(window.innerWidth)
        if(window.innerWidth<=768){
            setVisible(true)
        }
    })


    return ()=>{
        window.removeEventListener("resize",()=>{
            console.log("component unmounted")
        })

    }

   
   

},[])



  return (
    <>

            <nav className="side_navbar" style={isVisible? {left:"200px"}:{left:"0px"}}>

            {/* Hamburger Icon */}

            <div className="sidebar_menu_icon"  onClick={handlAdminMenuToggle}>
            <span className="bar"></span>
            <span className="bar"></span>
            <span className="bar"></span>
            </div>




            </nav>

            

            <Sidebar  isVisible={isVisible} />
    </>
    
        
        
      
    
  )
}

export default Adminbar
