import React from 'react'
import { Link } from 'react-router-dom'


const Landing = () => {
  return (
    <>
  <main>
    <section className="landing_categories">
        <h1 className='categories_title'>
            Welcome to eBlog 
        </h1>
     
       
        <div className="categories">
            <div className="category_box">
             <Link to="/category/Politics" >  <img src="politics_black and white.png" alt="" /> </Link>  
            </div>
            <div className="category_box">
            <Link to="/category/Sports" >  <img src="sports.png" alt="" /> </Link>   
            </div>
            <div className="category_box">
            <Link to="/category/Business" > <img src="business_black and white.png " alt="" /> </Link>  
            </div>
            <div className="category_box">
            <Link to="/category/Food" >  <img src="food.png" alt="" /></Link> 
            </div>
            <div className="category_box">
            <Link to="/category/Tech" >   <img src="tech.png" alt="" /> </Link>  
            </div>
            <div className="category_box">
            <Link to="/category/Lifestyle" >   <img src="lifestyle.png" alt="" /> </Link>  
            </div>
            <div className="category_box">
            <Link to="/category/Health" >   <img src="health.png" alt="" /> </Link> 
            </div>
            <div className="category_box">
            <Link to="/category/Travel" >  <img src="travel.png" alt="" /> </Link>   
            </div>


        </div>
        

    </section>

    <section className="landing_quote">
        <div className="landing_quote_icon">
            <img src="book.png" alt=""  id='landing_quote_img'/>
        </div>
        <div className="landing_quote_text">
            <h1>“If we encounter a man of rare intellect, we should ask him what books he reads.” </h1>
            <h3>― Ralph Waldo Emerson</h3>
        </div>
    </section>

    

  </main>
 

      
    </>
  )
}

export default Landing
