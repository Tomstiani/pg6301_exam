import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Movies from "./pages/Movies/Index";
import AddMovie from "./pages/Movies/Add";
import Login from "./pages/Login/Login";
import Callback from "./pages/Login/Callback";

const Application = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/movies/add" element={<AddMovie />} />
        <Route path="/login" element={<Login />} />
        <Route path="/login/callback" element={<Callback />} />
      </Routes>
    </BrowserRouter>
  );
};

createRoot(document.getElementById("app")).render(<Application />);
