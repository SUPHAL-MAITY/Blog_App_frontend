import React from 'react'
import  "../styles/blogCard.css"
import { Link } from 'react-router-dom'

const BlogCard = ({ title, author, content, createdAt, image,id }) => {
  return (
    <div className="blog-card-all">
      <div className="blog-card-image">
        <img src={image} alt={title} />
      </div>
      <div className="blog-card-content">
        <Link target='_blank'  className="no-underline" to={`/single-blogs/${id}`}>
          <h2>{title}</h2>
        </Link>
      
        <p className="blog-author">By {author}</p>
        <p>{content}</p>
        <small className="blog-author">Created on: {createdAt}</small>
      </div>
    </div>
  )
}

export default BlogCard
