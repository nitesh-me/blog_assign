import React, { Component } from 'react';
import './App.css';
import Navbar from './components/Navbar'
import Register from './components/auth/Register'
import Login from './components/auth/Login';
import Post from './components/post/Post'
import Blog from './components/post/Blog'
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Singlepost from './components/post/SinglePost';


class App extends Component {
  state={
    isAuth:false,
    token:null,
    userId:null
  }
  componentDidMount(){
    const token = localStorage.getItem('token');
    const expiryDate = localStorage.getItem('expiryDate');
    if(!token || !expiryDate)
    {
      return;
    }
    if(new Date(expiryDate) <= new Date())
    {
      this.logoutHandler();
      return;
    }
  }
  
  // getDatafromChild=(token)=>{
  //   this.setState(token)
  //   console.log(token)
  // }
  render() {
    return (
      <Router>
        <div className="App">
          <Navbar/>
          <Route exact path="/register" component={Register} />
          <Route exact path="/login"  component={Login} />
          <Route exact path="/newpost" component={Post} />
          <Route exact path ="/" component={Blog} />
          <Route exact path ="/:blogId" component={Singlepost}/>

          
        </div>
      </Router>
    );
  }
}

export default App;
