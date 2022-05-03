import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Callback = () => {
  const navigate = useNavigate();
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
    navigate("/");
  });

  return <h1>Please wait...</h1>;
};

export default Callback;
