import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div>
      <nav className="navbar-container">
        <div className="navbar-left">
          <div>
            <Link to="/" className="link">
              Home
            </Link>
          </div>
        </div>
        <div className="navbar-right">
          <div>
            <Link to="/movies" className="link">
              List movies
            </Link>
          </div>
          <div>
            <Link to="/movies/add" className="link">
              Add movie
            </Link>
          </div>
          <div className="login-btn">
            <Link to="/login" className="link">
              Login
            </Link>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
