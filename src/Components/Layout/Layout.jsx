import React from 'react'
import Navbar from '../Navbar.jsx'
import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <div>
        <header>
           <Navbar/>

        </header>

        <main>
            <Outlet/>
        </main>
       
      
    </div>
  )
}

export default Layout
