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
  const {
    auth: { discovery_endpoint, client_id, response_type, scope },
  } = useContext(LoginContext);

  useEffect(async () => {
    const { authorization_endpoint } = await fetchJSON(discovery_endpoint);
    console.log(authorization_endpoint);

    const params = {
      response_type: response_type,
      client_id: client_id,
      scope: scope,
      redirect_uri: `${window.location.origin}/login/callback`,
    };

    console.log(new URLSearchParams(params).toString());

    window.location.href = `${authorization_endpoint}?${new URLSearchParams(
      params
    ).toString()}`;
  }, []);

  return (
    <div>
      <div className="element-body">
        <h1>Please wait</h1>
      </div>
    </div>
  );
};

export default Login;
