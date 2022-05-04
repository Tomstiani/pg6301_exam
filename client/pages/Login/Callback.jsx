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
    }).then(() => {
      window.location.href = "/";
    });
  });

  return <h1>Please wait...</h1>;
};

export default Callback;
