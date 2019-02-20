import React, { Component } from 'react'
import './Blog.css'
import axios from 'axios'
import { Link } from 'react-router-dom';
class Blog extends Component {
  state={
    blogs:[],
  }
  // loadBlog =()=>{
    componentDidMount(){
    axios.get('http://localhost:8080/blogs',{
      // headers:{}
    }).then(res =>{
      console.log( res.data[0])
      console.log( res)
      this.setState({
        blogs: res.data.map(blog=>{
          return {
            ...blog
          }
        }) 
      })
      // _id, title, description, image, createdAt
      console.log(this.state.blogs)
    })
  }
  render() {
    return (
      <div className="post-container">
        {this.state.blogs.map(blog=>{
          return <div className="post" key={blog._id} >
            <div className="title">
              <h2>{blog.title}</h2>
            </div>
            <div className="image"> 
                <img alt={blog._id} src={blog.image}/>
            </div>
            <div className="description">
                <p>{blog.description.substring(0,150)}<Link to={blog._id}>...read more</Link> </p>
            </div>
           
        </div>
        
         })} 
         
      </div>
    )
  }
}


export default Blog;
