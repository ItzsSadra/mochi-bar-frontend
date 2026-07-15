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
      <div className="grid grid-cols-2 gap-2.5 sm:gap-3 md:grid-cols-3 lg:gap-4">
        {images.map((image, index) => (
          <motion.div
            key={image.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.03, duration: 0.4 }}
            className="group cursor-pointer overflow-hidden rounded-2xl sm:rounded-3xl"
            style={{ border: "1px solid var(--border)" }}
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
            className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 backdrop-blur-2xl"
            style={{ background: "rgba(0,0,0,0.6)" }}
            onClick={() => setSelected(null)}
            role="dialog"
            aria-modal="true"
            aria-label="تصویر بزرگ"
          >
            {/* Mobile close button — larger touch target */}
            <button
              className="absolute right-3 top-3 sm:left-4 sm:top-4 flex h-10 w-10 items-center justify-center rounded-full text-white transition-colors"
              style={{ background: "rgba(255,255,255,0.15)", backdropFilter: "blur(20px)" }}
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
              className="max-h-[80vh] sm:max-h-[85vh] max-w-full rounded-2xl sm:rounded-3xl object-contain"
              onClick={(e) => e.stopPropagation()}
            />
            {(selected.title || selected.caption) && (
              <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6 text-center text-white" onClick={(e) => e.stopPropagation()}>
                {selected.title && (
                  <h3 className="text-[0.9375rem] sm:text-lg font-semibold">{selected.title}</h3>
                )}
                {selected.caption && (
                  <p className="mt-1 text-[0.75rem] sm:text-sm text-white/60">{selected.caption}</p>
                )}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
