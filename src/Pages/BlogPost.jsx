import React ,{useState} from 'react'
import "../styles/blogEdit.css"

import { createApiInstance } from '../axiosConfig'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const BlogPost = () => {


    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('');
    const [content, setContent] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    
    const api=createApiInstance()

   


    const handleSubmit=async(e)=>{

    e.preventDefault()

    try {

          ///validation
          
          if([title,category,content,imageUrl].some((value)=>String(value).trim()==="")){
            toast.error("Please fill all the fields", {
              position: "top-center",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "dark",
              
              });

               setTitle("")
               setCategory("")
               setContent("")
               setImageUrl("")

             
             
            return
          
          
          }

        const {data}=await api.post(`/user/create-blog`,{title,category,content,imageUrl})
        console.log(data)
        if(data.success){

            toast.success("Blog Created Successfully", {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
    
                });
               
                setTitle("")
                setCategory("")
                setContent("")
                setImageUrl("")

        }
          
       
      

        
    } catch (error) {
        console.log(error)
        
    }
}



  return (
    <>

    <div className="blog_create_container">

    <ToastContainer
            position="top-center"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="dark"

    />




            <h1 className='blog_create_title'>Create a Blog Post</h1>

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
                
                {/* <label htmlFor="author">Author</label>
                <input type="text" id="author" name="author" value={author} onChange={(e)=>setAuthor(e.target.value)} required placeholder="Enter author id"/>
             */}
                <label htmlFor="description">Description</label>
                <textarea id="description" name="description" value={content} onChange={(e)=>setContent(e.target.value)}  required placeholder="Enter a description for your blog post"></textarea>
                {/* <ReactQuill id="description" name="description" theme="snow" value={content} onChange={setContent} /> */}
                
                <button type="submit">Create Blog Post</button>
            </form>
    </div>
        
</>
  )
}

export default BlogPost
