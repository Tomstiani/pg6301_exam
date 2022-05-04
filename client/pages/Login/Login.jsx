import React, { useEffect, useState } from "react";

const fetchJSON = async (url) => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  return await response.json();
};

const Login = () => {
  const [redirectURL, setRedirectURL] = useState();

  useEffect(async () => {
    const { authorization_endpoint } = await fetchJSON(
      "https://accounts.google.com/.well-known/openid-configuration"
    );

    const params = {
      response_type: "token",
      client_id:
        "458398509144-96ll50575hbbb30at7bice2p008ruu1e.apps.googleusercontent.com",
      scope: "email profile",
      redirect_uri: `${window.location.origin}/login/callback`,
    };

    setRedirectURL(authorization_endpoint + "?" + new URLSearchParams(params));
  }, []);

  return (
    <div>
      <div className="element-body">
        <h1>Login</h1>
        <a href={redirectURL}>Go to login</a>
        <div>{redirectURL}</div>
      </div>
    </div>
  );
};

export default Login;
