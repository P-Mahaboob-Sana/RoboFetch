import React from "react";
import { Link } from "react-router-dom"; // Import Link
import "./Navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="logo">MyApp</div>
      <ul className="nav-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/tablets">Tablets</Link></li>
        <li><Link to="/cart">Cart</Link></li>
        
      </ul>
    </nav>
  );
};

export default Navbar;
