"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { api, getImageUrl } from "@/lib/api";
import { GalleryImage } from "@/types";
import Skeleton from "@/components/ui/Skeleton";

export default function GalleryPreview() {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.getGallery().then((data) => setImages(data.images.slice(0, 6))).catch(() => {}).finally(() => setLoading(false));
  }, []);

  return (
    <section className="py-12 bg-white dark:bg-[#0c0c18] sm:py-20">
      <div className="mx-auto max-w-6xl px-5 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <span className="section-label">گالری</span>
          <h2 className="section-title mt-2">لحظه‌های زیبا</h2>
          <p className="section-subtitle mx-auto max-w-lg">
            تصاویری از فضای دنج و محصولات خاص ما
          </p>
        </motion.div>

        <div className="mt-8 grid grid-cols-2 gap-3 sm:mt-14 md:grid-cols-3 lg:gap-4">
          {loading
            ? Array.from({ length: 6 }).map((_, i) => (
                <Skeleton key={i} className="aspect-square" />
              ))
            : images.map((image, index) => (
            <motion.div
              key={image.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.04 }}
              className="group overflow-hidden rounded-xl"
            >
              <img
                src={getImageUrl(image.image_url)}
                alt={image.title || ""}
                className="aspect-square w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </motion.div>
          ))
          }
          {!loading && images.length === 0 && (
            <div className="col-span-2 md:col-span-3 py-16 text-center">
              <p className="text-5xl">🍵</p>
              <p className="mt-3 text-sm text-gray-400">تصویری یافت نشد</p>
            </div>
          )}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-10 text-center"
        >
          <Link href="/gallery" className="btn-secondary">
            مشاهده گالری کامل
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
