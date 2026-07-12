"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import GalleryGrid from "@/components/gallery/GalleryGrid";
import Loading from "@/components/ui/Loading";
import { api } from "@/lib/api";
import { GalleryImage } from "@/types";

export default function GalleryPage() {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    api.getGallery()
      .then((data) => setImages(data.images))
      .catch(() => setError("بارگذاری گالری با خطا مواجه شد"))
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <Header />
      <main className="min-h-screen bg-cream-50 pt-20 dark:bg-[#0c0c18]">
        <div className="mx-auto max-w-6xl px-5 py-12 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="section-title">گالری</h1>
            <p className="section-subtitle">
              لحظات زیبای ما را ببینید
            </p>
          </motion.div>

          <div className="mt-10">
            {loading ? (
              <Loading />
            ) : error ? (
              <div className="py-20 text-center">
                <p className="text-5xl">⚠️</p>
                <p className="mt-3 text-sm text-red-400">{error}</p>
              </div>
            ) : images.length === 0 ? (
              <div className="py-20 text-center">
                <p className="text-5xl">📸</p>
                <p className="mt-3 text-sm text-gray-400">
                  تصویری یافت نشد
                </p>
              </div>
            ) : (
              <GalleryGrid images={images} />
            )}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
