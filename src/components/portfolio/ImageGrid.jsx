import React from "react";
import { motion } from "framer-motion";

export default function ImageGrid({ images, onImageClick }) {
  return (
    <div className="mx-auto w-full max-w-6xl px-6 md:px-10 mt-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">

      {images.map((img, idx) => (
        <motion.figure
          key={img.slug}
        
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
        >
          <button
            onClick={() => onImageClick(img, idx)}
            className="group relative block w-full text-left"
            aria-label={`Open ${img.title}`}
          >
            <div className="relative w-full aspect-[3/2]">
              <img
                src={img.coverUrl}
                alt={img.title}
                loading="lazy"
                className="w-full h-auto object-contain transition-transform duration-200 group-hover:scale-[1.3] rounded-none"
              />

              <div
                className="pointer-events-none absolute inset-0 bg-white/0 group-hover:bg-[#D4A017]/40 transition-colors duration-200"
              />
            </div>
          </button>
        </motion.figure>
      ))}
    </div>
  );
}
