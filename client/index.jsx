import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login/Login";
import Logout from "./pages/Login/Logout";
import Callback from "./pages/Login/Callback";
import Profile from "./pages/Profile";
import Navbar from "./components/Navbar";
import Article from "./pages/Article";
import NotFound from "./pages/NotFound";

export const LoginContext = React.createContext();

export const useLoader = (loadingFn) => {
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

export const fetchJSON = async (url) => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  return await response.json();
};

const Application = () => {
  const { loading, error, data } = useLoader(() =>
    fetchJSON("/api/login-info")
  );

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
          <Route path="*" element={<NotFound />} />
          <Route path="/login" element={<Login />} />
          <Route path="/login/callback" element={<Callback />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/articles/:id?" element={<Article />} />
        </Routes>
      </BrowserRouter>
    </LoginContext.Provider>
  );
};

createRoot(document.getElementById("app")).render(<Application />);
