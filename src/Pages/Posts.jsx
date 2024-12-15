import React, { useEffect, useState } from "react";
import "../App.css";

import { createApiInstance } from "../axiosConfig.js";
import { useNavigate } from "react-router-dom";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "./Loader.jsx";
import { Link } from "react-router-dom";

const Posts = () => {
  const [blogs, setBlogs] = useState([]);
  const [sortByStatus, setSortByStatus] = useState(true);
  const [searchItem,setSearchItem]=useState("")

  ///for pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const api = createApiInstance(navigate);

  const fetchData = async () => {
    try {
      setLoading(true);
      const { data } = await api.get(`/user/all-blogs?page=${currentPage}`);
      setLoading(false);
      setBlogs(data?.data.blogs);
      setTotalPages(data?.data?.totalPages);
      setCurrentPage(data?.data?.recentPage);
      console.log(data?.data.blogs);
    } catch (error) {
      setLoading(false);
      console.error(error);
      navigate("/login");
    }
  };

  useEffect(() => {
    fetchData();
  }, [currentPage]);

  const handleDelete = async (id) => {
    console.log("delete clicked", id);
    try {
      const { data } = await api.delete(`user/delete-blog/${id}`);
      toast.success("Blog deleted successfully now", {
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
      console.error(error);
    }
  };

  const handleChangeStatus = async (id, status) => {
    console.log("status change clicked", id);

    try {
      const { data } = await api.post(`/user/change-blog-status`, {
        id,
        status,
      });
      toast.success(" Blog Status changed successfully", {
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
      console.error(error);
    }
  };

  //// sort by status
  const handleSortByStatusUp = () => {
    let sortedBlogs = [...blogs].sort((a, b) =>
      a.status.localeCompare(b.status)
    );
    setBlogs(sortedBlogs);
    setSortByStatus((prev) => !prev);
  };

  const handleSortByStatusDown = () => {
    let sortedBlogs = [...blogs].sort((a, b) =>
      b.status.localeCompare(a.status)
    );
    setBlogs(sortedBlogs);
    setSortByStatus((prev) => !prev);
  };

  ///pagination
  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
    return;
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
    return;
  };


///search function

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
    const { data } = await api.get(`/user/search?q=${searchItem}`);
    
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
      {loading && <Loader />}

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
          <h3>All Blogs</h3>
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
          <button onClick={handleSearch} className="serach_btn">Search</button>
        </div>


        <div className="users_table_container">
          <div style={{ overflow: "auto" }}>
            <table>
              <thead>
                <tr>
                  <th>#</th>
                  <th> Title</th>
                  <th>Category</th>
                  <th>Author</th>
                  <th>Image</th>
                  <th>
                    Status
                    <i
                      style={{ marginLeft: "4px" }}
                      onClick={() =>
                        sortByStatus
                          ? handleSortByStatusDown()
                          : handleSortByStatusUp()
                      }
                      className="fa-solid fa-sort i-hover"
                    ></i>
                  </th>
                  <th>Action</th>
                </tr>
              </thead>

              {/* data of users : map  here */}
              <tbody>
                {blogs?.map((c, i) => {
                  return (
                    <tr key={i}>
                      <td>{i + 1}</td>

                      <td>
                        <Link
                          to={`/single-blogs/${c._id}`}
                          className="blog-title-link"
                        >
                          {c.title.length > 40
                            ? c.title.slice(0, 40) + "..."
                            : c.title}
                        </Link>
                      </td>

                      <td>{c.category}</td>

                      <td>{c.author ? c.author?.name : "unknown"}</td>
                      <td>
                        <img
                          src={c.imageUrl}
                          className="users_post_img"
                          alt=""
                        />
                      </td>

                      <td>
                        <span
                          onClick={() => handleChangeStatus(c._id, c.status)}
                          className="admin_role"
                          style={{
                            backgroundColor:
                              c.status == "inactive"
                                ? "rgba(255, 0, 0, .5)"
                                : "rgba(0, 128, 0, .5)",
                            borderRadius: "8px",
                            padding: "10px",
                          }}
                        >
                          {c.status}
                        </span>
                      </td>

                      <td>
                        <span></span>
                        <i
                          onClick={() => handleDelete(c._id)}
                          className="fa-solid fa-trash i-hover"
                        ></i>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        <div id="pagination-footer">
          <button
            id="prev-page"
            className="pagination-button"
            disabled={currentPage == 1}
            onClick={handlePreviousPage}
          >
            <i className="fa-solid fa-angle-left"></i>
          </button>

          <button
            id="next-page"
            className="pagination-button"
            disabled={currentPage == totalPages}
            onClick={handleNextPage}
          >
            <i className="fa-solid fa-angle-right"></i>
          </button>
        </div>
      </div>
    </>
  );
};

export default Posts;
