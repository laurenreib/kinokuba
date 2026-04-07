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

  return (
    <div className="min-h-screen bg-[#FAFAF9] text-neutral-900 flex flex-col overflow-hidden relative">
      <Sidebar activeCategory="works" setActiveCategory={() => navigate("/")} />

      {/* ───── DESKTOP LAYOUT ───── */}
      <div className="hidden md:block w-full pt-20 pb-10 px-4 lg:px-8">

        {/* Outer row: [image+overlays] [text panel] */}
        <div className="flex items-start gap-0 w-full max-w-[1100px] mx-auto">

          {/* CENTER: image + thumbnails stacked */}
          <div className="flex flex-col flex-1 min-w-0">

            {/* Image container — overlays live inside here */}
            <div
              className="relative w-full overflow-hidden bg-neutral-100"
              style={{ aspectRatio: "16/9" }}
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

              {/* LEFT overlay — slim strip on photo, fades in on hover */}
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

              {/* RIGHT overlay — slim strip on photo, fades in on hover */}
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

            {/* Thumbnails — full width of image, uniform height */}
            {images.length > 1 && (
              <div className="flex mt-2 gap-[3px]">
                {images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => { setDirection(i > index ? 1 : -1); setIndex(i); }}
                    className="relative flex-1 overflow-hidden cursor-pointer"
                    style={{ height: "70px" }}
                  >
                    <img src={img} className="w-full h-full object-cover" alt={`Thumbnail ${i + 1}`} />
                    {/* Golden tint overlay — removed on active */}
                    <div
                      className={`absolute inset-0 transition-all duration-250 ${
                        i === index
                          ? "border-2 border-[#D4A017]"
                          : "bg-[#c49a10]/65 hover:bg-[#D4A017]/30"
                      }`}
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* RIGHT TEXT PANEL — sits beside image, top-aligned */}
          <div className="flex-shrink-0 flex flex-col text-black pl-6 lg:pl-10" style={{ width: "260px" }}>
            <h1 className="text-2xl lg:text-3xl font-normal tracking-wide leading-tight mb-1">
              {project.title}
            </h1>
            <p className="text-xs tracking-[0.18em] text-neutral-400 uppercase mb-5">
              April 2026
            </p>
            <div className="w-8 h-[1px] bg-neutral-300 mb-5" />
            <p className="text-sm font-light leading-relaxed text-neutral-700">
              This is a temporary description for the project. You can update this space later
              with specific details about the client, the location, or the creative process
              behind these photographs.
            </p>
          </div>
        </div>
      </div>

      {/* ───── MOBILE LAYOUT ───── */}
      <div className="md:hidden flex flex-col w-full pt-16 pb-10 bg-[#FAFAF9]">

        {/* Title (top-left) + Date (top-right) — same horizontal padding as image */}
        <div className="flex items-baseline justify-between px-4 mb-[3px]">
          <h1 className="text-sm font-semibold tracking-wide leading-tight">{project.title}</h1>
          <p className="text-[9px] tracking-[0.12em] text-neutral-400 uppercase whitespace-nowrap ml-2">
            April 2026
          </p>
        </div>

        {/* Swipeable Photo — inset from screen edges */}
        <div className="px-4">
          <div
            className="relative w-full overflow-hidden bg-[#FAFAF9]"
            style={{ aspectRatio: "3/2" }}
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
                className="absolute inset-0 w-full h-full object-contain"
                alt={`${project.title} - ${index + 1}`}
              />
            </AnimatePresence>
          </div>
        </div>

        {/* Thumbnails — same px-4 inset so they align exactly with image edges */}
        {images.length > 1 && (
          <div className="flex mt-[3px] gap-[2px] px-4">
            {images.map((img, i) => (
              <button
                key={i}
                onClick={() => { setDirection(i > index ? 1 : -1); setIndex(i); }}
                className="relative flex-1 overflow-hidden cursor-pointer"
                style={{ height: "36px" }}
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

        {/* Description — below thumbnails, padded */}
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