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
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
    >
      <div className="glass-card group h-full overflow-hidden">
        <div
          className="relative aspect-[4/3] overflow-hidden"
          style={{ background: "rgba(255,255,255,0.02)" }}
        >
          {item.image_url ? (
            <img
              src={getImageUrl(item.image_url)}
              alt={item.name}
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-4xl sm:text-5xl">
              📦
            </div>
          )}
          <div className="absolute left-2 top-2 sm:left-3 sm:top-3 flex gap-1 sm:gap-1.5">
            {item.is_new && (
              <span
                className="rounded-full px-2 py-0.5 sm:px-2.5 sm:py-1 text-[0.625rem] sm:text-2xs font-semibold text-white"
                style={{
                  background: "linear-gradient(135deg, #1E3A8A, #2563EB)",
                }}
              >
                جدید
              </span>
            )}
            {item.is_featured && (
              <span
                className="rounded-full px-2 py-0.5 sm:px-2.5 sm:py-1 text-[0.625rem] sm:text-2xs font-semibold text-white"
                style={{
                  background: "linear-gradient(135deg, #3B82F6, #60A5FA)",
                }}
              >
                ویژه
              </span>
            )}
          </div>
          {!item.is_available && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm">
              <span className="rounded-full bg-red-500 px-3 py-1 sm:px-4 sm:py-1.5 text-[0.6875rem] sm:text-xs font-semibold text-white">
                ناموجود
              </span>
            </div>
          )}
        </div>
        <div className="p-3 sm:p-4">
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0 flex-1">
              <p
                className="text-[0.625rem] sm:text-2xs font-medium"
                style={{ color: "var(--highlight)" }}
              >
                {item.category_name}
              </p>
              <h3
                className="mt-0.5 truncate text-[0.8125rem] sm:text-sm font-semibold"
                style={{ color: "var(--foreground)" }}
              >
                {item.name}
              </h3>
            </div>
            <span
              className="shrink-0 text-[0.8125rem] sm:text-sm font-bold"
              style={{ color: "var(--highlight)" }}
            >
              {formatPrice(item.price)}
            </span>
          </div>
          {item.description && (
            <p
              className="mt-1.5 line-clamp-2 text-[0.6875rem] sm:text-xs leading-relaxed"
              style={{ color: "var(--muted)" }}
            >
              {item.description}
            </p>
          )}
          <div
            className="mt-2 flex items-center gap-2 sm:gap-3 text-[0.625rem] sm:text-2xs"
            style={{ color: "var(--muted)" }}
          >
            {item.preparation_time && (
              <span>{item.preparation_time} دقیقه</span>
            )}
            {item.ingredients && (
              <span className="line-clamp-1">{item.ingredients}</span>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
