
import React, { useEffect, useState } from "react";
import "../App.css";
import { Link } from "react-router-dom";
import  {createApiInstance} from '../axiosConfig.js'
import { useNavigate } from "react-router-dom";

const RecentBlogs = () => {

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

  const stripHTML = (html) => {
    // Using browser DOMParser to extract plain text
    const doc = new DOMParser().parseFromString(html, 'text/html');
    return doc.body.textContent || "";
  };


  const convertDate=(string)=>{

    const date = new Date(string);

      const formattedDate = date.toLocaleDateString('en-US', {
      month: 'short', 
      day: 'numeric',
      year: 'numeric' 
      });

     return formattedDate;

  }




  return (
    <div className="recent_blogs_container">
        <div className="item1"></div>
      <div className="recent_blogs_box_container item2">
        <h1> Recent Blogs</h1>

    
        {blogs.map((c)=>{

          return (
            
            <div key={c._id} className="recent_blogs_card">
         
            <img
              src={c.imageUrl}
              alt=""
            />
            <div className="content_box">
              <div className="content_box_heading">
                <div className="conent_box_heading_time">
                 
              <h3>{convertDate(c.createdAt)}</h3>
                </div>
  
                <div className="content_box_heading_topic">
                  {/* <h1>{c.title.length > 40 ? c.title.slice(0,40) +"..." : c.title}</h1> */}
                  

                  <Link target='_blank'  className="no-underline" to={`/single-blogs/${c._id}`}>
                    <h2>{c.title}</h2>
                  </Link>

                  <p>
                  {c.content.length > 80 ? stripHTML(c.content).slice(0,80) +"..." :stripHTML(c.content)}
                  </p>
                </div>
              </div>
  
              <div className="content_box_likes">
                <h3> 1 min read</h3>
              </div>
            </div>
          </div>

          )

        })}
       

       
      </div>



      <div className="featured_blog_container item3">
        <h1>Featured Blogs</h1>
        <img src="https://www.tribuneindia.com/sortd-service/imaginary/v22-01/jpg/large/high?url=dGhldHJpYnVuZS1zb3J0ZC1wcm8tcHJvZC1zb3J0ZC9tZWRpYWM5ZGU4MzcwLWIxMzktMTFlZi1iNzgzLTI3YTljZjkzNmFhMy5qcGc=" alt="" />
        <div className="featured_blogs_content">
          <p> If hostages are not released: Trump's ultimatum to Hamas‘Those responsible will be hit harder than anybody has been hit in the long and storied history of the United States of America,’ Trump said in a social media post
                US President-elect Donald Trump has issued an ultimatum to terrorist group Hamas that the hostages taken by it be released from Gaza before his inauguration in January, or there will be “hell to pay” in the Middle East for those responsible.If hostages are not released: not sure ....  
          </p>
        </div>
      </div>
    </div>
  );
};

export default RecentBlogs;
