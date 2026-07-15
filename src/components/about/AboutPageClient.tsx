"use client";

import { motion } from "framer-motion";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import {
  HiShieldCheck,
  HiTruck,
  HiShoppingBag,
  HiGlobe,
} from "react-icons/hi";

export default function AboutPageClient() {
  return (
    <>
      <Header />
      <main
        className="min-h-screen pt-14 sm:pt-24 mobile-page"
        style={{ background: "var(--background)" }}
      >
        <div className="mx-auto max-w-3xl px-5 py-6 sm:py-12 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <h1 className="section-title">درباره ما</h1>
            <p className="section-subtitle">
              داستان تبارستان
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.5 }}
            className="mt-6 sm:mt-12"
          >
            <div className="glass-card p-5 sm:p-8 md:p-10">
              <div className="space-y-4 sm:space-y-5 text-center">
                <p
                  className="text-[0.9375rem] sm:text-lg font-medium leading-relaxed"
                  style={{ color: "var(--foreground)" }}
                >
                  تبارستان تامین کننده انواع میوه خشک و نوشیدنی‌های خاص بوده
                  و محصولات خود را به صورت عمده و خرده عرضه می‌کند.
                </p>
                <p
                  className="text-[0.8125rem] sm:text-base leading-relaxed"
                  style={{ color: "var(--muted)" }}
                >
                  ما با تمرکز بر کیفیت و تازگی محصولات، اعتماد مشتریان را در
                  سراسر کشور به دست آورده‌ایم. با بیش از ۱۳ نوع محصول متنوع از
                  میوه خشک‌های طبیعی تا نوشیدنی‌های خاص و منحصربفرد، تبارستان
                  پارتنر قابل اعتماد شما در توزیع و عرضه محصولات غذایی با کیفیت
                  است.
                </p>
              </div>

              {/* Mobile: horizontal scroll features */}
              <div className="sm:hidden mt-8 flex gap-3 overflow-x-auto pb-2 -mx-1 px-1 scrollbar-none snap-x snap-mandatory">
                {[
                  {
                    icon: HiShieldCheck,
                    title: "کیفیت بالا",
                    desc: "تضمین بالاترین کیفیت در تمام محصولات",
                  },
                  {
                    icon: HiTruck,
                    title: "توزیع سریع",
                    desc: "ارسال به سراسر کشور با بسته‌بندی حرفه‌ای",
                  },
                  {
                    icon: HiShoppingBag,
                    title: "فروش عمده",
                    desc: "عرضه مستقیم به عمده و خرده فروشان",
                  },
                  {
                    icon: HiGlobe,
                    title: "صادرات",
                    desc: "صادرات محصولات با کیفیت به کشورهای مختلف",
                  },
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 + i * 0.05 }}
                    className="flex-shrink-0 snap-start glass-card p-4 text-center"
                    style={{ width: "min(70vw, 220px)" }}
                  >
                    <div
                      className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl text-lg"
                      style={{
                        background: "var(--accent-light)",
                        color: "var(--highlight)",
                      }}
                    >
                      <item.icon size={22} />
                    </div>
                    <h3
                      className="mt-3 text-[0.8125rem] font-semibold"
                      style={{ color: "var(--foreground)" }}
                    >
                      {item.title}
                    </h3>
                    <p
                      className="mt-1 text-[0.6875rem]"
                      style={{ color: "var(--muted)" }}
                    >
                      {item.desc}
                    </p>
                  </motion.div>
                ))}
              </div>

              {/* Desktop: grid features */}
              <div className="hidden sm:grid mt-12 grid-cols-1 gap-8 sm:grid-cols-3">
                {[
                  {
                    icon: HiShieldCheck,
                    title: "کیفیت بالا",
                    desc: "تضمین بالاترین کیفیت در تمام محصولات",
                  },
                  {
                    icon: HiTruck,
                    title: "توزیع سریع",
                    desc: "ارسال به سراسر کشور با بسته‌بندی حرفه‌ای",
                  },
                  {
                    icon: HiShoppingBag,
                    title: "فروش عمده",
                    desc: "عرضه مستقیم به عمده و خرده فروشان",
                  },
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.25 + i * 0.06 }}
                    className="text-center"
                  >
                    <div
                      className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl text-xl"
                      style={{
                        background: "var(--accent-light)",
                        color: "var(--highlight)",
                      }}
                    >
                      <item.icon size={26} />
                    </div>
                    <h3
                      className="mt-4 text-sm font-semibold"
                      style={{ color: "var(--foreground)" }}
                    >
                      {item.title}
                    </h3>
                    <p
                      className="mt-1.5 text-xs"
                      style={{ color: "var(--muted)" }}
                    >
                      {item.desc}
                    </p>
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
