"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { api } from "@/lib/api";
import { FaInstagram, FaPhone, FaMapMarkerAlt, FaClock } from "react-icons/fa";

export default function ContactPage() {
  const [settings, setSettings] = useState<Record<string, string>>({});

  useEffect(() => {
    api.getSettings().then((data) => {
      setSettings(data.settings.contact || {});
    });
  }, []);

  const contactItems = [
    { icon: FaMapMarkerAlt, label: "آدرس", value: settings.address || "اصفهان، خانه اصفهان، خیابان سپاه" },
    { icon: FaPhone, label: "تلفن", value: settings.phone || "۰۹۱۳۴۰۸۷۱۵۳" },
    { icon: FaInstagram, label: "اینستاگرام", value: settings.instagram || "@mochibar_isfahan" },
    { icon: FaClock, label: "ساعات کاری", value: settings.working_hours || "هر روز ۴ بعد از ظهر تا ۱۱ شب" },
  ];

  return (
    <>
      <Header />
      <main className="min-h-screen bg-cream-50 pt-20 dark:bg-[#0c0c18]">
        <div className="mx-auto max-w-6xl px-5 py-12 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="section-title">تماس با ما</h1>
            <p className="section-subtitle">
              برای سفارش یا هرگونه سوال با ما در تماس باشید
            </p>
          </motion.div>

          <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.15 }}
              className="space-y-3"
            >
              {contactItems.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + i * 0.06 }}
                  className="flex items-center gap-3.5 rounded-xl border border-gray-100 bg-white p-4 dark:border-white/5 dark:bg-white/[0.02]"
                >
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-matcha-50 text-matcha-500 dark:bg-matcha-900/30 dark:text-matcha-400">
                    <item.icon size={16} />
                  </div>
                  <div>
                    <p className="text-2xs text-gray-400 dark:text-gray-500">{item.label}</p>
                    <p className="text-sm font-medium text-gray-800 dark:text-white">{item.value}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="overflow-hidden rounded-2xl bg-gray-100 dark:bg-white/[0.03]"
            >
              <div className="min-h-[260px] w-full overflow-hidden rounded-2xl bg-gray-200 dark:bg-gray-800 sm:min-h-[460px]">
                <img
                  src="/images/map-placeholder.png"
                  alt="موقعیت موچی بار روی نقشه"
                  className="h-full w-full object-cover"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
