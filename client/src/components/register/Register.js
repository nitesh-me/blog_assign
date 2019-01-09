import React, { Component } from 'react'
import PropTypes from 'prop-types';
import {withRouter } from 'react-router-dom'
import { connect } from 'react-redux';
// acton which we use
import { registeruser } from '../../actions/authActions'
class Register extends Component {
    constructor(){
        super();
        this.state={
            name:'',
            email:'',
            password:'',
            errors:{}
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
            name:this.state.name,
            email:this.state.email,
            password:this.state.password
        }
        console.log(newUser);
        this.props.registeruser(newUser)
             
    }
    componentWillReceiveProps(nextProps){
        if(nextProps.errors){
            this.setState({errors:nextProps.errors})
        }
    }
  render() {
      // Destructuring user
    //   const {user} = this.props.auth;
    return (
      <div className="container">
     
        <h1 className="display-3 text-center">Sign up</h1>
        <p className="text-center">Create account</p>
        <form onSubmit={this.onhandleSubmit}>
            <div className="form-group">
                <label >Name</label>
                <input type="text" className="form-control" placeholder="name"
                name="name"
                value={this.state.name}
                onChange ={this.onhandleChange}
                required />
            </div>
            <div className="form-group">
                <label >Email</label>
                <input type="email" className="form-control" placeholder="email"
                name="email"
                value={this.state.email}
                onChange ={this.onhandleChange}
                required />
            </div>
            <div className="form-group">
                <label >password</label>
                <input type="password" className="form-control" placeholder="password"
                name="password"
                value={this.state.password}
                onChange ={this.onhandleChange}
                required />
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
        </form>
      </div>
    )
  }
}

Register.propTypes ={
    //func is function
    registeruser: PropTypes.func.isRequired,
    auth:PropTypes.object.isRequired,
    errors:PropTypes.object.isRequired
}
const mapStateToProps =(state)=>({
    auth: state.auth,
    errors:state.errors
})
export default  connect(mapStateToProps, {registeruser})(withRouter(Register));