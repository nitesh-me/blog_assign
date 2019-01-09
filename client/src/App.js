import React, { Component } from 'react';
import {BrowserRouter as Router, Route, } from 'react-router-dom';
import {Provider}  from 'react-redux'
import store from './store'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer';
import Login from './components/login/Login'
import Register from './components/register/Register'
import Home from './components/home/Home'
import New from './components/home/New'
import './App.css';
import Landing from './components/layout/Landing'

class App extends Component {
  render() {
    return (
      <Provider store={store }>
          <Router>

          <div className="App">
          
              <Navbar/>
              <Route exact path="/" component={Landing} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/register" component={Register} />
              <Route exact path="/home" component={Home} />
              <Route exact path="/new" component={New} />
              <Footer/>
          
          </div>
          </Router>
      </Provider>
    );
  }
}

export default App;
