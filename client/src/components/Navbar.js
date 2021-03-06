import { Link } from 'react-router-dom';

const Navbar = (props) => {
    return (
        <nav className="navbar">
            <h1>Pick your own books</h1>
            <div className = 'links' >
                <Link to="/">Home</Link>
                <Link to="/portfolio" >Portfolio</Link>
                <Link to="/resume" >Resume</Link>
            </div>
        </nav>
      );
}
 
export default Navbar;