"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  HiShieldCheck,
  HiTruck,
  HiShoppingBag,
  HiCollection,
  HiCurrencyDollar,
} from "react-icons/hi";

const reasons = [
  { icon: HiShieldCheck, title: "کیفیت بالا", desc: "تضمین بالاترین کیفیت در تمام محصولات با استفاده از بهترین مواد اولیه" },
  { icon: HiTruck, title: "توزیع سریع", desc: "ارسال سریع و به موقع به سراسر کشور با بسته‌بندی حرفه‌ای" },
  { icon: HiShoppingBag, title: "فروش عمده و خرده", desc: "امکان خرید به صورت عمده و خرده برای تمام نیازها" },
  { icon: HiCollection, title: "محصولات متنوع", desc: "طیف وسیعی از میوه خشک و نوشیدنی‌های خاص" },
  { icon: HiCurrencyDollar, title: "قیمت مناسب", desc: "بهترین قیمت بازار با حفظ کیفیت بالا" },
];

export default function WhyChooseUs() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <section
      ref={ref}
      className="relative py-20 sm:py-28 lg:py-36 overflow-hidden"
      style={{ background: "transparent" }}
    >
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute left-1/2 top-0 h-[300px] w-[400px] sm:h-[400px] sm:w-[600px] -translate-x-1/2 rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(30,58,138,0.06) 0%, transparent 70%)",
            filter: "blur(50px)",
          }}
        />
      </div>

      <div className="relative mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center"
        >
          <span className="section-label">چرا تبارستان؟</span>
          <h2 className="section-title mt-2.5">مزایای همکاری با ما</h2>
          <p className="section-subtitle mx-auto">
            تجربه همکاری با یک تیم حرفه‌ای و قابل اعتماد
          </p>
        </motion.div>

        <div className="mt-10 sm:hidden">
          <div className="flex gap-3 overflow-x-auto pb-3 -mx-5 px-5 scrollbar-none scroll-snap-x">
            {reasons.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 16 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  delay: 0.1 + index * 0.06,
                  duration: 0.5,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="glass-card flex-shrink-0 snap-start p-5"
                style={{ width: "min(72vw, 280px)" }}
              >
                <div
                  className="flex h-12 w-12 items-center justify-center rounded-2xl"
                  style={{
                    background: "rgba(59,130,246,0.08)",
                    color: "#60A5FA",
                    border: "1px solid rgba(59,130,246,0.12)",
                  }}
                >
                  <item.icon size={22} />
                </div>
                <h3
                  className="mt-4 text-[0.9375rem] font-bold"
                  style={{ color: "var(--foreground)" }}
                >
                  {item.title}
                </h3>
                <p
                  className="mt-2 text-[0.75rem] leading-relaxed"
                  style={{ color: "var(--muted)" }}
                >
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="mt-12 hidden sm:grid grid-cols-2 gap-5 lg:grid-cols-3">
          {reasons.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                delay: 0.1 + index * 0.08,
                duration: 0.7,
                ease: [0.16, 1, 0.3, 1],
              }}
              whileHover={{ y: -6 }}
            >
              <div className="glass-card group h-full p-7">
                <div
                  className="flex h-14 w-14 items-center justify-center rounded-2xl transition-all duration-500 group-hover:scale-110"
                  style={{
                    background: "rgba(59,130,246,0.08)",
                    color: "#60A5FA",
                    border: "1px solid rgba(59,130,246,0.12)",
                  }}
                >
                  <item.icon size={26} />
                </div>
                <h3
                  className="mt-5 text-lg font-bold"
                  style={{ color: "var(--foreground)" }}
                >
                  {item.title}
                </h3>
                <p
                  className="mt-3 text-sm leading-relaxed"
                  style={{ color: "var(--muted)" }}
                >
                  {item.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
