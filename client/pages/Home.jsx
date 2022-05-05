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

  return (
    <div className="element-body">
      <Overview isLoggedIn={isLoggedIn} />
    </div>
  );
};

export default Home;
