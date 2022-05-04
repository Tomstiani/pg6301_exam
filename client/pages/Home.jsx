import React, { useEffect, useState } from "react";
import Overview from "../components/Overview";
import { fetchJSON } from "../index";

const Home = () => {
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

  if (isLoggedIn) {
    return (
      <div className="element-body">
        <div>{user.name} is logged in</div>
      </div>
    );
  } else {
    return (
      <div className="element-body">
        <div>No user logged in</div>
      </div>
    );
  }
};

export default Home;
