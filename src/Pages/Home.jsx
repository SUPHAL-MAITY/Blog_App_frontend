import React, { useEffect, useState } from "react";
import "../App.css";
// import axios from "axios";
import { Link } from "react-router-dom";
import  {createApiInstance} from '../axiosConfig.js'
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [blogs, setBlogs] = useState([]);
  const navigate=useNavigate()

 
  const  api=createApiInstance(navigate);


  const fetchData = async () => {
    try {
      const { data } = await api.get(`/user/recent`);
      setBlogs(data?.data);
      console.log(data?.data);
    } catch (error) {
      console.error(error)
      navigate("/")
    }
  };

  

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div  className="home">
      <div className="container">
        <div className="banner">
          <img
            src="https://images.unsplash.com/photo-1546074177-ffdda98d214f?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt=""
          />

          <div className="card_overlay">
            <Link
              to={`/single-blogs/${blogs[0]?._id}`}
              className="blog-title-link"
            >
              <h1 className=" overlay_title">
                {blogs[0]?.title.slice(0, 35) + "..."}
              </h1>
            </Link>
            <p className=" overlay_author">
              {" "}
              By {blogs[0]?.author ? blogs[0].author?.name : "unknown"}
            </p>
          </div>
        </div>

        <div className="titile_div">
          <h1>Latest Post</h1>
        </div>
        <div className="card_container">
          {blogs?.map((blog, i) => {
            const formattedDate = new Date(blog.createdAt).toLocaleDateString(
              "en-US",
              {
                year: "numeric",
                month: "short",
                day: "numeric",
              }
            );

            return (
              <div key={i} className="blog-card">
                <img
                  src={blog.imageUrl}
                  alt="Blog_image"
                  className="blog-image"
                />
                <div className="blog-content">
                  <Link
                    to={`/single-blogs/${blog._id}`}
                    className="blog-title-link"
                  >
                    <h2 className="blog-title">
                      {blog.title.length > 50
                        ? blog.title.slice(0, 50) + "..."
                        : blog.title}
                    </h2>
                  </Link>
                  <p className="blog-description">
                    {blog.content.length > 200
                      ? blog.content.slice(0, 50) + "..."
                      : blog.content}
                  </p>
                  <div className="blog-footer">
                    <span className="blog-author">
                      By {blog.author ? blog.author?.name : "unknown"}
                    </span>
                    <span className="blog-date">
                      Published: {formattedDate}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Home;
