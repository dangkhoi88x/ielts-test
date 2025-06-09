import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  return (
    <header className="header">
      <Link to="/" className="logo">
        IELTS Journey
      </Link>

      <nav className="navbar">
        <Link to="/listening">Listening</Link>
        <Link to="/reading">Reading</Link>
        <Link to="/speaking">Speaking</Link>
        <Link to="/writing">Writing</Link>
        <Link to="/AIwriting">AI Check Writing</Link>
      </nav>
    </header>
  );
};

export default Navbar;
