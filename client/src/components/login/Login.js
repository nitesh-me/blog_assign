import React, { Component } from 'react'

 class Login extends Component {
    constructor(){
        super();
        this.state={
           
            email:'',
            password:''
        }
    }
    onhandleChange=(e)=>{
        this.setState({
            [e.target.name]:e.target.value
        })
    }
    onhandleSubmit=(e)=>{
        e.preventDefault();
        const newUser ={
            
            email:this.state.email,
            password:this.state.password
        }
        console.log(newUser);
    }
  render() {
    return (
      <div className="container">
        <h1 className="display-3 text-center">Login </h1>
        <p className="text-center">Welcome</p>
        <form onSubmit={this.onhandleSubmit}>
           
            <div className="form-group">
                <label for="name">Email</label>
                <input type="email" className="form-control" placeholder="email"
                name="email"
                value={this.state.email}
                onChange ={this.onhandleChange}
                required />
            </div>
            <div className="form-group">
                <label for="name">Password</label>
                <input type="password" className="form-control" placeholder="password"
                name="password"
                value={this.state.password}
                onChange ={this.onhandleChange}
                required />
            </div>
            <button type="submit" class="btn btn-primary">Submit</button>
        </form>
      </div>
    )
  }
}

export default Login
