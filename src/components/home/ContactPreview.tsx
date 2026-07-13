"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { FaInstagram, FaPhone, FaMapMarkerAlt, FaClock } from "react-icons/fa";
import { api } from "@/lib/api";

export default function ContactPreview() {
  const [address, setAddress] = useState("اصفهان، خانه اصفهان، خیابان سپاه");
  const [phone, setPhone] = useState("۰۹۱۳۴۰۸۷۱۵۳");
  const [instagram, setInstagram] = useState("@mochibar_isfahan");
  const [workingHours, setWorkingHours] = useState("هر روز ۴ بعد از ظهر تا ۱۱ شب");
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  useEffect(() => {
    api.getSettings().then((data) => {
      const c = data.settings.contact || {};
      if (c.address) setAddress(c.address);
      if (c.phone) setPhone(c.phone);
      if (c.instagram) setInstagram(c.instagram);
      if (c.working_hours) setWorkingHours(c.working_hours);
    }).catch(() => {});
  }, []);

  const items = [
    { icon: FaMapMarkerAlt, text: address },
    { icon: FaPhone, text: phone },
    { icon: FaInstagram, text: instagram },
    { icon: FaClock, text: workingHours },
  ];

  return (
    <section ref={ref} className="relative py-24 sm:py-32" style={{ background: "var(--background)" }}>
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
          {/* Text */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="section-label">تماس با ما</span>
            <h2 className="section-title mt-3">منتظر شما هستیم</h2>
            <p className="mt-4 text-base" style={{ color: "var(--muted)" }}>
              برای سفارش یا هرگونه سوال با ما در تماس باشید.
            </p>

            <div className="mt-10 space-y-5">
              {items.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 16 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.2 + i * 0.06, duration: 0.5 }}
                  className="flex items-center gap-4"
                >
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl" style={{ background: "var(--matcha-light)", color: "var(--matcha)" }}>
                    <item.icon size={15} />
                  </div>
                  <span className="text-sm font-medium" style={{ color: "var(--foreground)" }}>{item.text}</span>
                </motion.div>
              ))}
            </div>

            <Link href="/contact" className="btn-primary mt-10">
              تماس با ما
            </Link>
          </motion.div>

          {/* Map */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="relative overflow-hidden"
            style={{
              borderRadius: "2rem",
              border: "0.5px solid var(--border-subtle)",
              boxShadow: "0 32px 80px -20px rgba(0,0,0,0.06), inset 0 1px 0 rgba(255,255,255,0.5)",
            }}
          >
            <iframe
              src="https://www.openstreetmap.org/export/embed.html?bbox=51.6373%2C32.7020%2C51.6473%2C32.7120&layer=mapnik&marker=32.70703450108918%2C51.64230863500501"
              className="h-full min-h-[320px] w-full border-0 lg:min-h-[420px]"
              title="موقعیت موچی بار روی نقشه"
              loading="lazy"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
