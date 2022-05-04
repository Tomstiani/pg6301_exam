import React from "react";
import { fetchJSON, useLoader } from "./Movies/Index";

const Profile = () => {
  const { loading, data, error } = useLoader(async () => {
    return await fetchJSON("/api/login");
  });

  if (loading) {
    return <h1>Loading...</h1>;
  }
  if (error) {
    return <h1>Error: {error.message}</h1>;
  }

  return (
    <>
      <div className="element-body">
        <h1>Profile</h1>
        <div>{JSON.stringify(data)}</div>
      </div>
    </>
  );
};

export default Profile;
