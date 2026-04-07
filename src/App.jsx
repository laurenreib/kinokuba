import React from "react";
import { Routes, Route, Link } from "react-router-dom";

import Home from "./pages/Home";
import About from "./pages/About";
import Project from "./pages/Project";
import DemoReel from "./pages/DemoReel";

export default function App() {
  return (
    <div className="relative">
      {/* GLOBAL LOGO */}
      <Link
        to="/"
        className="absolute top-6 left-6 z-50 transition-transform duration-200 hover:scale-105"
      >
        <img
          src="https://d1lv07utbkw7w4.cloudfront.net/Gallery/templogo.png"
          alt="Kino Kuba Logo"
          className="h-10 md:h-12 w-auto object-contain"
        />
      </Link>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/project/:slug" element={<Project />} />
        <Route path="/about" element={<About />} />
        <Route path="/demo-reel" element={<DemoReel />} />
      </Routes>
    </div>
  );
}