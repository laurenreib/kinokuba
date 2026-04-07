// src/pages/Home.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/portfolio/Sidebar";
import { projects } from "../data/projects";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#FAFAF9] text-neutral-900">
      <Sidebar activeCategory="works" setActiveCategory={() => {}} />

      <div className="pt-24 pb-12">
        <div className="mx-auto w-full max-w-7xl px-6 md:px-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {projects.map((p) => (
              <button
                key={p.slug}
                onClick={() => navigate(`/project/${p.slug}`)}
                className="group relative text-left w-full overflow-hidden block"
                aria-label={`Open ${p.title}`}
              >
                {/* IMAGE FRAME */}
                <div className="relative w-full aspect-[3/2] bg-neutral-200">
                  <img
                    src={p.coverUrl}
                    alt={p.title}
                    loading="lazy"
                    // Changed to object-cover to perfectly fill the space with no gaps
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />

                  {/* Hover overlay & Title matching the screenshot */}
                  <div className="absolute inset-0 flex items-end p-6 bg-transparent group-hover:bg-[#D4A017]/70 transition-colors duration-300">
                    <span className="text-white font-bold tracking-widest text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 uppercase">
                      {p.title}
                    </span>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}