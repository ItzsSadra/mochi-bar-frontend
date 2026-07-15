"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";

const fruitItems = [
  { name: "پرتقال", emoji: "🍊" },
  { name: "کیوی", emoji: "🥝" },
  { name: "موز", emoji: "🍌" },
  { name: "نارنگی", emoji: "🍈" },
  { name: "هلو", emoji: "🍑" },
  { name: "گوجه", emoji: "🍅" },
];

const drinkItems = [
  { name: "اکلیسا", emoji: "🍷" },
  { name: "استرا", emoji: "🥤" },
  { name: "دراگون", emoji: "🧃" },
];

function ProductPill({ emoji, name, delay }: { emoji: string; name: string; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.85, y: 10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ delay, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ scale: 1.06, y: -3 }}
      className="flex flex-col items-center gap-2 rounded-2xl p-3 transition-colors"
      style={{
        background: "rgba(255,255,255,0.035)",
        border: "1px solid rgba(255,255,255,0.05)",
      }}
    >
      <span className="text-2xl sm:text-3xl">{emoji}</span>
      <span
        className="text-[0.5625rem] sm:text-[0.625rem] font-medium"
        style={{ color: "var(--muted)" }}
      >
        {name}
      </span>
    </motion.div>
  );
}

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const orbY1 = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const orbY2 = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, 60]);
  const imageY = useTransform(scrollYProgress, [0, 1], [0, -40]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[100dvh] overflow-hidden"
      style={{ background: "transparent" }}
    >
      {/* Animated background orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          style={{ y: orbY1 }}
          className="absolute -right-20 -top-20 sm:-right-32 sm:-top-32"
        >
          <div
            className="h-[250px] w-[250px] sm:h-[500px] sm:w-[500px] rounded-full animate-pulse-soft"
            style={{
              background:
                "radial-gradient(circle, rgba(30,58,138,0.18) 0%, transparent 70%)",
              filter: "blur(60px)",
            }}
          />
        </motion.div>
        <motion.div
          style={{ y: orbY2 }}
          className="absolute -bottom-16 -left-16 sm:-bottom-20 sm:-left-20"
        >
          <div
            className="h-[200px] w-[200px] sm:h-[400px] sm:w-[400px] rounded-full animate-pulse-soft"
            style={{
              background:
                "radial-gradient(circle, rgba(59,130,246,0.1) 0%, transparent 70%)",
              filter: "blur(50px)",
              animationDelay: "2s",
            }}
          />
        </motion.div>

        {/* Dot grid */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.015) 1px, transparent 0)",
            backgroundSize: "48px 48px",
          }}
        />
      </div>

      <motion.div
        style={{ opacity }}
        className="relative mx-auto flex min-h-[100dvh] max-w-7xl items-center px-5 sm:px-6 lg:px-8"
      >
        {/* ─── Mobile Hero Layout ─── */}
        <div className="sm:hidden w-full pt-16 pb-8">
          <div className="flex flex-col items-center text-center">
            {/* Brand badge */}
            <motion.div
              initial={{ opacity: 0, y: 16, filter: "blur(6px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="mb-6 inline-flex items-center gap-2 rounded-full px-4 py-2"
              style={{
                background: "rgba(59,130,246,0.08)",
                border: "1px solid rgba(59,130,246,0.12)",
                color: "#60A5FA",
              }}
            >
              <span className="text-sm">✦</span>
              <span className="text-[0.6875rem] font-semibold tracking-wide">
                عرضه کننده میوه خشک و نوشیدنی‌های خاص
              </span>
            </motion.div>

            {/* Visual collage */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              transition={{
                duration: 1,
                delay: 0.3,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="relative mb-8 w-full max-w-[320px]"
            >
              <div
                className="relative overflow-hidden p-5"
                style={{
                  borderRadius: "1.75rem",
                  background:
                    "linear-gradient(135deg, rgba(30,58,138,0.12) 0%, rgba(59,130,246,0.06) 50%, rgba(30,58,138,0.08) 100%)",
                  border: "1px solid rgba(59,130,246,0.1)",
                  boxShadow:
                    "0 24px 60px -16px rgba(30,58,138,0.2), 0 8px 24px -8px rgba(0,0,0,0.1)",
                }}
              >
                <div className="grid grid-cols-3 gap-2.5">
                  {fruitItems.map((item, i) => (
                    <ProductPill key={i} emoji={item.emoji} name={item.name} delay={0.5 + i * 0.06} />
                  ))}
                </div>
                <div
                  className="my-3 h-px"
                  style={{
                    background:
                      "linear-gradient(90deg, transparent, rgba(59,130,246,0.18), transparent)",
                  }}
                />
                <div className="grid grid-cols-3 gap-2.5">
                  {drinkItems.map((item, i) => (
                    <ProductPill key={i} emoji={item.emoji} name={item.name} delay={0.8 + i * 0.06} />
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Title */}
            <motion.h1
              initial={{ opacity: 0, y: 24, filter: "blur(6px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{
                duration: 0.8,
                delay: 0.45,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="text-[2.5rem] font-extrabold leading-[1.1] tracking-tight"
              style={{
                color: "var(--foreground)",
                letterSpacing: "-0.04em",
              }}
            >
              تبارستان
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16, filter: "blur(4px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.7, delay: 0.55 }}
              className="mt-3 max-w-xs text-[0.8125rem] leading-relaxed"
              style={{ color: "var(--muted)" }}
            >
              عرضه کننده انواع میوه خشک و نوشیدنی‌های خاص
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 12, filter: "blur(4px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.7, delay: 0.6 }}
              className="mt-1 max-w-xs text-[0.75rem] leading-relaxed"
              style={{ color: "var(--muted-strong)" }}
            >
              فروش عمده و خرده محصولات با کیفیت بالا به سراسر کشور
            </motion.p>

            {/* CTA buttons */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="mt-8 flex w-full max-w-xs flex-col gap-2.5"
            >
              <Link href="/products" className="btn-primary w-full">
                مشاهده محصولات
              </Link>
              <Link href="/contact" className="btn-secondary w-full">
                تماس با ما
              </Link>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.85 }}
              className="mt-10 flex items-center justify-center gap-6"
            >
              {[
                { value: "۱۳+", label: "نوع محصول" },
                { value: "۷+", label: "دسته‌بندی" },
                { value: "۱۰۰۰+", label: "مشتری" },
              ].map((stat, i) => (
                <div key={i} className="flex items-center gap-6">
                  <div className="text-center">
                    <p
                      className="text-xl font-bold"
                      style={{
                        color: "#60A5FA",
                        letterSpacing: "-0.02em",
                      }}
                    >
                      {stat.value}
                    </p>
                    <p
                      className="mt-0.5 text-[0.625rem] font-medium"
                      style={{ color: "var(--muted)" }}
                    >
                      {stat.label}
                    </p>
                  </div>
                  {i < 2 && (
                    <div
                      className="h-8 w-px"
                      style={{ background: "var(--border)" }}
                    />
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
                background: "rgba(59,130,246,0.06)",
                border: "1px solid rgba(59,130,246,0.1)",
                color: "#60A5FA",
              }}
            >
              <span className="text-sm">✦</span>
              <span className="text-xs font-semibold tracking-wide">
                عرضه کننده میوه خشک و نوشیدنی‌های خاص
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{
                duration: 0.9,
                delay: 0.45,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="text-[3.5rem] font-extrabold leading-[1.05] tracking-tight sm:text-6xl lg:text-[4.5rem]"
              style={{
                color: "var(--foreground)",
                letterSpacing: "-0.04em",
              }}
            >
              تبارستان
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="mt-6 max-w-md text-xl leading-relaxed font-medium"
              style={{ color: "var(--foreground)" }}
            >
              عرضه کننده انواع میوه خشک و نوشیدنی‌های خاص
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 16, filter: "blur(4px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.7, delay: 0.65 }}
              className="mt-3 max-w-md text-base leading-relaxed"
              style={{ color: "var(--muted)" }}
            >
              فروش عمده و خرده محصولات با کیفیت بالا به سراسر کشور
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.75 }}
              className="mt-10 flex flex-wrap items-center gap-4"
            >
              <Link href="/products" className="btn-primary">
                مشاهده محصولات
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
                { value: "۱۳+", label: "نوع محصول" },
                { value: "۷+", label: "دسته‌بندی" },
                { value: "۱۰۰۰+", label: "مشتری راضی" },
              ].map((stat, i) => (
                <div key={i} className="flex items-center gap-8">
                  <div>
                    <p
                      className="text-3xl font-bold"
                      style={{
                        color: "#60A5FA",
                        letterSpacing: "-0.02em",
                      }}
                    >
                      {stat.value}
                    </p>
                    <p
                      className="mt-0.5 text-xs font-medium"
                      style={{ color: "var(--muted)" }}
                    >
                      {stat.label}
                    </p>
                  </div>
                  {i < 2 && (
                    <div
                      className="h-12 w-px"
                      style={{ background: "var(--border)" }}
                    />
                  )}
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Visual collage */}
          <motion.div style={{ y: imageY }} className="relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, filter: "blur(12px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              transition={{
                duration: 1.2,
                delay: 0.3,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="relative mx-auto max-w-[480px]"
            >
              {/* Main visual */}
              <div
                className="overflow-hidden p-7"
                style={{
                  borderRadius: "2rem",
                  background:
                    "linear-gradient(135deg, rgba(30,58,138,0.12) 0%, rgba(59,130,246,0.06) 50%, rgba(30,58,138,0.08) 100%)",
                  border: "1px solid rgba(59,130,246,0.1)",
                  boxShadow:
                    "0 32px 80px -20px rgba(30,58,138,0.25), 0 12px 40px -12px rgba(0,0,0,0.15)",
                }}
              >
                <p
                  className="text-xs font-semibold mb-4"
                  style={{ color: "#60A5FA" }}
                >
                  میوه خشک
                </p>
                <div className="grid grid-cols-3 gap-3">
                  {fruitItems.map((item, i) => (
                    <ProductPill key={i} emoji={item.emoji} name={item.name} delay={0.5 + i * 0.05} />
                  ))}
                </div>

                <div
                  className="my-5 h-px"
                  style={{
                    background:
                      "linear-gradient(90deg, transparent, rgba(59,130,246,0.2), transparent)",
                  }}
                />

                <p
                  className="text-xs font-semibold mb-4"
                  style={{ color: "#3B82F6" }}
                >
                  نوشیدنی
                </p>
                <div className="grid grid-cols-3 gap-3">
                  {drinkItems.map((item, i) => (
                    <ProductPill key={i} emoji={item.emoji} name={item.name} delay={0.8 + i * 0.05} />
                  ))}
                </div>
              </div>

              {/* Floating decorative elements */}
              <motion.div
                animate={{ y: [-8, 8, -8] }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute -right-8 bottom-4 h-5 w-5 rounded-full"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(59,130,246,0.3), rgba(30,58,138,0.1))",
                  filter: "blur(1px)",
                }}
              />
              <motion.div
                animate={{ y: [6, -6, 6] }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1,
                }}
                className="absolute -left-6 top-16 h-3.5 w-3.5 rounded-full"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(30,58,138,0.4), rgba(30,58,138,0.1))",
                  filter: "blur(1px)",
                }}
              />
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      {/* Bottom fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-24 sm:h-32"
        style={{
          background: "linear-gradient(to top, var(--background), transparent)",
        }}
      />
    </section>
  );
}
