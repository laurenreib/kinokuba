// src/pages/DemoReel.jsx
import React, { useState } from "react";
import { motion } from "framer-motion";
import Sidebar from "../components/portfolio/Sidebar";

// Placeholder reel data — replace with real video URLs/embeds
const reels = [
  {
    id: 1,
    title: "Project Title",
    year: "20XX",
    // For YouTube: embed URL format https://www.youtube.com/embed/VIDEO_ID
    // For Vimeo: https://player.vimeo.com/video/VIDEO_ID
    // For local file: just use a <video> tag — swap the src below
    embedUrl: null, // Replace with your embed URL
    coverUrl: null, // Fallback thumbnail if no embed
    description: "A collection of work from 20XX. Replace this with a real embed URL & example of idea.",
  },
];

export default function DemoReel() {
  const [active, setActive] = useState(null);

  return (
    <div className="min-h-screen bg-[#FAFAF9] text-neutral-900">
      <Sidebar activeCategory="" setActiveCategory={() => {}} />

      <div className="mx-auto max-w-5xl px-4 md:px-8 lg:px-12 pt-24 pb-16">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
          className="mb-12"
        >
          <h1 className="text-3xl md:text-4xl font-light tracking-tight">Demo Reel</h1>
          <div className="mt-4 w-16 h-[1px] bg-neutral-300" />
        </motion.div>

        {/* Reel list */}
        <div className="space-y-14">
          {reels.map((reel, i) => (
            <motion.div
              key={reel.id}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="flex flex-col gap-4"
            >
              {/* Title + year row */}
              <div className="flex items-baseline justify-between">
                <h2 className="text-lg md:text-xl font-normal tracking-wide">{reel.title}</h2>
                <span className="text-xs tracking-[0.15em] text-neutral-400 uppercase">{reel.year}</span>
              </div>

              {/* Video embed or placeholder */}
              <div
                className="relative w-full bg-neutral-100 overflow-hidden"
                style={{ paddingBottom: "56.25%" /* 16:9 */ }}
              >
                {reel.embedUrl ? (
                  <iframe
                    src={reel.embedUrl}
                    title={reel.title}
                    className="absolute inset-0 w-full h-full"
                    frameBorder="0"
                    allow="autoplay; fullscreen; picture-in-picture"
                    allowFullScreen
                  />
                ) : reel.coverUrl ? (
                  <img
                    src={reel.coverUrl}
                    alt={reel.title}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                ) : (
                  /* Placeholder if no embed or cover yet */
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-neutral-400">
                    <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                      <circle cx="24" cy="24" r="22" stroke="currentColor" strokeWidth="1.5" />
                      <polygon points="20,16 34,24 20,32" fill="currentColor" opacity="0.5" />
                    </svg>
                    <p className="text-sm tracking-wider">Video coming soon</p>
                  </div>
                )}
              </div>

              {/* Description */}
              {reel.description && (
                <p className="text-sm font-light leading-relaxed text-neutral-600 max-w-xl">
                  {reel.description}
                </p>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}