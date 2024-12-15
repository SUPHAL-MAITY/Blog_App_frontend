import React,{useState} from "react";
import BlogList from "../Components/BlogList.jsx";
import "../styles/blogCard.css";

const Blogs = () => {

  ///for pagination
  const [currentPage,setCurrentPage]=useState(1)
  const [totalPages,setTotalPages]=useState(0)




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



  return (
    <>
      <div className="blog_app">
        <main>
          <BlogList currentPage={currentPage}  totalPages={totalPages} setTotalPages={setTotalPages} />
        </main>

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
        {currentPage}
        {/* {totalPages} */}
      </div>
    </>
  );
};

export default Blogs;
