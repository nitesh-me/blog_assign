import React, { Component } from 'react'
import axios from  'axios';

 class Home extends Component {
     constructor(){
         super();
         this.state={
            Blog:[]
         }
     };
     componentDidMount(){
        axios.get('/api/posts')
            .then(response =>{ console.log(response.data);})
     }
  render() {
    return (
      <div className="container">
      <div className="card mb-3">
          <img className="card-img-top" src="..." alt="Card image cap" />
          <div className="card-body">
            <h5 className="card-title">Card title</h5>
            <p className="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
           <p className="card-text"><small className="text-muted">Last updated 3 mins ago</small></p>
          
           
           <button className="btn btn-primary">Comment</button>
           <i className="fas fa-thumbs-down"></i>
           <i className="fas fa-thumbs-up"></i>
        </div>
      </div>
           
      </div>
    )
  }
}


export default Home;