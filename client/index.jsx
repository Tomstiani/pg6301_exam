import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Movies from "./pages/Movies/Index";
import AddMovie from "./pages/Movies/Add";
import Login from "./pages/Login/Login";
import Callback from "./pages/Login/Callback";
import Profile from "./pages/Profile";

const Application = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/movies/add" element={<AddMovie />} />
        <Route path="/login" element={<Login />} />
        <Route path="/login/callback" element={<Callback />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </BrowserRouter>
  );
};

createRoot(document.getElementById("app")).render(<Application />);
