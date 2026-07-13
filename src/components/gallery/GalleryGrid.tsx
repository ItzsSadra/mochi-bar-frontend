"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HiXMark } from "react-icons/hi2";
import { GalleryImage } from "@/types";
import { getImageUrl } from "@/lib/api";

interface GalleryGridProps {
  images: GalleryImage[];
}

export default function GalleryGrid({ images }: GalleryGridProps) {
  const [selected, setSelected] = useState<GalleryImage | null>(null);

  return (
    <>
      <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:gap-4">
        {images.map((image, index) => (
          <motion.div
            key={image.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.03, duration: 0.5 }}
            className="group cursor-pointer overflow-hidden rounded-2xl"
            style={{ border: "0.5px solid var(--border-subtle)" }}
            role="button"
            tabIndex={0}
            onClick={() => setSelected(image)}
            onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); setSelected(image); } }}
          >
            <img
              src={getImageUrl(image.image_url)}
              alt={image.title || image.caption || ""}
              className="aspect-square w-full object-cover transition-transform duration-700 group-hover:scale-105"
              loading="lazy"
            />
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-2xl"
            style={{ background: "rgba(0,0,0,0.6)" }}
            onClick={() => setSelected(null)}
            role="dialog"
            aria-modal="true"
            aria-label="تصویر بزرگ"
          >
            <button
              className="absolute left-4 top-4 rounded-full p-2.5 text-white transition-colors"
              style={{ background: "rgba(255,255,255,0.1)", backdropFilter: "blur(20px)" }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.2)")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.1)")}
              onClick={() => setSelected(null)}
              aria-label="بستن"
            >
              <HiXMark size={20} />
            </button>
            <motion.img
              initial={{ scale: 0.94, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.94, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              src={getImageUrl(selected.image_url)}
              alt={selected.title || ""}
              className="max-h-[85vh] max-w-full rounded-3xl object-contain"
              onClick={(e) => e.stopPropagation()}
            />
            {(selected.title || selected.caption) && (
              <div className="absolute bottom-6 left-6 right-6 text-center text-white" onClick={(e) => e.stopPropagation()}>
                {selected.title && (
                  <h3 className="text-lg font-semibold">{selected.title}</h3>
                )}
                {selected.caption && (
                  <p className="mt-1 text-sm text-white/60">{selected.caption}</p>
                )}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
