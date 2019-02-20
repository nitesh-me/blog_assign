import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'
class Navbar extends React.Component {
    logout=(e)=>{
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
    }
    render(){
        const withoutloginLink=(
            <div className="container">
                <div className="flex-item"><Link to="/">Blog</Link></div>
                
                <div className="flex-item"><Link to="/login">Login</Link></div>
                <div className="flex-item"><Link to="/register">Sign in</Link></div>
            </div>
        )
        const withLogin=(
            <div className="container">
                <div className="flex-item"><Link to="/">Blog</Link></div>
                <div className="flex-item"><Link to="/newpost">Add New</Link></div>
                
                <div className="flex-item"><Link  onClick={this.logout} to="/">Logout</Link></div>
                
            </div>
        )
    return (
        
            <React.Fragment >
                {localStorage.token ? withLogin : withoutloginLink}
            </React.Fragment>
   
    )}
}
export default Navbar;