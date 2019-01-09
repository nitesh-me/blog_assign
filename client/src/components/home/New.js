import React, { Component } from 'react'
import axios from 'axios';
class New extends Component {
    constructor(){
        super();
        this.state={
            title:'',
            content:'',
            image:''
        }
    }
    onhandleChange=(e)=>{
        this.setState({
            [e.target.name]:e.target.value
        })
    }
    onhandleSubmit=(e)=>{
        e.preventDefault();
        const newBlog ={
            title:this.state.title,
            content:this.state.content,
            image:this.state.image
        }
        console.log(newBlog);
        axios.post('/api/posts/', newBlog)
            .then(res=>{ console.log(res);})
            .catch(err=> alert(err.response.dat) )
    }
  render() {
    return (
      <div className="container">
        <h1 className="display-3 text-center">New Blog</h1>
        <p className="text-center">Create new blog</p>
        <form onSubmit={this.onhandleSubmit}>
            <div className="form-group">
                <label>Title</label>
                <input type="text" className="form-control" placeholder="title"
                name="title"
                value={this.state.title}
                onChange ={this.onhandleChange}
                required />
            </div>
            <div className="form-group">
                <label>Content</label>
                <textarea rows="4" cols="50" type="text" className="form-control" placeholder="content"
                name="content"
                value={this.state.content}
                onChange ={this.onhandleChange}
                required />
            </div>
            <div className="form-group">
                <label >Image</label>
                <input type="text" className="form-control" placeholder="image link"
                name="image"
                value={this.state.image}
                onChange ={this.onhandleChange}
                required />
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
        </form>
      </div>
    )
  }
}

export default New;
