import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { checkLogin, fetchJSON } from "../index";

const Navbar = () => {
  // is the user logged in?
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    checkLogin().then((isLoggedIn) => setIsLoggedIn(isLoggedIn));
  }, []);

  return (
    <div>
      <nav className="navbar-container">
        <div className="navbar-left">
          <div>
            <Link to="/" className="link">
              NG | Norges Gang
            </Link>
          </div>
        </div>
        <div className="navbar-right">
          {isLoggedIn ? (
            <div className="navbar-signedin">
              <Link to="/profile" className="link">
                Profile
              </Link>
              <Link to="/logout" className="link">
                Log out
              </Link>
            </div>
          ) : (
            <div className="login-btn">
              <Link to="/login" className="link">
                Login
              </Link>
            </div>
          )}
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
