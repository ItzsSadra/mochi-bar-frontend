"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { api, getImageUrl } from "@/lib/api";
import { GalleryImage } from "@/types";
import Skeleton from "@/components/ui/Skeleton";

export default function GalleryPreview() {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  useEffect(() => {
    api.getGallery().then((data) => setImages(data.images.slice(0, 6))).catch(() => {}).finally(() => setLoading(false));
  }, []);

  return (
    <section ref={ref} className="relative py-24 sm:py-32" style={{ background: "var(--background)" }}>
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <div className="flex flex-col items-start gap-6 sm:flex-row sm:items-end sm:justify-between">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            <span className="section-label">گالری</span>
            <h2 className="section-title mt-3">لحظه‌های زیبا</h2>
            <p className="section-subtitle mt-4">
              تصاویری از فضای دنج و محصولات خاص ما
            </p>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.2 }}>
            <Link href="/gallery" className="btn-secondary">مشاهده گالری کامل →</Link>
          </motion.div>
        </div>

        {/* Masonry-like grid */}
        <div className="mt-14 grid grid-cols-2 gap-3 md:grid-cols-3 lg:gap-4">
          {loading
            ? Array.from({ length: 6 }).map((_, i) => <Skeleton key={i} className="aspect-square rounded-3xl" />)
            : images.map((image, index) => {
              // Make some items taller for visual interest
              const isLarge = index === 0 || index === 3;
              return (
                <motion.div
                  key={image.id}
                  initial={{ opacity: 0, y: 20, scale: 0.96 }}
                  animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
                  transition={{ delay: 0.1 + index * 0.05, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  className={`group cursor-pointer overflow-hidden ${isLarge ? "row-span-2" : ""}`}
                  style={{
                    borderRadius: "1.25rem",
                    border: "0.5px solid var(--border-subtle)",
                  }}
                >
                  <div className="relative h-full overflow-hidden">
                    <img
                      src={getImageUrl(image.image_url)}
                      alt={image.title || ""}
                      className={`w-full object-cover transition-transform duration-[800ms] group-hover:scale-110 ${isLarge ? "aspect-[3/4] md:aspect-[2/3]" : "aspect-square"}`}
                      loading="lazy"
                    />
                    {/* Hover overlay */}
                    <div
                      className="absolute inset-0 flex items-end opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                      style={{ background: "linear-gradient(to top, rgba(0,0,0,0.5) 0%, transparent 60%)" }}
                    >
                      {image.title && (
                        <div className="p-4">
                          <p className="text-sm font-semibold text-white">{image.title}</p>
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })
          }
          {!loading && images.length === 0 && (
            <div className="col-span-2 md:col-span-3 py-24 text-center">
              <p className="text-6xl">🍵</p>
              <p className="mt-4 text-sm" style={{ color: "var(--muted)" }}>تصویری یافت نشد</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
