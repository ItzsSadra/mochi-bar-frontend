"use client";

import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import Link from "next/link";

export default function AboutPreview() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const imageY = useTransform(scrollYProgress, [0, 1], [40, -40]);

  return (
    <section ref={ref} className="relative py-24 sm:py-32 overflow-hidden" style={{ background: "var(--background)" }}>
      {/* Background accent */}
      <div className="absolute inset-0">
        <div className="absolute -left-40 top-0 h-[600px] w-[600px] rounded-full" style={{ background: "radial-gradient(circle, rgba(107,143,113,0.04) 0%, transparent 70%)", filter: "blur(80px)" }} />
      </div>

      <div className="relative mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
          {/* Image side */}
          <motion.div style={{ y: imageY }} className="relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.92, filter: "blur(8px)" }}
              animate={inView ? { opacity: 1, scale: 1, filter: "blur(0)" } : {}}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="relative"
            >
              <div
                className="overflow-hidden"
                style={{
                  borderRadius: "2rem",
                  background: "linear-gradient(135deg, rgba(107,143,113,0.08), rgba(237,132,158,0.04))",
                  border: "0.5px solid var(--border-subtle)",
                  boxShadow: "0 32px 80px -20px rgba(0,0,0,0.06), inset 0 1px 0 rgba(255,255,255,0.5)",
                }}
              >
                <div className="p-10 sm:p-14">
                  <div className="flex items-center justify-center text-[5rem] sm:text-[6rem]">🍵</div>
                </div>
              </div>

              {/* Floating badge */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="absolute -bottom-6 -left-3 sm:-bottom-7 sm:left-6"
                style={{ animation: "float 8s ease-in-out infinite" }}
              >
                <div className="glass-card shadow-glass p-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl text-lg" style={{ background: "var(--matcha-light)" }}>☕</div>
                    <div>
                      <p className="text-xs font-semibold" style={{ color: "var(--foreground)" }}>کیفیت برتر</p>
                      <p className="text-2xs" style={{ color: "var(--muted)" }}>بهترین مواد اولیه</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Text side */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="section-label">داستان ما</span>
            <h2 className="section-title mt-3">هنر و طعم در هر لقمه</h2>
            <p className="mt-6 text-base leading-[1.8]" style={{ color: "var(--muted)" }}>
              موچی بار با الهام از هنر و فرهنگ ژاپنی، فضایی آرام و متفاوت برای
              لحظات شما خلق کرده است. ما با استفاده از بهترین مواد اولیه و
              تکنیک‌های نوین، نوشیدنی‌ها و دسرهایی منحصربه‌فرد ارائه می‌دهیم.
            </p>
            <p className="mt-4 text-base leading-[1.8]" style={{ color: "var(--muted)" }}>
              هر موچی، هر لاته، هر دسر با عشق و دقت ساخته می‌شود تا تجربه‌ای
              بی‌نظیر از طعم و کیفیت برای شما به ارمغان بیاورد.
            </p>

            {/* Features — numbered */}
            <div className="mt-10 space-y-5">
              {[
                { num: "01", icon: "🍡", title: "دست‌ساز", desc: "تمام محصولات با دست تهیه می‌شوند" },
                { num: "02", icon: "🌿", title: "ارگانیک", desc: "مواد اولیه طبیعی و تازه" },
                { num: "03", icon: "🎨", title: "هنری", desc: "طراحی زیبا در هر جزئیات" },
                { num: "04", icon: "💝", title: "عشق", desc: "با عشق برای شما تهیه شده" },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -16 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.3 + i * 0.08, duration: 0.5 }}
                  className="flex items-start gap-4"
                >
                  <span className="mt-0.5 text-2xs font-bold" style={{ color: "var(--matcha)", letterSpacing: "0.05em" }}>{item.num}</span>
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl text-base" style={{ background: "var(--matcha-light)" }}>{item.icon}</div>
                  <div>
                    <p className="text-sm font-semibold" style={{ color: "var(--foreground)" }}>{item.title}</p>
                    <p className="mt-0.5 text-xs" style={{ color: "var(--muted)" }}>{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <Link href="/about" className="btn-primary mt-10">
              درباره ما بیشتر بدانید
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
