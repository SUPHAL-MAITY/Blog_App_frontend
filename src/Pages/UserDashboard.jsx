import React, { useEffect, useState } from "react";
import "../App.css";

import  {createApiInstance} from '../axiosConfig.js'
import { useNavigate } from "react-router-dom";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from "react-router-dom";





const UserDashboard = () => {


    const [blogs, setBlogs] = useState([]);
    const [length,setLength]=useState(0)


    
    const [searchItem,setSearchItem]=useState("")
    const [loading,setLoading]=useState(false)
  
    ///for pagination
    const [currentPage,setCurrentPage]=useState(1)
    const [totalPages,setTotalPages]=useState(0)



    const navigate=useNavigate()
    const  api=createApiInstance(navigate);
  
  
    const fetchData = async () => {
      try {
        const { data } = await api.get(`/user/get-own-blogs?page=${currentPage}`);
        setLength(data?.data?.length)
        setBlogs(data?.data.blogs);
        setTotalPages(data?.data?.totalPages)
        setCurrentPage(data?.data?.recentPage)
        console.log(data?.data);
      } catch (error) {
        console.error(error)
        toast.error("Invalid credentials, try again!", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          
          });
        
        navigate("/login")
      }
    };
  
    useEffect(() => {
      fetchData();
      
    }, [currentPage]);

    



  const handleBlogEdit=(id)=>{
    console.log("edit clicked",id)
    navigate(`/blog-edit/${id}`)

  }


  const handleDelete=async(id)=>{
    console.log("delete clicked",id)
    try {
      const { data } = await api.delete(`/user/delete-blog/${id}`);
      console.log(data)
      window.location.reload()
      
    } catch (error) {
      navigate("/user-dashboard")
      
    }

  }

///pagination 
const handlePreviousPage=()=>{
  if(currentPage>1){
    setCurrentPage(currentPage-1)
  }
  return;
 }

 const handleNextPage=()=>{
  if(currentPage<totalPages){
    setCurrentPage(currentPage+1)
  }
  return;
 }

  ////search function
  
   const handleSearch=async()=>{
    console.log("search clicked")
    console.log(searchItem)
    if(searchItem.trim()===""){
      toast.warn('🦄  please  write something!', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark"
        
        });
      return;
    }
    try {
      const { data } = await api.get(`/user/get-own-search-blogs?q=${searchItem}`);
      console.log(data?.data);
      if(data?.data?.length>0){
        setBlogs(data?.data?.blogs)
        setTotalPages(1)
        setCurrentPage(1)
        setSearchItem("")
      }else{
        fetchData();
        toast.warn('🦄 No data found!', {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark"
          
          });
        console.log("no data found")
         setSearchItem("")
      }
    } catch (error) {
      console.error(error)
  
    }
  
   }
  



  return (
    <>



    <div className="users_card">


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




    <div className="users_card_heading">
      <h3>My Blogs</h3>
    </div>


    {/* search input ...... */}
    <div className="users_search_container">
      <input
        type="text"
        className="users_search"
        value={searchItem}
        onChange={(e)=>setSearchItem(e.target.value)}
        placeholder="Search users by name.."
      />
      <button className="serach_btn"  onClick={handleSearch}>Search</button>
    </div>



    <div className="users_table_container">
      <div style={{ overflow: "auto" }}>
        <table>
          <thead>

          <tr>
            <th>#</th>
            <th> Title</th>
            <th>Category</th>
            <th>Image</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>


          </thead>
          

          {/* data of users : map  here */}
          <tbody >
          {blogs?.map((c,i)=>{
            return (

            

              <tr  key={i}>
                <td>{i+1}</td>
                
             
                 <td> <Link
                    to={`/single-blogs/${c._id}`}
                    className="user-blog-title-link"
                    >{c.title.length>40 ?c.title.slice(0,40)+"..." :c.title}
                      </Link>
               </td>

              
               
                <td>{c.category}</td>
                <td><img src={c.imageUrl}  className="users_post_img" alt="" />
                </td>
                
                <td ><span  className="admin_role" style={{backgroundColor: c.status !=="published" ? "rgba(255, 0, 0, .5)" : "rgba(0, 128, 0, .5)",borderRadius:"8px",padding:"10px"}} >{c.status}</span></td>
                <td>
                  <span></span>
                  <i onClick={()=>handleBlogEdit(c._id)} className="fa-solid fa-pen-to-square edit_icon i-hover"></i>
                  <i onClick={()=>{handleDelete(c._id)}} className="fa-solid fa-trash i-hover"></i>
                </td>
              </tr>

              

            )
          })}

       </tbody>

    

        
        </table>
        {length ==0 && 
         <div className="no-data-found"><h1>No Data Found</h1></div>}
      </div>
    </div>

    <div id="pagination-footer">

<button id="prev-page" className="pagination-button" disabled={currentPage==1} onClick={handlePreviousPage} >
    <i className="fa-solid fa-angle-left"></i>
</button>


<button id="next-page" className="pagination-button"  disabled={currentPage==totalPages} onClick={handleNextPage}>
<i className="fa-solid fa-angle-right"></i>
</button>
</div>
    
    
  </div>
    
    </>

   
  )
}

export default UserDashboard
