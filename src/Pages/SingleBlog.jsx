import React, { useEffect,useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from"axios"
import { Link } from "react-router-dom";

import "../styles/singleBlog.css"


const SingleBlog = () => {
  const {id}=useParams()
  const apiUrl = process.env.REACT_APP_API_URL;

  const [blog,setBlog]=useState([])
  const [popularBlogs,setPopularBlogs]=useState([])
 

 const  fetchSingleBlog=async()=>{

  try {
    const { data } = await axios.get(`${apiUrl}/api/v1/user/single-blog/${id}`);
    setBlog(data?.data)
    console.log(data?.data);
  } catch (error) {
    console.error(error)
  }

  }


  const fetchPopularBlogs = async () => {
    try {
      const { data } = await axios.get(`${apiUrl}/api/v1/user/popular`);
      console.log(data?.data);
      setPopularBlogs(data?.data?.blogs);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(()=>{
    fetchSingleBlog()
    fetchPopularBlogs()

  },[id])

 
  const convertDate = (string) => {
    const date = new Date(string);

    const formattedDate = date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });

    return formattedDate;
  };


  return (
    <>
   



<div className="single-box-container">
        
        <div className="single-main-content">
        
            <div className="single_blog_author">
                <p>By <strong> {blog?.author ? blog?.author?.name:"Unknown"} | <span> {convertDate(blog.createdAt)}</span> </strong></p> 
                
            </div>

            
            <div className="single-blog-image">
                <img  src={blog.imageUrl} alt="Blog Image"/>
            </div>

           
            <div className="blog-desc">
                <h1>{blog?.title}</h1>
                <p> {blog?.content}</p>
            </div>
        </div>

       
        <div className="popular-posts">
            <h2>Popular Posts</h2>
            <ul>

              {/* excluding the main content */}

              {popularBlogs.filter(c=>c._id!==blog?._id).map((c)=>{
                
                return(
                  <li className='popular-post-item' key={c._id}>
                      <Link
                      to={`/single-blogs/${c._id}`}
                      className="blog-title-link"
                    >

                          <img src={c.imageUrl} alt="Post 1"/>
                    </Link>
                
                
              </li>
              

                )
              })}
               
            </ul>
        </div>
    </div>











  </>
  )
}

export default SingleBlog
