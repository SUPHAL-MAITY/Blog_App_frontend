import React, { useEffect, useState,useCallback } from "react";
import "../App.css";
import  {createApiInstance} from '../axiosConfig.js'
import { useNavigate } from "react-router-dom";
import "../styles/pagination.css"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loader from "./Loader.jsx";



const Users = () => {
  const [users,setUsers]=useState([])
  const [sortByName,setSortByName]=useState(true)
  const [sortByStatus,setSortByStatus]=useState(true)
  const [searchItem,setSearchItem]=useState("")
  const [loading,setLoading]=useState(false)

  ///for pagination
  const [currentPage,setCurrentPage]=useState(1)
  const [totalPages,setTotalPages]=useState(0)
 


  
  const navigate=useNavigate()
  const  api=createApiInstance(navigate);


  const fetchData = async () => {
    try {
      setLoading(true)
      const { data } = await api.get(`admin/getall-user?page=${currentPage}`);
      setLoading(false)
      setUsers(data?.data.users);
      setTotalPages(data?.data?.totalPages)
      setCurrentPage(data?.data?.recentPage)
      
      
      console.log(data?.data);
    } catch (error) {
      setLoading(false)
      console.error(error)
      toast.error("something happended, please try again!", {
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


  const handleChangeRole=async(id,role)=>{
    console.log("role change clicked",id)

    try {
      const { data } = await api.post(`/admin/change-role`,{id,role});
      
      toast.success('Role changed successfully', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        
        });

        fetchData();
     
       
    
     
      console.log(data);
    } catch (error) {
      console.error(error)
      
    }
  }



  useEffect(() => {
    fetchData();
   
  }, [currentPage]);


  ///delete function

  const handleDelete=async(id)=>{
    console.log("delete clicked",id)
    try {
      const { data } = await api.delete(`/admin/delete-user/${id}`);
       
      toast.success('User deleted successfully', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        
        });
     
        fetchData();
      

      console.log(data);
    } catch (error) {
      console.error(error)

    }

  }

  ////status change function 

  const handleChangeStatus=useCallback(async(id,status)=>{
    console.log("status change clicked",id)

    try {
      const { data } = await api.post(`/admin/change-status`,{id,status});
      toast.success('Status changed successfully', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        
        });
     
        setTimeout(()=>{
          window.location.reload();
          

        },500)
     
      console.log(data);
    } catch (error) {
      console.error(error)
      
    }
  },[])

////sort by name
const handleSortNameByDown=()=>{
  let sortedUsers=[...users].sort((a,b)=>a.name.localeCompare(b.name))
  setUsers(sortedUsers)
  setSortByName(prev=>!prev)

}


const handleSortNameByUp=()=>{
  let sortedUsers=[...users].sort((a,b)=>b.name.localeCompare(a.name))
  setUsers(sortedUsers)
  setSortByName(prev=>!prev)

}

//// sort by status
const handleSortByStatusUp=()=>{
  let sortedUsers=[...users].sort((a,b)=>a.status.localeCompare(b.status))
  setUsers(sortedUsers)
  setSortByStatus(prev=>!prev)
}

const handleSortByStatusDown=()=>{
  let sortedUsers=[...users].sort((a,b)=>b.status.localeCompare(a.status))
  setUsers(sortedUsers)
  setSortByStatus(prev=>!prev)
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
    const { data } = await api.get(`/admin/user-search?q=${searchItem}`);
    // setUsers(data?.data?.users);
    // setTotalPages(data?.data?.totalPages)
    // setCurrentPage(data?.data?.recentPage)
    console.log(data?.data);
    if(data?.data?.length>0){
      setUsers(data?.data?.users)
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

   {loading && <Loader/>}

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
      <h3>All Users</h3>
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

 ////table

    <div className="users_table_container">
      <div style={{ overflow: "auto" }}>
        <table>
         <thead>
          <tr>
            <th>#</th>
            <th> Name
            <i style={{marginLeft:"4px"}} onClick={()=>(sortByName ? handleSortNameByDown() : handleSortNameByUp())} className="fa-solid fa-sort i-hover"></i>
           
           

            </th>
            <th>Email</th>
            <th>Role</th>
            <th>
              Status
              <i style={{marginLeft:"4px"}} onClick={()=>(sortByStatus ? handleSortByStatusDown() : handleSortByStatusUp())} className="fa-solid fa-sort i-hover"></i>

            </th>

            <th>Phone</th>
            <th>Profile Image</th>

            <th>Actions</th>
           
          </tr>
          </thead>

          {/* data of users : map  here */}
          <tbody >
          {users?.map((c,i)=>{
            return (
             

                <tr key={i}>
                <td>{i+1}</td>
                <td>{c.name}</td>
                <td>{c.email}</td>
                <td onClick={()=>handleChangeRole(c._id,c.role)}><span  className="admin_role" style={{backgroundColor: c.role=="admin" ? "rgba(255, 0, 0, .5)" : "rgba(0, 128, 0, .5)",borderRadius:"8px",padding:"10px"}} >{c.role}</span></td>
                <td onClick={()=>handleChangeStatus(c._id,c.status)}><span  className="admin_role" style={{backgroundColor: c.status !=="active" ? "rgba(255, 0, 0, .5)" : "rgba(0, 128, 0, .5)",borderRadius:"8px",padding:"10px"}} >{c.status}</span></td>
                <td>{c.phone}</td>
                <td><img src={c.profileUrl}  className="users_post_img" alt="" />
                </td>
                
                <td>
                  <span></span>
                
                  <i onClick={()=>handleDelete(c._id)} className="fa-solid fa-trash i-hover"></i>
                </td>
              </tr>
              

            )
          })}

          </tbody>

    

        
        </table>
      </div>
    </div>
    {/* <div className="users_card_footer">
      <div className="pagination">
        <span>&laquo;</span>
        <span>1</span>
        <span className="active">2</span>
        <span>3</span>
        <span>4</span>
        <span>5</span>
        <span>6</span>
        <span>&raquo;</span>
      </div>
    </div> */}



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
    
    




  );
};

export default Users;
