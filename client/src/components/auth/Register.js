import React,{Component } from 'react';
import './Auth.css'
import { Link } from 'react-router-dom';
import axios from 'axios';
class Register extends Component{
    state={
        name:'',
        email:'',
        password:""
    }
    onInputChange =(event)=>{
       
        this.setState({
            [event.target.name]:event.target.value,
           
        })

    }
    onhandleSubmit=(event)=>{
        event.preventDefault();
        var user ={
            name:this.state.name,
            email: this.state.email,
           
        }
        console.log(user);
        console.log("name :"+ this.state.name)
        axios.post('http://localhost:8080/users/signup',{
            name:this.state.name,
            email: this.state.email,
            password:this.state.password
        }).then(result=>{
            console.log("Registered sucessfuly");
            this.props.history.replace('/login');
        }).catch(err=>{
            console.log(err);
        })

    }
    render(){
        return(
            <React.Fragment>
               <form className="register-form" onSubmit ={this.onhandleSubmit}>
                    <div className="form-element">
                        <input name="name" value={this.state.value} size="35" type="text" placeholder="name" onChange={this.onInputChange} />
                    </div>
                    <div className="form-element" >
                        <input name="email" value={this.state.value} size="35" type="email" placeholder="email address"  onChange={this.onInputChange} />
                    </div>
                    <div className="form-element" >
                        <input name="password" value={this.state.value} size="35" type="password" placeholder="password"  onChange={this.onInputChange} />
                    </div>
                    <div>
                        <button>sign in</button>
                    </div>
                    <span>Already registered <Link to="/login">Login</Link></span>
                </form> 
            </React.Fragment>
        )
    }
}

export default Register;