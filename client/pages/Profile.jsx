import React from "react";
import { fetchJSON, useLoader } from "../index";

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

  const handleChange = async (e) => {
    console.log(e.target.value);
    //disable select while posting changes
    document.getElementById("role-select").disabled = true;

    //post changes
    try {
      await fetch("/api/profile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          role: e.target.value,
        }),
      });
    } catch (error) {
      console.log(error);
    } finally {
      //enable select after posting changes
      document.getElementById("role-select").disabled = false;
    }
  };

  return (
    <>
      <div className="element-body">
        <div className="profile-header">
          <img src={data.userInfo.picture} />
          <h1>{data.userInfo.name}</h1>
        </div>
        <h2>Email: {data.userInfo.email}</h2>
        <div>
          <h2>Edit role:</h2>
          <select
            defaultValue={data.userInfo.role}
            onChange={(e) => handleChange(e)}
            id="role-select"
          >
            <option value="journalist">Journalist</option>
            <option value="user">User</option>
          </select>
        </div>
      </div>
    </>
  );
};

export default Profile;
