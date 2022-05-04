import React, { useEffect } from "react";

const Logout = () => {
  useEffect(() => {
    //remove access token from cookies
    document.cookie =
      "access_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    //update server to indicate user is logged out
    const res = fetch("/api/logout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        isLoggedIn: false,
      }),
    });

    //Return to home page
    res.then(() => {
      window.location.href = "/";
    });
  }, []);

  return <h1>Please wait...</h1>;
};

export default Logout;
