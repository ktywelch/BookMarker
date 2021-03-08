import React, { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';



const Navbar = () => {
    const links = (
        <Fragment>
          <li>
            <Link className="link-item" to='/'>Home</Link>
          </li>
          <li>
            <a className="link-item" href="https://www.google.com" target="__blank">External Website</a>
          </li>
        </Fragment>
    )

    return (
        <nav  className="navbar">
            <h2>BookMarker</h2>
            <ul className="left">
                <li><Link to="/">Home</Link></li>
                <li><Link to="/search" >Search</Link></li>
                <li><Link to="/saved" >Saved</Link></li>
            </ul>      
        </nav>
      );
}
 
export default Navbar;