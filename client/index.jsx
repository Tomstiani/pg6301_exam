import React, { useEffect } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login/Login";
import Callback from "./pages/Login/Callback";
import Profile from "./pages/Profile";
import Navbar from "./components/Navbar";

export const LoginContext = React.createContext();

const useLoader = (loadingFn) => {
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState();
  const [data, setData] = React.useState();

  const load = async () => {
    try {
      setLoading(true);
      setData(await loadingFn());
    } catch (e) {
      setError(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  return { loading, error, data };
};

const fetchJSON = async (url) => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  return await response.json();
};

const Application = () => {
  const { loading, error, data } = useLoader(() => fetchJSON("/api/config"));

  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error: {error.message}</div>;
  }
  return (
    <LoginContext.Provider value={data}>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/login/callback" element={<Callback />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </BrowserRouter>
    </LoginContext.Provider>
  );
};

createRoot(document.getElementById("app")).render(<Application />);
