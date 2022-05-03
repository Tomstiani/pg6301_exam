import React, { useEffect } from "react";

const Callback = () => {
  useEffect(() => {
    const { access_token } = Object.fromEntries(
      new URLSearchParams(window.location.hash.substring(1))
    );

    fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ access_token }),
    });
  });

  return <h1>Login Callback</h1>;
};

export default Callback;
