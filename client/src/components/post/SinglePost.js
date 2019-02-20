import React, { Component } from 'react'
import './Blog.css'
import axios from 'axios'
class Singlepost extends Component {
  state={
    blogs:'',
  }
  // loadBlog =()=>{
    componentDidMount(){
        const postId = this.props.match.params.blogId;
        console.log(postId)
    axios.get('http://localhost:8080/blogs/'+postId,{
      // headers:{}
    }).then(res =>{
      console.log( "dfgdg "+res.data)
      console.log( res)
      this.setState({
        blogs:res.data
      })
      // _id, title, description, image, createdAt
      console.log("sdggsgs")
      console.log(this.state.blogs)
    })
  }
  deleteBlog=(event)=>{
    //   event.preventDefault();
      const postId = this.props.match.params.blogId;
      console.log(postId);
      axios({  method:'DELETE',
      url:'http://localhost:8080/blogs/'+postId,
      headers: {
                  'Content-Type': 'application/json',
                  'Authorization': 'Bearer ' + localStorage.getItem('token')
                  
                }
             } ).then(result=>{
                 console.log("Post deleted");
                 this.props.history.replace('/');
             }).catch(error=>{
                 console.log("error "+ error);
                 this.props.history.replace('/');
             })
  }
  render() {
      const userPost=(
          <div>
             <button onClick={this.editPost}>Edit</button>
             <button onClick={this.deleteBlog}>Delete</button> 
             
          </div>
      )
      const otherUser=(
          <div></div>
      )
    return (
      <div className="post-container">
        
        <div className="post" key={this.state.blogs._id} >
            <div className="title">
                <h2>{this.state.blogs.title}</h2>
                </div>
                <div className="image"> 
                    <img  alt={this.state.blogs._id} src={this.state.blogs.image}/>
                </div>
                <div className="description">
                    <p>{this.state.blogs.description}</p>
                </div>
                <hr></hr>
                <div>{localStorage.getItem('userId') ===this.state.blogs.author ? userPost : otherUser}</div>
         </div>   
         
      </div>
    )
  }
}


export default Singlepost;
