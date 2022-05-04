import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { fetchJSON } from "../index";

const Navbar = () => {
  // is the user logged in?
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState({});

  useEffect(() => {
    const getUserInfo = async () => {
      //Soft check if the user is logged in
      if (document.cookie.includes("access_token")) {
        //Hard check if user is logged in
        const { isLoggedIn, userInfo } = await fetchJSON("/api/login");
        if (isLoggedIn) {
          setIsLoggedIn(true);
          setUser(userInfo);
        } else {
          setIsLoggedIn(false);
          setUser({});
        }
      } else {
        setIsLoggedIn(false);
        setUser({});
      }
    };
    getUserInfo();
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
                {user.name}
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
