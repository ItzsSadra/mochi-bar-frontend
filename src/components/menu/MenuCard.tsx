"use client";

import { motion } from "framer-motion";
import { formatPrice } from "@/lib/utils";
import { MenuItem } from "@/types";
import { getImageUrl } from "@/lib/api";

interface MenuCardProps {
  item: MenuItem;
}

export default function MenuCard({ item }: MenuCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="group overflow-hidden rounded-2xl border border-gray-100 bg-white transition-all duration-300 hover:shadow-soft-lg dark:border-white/5 dark:bg-white/[0.02]"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-gray-50 dark:bg-white/[0.02]">
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
        <div className="absolute left-2.5 top-2.5 flex gap-1.5">
          {item.is_new && (
            <span className="rounded-lg bg-matcha-400 px-2 py-0.5 text-2xs font-semibold text-white">
              جدید
            </span>
          )}
          {item.is_featured && (
            <span className="rounded-lg bg-sakura-400 px-2 py-0.5 text-2xs font-semibold text-white">
              ویژه
            </span>
          )}
        </div>
        {!item.is_available && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm">
            <span className="rounded-lg bg-red-500 px-3 py-1.5 text-xs font-semibold text-white">
              ناموجود
            </span>
          </div>
        )}
      </div>
      <div className="p-4">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0 flex-1">
            <p className="text-2xs font-medium text-matcha-500 dark:text-matcha-400">
              {item.category_name}
            </p>
            <h3 className="mt-0.5 truncate text-sm font-semibold text-gray-900 dark:text-white">
              {item.name}
            </h3>
          </div>
          <span className="shrink-0 text-sm font-bold text-matcha-500 dark:text-matcha-400">
            {formatPrice(item.price)}
          </span>
        </div>
        {item.description && (
          <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-gray-400 dark:text-gray-500">
            {item.description}
          </p>
        )}
        <div className="mt-2.5 flex items-center gap-3 text-2xs text-gray-400 dark:text-gray-500">
          {item.preparation_time && (
            <span>{item.preparation_time} دقیقه</span>
          )}
          {item.ingredients && (
            <span className="line-clamp-1">{item.ingredients}</span>
          )}
        </div>
      </div>
    </motion.div>
  );
}
