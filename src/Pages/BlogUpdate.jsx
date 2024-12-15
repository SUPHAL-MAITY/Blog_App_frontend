import React ,{useState,useEffect} from 'react'
import "../styles/blogEdit.css"
import { useParams } from 'react-router-dom'

import  {createApiInstance} from '../axiosConfig.js'
import { useNavigate } from "react-router-dom";

const BlogUpdate = () => {
    const {id}=useParams()


    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('');
    const [content, setContent] = useState('');
    const [imageUrl, setImageUrl] = useState("");
   

    

    const navigate=useNavigate()

 
    const  api=createApiInstance(navigate);


    const fetchData = async () => {
        try {
          const { data } = await api.get(`/user/single-blog/${id}`);   
          console.log(data?.data);
          ///change this to name 
         
          setTitle(data?.data?.title)
          setCategory(data?.data?.category)
          setContent(data?.data?.content)
          setImageUrl(data?.data?.imageUrl)
        
        } catch (error) {
          console.error(error)
          
        }
      };
    
      useEffect(() => {
        fetchData();
      }, []);
  





const handleSubmit=async(e)=>{

    e.preventDefault()

    try {
        const { data } = await api.post(`/user/update-blog/${id}`,{title,category,content,imageUrl});
       
        console.log(data)
       
        setTitle("")
        setCategory("")
        setContent("")
        setImageUrl("")
        navigate("/user-dashboard") 
       

        
    } catch (error) {
        console.log(error)
        
    }



}


const stripHTML = (html) => {
    // Using browser DOMParser to extract plain text
    const doc = new DOMParser().parseFromString(html, 'text/html');
    return doc.body.textContent || "";
  };


  return (
    <>

    <div className="blog_create_container">
            <h1 className='blog_create_title'>Update the Blog</h1>

            <form  className='blog_create_form' onSubmit={handleSubmit} >
                
                <label htmlFor="title">Title</label>
                <input type="text" id="title" name="title" value={title} onChange={(e)=>setTitle(e.target.value)} required placeholder="Enter the title of your blog post"/>

            
                <label htmlFor="category">Category</label>
                <select id="category" value={category} onChange={(e)=>setCategory(e.target.value)} name="category" required>
                    <option value="">Select a category</option>
                    <option value="Tech">Technology</option>
                    <option value="Lifestyle">Lifestyle</option>
                    <option value="Health">Health</option>
                    <option value="Travel">Travel</option>
                    <option value="Sports">Sports</option>
                    <option value="Business">Business</option>
                    <option value="Food">Food</option>
                    <option value="Politics">Politics</option>
                </select>
                
            
                <label htmlFor="image-url">Image URL</label>
                <input type="url" id="image-url" name="image-url" value={imageUrl} onChange={(e)=>setImageUrl(e.target.value)} required placeholder="Enter image URL"/>
             
            
                <label htmlFor="description">Description</label>
                <textarea id="description" name="description" value={stripHTML(content)} onChange={(e)=>setContent(e.target.value)}  required placeholder="Enter a description for your blog post"></textarea>

                
                <button type="submit">Update </button>
            </form>
    </div>
        
</>
  )
}

export default BlogUpdate
