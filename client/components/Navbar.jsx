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
        //Hard check if user is logged in & get user info
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
    <div className="navbar-container">
      <nav>
        <div className="navbar-left">
          <div>
            <Link to="/" className="link logo">
              Polarposten
            </Link>
          </div>
        </div>
        <div className="navbar-right">
          {isLoggedIn ? (
            <div className="navbar-signedin">
              {user.role === "journalist" ? (
                <Link to="/add-article" className="link navbtn">
                  Add Article
                </Link>
              ) : null}
              <Link to="/profile" className="link navbtn">
                {user.name}
              </Link>
              <Link to="/logout" className="link navbtn">
                Logg ut
              </Link>
            </div>
          ) : (
            <Link to="/login" className="link login-link navbtn">
              Logg inn
            </Link>
          )}
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
