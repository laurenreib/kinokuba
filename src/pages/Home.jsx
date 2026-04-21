// src/pages/Home.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/portfolio/Sidebar";
import { projects } from "../data/projects";

function Card({ p, navigate, aspect }) {
  const [hovered, setHovered] = useState(false);

  if (!p) return null;

  return (
    <div
      onClick={() => navigate(`/project/${p.slug}`)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: "relative",
        width: "100%",
        cursor: "pointer",
        ...(aspect ? { aspectRatio: aspect, overflow: "hidden" } : {}),
      }}
    >
      {/* Inner wrapper — height changes to "auto" if no aspect ratio to tightly wrap the image */}
      <div style={{ position: "relative", overflow: "hidden", width: "100%", height: aspect ? "100%" : "auto" }}>
        <img
          src={p.coverUrl}
          alt={p.title}
          loading="lazy"
          style={{
            display: "block",
            width: "100%",
            height: aspect ? "100%" : "auto",
            objectFit: "cover",
            transform: hovered ? "scale(1.05)" : "scale(1)",
            transition: "transform 0.5s ease",
            pointerEvents: "none",
            ...(aspect ? { position: "absolute", inset: 0 } : {}),
          }}
        />
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: hovered ? "rgba(212,160,23,0.7)" : "rgba(212,160,23,0)",
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
    </div>
  );
}

export default function Home() {
  const navigate = useNavigate();
  const large = projects.slice(0, 4);
  const small = projects.slice(4);

  // Helper to check if a project is Cosm so we can avoid forcing its aspect ratio
  const isCosm = (p) => 
    p && (p.slug === "project-5" || p.slug?.toLowerCase().includes("cosm") || p.title?.toLowerCase().includes("cosm"));

  return (
    <div className="min-h-screen bg-[#FAFAF9] text-neutral-900">
      <Sidebar activeCategory="works" setActiveCategory={() => {}} />

      <div className="pt-24 pb-12">
        <div className="mx-auto w-full max-w-7xl px-6 md:px-10">

          {/* Restored the missing grid wrapper for the top 4 projects */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6 items-start">
            {large.map((p) => (
              <Card 
                key={p.slug} 
                p={p} 
                navigate={navigate} 
                // large projects already use their original aspect ratio
              />
            ))}
          </div>

          <div className="flex w-full gap-6 items-start">
            <div className="w-[35%]">
              <Card 
                p={small[0]} 
                navigate={navigate} 
                // Only force 3/4 if it is NOT Cosm
                aspect={isCosm(small[0]) ? undefined : "3/4"} 
              />
            </div>
            <div className="w-[65%] pt-[60px]">
              <Card 
                p={small[1]} 
                navigate={navigate} 
                // Only force 16/9 if it is NOT Cosm
                aspect={isCosm(small[1]) ? undefined : "16/9"} 
              />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}