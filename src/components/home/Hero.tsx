"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { api } from "@/lib/api";

export default function Hero() {
  const [heroText, setHeroText] = useState("لذت طعم اصیل ژاپنی");
  const [heroSubtext, setHeroSubtext] = useState("موچی های دست ساز با کیفیت فوق‌العاده");

  useEffect(() => {
    api.getSettings().then((data) => {
      const hero = data.settings.hero || {};
      if (hero.hero_text) setHeroText(hero.hero_text);
      if (hero.hero_subtext) setHeroSubtext(hero.hero_subtext);
    });
  }, []);

  return (
    <section className="relative min-h-screen overflow-hidden bg-cream-50 dark:bg-[#0c0c18]">
      <div className="absolute inset-0">
        <div className="absolute -right-32 -top-32 h-[500px] w-[500px] rounded-full bg-matcha-200/30 blur-[120px]" />
        <div className="absolute -bottom-32 -left-32 h-[400px] w-[400px] rounded-full bg-sakura-200/20 blur-[100px]" />
      </div>

      <div className="relative mx-auto flex min-h-screen max-w-6xl items-center px-5 sm:px-6 lg:px-8">
        <div className="grid w-full grid-cols-1 items-center gap-16 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.5 }}
              className="mb-5 inline-flex items-center gap-2 rounded-full border border-matcha-200 bg-matcha-50 px-3.5 py-1.5 text-xs font-medium text-matcha-600 dark:border-matcha-800 dark:bg-matcha-950/50 dark:text-matcha-300"
            >
              <span>🍡</span>
              تجربه‌ای متفاوت از طعم و هنر ژاپنی
            </motion.div>

            <h1 className="text-4xl font-bold leading-[1.15] tracking-tight text-gray-900 dark:text-white sm:text-5xl lg:text-6xl">
              {heroText}
            </h1>

            <p className="mt-5 max-w-md text-base leading-relaxed text-gray-500 dark:text-gray-400 lg:text-lg">
              {heroSubtext}
            </p>

            <div className="mt-7 flex flex-wrap items-center gap-3">
              <Link href="/menu" className="btn-primary">
                مشاهده منو
              </Link>
              <Link href="/contact" className="btn-secondary">
                تماس با ما
              </Link>
            </div>

            <div className="mt-12 flex items-center gap-7">
              {[
                { value: "۵۰+", label: "نوع نوشیدنی" },
                { value: "۳۰+", label: "نوع دسر" },
                { value: "۱۰۰۰+", label: "مشتری راضی" },
              ].map((stat, i) => (
                <div key={i} className="flex items-center gap-7">
                  <div>
                    <p className="text-2xl font-bold text-matcha-500 dark:text-matcha-400">
                      {stat.value}
                    </p>
                    <p className="text-xs text-gray-400 dark:text-gray-500">
                      {stat.label}
                    </p>
                  </div>
                  {i < 2 && (
                    <div className="h-8 w-px bg-gray-200 dark:bg-white/10" />
                  )}
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="relative hidden lg:block"
          >
            <div className="relative mx-auto aspect-square max-w-[420px]">
              <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-br from-matcha-100/80 to-sakura-100/40 dark:from-matcha-900/30 dark:to-sakura-900/20" />
              <div className="absolute inset-3 rounded-[1.75rem] bg-gradient-to-br from-matcha-50/60 to-sakura-50/30 backdrop-blur-xl dark:from-matcha-900/20 dark:to-sakura-900/10" />
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="text-8xl"
                >
                  🍡
                </motion.div>
              </div>

              <div className="absolute -right-3 top-10 rounded-xl border border-white/60 bg-white/90 p-3 shadow-soft backdrop-blur-sm dark:border-white/10 dark:bg-white/10">
                <div className="flex items-center gap-2.5">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-matcha-50 text-sm dark:bg-matcha-900/50">
                    🍵
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-gray-900 dark:text-white">ماچا لاته</p>
                    <p className="text-2xs text-gray-400">۷۵,۰۰۰ تومان</p>
                  </div>
                </div>
              </div>

              <div className="absolute -left-3 bottom-10 rounded-xl border border-white/60 bg-white/90 p-3 shadow-soft backdrop-blur-sm dark:border-white/10 dark:bg-white/10">
                <div className="flex items-center gap-2.5">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sakura-50 text-sm dark:bg-sakura-900/30">
                    🍰
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-gray-900 dark:text-white">کیک رولت</p>
                    <p className="text-2xs text-gray-400">۹۰,۰۰۰ تومان</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
