import React ,{useState} from 'react'
import "../styles/blogEdit.css"
import axios from 'axios'

const BlogEdit = () => {
    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('');
    const [content, setContent] = useState('');
    const [image, setImage] = useState("");
    const [author,setAuthor]=useState("")

    const apiUrl = process.env.REACT_APP_API_URL;


const handleSubmit=async(e)=>{

    e.preventDefault()

    try {
        const {data}=await axios.post(`${apiUrl}/api/v1/user/create-blog`,{title,category,content,image,author})
        console.log(data)
        setTitle("")
        setCategory("")
        setContent("")
        setImage("")
        setAuthor("")

        
    } catch (error) {
        console.log(error)
        
    }
}


   
    


  return (
    <>

        <div className="blog_create_container">
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
                    <input type="url" id="image-url" name="image-url" value={image} onChange={(e)=>setImage(e.target.value)} required placeholder="Enter image URL"/>
                    
                    <label htmlFor="author">Author</label>
                    <input type="text" id="author" name="author" value={author} onChange={(e)=>setAuthor(e.target.value)} required placeholder="Enter image URL"/>
                
                    <label htmlFor="description">Description</label>
                    <textarea id="description" name="description" value={content} onChange={(e)=>setContent(e.target.value)}  required placeholder="Enter a description for your blog post"></textarea>

                    
                    <button type="submit">Create Blog Post</button>
                </form>
        </div>
            
    </>
  )
}

export default BlogEdit
