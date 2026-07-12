"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { api } from "@/lib/api";
import { MenuItem } from "@/types";
import { formatPrice } from "@/lib/utils";
import { getImageUrl } from "@/lib/api";

export default function FeaturedMenu() {
  const [items, setItems] = useState<MenuItem[]>([]);

  useEffect(() => {
    api.getMenu({ featured: true }).then((data) => setItems(data.items.slice(0, 4)));
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
          <span className="section-label">پیشنهاد ویژه</span>
          <h2 className="section-title mt-2">محبوب‌ترین‌های ما</h2>
          <p className="section-subtitle mx-auto max-w-lg">
            انتخاب‌های ویژه ما از بهترین مواد اولیه و با عشق تهیه شده‌اند
          </p>
        </motion.div>

        <div className="mt-8 grid grid-cols-1 gap-5 sm:mt-14 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
              className="group overflow-hidden rounded-2xl border border-gray-100 bg-white transition-all duration-300 hover:shadow-soft-lg dark:border-white/5 dark:bg-white/[0.02]"
            >
              <div className="relative aspect-square overflow-hidden bg-gray-50 dark:bg-white/[0.02]">
                {item.image_url ? (
                  <img
                    src={getImageUrl(item.image_url)}
                    alt={item.name}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center text-5xl">
                    🍡
                  </div>
                )}
                {item.is_new && (
                  <span className="absolute left-3 top-3 rounded-lg bg-matcha-400 px-2 py-0.5 text-2xs font-semibold text-white">
                    جدید
                  </span>
                )}
              </div>
              <div className="p-4">
                <p className="text-2xs font-medium text-matcha-500 dark:text-matcha-400">
                  {item.category_name}
                </p>
                <h3 className="mt-0.5 text-sm font-semibold text-gray-900 dark:text-white">
                  {item.name}
                </h3>
                <p className="mt-1.5 line-clamp-2 text-xs leading-relaxed text-gray-400 dark:text-gray-500">
                  {item.description}
                </p>
                <div className="mt-3 flex items-center justify-between">
                  <span className="text-sm font-bold text-matcha-500 dark:text-matcha-400">
                    {formatPrice(item.price)}
                  </span>
                  <Link
                    href={`/menu?category=${item.category_slug}`}
                    className="text-2xs font-medium text-gray-400 transition-colors hover:text-matcha-500 dark:text-gray-500 dark:hover:text-matcha-400"
                  >
                    مشاهده
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-10 text-center"
        >
          <Link href="/menu" className="btn-secondary">
            مشاهده کل منو
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
