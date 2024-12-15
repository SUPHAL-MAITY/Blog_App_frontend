import React, { useState } from "react";
import "../../App.css";
import { Link, Outlet } from "react-router-dom";


const UserResponsive = () => {
  
    const [isOpen, setIsOpen] = useState(false);

    const toggleSidebar = () => {
      setIsOpen(!isOpen);
    };
  return (

   
      <div className="app">
      
      <div className={`sidebar ${isOpen ? "open" : ""}`}>
        
        <nav>
          <ul>
               <li className=""  id='panel_link'><span>📈</span><Link to="/user-dashboard"> Dashboard</Link> </li>            
               <li className=""><span>📝</span><Link to="/blog-post">Create Blog</Link></li>
               <li className=""><span>⚙️</span><Link to="/user-edit">Setting</Link></li>
               <li className=""><span>🏠</span><Link to="/"> Home</Link> </li>
          </ul>
        </nav>
      </div>
  
      {/* Main Content */}

      <div className="main-content ">
        <header>
          <h1>eBlog</h1>
          <button  className=".mmenu-btn" onClick={toggleSidebar}>
            ☰
          </button>
          
        </header>
  
        <main>
            <Outlet/>
         
        </main>
  
      </div>
    </div>
   
  
  )
}

export default UserResponsive
