"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { api, getImageUrl } from "@/lib/api";
import { DashboardStats, MenuItem, GalleryImage } from "@/types";
import { formatPrice } from "@/lib/utils";
import StatsCard from "@/components/admin/StatsCard";
import {
  HiOutlineShoppingBag,
  HiOutlineFolder,
  HiOutlinePhoto,
  HiOutlineStar,
} from "react-icons/hi2";

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [recentItems, setRecentItems] = useState<MenuItem[]>([]);
  const [recentGallery, setRecentGallery] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    api.getDashboard()
      .then((data) => {
        setStats(data.stats);
        setRecentItems(data.recent_menu_items);
        setRecentGallery(data.recent_gallery);
      })
      .catch(() => setError("بارگذاری داشبورد با خطا مواجه شد"))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-[40vh] items-center justify-center">
        <div className="h-6 w-6 animate-spin rounded-full border-2 border-matcha-400 border-t-transparent" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-20 text-center">
        <p className="text-sm text-red-400">{error}</p>
        <button onClick={() => window.location.reload()} className="btn-secondary mt-4">تلاش مجدد</button>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-lg font-bold text-gray-900 dark:text-white">
        داشبورد
      </h1>
      <p className="mt-0.5 text-xs text-gray-400 dark:text-gray-500">
        خلاصه‌ای از وضعیت سایت
      </p>

      {stats && (
        <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <StatsCard
            title="آیتم‌های منو"
            value={stats.total_menu_items}
            icon={<HiOutlineShoppingBag size={20} className="text-white" />}
            color="bg-matcha-400"
          />
          <StatsCard
            title="دسته‌بندی‌ها"
            value={stats.total_categories}
            icon={<HiOutlineFolder size={20} className="text-white" />}
            color="bg-blue-500"
          />
          <StatsCard
            title="تصاویر گالری"
            value={stats.total_gallery}
            icon={<HiOutlinePhoto size={20} className="text-white" />}
            color="bg-purple-500"
          />
          <StatsCard
            title="آیتم‌های ویژه"
            value={stats.featured_items}
            icon={<HiOutlineStar size={20} className="text-white" />}
            color="bg-sakura-400"
          />
        </div>
      )}

      <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-xl border border-gray-100 bg-white p-5 dark:border-white/5 dark:bg-white/[0.02]"
        >
          <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
            آخرین آیتم‌های منو
          </h3>
          <div className="mt-3.5 space-y-2">
            {recentItems.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between rounded-lg bg-gray-50/80 p-2.5 dark:bg-white/[0.02]"
              >
                <div className="flex items-center gap-2.5">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-matcha-50 text-sm dark:bg-matcha-900/30">
                    🍡
                  </div>
                  <div>
                    <p className="text-xs font-medium text-gray-800 dark:text-white">
                      {item.name}
                    </p>
                    <p className="text-2xs text-gray-400">{item.category_name}</p>
                  </div>
                </div>
                <span className="text-xs font-bold text-matcha-500 dark:text-matcha-400">
                  {formatPrice(item.price)}
                </span>
              </div>
            ))}
            {recentItems.length === 0 && (
              <p className="py-6 text-center text-xs text-gray-400">
                آیتمی وجود ندارد
              </p>
            )}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.08 }}
          className="rounded-xl border border-gray-100 bg-white p-5 dark:border-white/5 dark:bg-white/[0.02]"
        >
          <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
            آخرین تصاویر گالری
          </h3>
          <div className="mt-3.5 grid grid-cols-3 gap-2">
            {recentGallery.map((img) => (
              <div
                key={img.id}
                className="aspect-square overflow-hidden rounded-lg bg-gray-100 dark:bg-white/[0.02]"
              >
                <img
                  src={getImageUrl(img.image_url)}
                  alt={img.title || ""}
                  className="h-full w-full object-cover"
                />
              </div>
            ))}
            {recentGallery.length === 0 && (
              <p className="col-span-3 py-6 text-center text-xs text-gray-400">
                تصویری وجود ندارد
              </p>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
