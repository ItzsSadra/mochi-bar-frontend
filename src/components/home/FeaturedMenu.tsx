"use client";

import { useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import { api } from "@/lib/api";
import { MenuItem } from "@/types";
import { formatPrice } from "@/lib/utils";
import { getImageUrl } from "@/lib/api";
import { FeaturedSkeleton } from "@/components/ui/Skeleton";

export default function FeaturedMenu() {
  const [items, setItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  useEffect(() => {
    api.getMenu({ featured: true }).then((data) => setItems(data.items.slice(0, 4))).catch(() => {}).finally(() => setLoading(false));
  }, []);

  return (
    <section ref={ref} className="relative py-24 sm:py-32" style={{ background: "var(--background)" }}>
      {/* Subtle background accent */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute right-0 top-1/4 h-[500px] w-[500px] rounded-full" style={{ background: "radial-gradient(circle, rgba(107,143,113,0.04) 0%, transparent 70%)", filter: "blur(80px)" }} />
      </div>

      <div className="relative mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col items-start gap-6 sm:flex-row sm:items-end sm:justify-between">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            <span className="section-label">پیشنهاد ویژه</span>
            <h2 className="section-title mt-3">محبوب‌ترین‌های ما</h2>
            <p className="section-subtitle mt-4">
              انتخاب‌های ویژه ما از بهترین مواد اولیه و با عشق تهیه شده‌اند
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Link href="/menu" className="btn-secondary">
              مشاهده کل منو →
            </Link>
          </motion.div>
        </div>

        {/* Featured grid — asymmetric: 1 large + 3 smaller */}
        <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {loading ? (
            <FeaturedSkeleton />
          ) : (
            <>
              {/* Hero card — large */}
              {items[0] && (
                <motion.div
                  initial={{ opacity: 0, y: 24 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.7, delay: 0.1 }}
                  className="sm:col-span-2 lg:row-span-2"
                >
                  <div className="glass-card group relative h-full overflow-hidden">
                    <div className="relative aspect-[16/10] sm:aspect-auto sm:h-full overflow-hidden" style={{ background: "rgba(0,0,0,0.02)" }}>
                      {items[0].image_url ? (
                        <img src={getImageUrl(items[0].image_url)} alt={items[0].name} className="h-full w-full object-cover transition-transform duration-[800ms] group-hover:scale-105" />
                      ) : (
                        <div className="flex h-full min-h-[280px] items-center justify-center text-7xl">🍡</div>
                      )}
                      {/* Glass overlay */}
                      <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.5) 0%, transparent 50%)" }} />
                      <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
                        {items[0].is_new && (
                          <span className="mb-3 inline-block rounded-full px-3 py-1 text-2xs font-semibold text-white" style={{ background: "linear-gradient(135deg, #6B8F71, #4a7a52)" }}>
                            جدید
                          </span>
                        )}
                        <p className="text-xs font-semibold" style={{ color: "rgba(255,255,255,0.7)" }}>{items[0].category_name}</p>
                        <h3 className="mt-1 text-2xl font-bold text-white sm:text-3xl">{items[0].name}</h3>
                        <p className="mt-2 max-w-md text-sm leading-relaxed text-white/60 line-clamp-2">{items[0].description}</p>
                        <div className="mt-4 flex items-center gap-4">
                          <span className="text-lg font-bold text-white">{formatPrice(items[0].price)}</span>
                          <Link href={`/menu?category=${items[0].category_slug}`} className="rounded-full bg-white/15 px-4 py-1.5 text-xs font-medium text-white backdrop-blur-sm transition-colors hover:bg-white/25">
                            مشاهده
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Smaller cards */}
              {items.slice(1, 4).map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 24 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.7, delay: 0.2 + index * 0.08 }}
                >
                  <div className="glass-card group h-full overflow-hidden">
                    <div className="relative aspect-[4/3] overflow-hidden" style={{ background: "rgba(0,0,0,0.02)" }}>
                      {item.image_url ? (
                        <img src={getImageUrl(item.image_url)} alt={item.name} className="h-full w-full object-cover transition-transform duration-[800ms] group-hover:scale-105" />
                      ) : (
                        <div className="flex h-full items-center justify-center text-5xl">🍡</div>
                      )}
                      {item.is_new && (
                        <span className="absolute left-3 top-3 rounded-full px-2.5 py-1 text-2xs font-semibold text-white" style={{ background: "linear-gradient(135deg, #6B8F71, #4a7a52)" }}>
                          جدید
                        </span>
                      )}
                    </div>
                    <div className="p-5">
                      <p className="text-2xs font-medium" style={{ color: "var(--matcha)" }}>{item.category_name}</p>
                      <h3 className="mt-1 text-sm font-semibold" style={{ color: "var(--foreground)" }}>{item.name}</h3>
                      <p className="mt-1.5 line-clamp-2 text-xs leading-relaxed" style={{ color: "var(--muted)" }}>{item.description}</p>
                      <div className="mt-3 flex items-center justify-between">
                        <span className="text-sm font-bold" style={{ color: "var(--matcha)" }}>{formatPrice(item.price)}</span>
                        <Link href={`/menu?category=${item.category_slug}`} className="text-2xs font-medium transition-colors" style={{ color: "var(--muted)" }}
                          onMouseEnter={(e) => (e.currentTarget.style.color = "var(--matcha)")}
                          onMouseLeave={(e) => (e.currentTarget.style.color = "var(--muted)")}
                        >مشاهده</Link>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </>
          )}
        </div>
      </div>
    </section>
  );
}
