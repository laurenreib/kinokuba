// src/pages/Project.jsx
import React, { useMemo, useState, useEffect, useCallback, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { projects } from "../data/projects";
import Sidebar from "../components/portfolio/Sidebar";

export default function Project() {
  const { slug } = useParams();
  const navigate = useNavigate();

  const project = useMemo(() => projects.find((p) => p.slug === slug), [slug]);
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [leftHover, setLeftHover] = useState(false);
  const [rightHover, setRightHover] = useState(false);

  // Mobile swipe
  const touchStartX = useRef(null);
  const touchEndX = useRef(null);
  const MIN_SWIPE = 50;

  const images = project?.images ?? [];
  const current = images[index];

  const prev = useCallback(() => {
    setDirection(-1);
    setIndex((i) => (images.length ? (i + images.length - 1) % images.length : 0));
  }, [images.length]);

  const next = useCallback(() => {
    setDirection(1);
    setIndex((i) => (images.length ? (i + 1) % images.length : 0));
  }, [images.length]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") navigate("/");
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [navigate, prev, next]);

  const slideVariants = {
    enter: (dir) => ({ x: dir > 0 ? 800 : -800, opacity: 0 }),
    center: { zIndex: 1, x: 0, opacity: 1 },
    exit: (dir) => ({ zIndex: 0, x: dir < 0 ? 800 : -800, opacity: 0 }),
  };

  const handleTouchStart = (e) => { touchStartX.current = e.touches[0].clientX; touchEndX.current = null; };
  const handleTouchMove = (e) => { touchEndX.current = e.touches[0].clientX; };
  const handleTouchEnd = () => {
    if (touchStartX.current === null || touchEndX.current === null) return;
    const diff = touchStartX.current - touchEndX.current;
    if (Math.abs(diff) >= MIN_SWIPE) diff > 0 ? next() : prev();
    touchStartX.current = null; touchEndX.current = null;
  };

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FAFAF9] text-neutral-900">
        Project not found.
      </div>
    );
  }

  // --- DYNAMIC LAYOUT LOGIC ---
  // Safely check if the project is Cosm (by title or slug) to enforce portrait mode
  const isPortrait = 
    project.slug === "project-5" || 
    project.slug?.toLowerCase().includes("cosm") || 
    project.title?.toLowerCase().includes("cosm");

  const containerMaxWidth = isPortrait ? "max-w-[550px]" : "max-w-[1100px]";
  const desktopAspect = isPortrait ? "3/4" : "16/9";
  const mobileAspect = isPortrait ? "3/4" : "3/2";

  return (
    <div className="min-h-screen bg-[#FAFAF9] text-neutral-900 flex flex-col overflow-hidden relative">
      <Sidebar activeCategory="works" setActiveCategory={() => navigate("/")} />

      {/* ───── DESKTOP LAYOUT ───── */}
      <div className="hidden md:block w-full pb-10 px-4 lg:px-8" style={{ paddingTop: "72px" }}>
        <div className={`w-full mx-auto ${containerMaxWidth}`}>

          {/* Title + date — perfectly aligned to image width */}
          <div className="flex items-baseline justify-between w-full mb-3">
            <h1 className="text-2xl lg:text-3xl font-bold text-neutral-900 leading-none">
              {project.title}
            </h1>
            <p className="text-xs lg:text-sm font-semibold tracking-[0.15em] text-neutral-400 uppercase whitespace-nowrap ml-4">
              April 2026
            </p>
          </div>

          {/* Image + thumbnails */}
          <div className="flex flex-col w-full">
            <div
              className="relative w-full overflow-hidden bg-[#FAFAF9]"
              style={{ aspectRatio: desktopAspect }}
            >
              <AnimatePresence initial={false} custom={direction}>
                <motion.img
                  key={index}
                  src={current}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ x: { type: "spring", stiffness: 280, damping: 28 }, opacity: { duration: 0.2 } }}
                  className="absolute inset-0 w-full h-full object-cover"
                  alt={`${project.title} - ${index + 1}`}
                />
              </AnimatePresence>

              {/* LEFT overlay */}
              {images.length > 1 && (
                <div
                  className="absolute left-0 top-0 h-full z-20 cursor-pointer"
                  style={{ width: "10%" }}
                  onMouseEnter={() => setLeftHover(true)}
                  onMouseLeave={() => setLeftHover(false)}
                  onClick={prev}
                >
                  <motion.div
                    animate={{ opacity: leftHover ? 1 : 0 }}
                    transition={{ duration: 0.15 }}
                    className="w-full h-full bg-black/20 flex items-center justify-center"
                  >
                    <span className="text-white/80 text-xl select-none">❮</span>
                  </motion.div>
                </div>
              )}

              {/* RIGHT overlay */}
              {images.length > 1 && (
                <div
                  className="absolute right-0 top-0 h-full z-20 cursor-pointer"
                  style={{ width: "10%" }}
                  onMouseEnter={() => setRightHover(true)}
                  onMouseLeave={() => setRightHover(false)}
                  onClick={next}
                >
                  <motion.div
                    animate={{ opacity: rightHover ? 1 : 0 }}
                    transition={{ duration: 0.15 }}
                    className="w-full h-full bg-black/20 flex items-center justify-center"
                  >
                    <span className="text-white/80 text-xl select-none">❯</span>
                  </motion.div>
                </div>
              )}
            </div>

            {/* Thumbnails - Now conditionally centered if portrait */}
            {images.length > 1 && (
              <div className={`flex mt-4 gap-[3px] overflow-x-auto ${isPortrait ? "justify-center" : ""}`}>
                {images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => { setDirection(i > index ? 1 : -1); setIndex(i); }}
                    className="relative overflow-hidden cursor-pointer flex-shrink-0"
                    style={{ 
                      height: isPortrait ? "110px" : "70px",
                      aspectRatio: desktopAspect,
                      flex: isPortrait ? "none" : "1"
                    }}
                  >
                    <img src={img} className="w-full h-full object-cover" alt={`Thumbnail ${i + 1}`} />
                    <div
                      className={`absolute inset-0 transition-all duration-250 ${
                        i === index ? "border-2 border-[#D4A017]" : "bg-[#c49a10]/65 hover:bg-[#D4A017]/30"
                      }`}
                    />
                  </button>
                ))}
              </div>
            )}

            {/* Description */}
            <div className="mt-6">
              <div className="w-8 h-[1px] bg-neutral-300 mb-4" />
              <p className="text-sm font-light leading-relaxed text-neutral-700 max-w-xl">
                This is a temporary description for the project. You can update this space later
                with specific details about the client, the location, or the creative process
                behind these photographs.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ───── MOBILE LAYOUT ───── */}
      <div className="md:hidden flex flex-col w-full pb-10 bg-[#FAFAF9]">
        {/* Title (top-left) + Date (top-right) */}
        <div className="flex items-baseline justify-between px-4 mt-24 mb-3">
          <h1 className="text-xl font-bold text-neutral-900 leading-none">
            {project.title}
          </h1>
          <p className="text-[10px] font-semibold tracking-widest text-neutral-400 uppercase whitespace-nowrap ml-2">
            April 2026
          </p>
        </div>
        
        {/* Swipeable Photo */}
        <div className="px-4 flex flex-col">
          <div
            className="relative w-full overflow-hidden bg-[#FAFAF9]"
            style={{ aspectRatio: mobileAspect }}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <AnimatePresence initial={false} custom={direction}>
              <motion.img
                key={index}
                src={current}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ x: { type: "spring", stiffness: 300, damping: 30 }, opacity: { duration: 0.15 } }}
                className="absolute inset-0 w-full h-full object-cover"
                alt={`${project.title} - ${index + 1}`}
              />
            </AnimatePresence>
          </div>
        </div>

        {/* Thumbnails - Now conditionally centered if portrait */}
        {images.length > 1 && (
          <div className={`flex mt-[3px] gap-[2px] px-4 overflow-x-auto ${isPortrait ? "justify-center" : ""}`}>
            {images.map((img, i) => (
              <button
                key={i}
                onClick={() => { setDirection(i > index ? 1 : -1); setIndex(i); }}
                className="relative overflow-hidden cursor-pointer flex-shrink-0"
                style={{ 
                  height: isPortrait ? "80px" : "36px",
                  aspectRatio: mobileAspect,
                  flex: isPortrait ? "none" : "1"
                }}
              >
                <img src={img} className="w-full h-full object-cover" alt={`Thumbnail ${i + 1}`} />
                <div
                  className={`absolute inset-0 transition-all duration-250 ${
                    i === index ? "border-2 border-[#D4A017]" : "bg-[#c49a10]/65"
                  }`}
                />
              </button>
            ))}
          </div>
        )}

        {/* Description */}
        <div className="px-4 mt-5">
          <div className="w-8 h-[1px] bg-neutral-300 mb-3" />
          <p className="text-xs font-light leading-relaxed text-neutral-700">
            This is a temporary description for the project. You can update this space later
            with specific details about the client, the location, or the creative process
            behind these photographs.
          </p>
        </div>
      </div>
    </div>
  );
}