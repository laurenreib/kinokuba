// src/components/portfolio/Sidebar.jsx
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation } from "react-router-dom";

const navItems = [
  { id: "works", label: "WORKS", path: "/" },
  { id: "demo-reel", label: "DEMO REEL", path: "/demo-reel" },
  { id: "about", label: "ABOUT", path: "/about" },
];

export default function Sidebar({ activeCategory, setActiveCategory }) {
  const { pathname } = useLocation();
  const isAbout = pathname === "/about";
  const isDemoReel = pathname === "/demo-reel";
  const isHome = pathname === "/";
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* DESKTOP TOP-RIGHT LINKS */}
      <div className="hidden md:flex fixed top-4 right-6 z-50 items-center gap-6">
        {/* WORKS */}
        {!isHome ? (
          <Link
            to="/"
            className="text-sm font-semibold tracking-wider transition-colors text-yellow-400/80 hover:text-yellow-400"
          >
            WORKS
          </Link>
        ) : (
          <button
            onClick={() => setActiveCategory("works")}
            className={`text-sm font-semibold tracking-wider transition-colors ${
              activeCategory === "works" ? "text-yellow-400" : "text-yellow-400/80 hover:text-yellow-400"
            }`}
          >
            WORKS
          </button>
        )}

        {/* DEMO REEL */}
        <Link
          to="/demo-reel"
          className={`text-sm font-semibold tracking-wider transition-colors ${
            isDemoReel ? "text-yellow-400" : "text-yellow-400/80 hover:text-yellow-400"
          }`}
        >
          DEMO REEL
        </Link>

        {/* ABOUT */}
        <Link
          to="/about"
          className={`text-sm font-semibold tracking-wider transition-colors ${
            isAbout ? "text-yellow-400" : "text-yellow-400/80 hover:text-yellow-400"
          }`}
        >
          ABOUT
        </Link>
      </div>

      {/* MOBILE HAMBURGER */}
      <button
        className="md:hidden fixed top-4 right-4 z-50 p-2"
        aria-label="Open menu"
        onClick={() => setOpen(true)}
      >
        <div className="space-y-1">
          <div className="h-0.5 w-6 bg-yellow-400" />
          <div className="h-0.5 w-6 bg-yellow-400" />
          <div className="h-0.5 w-6 bg-yellow-400" />
        </div>
      </button>

      {/* MOBILE SLIDE-IN MENU */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              className="md:hidden fixed inset-0 bg-black/50 z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
            />
            <motion.aside
              className="md:hidden fixed top-0 right-0 h-full w-64 bg-neutral-200 z-50 p-6"
              initial={{ x: 260 }}
              animate={{ x: 0 }}
              exit={{ x: 260 }}
              transition={{ type: "spring", stiffness: 260, damping: 26 }}
            >
              <button
                className="mb-8 text-yellow-400 text-sm font-semibold tracking-wider"
                onClick={() => setOpen(false)}
              >
                ✕
              </button>
              <div className="flex flex-col gap-5">
                <Link
                  to="/"
                  onClick={() => { setActiveCategory("works"); setOpen(false); }}
                  className="text-left text-yellow-400 text-base font-semibold tracking-wider"
                >
                  WORKS
                </Link>
                <Link
                  to="/demo-reel"
                  onClick={() => setOpen(false)}
                  className="text-yellow-400 text-base font-semibold tracking-wider"
                >
                  DEMO REEL
                </Link>
                <Link
                  to="/about"
                  onClick={() => setOpen(false)}
                  className="text-yellow-400 text-base font-semibold tracking-wider"
                >
                  ABOUT
                </Link>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}