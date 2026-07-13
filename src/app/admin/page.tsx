"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { api, getImageUrl } from "@/lib/api";
import { DashboardStats, MenuItem, GalleryImage } from "@/types";
import { formatPrice } from "@/lib/utils";
import StatsCard from "@/components/admin/StatsCard";
import {
  HiOutlineShoppingBag,
  HiOutlineFolder,
  HiOutlinePhoto,
  HiOutlineStar,
  HiOutlineCheckCircle,
  HiOutlinePlus,
  HiOutlineArrowUpRight,
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
    <div className="space-y-6">
      <div>
        <h1 className="text-lg font-bold text-gray-900 dark:text-white">
          داشبورد
        </h1>
        <p className="mt-0.5 text-xs text-gray-400 dark:text-gray-500">
          خلاصه‌ای از وضعیت سایت
        </p>
      </div>

      {stats && (
        <div className="grid grid-cols-2 gap-3 lg:grid-cols-3">
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
            title="ویژه"
            value={stats.featured_items}
            icon={<HiOutlineStar size={20} className="text-white" />}
            color="bg-amber-500"
          />
          <StatsCard
            title="موجود"
            value={stats.available_items}
            icon={<HiOutlineCheckCircle size={20} className="text-white" />}
            color="bg-emerald-500"
          />
          <StatsCard
            title="جدید"
            value={stats.new_items}
            icon={<HiOutlinePlus size={20} className="text-white" />}
            color="bg-rose-500"
          />
        </div>
      )}

      <div className="flex flex-wrap gap-2">
        <Link href="/admin/menu" className="btn-primary text-xs">
          <HiOutlinePlus size={14} />
          آیتم جدید
        </Link>
        <Link href="/admin/gallery" className="btn-secondary text-xs">
          <HiOutlinePhoto size={14} />
          گالری
        </Link>
        <Link href="/admin/settings" className="btn-ghost text-xs">
          تنظیمات
          <HiOutlineArrowUpRight size={14} />
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-5">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-2xl border border-gray-100 bg-white p-5 dark:border-white/5 dark:bg-white/[0.02] lg:col-span-3"
        >
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
              آخرین آیتم‌های منو
            </h3>
            <Link href="/admin/menu" className="text-2xs font-medium text-matcha-500 hover:text-matcha-600 dark:text-matcha-400">
              مشاهده همه
            </Link>
          </div>
          <div className="mt-4 space-y-2">
            {recentItems.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between gap-3 rounded-xl bg-gray-50/80 p-3 transition-colors hover:bg-gray-100/80 dark:bg-white/[0.02] dark:hover:bg-white/[0.04]"
              >
                <div className="flex items-center gap-3 min-w-0">
                  {item.image_url ? (
                    <img
                      src={getImageUrl(item.image_url)}
                      alt={item.name}
                      className="h-10 w-10 shrink-0 rounded-xl object-cover"
                    />
                  ) : (
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-matcha-50 text-base dark:bg-matcha-900/30">
                      🍡
                    </div>
                  )}
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium text-gray-800 dark:text-white">
                      {item.name}
                    </p>
                    <p className="mt-0.5 text-2xs text-gray-400 dark:text-gray-500">
                      {item.category_name}
                      {item.is_available === false && (
                        <span className="mr-1.5 text-red-400">· ناموجود</span>
                      )}
                    </p>
                  </div>
                </div>
                <span className="shrink-0 text-xs font-bold text-matcha-500 dark:text-matcha-400">
                  {formatPrice(item.price)}
                </span>
              </div>
            ))}
            {recentItems.length === 0 && (
              <div className="py-10 text-center">
                <p className="text-3xl">🍡</p>
                <p className="mt-2 text-xs text-gray-400">
                  آیتمی وجود ندارد
                </p>
                <Link href="/admin/menu" className="btn-primary mt-3 text-xs">
                  افزودن آیتم
                </Link>
              </div>
            )}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.08 }}
          className="rounded-2xl border border-gray-100 bg-white p-5 dark:border-white/5 dark:bg-white/[0.02] lg:col-span-2"
        >
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
              آخرین تصاویر
            </h3>
            <Link href="/admin/gallery" className="text-2xs font-medium text-matcha-500 hover:text-matcha-600 dark:text-matcha-400">
              مشاهده همه
            </Link>
          </div>
          <div className="mt-4 grid grid-cols-3 gap-2">
            {recentGallery.map((img) => (
              <div
                key={img.id}
                className="aspect-square overflow-hidden rounded-xl bg-gray-100 dark:bg-white/[0.02]"
              >
                <img
                  src={getImageUrl(img.image_url)}
                  alt={img.title || ""}
                  className="h-full w-full object-cover transition-transform duration-300 hover:scale-110"
                />
              </div>
            ))}
            {recentGallery.length === 0 && (
              <div className="col-span-3 py-10 text-center">
                <p className="text-3xl">📸</p>
                <p className="mt-2 text-xs text-gray-400">
                  تصویری وجود ندارد
                </p>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
