"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { FaInstagram, FaPhone, FaMapMarkerAlt, FaClock } from "react-icons/fa";
import { api } from "@/lib/api";

export default function ContactPreview() {
  const [address, setAddress] = useState("اصفهان، خانه اصفهان، خیابان سپاه");
  const [phone, setPhone] = useState("۰۹۱۳۴۰۸۷۱۵۳");
  const [instagram, setInstagram] = useState("@mochibar_isfahan");
  const [workingHours, setWorkingHours] = useState("هر روز ۴ بعد از ظهر تا ۱۱ شب");

  useEffect(() => {
    api.getSettings().then((data) => {
      const contact = data.settings.contact || {};
      if (contact.address) setAddress(contact.address);
      if (contact.phone) setPhone(contact.phone);
      if (contact.instagram) setInstagram(contact.instagram);
      if (contact.working_hours) setWorkingHours(contact.working_hours);
    }).catch(() => {});
  }, []);

  return (
    <section className="py-12 bg-white dark:bg-[#0c0c18] sm:py-20">
      <div className="mx-auto max-w-6xl px-5 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span className="section-label">تماس با ما</span>
            <h2 className="section-title mt-2">منتظر شما هستیم</h2>
            <p className="mt-3 text-sm text-gray-500 dark:text-gray-400">
              برای سفارش یا هرگونه سوال با ما در تماس باشید.
            </p>

            <div className="mt-6 space-y-3">
              {[
                { icon: FaMapMarkerAlt, text: address },
                { icon: FaPhone, text: phone },
                { icon: FaInstagram, text: instagram },
                { icon: FaClock, text: workingHours },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-matcha-50 text-matcha-500 dark:bg-matcha-900/30 dark:text-matcha-400">
                    <item.icon size={14} />
                  </div>
                  <span className="text-sm text-gray-600 dark:text-gray-300">
                    {item.text}
                  </span>
                </div>
              ))}
            </div>

            <Link href="/contact" className="btn-primary mt-6">
              تماس با ما
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="overflow-hidden rounded-2xl bg-gray-100 dark:bg-white/[0.03]"
          >
            <iframe
              src="https://www.openstreetmap.org/export/embed.html?bbox=51.6373%2C32.7020%2C51.6473%2C32.7120&layer=mapnik&marker=32.70703450108918%2C51.64230863500501"
              className="h-full min-h-[240px] w-full border-0 sm:min-h-[360px]"
              title="موقعیت موچی بار روی نقشه"
              loading="lazy"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
