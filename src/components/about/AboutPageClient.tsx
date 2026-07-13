"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { api } from "@/lib/api";

export default function AboutPageClient() {
  const [aboutText, setAboutText] = useState("");

  useEffect(() => {
    api.getSettings().then((data) => {
      setAboutText(data.settings.about?.about_text || "");
    }).catch(() => {});
  }, []);

  return (
    <>
      <Header />
      <main className="min-h-screen pt-14 sm:pt-24 mobile-page" style={{ background: "var(--background)" }}>
        <div className="mx-auto max-w-3xl px-5 py-6 sm:py-12 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <h1 className="section-title">درباره ما</h1>
            <p className="section-subtitle">داستان موچی بار</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.5 }}
            className="mt-6 sm:mt-12"
          >
            <div className="glass-card p-5 sm:p-8 md:p-10">
              <div className="flex justify-center text-5xl sm:text-6xl mb-4 sm:mb-6">🍡</div>
              <div className="space-y-4 sm:space-y-5 text-center">
                <p className="text-[0.9375rem] sm:text-lg font-medium leading-relaxed" style={{ color: "var(--foreground)" }}>
                  {aboutText || "موچی بار با الهام از هنر و فرهنگ ژاپنی، فضایی آرام و متفاوت برای لحظات شما خلق کرده است. ما با استفاده از بهترین مواد اولیه و تکنیک‌های نوین، نوشیدنی‌ها و دسرهایی منحصربه‌فرد ارائه می‌دهیم."}
                </p>
              </div>

              {/* Mobile: horizontal scroll features */}
              <div className="sm:hidden mt-8 flex gap-3 overflow-x-auto pb-2 -mx-1 px-1 scrollbar-none snap-x snap-mandatory">
                {[
                  { icon: "🍡", title: "مواد اولیه درجه یک", desc: "بهترین مواد اولیه از سراسر جهان" },
                  { icon: "🍵", title: "تکنیک اصیل ژاپنی", desc: "روش‌های سنتی ژاپنی با کیفیت مدرن" },
                  { icon: "💝", title: "عشق در هر جزئیات", desc: "از انتخاب مواد تا سرو نهایی با عشق" },
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 + i * 0.05 }}
                    className="flex-shrink-0 snap-start glass-card p-4 text-center"
                    style={{ width: "min(70vw, 220px)" }}
                  >
                    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl text-xl" style={{ background: "rgba(107,143,113,0.08)" }}>
                      {item.icon}
                    </div>
                    <h3 className="mt-3 text-[0.8125rem] font-semibold" style={{ color: "var(--foreground)" }}>{item.title}</h3>
                    <p className="mt-1 text-[0.6875rem]" style={{ color: "var(--muted)" }}>{item.desc}</p>
                  </motion.div>
                ))}
              </div>

              {/* Desktop: grid features */}
              <div className="hidden sm:grid mt-12 grid-cols-1 gap-8 sm:grid-cols-3">
                {[
                  { icon: "🍡", title: "مواد اولیه درجه یک", desc: "استفاده از بهترین مواد اولیه از سراسر جهان" },
                  { icon: "🍵", title: "تکنیک اصیل ژاپنی", desc: "روش‌های سنتی ژاپنی با کیفیت مدرن" },
                  { icon: "💝", title: "عشق در هر جزئیات", desc: "از انتخاب مواد تا سرو نهایی با عشق" },
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.25 + i * 0.06 }}
                    className="text-center"
                  >
                    <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl text-2xl" style={{ background: "rgba(107,143,113,0.08)" }}>
                      {item.icon}
                    </div>
                    <h3 className="mt-4 text-sm font-semibold" style={{ color: "var(--foreground)" }}>{item.title}</h3>
                    <p className="mt-1.5 text-xs" style={{ color: "var(--muted)" }}>{item.desc}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </main>
      <Footer />
    </>
  );
}
