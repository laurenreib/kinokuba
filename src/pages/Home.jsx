// src/pages/Home.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/portfolio/Sidebar";
import { projects } from "../data/projects";

function Card({ p, navigate, aspect }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onClick={() => navigate(`/project/${p.slug}`)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ position: "relative", width: "100%", cursor: "pointer", overflow: "hidden", aspectRatio: aspect }}
    >
      <img
        src={p.coverUrl}
        alt={p.title}
        loading="lazy"
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          transform: hovered ? "scale(1.05)" : "scale(1)",
          transition: "transform 0.5s ease",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundColor: `rgba(212, 160, 23, ${hovered ? 0.7 : 0})`,
          transition: "background-color 0.3s ease",
          display: "flex",
          alignItems: "flex-end",
          padding: "24px",
          pointerEvents: "none",
        }}
      >
        <span
          style={{
            color: "white",
            fontWeight: "bold",
            letterSpacing: "0.15em",
            fontSize: "0.875rem",
            textTransform: "uppercase",
            opacity: hovered ? 1 : 0,
            transition: "opacity 0.3s ease",
          }}
        >
          {p.title}
        </span>
      </div>
    </div>
  );
}

export default function Home() {
  const navigate = useNavigate();
  const large = projects.slice(0, 4);  // 2x2 grid
  const small = projects.slice(4);     // 3 smaller below

  return (
    <div className="min-h-screen bg-[#FAFAF9] text-neutral-900">
      <Sidebar activeCategory="works" setActiveCategory={() => {}} />

      <div className="pt-24 pb-12">
        <div className="mx-auto w-full max-w-7xl px-6 md:px-10">

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
            {large.map((p) => (
              <Card key={p.slug} p={p} navigate={navigate} aspect="5/3" />
            ))}
          </div>

          <div className="grid grid-cols-3 gap-6 items-start">
            {small.map((p, i) => (
              <div key={p.slug} style={{ paddingTop: i === 0 ? "0" : "60px" }}>
                <Card p={p} navigate={navigate} aspect={i === 0 ? "4/5" : "4/3"} />
              </div>
            ))}
            ))}
          </div>

        </div>
      </div>
    </div>
  );
}