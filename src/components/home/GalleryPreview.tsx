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
  const inView = useInView(ref, { once: true, margin: "-40px" });

  useEffect(() => {
    api.getGallery().then((data) => setImages(data.images.slice(0, 6))).catch(() => {}).finally(() => setLoading(false));
  }, []);

  return (
    <section ref={ref} className="relative py-16 sm:py-24 lg:py-32" style={{ background: "var(--background)" }}>
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            <span className="section-label">گالری</span>
            <h2 className="section-title mt-2.5">لحظه‌های زیبا</h2>
            <p className="section-subtitle">فضای دنج و محصولات خاص ما</p>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 12 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.2 }} className="hidden sm:block">
            <Link href="/gallery" className="btn-secondary">مشاهده گالری کامل →</Link>
          </motion.div>
        </div>

        {/* Mobile: 2-col grid */}
        <div className="mt-8 sm:mt-12 grid grid-cols-2 gap-2.5 sm:gap-3 md:grid-cols-3 lg:gap-4">
          {loading
            ? Array.from({ length: 6 }).map((_, i) => <Skeleton key={i} className="aspect-square rounded-2xl sm:rounded-3xl" />)
            : images.map((image, index) => {
              const isLarge = index === 0 || index === 3;
              return (
                <motion.div
                  key={image.id}
                  initial={{ opacity: 0, y: 16, scale: 0.96 }}
                  animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
                  transition={{ delay: 0.1 + index * 0.04, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className={`group cursor-pointer overflow-hidden rounded-2xl sm:rounded-3xl ${isLarge ? "row-span-2" : ""}`}
                  style={{ border: "0.5px solid var(--border-subtle)" }}
                >
                  <img
                    src={getImageUrl(image.image_url)}
                    alt={image.title || ""}
                    className={`w-full object-cover transition-transform duration-700 group-hover:scale-105 ${isLarge ? "aspect-[3/4] md:aspect-[2/3]" : "aspect-square"}`}
                    loading="lazy"
                  />
                </motion.div>
              );
            })
          }
          {!loading && images.length === 0 && (
            <div className="col-span-2 py-16 text-center">
              <p className="text-4xl">🍵</p>
              <p className="mt-3 text-[0.8125rem]" style={{ color: "var(--muted)" }}>تصویری یافت نشد</p>
            </div>
          )}
        </div>

        {/* Mobile: see all */}
        <div className="mt-6 text-center sm:hidden">
          <Link href="/gallery" className="btn-secondary">
            مشاهده گالری کامل →
          </Link>
        </div>
      </div>
    </section>
  );
}
