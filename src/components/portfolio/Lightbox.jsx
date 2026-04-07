import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { X } from "lucide-react";

export default function Lightbox({ image, index, count, onClose, onPrev, onNext }) {
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose, onPrev, onNext]);

  return (
    <motion.div
      className="fixed inset-0 z-50 bg-black/30 backdrop-blur-[1px] flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      aria-modal="true"
      role="dialog"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <button
        className="absolute top-4 right-4 z-[60] pointer-events-auto text-white/90 hover:text-white"
        onClick={(e) => {
          e.stopPropagation();
          onClose();
        }}
        aria-label="Close lightbox"
      >
        <X size={28} />
      </button>

      <motion.figure
        className="max-w-[92vw] max-h-[88vh]"
        initial={{ scale: 0.96, y: 6, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        exit={{ scale: 0.98, opacity: 0 }}
        transition={{ type: "spring", stiffness: 260, damping: 24 }}
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={image.url}
          alt={`${image.title}${image.date ? ` — ${image.date}` : ""}`}
          className="max-h-[80vh] w-auto h-auto mx-auto shadow-2xl rounded-none"
        />

        <figcaption className="mt-3 flex justify-between text-sm text-white/90">
          <span className="text-left">{image.title}</span>
          <span className="text-right">{image.date}</span>
        </figcaption>
      </motion.figure>
    </motion.div>
  );
}
