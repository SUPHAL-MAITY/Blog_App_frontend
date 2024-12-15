import React from 'react'
import "../App.css"

const Sidebar = ({isVisible}) => {
  return (
    <div>
       
        <li className="sidebar" style={isVisible ?{display:"flex"}:{display:"none"}}>
            <ul className="sidbar_lists">
               <li className="sidebar_link"  id='panel_link'><span>📈</span>  Panel</li>
               <li className="sidebar_link"><span>👥</span>Users</li>
               <li className="sidebar_link"><span>🏷️</span>Categories</li>
               <li className="sidebar_link"><span>📝</span>Posts</li>
               <li className="sidebar_link"><span>⚙️</span>Setting</li>
               <li className="sidebar_link"><span>🏠</span>Home</li>
            </ul>
            
        </li>

      
    </div>
  )
}

export default Sidebar
