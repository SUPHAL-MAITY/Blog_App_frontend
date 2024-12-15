
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';


import Panel from './Pages/Panel.jsx';


import Layout from './Components/Layout/Layout.jsx';
import Home from './Pages/Home.jsx';
import Blogs from './Pages/Blogs.jsx';
import SingleBlog from './Pages/SingleBlog.jsx';
import Login from './Pages/Login.jsx';
import Signup from './Pages/Signup.jsx';
import ResponsiveSidebar from './Components/Layout/ResponsiveSidebar.jsx';
import Users from './Pages/Users.jsx';
import EditProfile from './Pages/EditProfile.jsx';
import Landing from './Pages/Landing.jsx';
import RecentBlogs from './Pages/RecentBlogs.jsx';
import OtpInput from './Pages/otpInput.jsx';
import BlogEdit from './Pages/BlogEdit.jsx';
import UserDashboard from './Pages/UserDashboard.jsx';
import UserResponsive from './Components/Layout/UserResponsive.jsx';
import UserSetting from './Pages/UserSetting.jsx';
import BlogPost from './Pages/BlogPost.jsx';
import Posts from './Pages/Posts.jsx';
import BlogUpdate from './Pages/BlogUpdate.jsx';
import BlogByCategory from './Pages/BlogByCategory.jsx';
import NopageFound from './Pages/NopageFound.jsx';
import Loader from './Pages/Loader.jsx';


function App() {
  return (
    

<Routes>

    
       
      


       <Route   element={<ResponsiveSidebar/>}>
            <Route path="/admin-dashboard" element={<Panel/>} />
            <Route path="/users" element={<Users/>} />
            <Route path="/admin-edit" element={<EditProfile/>} />
            <Route path="/all-posts" element={<Posts/>} />                    

       </Route>



      /////users  views
       <Route   element={<UserResponsive/>}>
            <Route path="/user-dashboard" element={<UserDashboard/>} />
            <Route path="/user-edit" element={<UserSetting/>} />
            <Route path="/blog-post" element={<BlogPost/>} />
            <Route path="/blog-edit/:id" element={<BlogUpdate/>} />
            
                      

       </Route>




       <Route   element={<Layout/>}>
            <Route  path="/demo" element={<Home/>} />
            <Route  path="/" element={<Landing/>} />
            <Route  path="/blogs" element={<RecentBlogs/>} />
            <Route  path="/all-blogs" element={<Blogs/>} />
            <Route  path="/single-blogs/:id" element={<SingleBlog/>} />
            <Route  path="/login" element={<Login/>} />
            <Route  path="/signup" element={<Signup/>} />
            <Route path="/otp" element={<OtpInput/>} />
            <Route path="/create-blog" element={<BlogEdit/>} />
            <Route path="/category/:category" element={<BlogByCategory/>} />
            <Route path="/loader" element={<Loader/>} />
            
            <Route path="*" element={<NopageFound/>} />

           
          
       </Route>


     




       
        
</Routes>
   
    
  );
}

export default App;
