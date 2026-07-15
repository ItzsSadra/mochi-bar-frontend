"use client";

import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";

export default function AboutPreview() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], [40, -40]);

  const features = [
    { num: "۰۱", title: "کیفیت بالا", desc: "تضمین بالاترین کیفیت در تمام محصولات" },
    { num: "۰۲", title: "تنوع محصولات", desc: "طیف وسیعی از میوه خشک و نوشیدنی‌ها" },
    { num: "۰۳", title: "فروش عمده", desc: "عرضه مستقیم به عمده فروشان و خرده فروشان" },
    { num: "۰۴", title: "اعتماد مشتری", desc: "رضایت بیش از هزار مشتری در سراسر کشور" },
  ];

  return (
    <section
      ref={ref}
      className="relative py-20 sm:py-28 lg:py-36 overflow-hidden"
      style={{ background: "transparent" }}
    >
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute -left-20 top-0 h-[300px] w-[300px] sm:h-[600px] sm:w-[600px] rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(30,58,138,0.05) 0%, transparent 70%)",
            filter: "blur(60px)",
          }}
        />
      </div>

      <div className="relative mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        {/* ─── Mobile Layout ─── */}
        <div className="sm:hidden">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <span className="section-label">درباره تبارستان</span>
            <h2 className="section-title mt-2.5">
              تامین کننده اعتماد شما
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="mt-7 flex gap-3 overflow-x-auto pb-2 -mx-5 px-5 scrollbar-none scroll-snap-x"
          >
            {features.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 12 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  delay: 0.15 + i * 0.06,
                  duration: 0.5,
                }}
                className="glass-card flex-shrink-0 snap-start p-4"
                style={{ width: "min(65vw, 240px)" }}
              >
                <span
                  className="text-[0.6875rem] font-bold"
                  style={{ color: "#60A5FA" }}
                >
                  {item.num}
                </span>
                <p
                  className="mt-2 text-[0.8125rem] font-semibold"
                  style={{ color: "var(--foreground)" }}
                >
                  {item.title}
                </p>
                <p
                  className="mt-1 text-[0.75rem] leading-relaxed"
                  style={{ color: "var(--muted)" }}
                >
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="mt-7"
          >
            <p
              className="text-[0.8125rem] leading-[1.85]"
              style={{ color: "var(--muted)" }}
            >
              تبارستان تامین کننده انواع میوه خشک و نوشیدنی‌های خاص بوده و
              محصولات خود را به صورت عمده و خرده عرضه می‌کند. ما با تمرکز بر
              کیفیت و تازگی محصولات، اعتماد مشتریان را به دست آورده‌ایم.
            </p>
          </motion.div>
        </div>

        {/* ─── Desktop Layout ─── */}
        <div className="hidden sm:grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
          <motion.div style={{ y: imageY }} className="relative">
            <div
              className="relative overflow-hidden p-8"
              style={{
                borderRadius: "2rem",
                background:
                  "linear-gradient(135deg, rgba(30,58,138,0.08) 0%, rgba(59,130,246,0.04) 100%)",
                border: "1px solid rgba(59,130,246,0.08)",
              }}
            >
              <div className="grid grid-cols-2 gap-4">
                {features.map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 12 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.3 + i * 0.1, duration: 0.6 }}
                    className="rounded-xl p-5"
                    style={{
                      background: "rgba(255,255,255,0.025)",
                      border: "1px solid rgba(255,255,255,0.04)",
                    }}
                  >
                    <span
                      className="text-sm font-bold"
                      style={{ color: "#60A5FA" }}
                    >
                      {item.num}
                    </span>
                    <p
                      className="mt-2 text-base font-semibold"
                      style={{ color: "var(--foreground)" }}
                    >
                      {item.title}
                    </p>
                    <p
                      className="mt-1 text-sm leading-relaxed"
                      style={{ color: "var(--muted)" }}
                    >
                      {item.desc}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{
              duration: 0.8,
              delay: 0.15,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            <span className="section-label">درباره تبارستان</span>
            <h2 className="section-title mt-3">
              تامین کننده اعتماد شما
            </h2>
            <p
              className="mt-6 text-base leading-[1.8]"
              style={{ color: "var(--muted)" }}
            >
              تبارستان تامین کننده انواع میوه خشک و نوشیدنی‌های خاص بوده و
              محصولات خود را به صورت عمده و خرده عرضه می‌کند. ما با تمرکز بر
              کیفیت و تازگی محصولات، اعتماد مشتریان را در سراسر کشور به دست
              آورده‌ایم.
            </p>
            <p
              className="mt-4 text-base leading-[1.8]"
              style={{ color: "var(--muted)" }}
            >
              با بیش از ۱۳ نوع محصول متنوع از میوه خشک‌های طبیعی تا
              نوشیدنی‌های خاص و منحصربفرد، تبارستان پارتنر قابل اعتماد شما
              در توزیع و عرضه محصولات غذایی با کیفیت است.
            </p>

            <div className="mt-10 grid grid-cols-2 gap-4">
              {[
                { value: "۱۰۰۰+", label: "مشتری راضی" },
                { value: "۱۳+", label: "نوع محصول" },
                { value: "سراسر کشور", label: "پوشش توزیع" },
                { value: "۱۰۰٪", label: "رضایت مشتری" },
              ].map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.4 + i * 0.08, duration: 0.5 }}
                  className="rounded-xl p-4"
                  style={{
                    background: "rgba(255,255,255,0.025)",
                    border: "1px solid rgba(255,255,255,0.04)",
                  }}
                >
                  <p
                    className="text-lg font-bold"
                    style={{ color: "#60A5FA" }}
                  >
                    {stat.value}
                  </p>
                  <p
                    className="mt-0.5 text-xs"
                    style={{ color: "var(--muted)" }}
                  >
                    {stat.label}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
