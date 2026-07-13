"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { api, getImageUrl } from "@/lib/api";
import { MenuItem } from "@/types";
import { formatPrice } from "@/lib/utils";

export default function Hero() {
  const [heroText, setHeroText] = useState("لذت طعم اصیل ژاپنی");
  const [heroSubtext, setHeroSubtext] = useState("موچی های دست ساز با کیفیت فوق‌العاده");
  const [featuredItems, setFeaturedItems] = useState<MenuItem[]>([]);
  const [stats, setStats] = useState({ items: 0, categories: 0 });
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const orbY1 = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const orbY2 = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const orbY3 = useTransform(scrollYProgress, [0, 1], [0, -160]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, 60]);
  const imageY = useTransform(scrollYProgress, [0, 1], [0, -40]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  useEffect(() => {
    api.getSettings().then((data) => {
      const hero = data.settings.hero || {};
      if (hero.hero_text) setHeroText(hero.hero_text);
      if (hero.hero_subtext) setHeroSubtext(hero.hero_subtext);
    }).catch(() => {});
    api.getMenu({ featured: true }).then((data) => setFeaturedItems(data.items.slice(0, 2))).catch(() => {});
    api.getMenu().then((data) => {
      const cats = new Set(data.items.map((i) => i.category_slug));
      setStats({ items: data.items.length, categories: cats.size });
    }).catch(() => {});
  }, []);

  return (
    <section ref={sectionRef} className="relative min-h-[100dvh] overflow-hidden" style={{ background: "var(--background)" }}>
      {/* Background orbs — simplified on mobile */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div style={{ y: orbY1 }} className="absolute -right-20 -top-20 sm:-right-32 sm:-top-32">
          <div className="h-[250px] w-[250px] sm:h-[500px] sm:w-[500px] rounded-full animate-pulse-soft" style={{ background: "radial-gradient(circle, rgba(107,143,113,0.12) 0%, transparent 70%)", filter: "blur(60px)" }} />
        </motion.div>
        <motion.div style={{ y: orbY2 }} className="absolute -bottom-16 -left-16 sm:-bottom-20 sm:-left-20">
          <div className="h-[200px] w-[200px] sm:h-[400px] sm:w-[400px] rounded-full animate-pulse-soft" style={{ background: "radial-gradient(circle, rgba(237,132,158,0.08) 0%, transparent 70%)", filter: "blur(50px)", animationDelay: "2s" }} />
        </motion.div>
        <motion.div style={{ y: orbY3 }} className="absolute left-1/2 top-1/3 -translate-x-1/2">
          <div className="hidden sm:block h-[350px] w-[350px] rounded-full animate-float-slow" style={{ background: "radial-gradient(circle, rgba(107,143,113,0.08) 0%, transparent 70%)", filter: "blur(60px)" }} />
        </motion.div>
        {/* Subtle grid pattern — lighter on mobile */}
        <div className="absolute inset-0" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, rgba(0,0,0,0.015) 1px, transparent 0)", backgroundSize: "48px 48px" }} />
      </div>

      <motion.div style={{ opacity }} className="relative mx-auto flex min-h-[100dvh] max-w-7xl items-center px-5 sm:px-6 lg:px-8">
        {/* ─── Mobile Hero Layout ─── */}
        <div className="sm:hidden w-full pt-16 pb-8">
          <div className="flex flex-col items-center text-center">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 16, filter: "blur(6px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="mb-6 inline-flex items-center gap-2 rounded-full px-4 py-2"
              style={{
                background: "var(--matcha-light)",
                border: "0.5px solid var(--border-accent)",
                color: "var(--matcha)",
              }}
            >
              <span className="text-sm">🍡</span>
              <span className="text-[0.6875rem] font-semibold tracking-wide">تجربه‌ای متفاوت</span>
            </motion.div>

            {/* Hero image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="relative mb-8 w-full max-w-[280px] aspect-square"
            >
              <div
                className="absolute inset-0 overflow-hidden"
                style={{
                  borderRadius: "2rem",
                  background: "linear-gradient(135deg, rgba(107,143,113,0.1) 0%, rgba(237,132,158,0.06) 50%, rgba(107,143,113,0.08) 100%)",
                  border: "0.5px solid var(--border-subtle)",
                  boxShadow: "0 24px 60px -16px rgba(107,143,113,0.12), 0 8px 24px -8px rgba(0,0,0,0.04), inset 0 1px 0 rgba(255,255,255,0.5)",
                }}
              >
                <div className="absolute inset-0" style={{ backdropFilter: "blur(40px)", WebkitBackdropFilter: "blur(40px)" }} />
              </div>
              <img
                src="/images/hero.png"
                alt="موچی دست ساز"
                className="absolute inset-4 rounded-[1.5rem] object-cover"
                style={{ width: "calc(100% - 32px)", height: "calc(100% - 32px)" }}
                onError={(e) => { e.currentTarget.style.display = "none"; }}
              />

              {/* Floating card — first item */}
              {featuredItems[0] && (
                <motion.div
                  initial={{ opacity: 0, x: 20, rotate: 2 }}
                  animate={{ opacity: 1, x: 0, rotate: 1.5 }}
                  transition={{ delay: 0.8, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute -right-2 top-4"
                  style={{ animation: "float 8s ease-in-out infinite" }}
                >
                  <div className="glass-card shadow-glass p-3">
                    <div className="flex items-center gap-2.5">
                      {featuredItems[0].image_url ? (
                        <img src={getImageUrl(featuredItems[0].image_url)} alt={featuredItems[0].name} className="h-9 w-9 rounded-xl object-cover" />
                      ) : (
                        <div className="flex h-9 w-9 items-center justify-center rounded-xl text-base" style={{ background: "var(--matcha-light)" }}>🍡</div>
                      )}
                      <div>
                        <p className="text-[0.625rem] font-semibold" style={{ color: "var(--foreground)" }}>{featuredItems[0].name}</p>
                        <p className="text-[0.625rem] font-medium" style={{ color: "var(--matcha)" }}>{formatPrice(featuredItems[0].price)}</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {featuredItems[1] && (
                <motion.div
                  initial={{ opacity: 0, x: -20, rotate: -2 }}
                  animate={{ opacity: 1, x: 0, rotate: -1 }}
                  transition={{ delay: 1, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute -left-2 bottom-6"
                  style={{ animation: "float 10s ease-in-out infinite", animationDelay: "3s" }}
                >
                  <div className="glass-card shadow-glass p-3">
                    <div className="flex items-center gap-2.5">
                      {featuredItems[1].image_url ? (
                        <img src={getImageUrl(featuredItems[1].image_url)} alt={featuredItems[1].name} className="h-9 w-9 rounded-xl object-cover" />
                      ) : (
                        <div className="flex h-9 w-9 items-center justify-center rounded-xl text-base" style={{ background: "var(--sakura)" }}>🍡</div>
                      )}
                      <div>
                        <p className="text-[0.625rem] font-semibold" style={{ color: "var(--foreground)" }}>{featuredItems[1].name}</p>
                        <p className="text-[0.625rem] font-medium" style={{ color: "var(--matcha)" }}>{formatPrice(featuredItems[1].price)}</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </motion.div>

            {/* Title — centered, full-width */}
            <motion.h1
              initial={{ opacity: 0, y: 24, filter: "blur(6px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.8, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="text-[2rem] font-bold leading-[1.1] tracking-tight"
              style={{ color: "var(--foreground)", letterSpacing: "-0.03em" }}
            >
              {heroText}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16, filter: "blur(4px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.7, delay: 0.55 }}
              className="mt-3.5 max-w-xs text-[0.8125rem] leading-relaxed"
              style={{ color: "var(--muted)" }}
            >
              {heroSubtext}
            </motion.p>

            {/* CTA buttons — full width stacked */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.65 }}
              className="mt-8 flex w-full max-w-xs flex-col gap-2.5"
            >
              <Link href="/menu" className="btn-primary w-full">
                مشاهده منو
              </Link>
              <Link href="/contact" className="btn-secondary w-full">
                تماس با ما
              </Link>
            </motion.div>

            {/* Stats — horizontal row */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="mt-10 flex items-center justify-center gap-6"
            >
              {[
                { value: stats.items > 0 ? `${stats.items}+` : "—", label: "محصول" },
                { value: stats.categories > 0 ? `${stats.categories}+` : "—", label: "دسته‌بندی" },
                { value: "۱۰۰۰+", label: "مشتری" },
              ].map((stat, i) => (
                <div key={i} className="flex items-center gap-6">
                  <div className="text-center">
                    <p className="text-xl font-bold" style={{ color: "var(--matcha)", letterSpacing: "-0.02em" }}>
                      {stat.value}
                    </p>
                    <p className="mt-0.5 text-[0.625rem] font-medium" style={{ color: "var(--muted)" }}>
                      {stat.label}
                    </p>
                  </div>
                  {i < 2 && (
                    <div className="h-8 w-px" style={{ background: "var(--border)" }} />
                  )}
                </div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* ─── Desktop Hero Layout ─── */}
        <div className="hidden sm:grid w-full grid-cols-1 items-center gap-16 lg:grid-cols-2">
          {/* Text content */}
          <motion.div style={{ y: textY }} className="relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="mb-8 inline-flex items-center gap-2.5 rounded-full px-5 py-2.5"
              style={{
                background: "var(--matcha-light)",
                border: "0.5px solid var(--border-accent)",
                color: "var(--matcha)",
              }}
            >
              <span className="text-sm">🍡</span>
              <span className="text-xs font-semibold tracking-wide">تجربه‌ای متفاوت از طعم و هنر ژاپنی</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.9, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="text-[2.75rem] font-bold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl"
              style={{ color: "var(--foreground)", letterSpacing: "-0.035em" }}
            >
              {heroText}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="mt-6 max-w-md text-lg leading-relaxed"
              style={{ color: "var(--muted)" }}
            >
              {heroSubtext}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.75 }}
              className="mt-10 flex flex-wrap items-center gap-4"
            >
              <Link href="/menu" className="btn-primary">
                مشاهده منو
              </Link>
              <Link href="/contact" className="btn-secondary">
                تماس با ما
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.9 }}
              className="mt-16 flex items-center gap-8"
            >
              {[
                { value: stats.items > 0 ? `${stats.items}+` : "—", label: "نوع محصول" },
                { value: stats.categories > 0 ? `${stats.categories}+` : "—", label: "دسته‌بندی" },
                { value: "۱۰۰۰+", label: "مشتری راضی" },
              ].map((stat, i) => (
                <div key={i} className="flex items-center gap-8">
                  <div>
                    <p className="text-3xl font-bold" style={{ color: "var(--matcha)", letterSpacing: "-0.02em" }}>
                      {stat.value}
                    </p>
                    <p className="mt-0.5 text-xs font-medium" style={{ color: "var(--muted)" }}>
                      {stat.label}
                    </p>
                  </div>
                  {i < 2 && (
                    <div className="h-12 w-px" style={{ background: "var(--border)" }} />
                  )}
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Hero image */}
          <motion.div style={{ y: imageY }} className="relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, filter: "blur(12px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              transition={{ duration: 1.2, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="relative mx-auto aspect-square max-w-[480px]"
            >
              <div
                className="absolute inset-0 overflow-hidden"
                style={{
                  borderRadius: "2.5rem",
                  background: "linear-gradient(135deg, rgba(107,143,113,0.1) 0%, rgba(237,132,158,0.06) 50%, rgba(107,143,113,0.08) 100%)",
                  border: "0.5px solid var(--border-subtle)",
                  boxShadow: "0 32px 80px -20px rgba(107,143,113,0.12), 0 12px 40px -12px rgba(0,0,0,0.04), inset 0 1px 0 rgba(255,255,255,0.5)",
                }}
              >
                <div className="absolute inset-0" style={{ backdropFilter: "blur(40px)", WebkitBackdropFilter: "blur(40px)" }} />
              </div>
              <img
                src="/images/hero.png"
                alt="موچی دست ساز"
                className="absolute inset-5 rounded-[2rem] object-cover"
                style={{ width: "calc(100% - 40px)", height: "calc(100% - 40px)" }}
                onError={(e) => { e.currentTarget.style.display = "none"; }}
              />

              {featuredItems[0] && (
                <motion.div
                  initial={{ opacity: 0, x: 30, rotate: 3 }}
                  animate={{ opacity: 1, x: 0, rotate: 2 }}
                  transition={{ delay: 0.8, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute -right-6 top-8"
                  style={{ animation: "float 8s ease-in-out infinite" }}
                >
                  <div className="glass-card shadow-glass p-4">
                    <div className="flex items-center gap-3">
                      {featuredItems[0].image_url ? (
                        <img src={getImageUrl(featuredItems[0].image_url)} alt={featuredItems[0].name} className="h-11 w-11 rounded-2xl object-cover" />
                      ) : (
                        <div className="flex h-11 w-11 items-center justify-center rounded-2xl text-lg" style={{ background: "var(--matcha-light)" }}>🍡</div>
                      )}
                      <div>
                        <p className="text-xs font-semibold" style={{ color: "var(--foreground)" }}>{featuredItems[0].name}</p>
                        <p className="text-2xs font-medium" style={{ color: "var(--matcha)" }}>{formatPrice(featuredItems[0].price)}</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {featuredItems[1] && (
                <motion.div
                  initial={{ opacity: 0, x: -30, rotate: -3 }}
                  animate={{ opacity: 1, x: 0, rotate: -1.5 }}
                  transition={{ delay: 1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute -left-6 bottom-12"
                  style={{ animation: "float 10s ease-in-out infinite", animationDelay: "3s" }}
                >
                  <div className="glass-card shadow-glass p-4">
                    <div className="flex items-center gap-3">
                      {featuredItems[1].image_url ? (
                        <img src={getImageUrl(featuredItems[1].image_url)} alt={featuredItems[1].name} className="h-11 w-11 rounded-2xl object-cover" />
                      ) : (
                        <div className="flex h-11 w-11 items-center justify-center rounded-2xl text-lg" style={{ background: "var(--sakura)" }}>🍡</div>
                      )}
                      <div>
                        <p className="text-xs font-semibold" style={{ color: "var(--foreground)" }}>{featuredItems[1].name}</p>
                        <p className="text-2xs font-medium" style={{ color: "var(--matcha)" }}>{formatPrice(featuredItems[1].price)}</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              <motion.div
                animate={{ y: [-8, 8, -8] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -right-8 bottom-4 h-5 w-5 rounded-full"
                style={{ background: "linear-gradient(135deg, rgba(107,143,113,0.3), rgba(107,143,113,0.1))", filter: "blur(1px)" }}
              />
              <motion.div
                animate={{ y: [6, -6, 6] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute -left-6 top-16 h-3.5 w-3.5 rounded-full"
                style={{ background: "linear-gradient(135deg, rgba(237,132,158,0.3), rgba(237,132,158,0.1))", filter: "blur(1px)" }}
              />
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-24 sm:h-32" style={{ background: "linear-gradient(to top, var(--background), transparent)" }} />
    </section>
  );
}
