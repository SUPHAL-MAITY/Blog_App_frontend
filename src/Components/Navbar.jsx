import React, { useState, useEffect } from "react";
import "../App.css";
import { NavLink } from "react-router-dom";
import { createApiInstance } from "../axiosConfig.js";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/checkAuth.js";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  // const [role,setRole]=useState("viewer")

  // const api=createApiInstance()
  const navigate = useNavigate();

  const { role, error, loading } = useAuth(navigate);

  console.log(role);
  console.log("loading", loading);

  useEffect(() => {
    console.log("Role after fetch:", role);
    console.log("Loading state after fetch:", loading);
  }, [role, loading]);

  // Toggle menu open/close
  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    navigate("/");
    window.location.reload();
  };

  return (
    <>
      <header>
        <nav className="navbar">
          <div className="logo">
            <h2>eBlogs</h2>
          </div>

          {/* Hamburger Icon for mobile view */}
          <div className="menu-icon" onClick={handleMenuToggle}>
            <span className="bar"></span>
            <span className="bar"></span>
            <span className="bar"></span>
          </div>

          {/* Navbar Links */}
          <ul className={`nav-links ${isMenuOpen ? "active" : ""}`}>
            <li className="nav_links_menu">
              <NavLink to="/">Home</NavLink>{" "}
            </li>
            <li className="nav_links_menu">
              <NavLink to="/all-blogs">Blogs</NavLink>
            </li>
            <li className="nav_links_menu">
              <NavLink to="/blogs">Recent</NavLink>
            </li>

            <li className="nav_links_menu">
              {/* {role} */}
              {role == "none" ? (
                <NavLink to="/login">login</NavLink>
              ) : (
                <NavLink onClick={handleLogout}>logout</NavLink>
              )}
            </li>
            <li className="nav_links_menu">
              {role == "none" && <NavLink to="/signup">Signup</NavLink>}
            </li>

            {role !== "none" && (
               <li className="nav_links_menu">
               <NavLink
                 to={role == "admin" ? "/admin-dashboard" : "/user-dashboard"}
               >
                 Dashboard
               </NavLink>
             </li>

            )}
           
          </ul>

          <div className="social_media">
            <span className="social_media_icons">
              <i className="fa-brands fa-facebook-f"></i>
            </span>
            <span className="social_media_icons">
              <i className="fa-brands fa-twitter"></i>
            </span>
            <span className="social_media_icons">
              <i className="fa-brands fa-youtube"></i>
            </span>
          </div>
        </nav>
      </header>
    </>
  );
};

export default Navbar;
