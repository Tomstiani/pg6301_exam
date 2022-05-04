import React, { useContext, useEffect, useState } from "react";
import { LoginContext } from "../../index";

const fetchJSON = async (url) => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  return await response.json();
};

const Login = () => {
  const { discovery_endpoint, client_id, response_type } =
    useContext(LoginContext);

  const [redirectURL, setRedirectURL] = useState();

  useEffect(async () => {
    const { authorization_endpoint } = await fetchJSON(discovery_endpoint);

    const params = {
      response_type,
      client_id,
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
