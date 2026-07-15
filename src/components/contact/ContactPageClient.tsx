"use client";

import { motion } from "framer-motion";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import {
  FaInstagram,
  FaPhone,
  FaMapMarkerAlt,
} from "react-icons/fa";

const contactItems = [
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
    href: "tel:+989991581300",
  },
  {
    icon: FaInstagram,
    label: "اینستاگرام",
    value: "@tabarestan",
    href: "https://instagram.com/tabarestan",
  },
];

export default function ContactPageClient() {
  return (
    <>
      <Header />
      <main
        className="min-h-screen pt-14 sm:pt-24 mobile-page"
        style={{ background: "var(--background)" }}
      >
        <div className="mx-auto max-w-6xl px-5 py-6 sm:py-12 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <h1 className="section-title">تماس با ما</h1>
            <p className="section-subtitle">
              برای سفارش یا هرگونه سوال با ما در تماس باشید
            </p>
          </motion.div>

          {/* Mobile: stacked layout */}
          <div className="sm:hidden mt-6 space-y-3">
            {/* Map placeholder */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.5 }}
              className="overflow-hidden"
              style={{
                borderRadius: "1.25rem",
                border: "1px solid var(--border)",
                height: "14rem",
              }}
            >
              <div
                className="h-full w-full flex items-center justify-center"
                style={{ background: "var(--surface)" }}
              >
                <div className="text-center">
                  <FaMapMarkerAlt
                    size={28}
                    style={{ color: "var(--highlight)", margin: "0 auto" }}
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

            {/* Contact cards */}
            {contactItems.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 + i * 0.04 }}
              >
                {item.href ? (
                  <a
                    href={item.href}
                    target={
                      item.href.startsWith("http") ? "_blank" : undefined
                    }
                    rel={
                      item.href.startsWith("http")
                        ? "noopener noreferrer"
                        : undefined
                    }
                    className="glass-card flex items-center gap-3 p-3.5 transition-all"
                    style={{ borderRadius: "0.875rem" }}
                  >
                    <div
                      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl"
                      style={{
                        background: "var(--accent-light)",
                        color: "var(--highlight)",
                      }}
                    >
                      <item.icon size={14} />
                    </div>
                    <div className="min-w-0">
                      <p
                        className="text-[0.625rem]"
                        style={{ color: "var(--muted)" }}
                      >
                        {item.label}
                      </p>
                      <p
                        className="text-[0.8125rem] font-medium truncate whitespace-pre-line"
                        style={{ color: "var(--foreground)" }}
                      >
                        {item.value}
                      </p>
                    </div>
                  </a>
                ) : (
                  <div
                    className="glass-card flex items-center gap-3 p-3.5"
                    style={{ borderRadius: "0.875rem" }}
                  >
                    <div
                      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl"
                      style={{
                        background: "var(--accent-light)",
                        color: "var(--highlight)",
                      }}
                    >
                      <item.icon size={14} />
                    </div>
                    <div className="min-w-0">
                      <p
                        className="text-[0.625rem]"
                        style={{ color: "var(--muted)" }}
                      >
                        {item.label}
                      </p>
                      <p
                        className="text-[0.8125rem] font-medium truncate whitespace-pre-line"
                        style={{ color: "var(--foreground)" }}
                      >
                        {item.value}
                      </p>
                    </div>
                  </div>
                )}
              </motion.div>
            ))}
          </div>

          {/* Desktop: side-by-side layout */}
          <div className="hidden sm:grid mt-12 grid-cols-1 gap-6 md:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.15, duration: 0.5 }}
              className="space-y-4"
            >
              {contactItems.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + i * 0.05 }}
                >
                  {item.href ? (
                    <a
                      href={item.href}
                      target={
                        item.href.startsWith("http") ? "_blank" : undefined
                      }
                      rel={
                        item.href.startsWith("http")
                          ? "noopener noreferrer"
                          : undefined
                      }
                      className="glass-card flex items-center gap-3.5 p-4 transition-all duration-300"
                      style={{ borderRadius: "1rem" }}
                    >
                      <div
                        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl"
                        style={{
                          background: "var(--accent-light)",
                          color: "var(--highlight)",
                        }}
                      >
                        <item.icon size={16} />
                      </div>
                      <div>
                        <p
                          className="text-2xs"
                          style={{ color: "var(--muted)" }}
                        >
                          {item.label}
                        </p>
                        <p
                          className="text-sm font-medium"
                          style={{ color: "var(--foreground)" }}
                        >
                          {item.value}
                        </p>
                      </div>
                    </a>
                  ) : (
                    <div
                      className="glass-card flex items-center gap-3.5 p-4"
                      style={{ borderRadius: "1rem" }}
                    >
                      <div
                        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl"
                        style={{
                          background: "var(--accent-light)",
                          color: "var(--highlight)",
                        }}
                      >
                        <item.icon size={16} />
                      </div>
                      <div>
                        <p
                          className="text-2xs"
                          style={{ color: "var(--muted)" }}
                        >
                          {item.label}
                        </p>
                        <p
                          className="text-sm font-medium whitespace-pre-line"
                          style={{ color: "var(--foreground)" }}
                        >
                          {item.value}
                        </p>
                      </div>
                    </div>
                  )}
                </motion.div>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="overflow-hidden rounded-[2rem]"
              style={{ border: "1px solid var(--border)" }}
            >
              <div className="h-full min-h-[220px] w-full overflow-hidden sm:min-h-[280px]">
                <div
                  className="h-full w-full flex items-center justify-center"
                  style={{ background: "var(--surface)" }}
                >
                  <div className="text-center">
                    <FaMapMarkerAlt
                      size={36}
                      style={{ color: "var(--highlight)", margin: "0 auto" }}
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
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
