import React, { Component } from 'react'
import {Link} from 'react-router-dom'
class Landing extends Component {
  render() {
    return (
      <div>
        <h4 className="text-center">Blog App</h4>
        <div className="text-center">
        <p>Create a blog and share post. </p>
        <Link to="/login" ><button className="btn-primary">Login</button></Link>
        <Link to="/register"><button className="btn-primary">Signin</button></Link>
        </div>
      </div>
    )
  }
}


export default Landing;
