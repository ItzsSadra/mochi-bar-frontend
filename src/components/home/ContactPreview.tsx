"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { FaPhone, FaMapMarkerAlt, FaInstagram } from "react-icons/fa";

export default function ContactPreview() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  const items = [
    {
      icon: FaMapMarkerAlt,
      label: "آدرس",
      value:
        "مازندران، شهرستان نکا، خیابان راه‌آهن، نبش نواب صفوی ۶\nشرکت توزیع و صادرات تبارستان",
    },
    {
      icon: FaPhone,
      label: "تلفن",
      value: "۰۹۹۹۱۵۸۱۳۰۰",
    },
    {
      icon: FaInstagram,
      label: "اینستاگرام",
      value: "@tabarestan",
    },
  ];

  return (
    <section
      ref={ref}
      className="relative py-20 sm:py-28 lg:py-36"
      style={{ background: "transparent" }}
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        {/* ─── Mobile Layout ─── */}
        <div className="sm:hidden">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <span className="section-label">تماس با ما</span>
            <h2 className="section-title mt-2.5">
              در تماس باشید
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="mt-6 overflow-hidden"
            style={{
              borderRadius: "1.25rem",
              border: "1px solid rgba(255,255,255,0.06)",
              height: "12rem",
            }}
          >
            <div
              className="h-full w-full flex items-center justify-center"
              style={{ background: "rgba(17,24,39,0.5)" }}
            >
              <div className="text-center">
                <FaMapMarkerAlt
                  size={24}
                  style={{ color: "#60A5FA", margin: "0 auto" }}
                />
                <p
                  className="mt-2 text-xs"
                  style={{ color: "var(--muted)" }}
                >
                  نقشه
                </p>
              </div>
            </div>
          </motion.div>

          <div className="mt-4 grid grid-cols-1 gap-2.5">
            {items.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  delay: 0.15 + i * 0.05,
                  duration: 0.4,
                }}
                className="glass-card p-3.5"
                style={{ borderRadius: "1rem" }}
              >
                <div className="flex items-start gap-3">
                  <div
                    className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl text-[0.6875rem]"
                    style={{
                      background: "rgba(59,130,246,0.08)",
                      color: "#60A5FA",
                      border: "1px solid rgba(59,130,246,0.12)",
                    }}
                  >
                    <item.icon size={13} />
                  </div>
                  <div>
                    <p
                      className="text-[0.625rem] font-semibold"
                      style={{ color: "var(--muted)" }}
                    >
                      {item.label}
                    </p>
                    <p
                      className="mt-1 text-[0.75rem] font-medium leading-snug whitespace-pre-line"
                      style={{ color: "var(--foreground)" }}
                    >
                      {item.value}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.35, duration: 0.5 }}
            className="mt-5"
          >
            <Link href="/contact" className="btn-primary w-full">
              تماس با ما
            </Link>
          </motion.div>
        </div>

        {/* ─── Desktop Layout ─── */}
        <div className="hidden sm:grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{
              duration: 0.8,
              delay: 0.1,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            <div
              className="overflow-hidden"
              style={{
                borderRadius: "1.5rem",
                border: "1px solid rgba(255,255,255,0.06)",
                height: "24rem",
              }}
            >
              <div
                className="h-full w-full flex items-center justify-center"
                style={{ background: "rgba(17,24,39,0.5)" }}
              >
                <div className="text-center">
                  <FaMapMarkerAlt
                    size={40}
                    style={{ color: "#60A5FA", margin: "0 auto" }}
                  />
                  <p
                    className="mt-3 text-sm"
                    style={{ color: "var(--muted)" }}
                  >
                    نقشه
                  </p>
                </div>
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
            <span className="section-label">تماس با ما</span>
            <h2 className="section-title mt-3">
              در تماس باشید
            </h2>
            <p
              className="mt-4 text-base leading-[1.8]"
              style={{ color: "var(--muted)" }}
            >
              آماده پاسخگویی به سوالات شما و ارائه بهترین خدمات هستیم.
            </p>

            <div className="mt-8 space-y-5">
              {items.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 12 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{
                    delay: 0.2 + i * 0.08,
                    duration: 0.5,
                  }}
                  className="flex items-start gap-4"
                >
                  <div
                    className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl"
                    style={{
                      background: "rgba(59,130,246,0.08)",
                      color: "#60A5FA",
                      border: "1px solid rgba(59,130,246,0.12)",
                    }}
                  >
                    <item.icon size={18} />
                  </div>
                  <div>
                    <p
                      className="text-xs font-semibold"
                      style={{ color: "var(--muted)" }}
                    >
                      {item.label}
                    </p>
                    <p
                      className="mt-1 text-sm font-medium leading-relaxed whitespace-pre-line"
                      style={{ color: "var(--foreground)" }}
                    >
                      {item.value}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            <Link href="/contact" className="btn-primary mt-10">
              تماس با ما
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
