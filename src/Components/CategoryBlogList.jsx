import React,{useState,useEffect} from 'react'
import BlogCard from './BlogCard'
import  "../styles/blogCard.css"


import  {createApiInstance} from '../axiosConfig.js'
import { useNavigate } from "react-router-dom";


const CategoryBlogList = ({ currentPage, totalPages, setTotalPages,category }) => {
    const [blogs, setBlogs] = useState([]);

    const convertDate=(string)=>{

        const date = new Date(string);
  
          const formattedDate = date.toLocaleDateString('en-US', {
          month: 'short', 
          day: 'numeric',
          year: 'numeric' 
          });
  
         return formattedDate;
  
      }
  
     
    const navigate=useNavigate()
    
     
    const  api=createApiInstance(navigate);
  
    const fetchData = async () => {
          try {
            const { data } = await api.get(`/user/category/${category}?page=${currentPage}`);
            setBlogs(data?.data?.blogs);
            setTotalPages(data?.data?.totalPages)
            console.log(data?.data);
          } catch (error) {
            console.error(error)
            navigate("/")
          }
        };
      
        useEffect(() => {
          fetchData();
        }, [currentPage]);
      
        const stripHTML = (html) => {
          // Using browser DOMParser to extract plain text
          const doc = new DOMParser().parseFromString(html, 'text/html');
          return doc.body.textContent || "";
        };
      
  
  
  






  return (
    <div className="blog-list">
    <h1>{category}</h1>
    {blogs.map((blog) => {
      const newString = convertDate(blog.createdAt);
      return (
        <BlogCard
          key={blog?._id}
          id={blog?._id}
          title={
            blog.title.length > 40
              ? blog.title.slice(0, 40) + "....."
              : blog.title
          }
          author={blog?.author ? blog.author.name : "Anonymous"}
          content={
            blog.content.length > 120
              ? stripHTML(blog.content).slice(0, 120) + "..."
              : stripHTML(blog.content)
          }
          createdAt={newString}
          image={blog.imageUrl}
        />
      );
    })}
  </div>
  )
}

export default CategoryBlogList
