import React, { Fragment, useEffect, useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import UserContext from "./Context/UserContext"


const Navbar = () => {
  const { userData, setUserData } = useContext(UserContext);
  const [ links, setLinks ] = useState(null)

  const logout = () => {
    setUserData({ token: undefined, user: undefined });
    localStorage.setItem("auth-token", "");
  };

    useEffect(() => {
        if (!userData.user) {
          setLinks(
            <Fragment>
              <li><Link to="/login" >Login</Link></li>
              <li><Link to="/register" >Register</Link></li>
            </Fragment>
          )     
        }else{
          setLinks(
            <Fragment>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/search" >Search</Link></li>
              <li><Link to="/saved" >Saved</Link></li>
              <li><Link to="/" onClick={logout} >Logout</Link></li>
            </Fragment>
          )
        }       
    }, [userData.user, logout])



    return (
        <nav  className="navbar">
            <h2>BookMarker</h2>
            <ul className="left">
              {links}
            </ul>      
        </nav>
      );
}
 
export default Navbar;