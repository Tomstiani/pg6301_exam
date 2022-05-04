import React, { useEffect, useState } from "react";
import Overview from "../components/Overview";
import { checkLogin } from "../index";

const Home = () => {
  // is the user logged in?
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    checkLogin().then((isLoggedIn) => setIsLoggedIn(isLoggedIn));
  }, []);

  return (
    <div>
      <div className="element-body">
        <h1>Home</h1>
        <Overview />
      </div>
    </div>
  );
};

export default Home;
