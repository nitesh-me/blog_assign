import React,{Component } from 'react';
import axios from 'axios'
 import './Auth.css'

class Login extends Component{
    state={
        email:'',
        password:'',
        token:'',
        userId:''
    }
    onInputChange =(event)=>{
        this.setState({
            [event.target.name]:event.target.value,
           
        })

    }
 
    onhandleSubmit =(event)=>{
        event.preventDefault();
        
            axios.post('http://localhost:8080/users/login',{
           
            email: this.state.email,
            password:this.state.password
        }).then(result=>{
            console.log("login sucessfuly");
            console.log(result);
            console.log(result.data.token);
            this.setState({
                
                userId:result.data.userId
            })
            localStorage.setItem('token', result.data.token);
            localStorage.setItem('userId', result.data.userId)
            console.log();
            // this.props["getData"](result.token)
            this.props.history.replace('/');
        }).catch(err=>{
            console.log(err);
        })
        
    }
    render(){
        return(
            <React.Fragment>
               <form className="register-form" onSubmit={this.onhandleSubmit}>
                    <div className="form-element">
                        <input type="email" name="email" size="35" value ={this.state.value} placeholder=" registered email  address" onChange={this.onInputChange} />
                    </div>
                    <div className="form-element">
                        <input type="password" size="35" name="password" value={this.state.value} placeholder="password" onChange={this.onInputChange} />
                    </div>
                    <div>
                        <button>Login</button>
                    </div>
                </form> 
            </React.Fragment>
        )
    }
}

export default Login;