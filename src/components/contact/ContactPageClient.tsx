"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { api } from "@/lib/api";
import { useToast } from "@/context/ToastContext";
import { FaInstagram, FaPhone, FaMapMarkerAlt, FaClock, FaPaperPlane } from "react-icons/fa";

export default function ContactPageClient() {
  const { toast } = useToast();
  const [settings, setSettings] = useState<Record<string, string>>({});
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);

  useEffect(() => {
    api.getSettings().then((data) => {
      setSettings(data.settings.contact || {});
    }).catch(() => {});
  }, []);

  const contactItems = [
    { icon: FaMapMarkerAlt, label: "آدرس", value: settings.address || "اصفهان، خانه اصفهان، خیابان سپاه" },
    { icon: FaPhone, label: "تلفن", value: settings.phone || "۰۹۱۳۴۰۸۷۱۵۳", href: `tel:${settings.phone?.replace(/[^0-9+]/g, "") || "+989134087153"}` },
    { icon: FaInstagram, label: "اینستاگرام", value: settings.instagram || "@mochibar_isfahan", href: `https://instagram.com/${(settings.instagram || "@mochibar_isfahan").replace("@", "")}` },
    { icon: FaClock, label: "ساعات کاری", value: settings.working_hours || "هر روز ۴ بعد از ظهر تا ۱۱ شب" },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) {
      toast("لطفاً نام و پیام را وارد کنید", "error");
      return;
    }
    setSending(true);
    try {
      await api.submitContact({ name: name.trim(), phone: phone.trim(), message: message.trim() });
      toast("پیام شما با موفقیت ارسال شد", "success");
      setName("");
      setPhone("");
      setMessage("");
    } catch {
      toast("ارسال پیام با خطا مواجه شد", "error");
    } finally {
      setSending(false);
    }
  };

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
              className="space-y-4"
            >
              {contactItems.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + i * 0.06 }}
                >
                  {item.href ? (
                    <a
                      href={item.href}
                      target={item.href.startsWith("http") ? "_blank" : undefined}
                      rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                      className="flex items-center gap-3.5 rounded-xl border border-gray-100 bg-white p-4 transition-all hover:shadow-soft dark:border-white/5 dark:bg-white/[0.02] dark:hover:bg-white/[0.04]"
                    >
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-matcha-50 text-matcha-500 dark:bg-matcha-900/30 dark:text-matcha-400">
                        <item.icon size={16} />
                      </div>
                      <div>
                        <p className="text-2xs text-gray-400 dark:text-gray-500">{item.label}</p>
                        <p className="text-sm font-medium text-gray-800 dark:text-white">{item.value}</p>
                      </div>
                    </a>
                  ) : (
                    <div className="flex items-center gap-3.5 rounded-xl border border-gray-100 bg-white p-4 dark:border-white/5 dark:bg-white/[0.02]">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-matcha-50 text-matcha-500 dark:bg-matcha-900/30 dark:text-matcha-400">
                        <item.icon size={16} />
                      </div>
                      <div>
                        <p className="text-2xs text-gray-400 dark:text-gray-500">{item.label}</p>
                        <p className="text-sm font-medium text-gray-800 dark:text-white">{item.value}</p>
                      </div>
                    </div>
                  )}
                </motion.div>
              ))}

              <div className="overflow-hidden rounded-2xl bg-gray-100 dark:bg-white/[0.03]">
                <div className="h-full min-h-[200px] w-full overflow-hidden rounded-2xl sm:min-h-[260px]">
                  <iframe
                    src="https://www.openstreetmap.org/export/embed.html?bbox=51.6373%2C32.7020%2C51.6473%2C32.7120&layer=mapnik&marker=32.70703450108918%2C51.64230863500501"
                    className="h-full w-full border-0"
                    title="موقعیت موچی بار روی نقشه"
                    loading="lazy"
                  />
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="rounded-2xl border border-gray-100 bg-white p-6 dark:border-white/5 dark:bg-white/[0.02] sm:p-8">
                <h2 className="text-base font-bold text-gray-900 dark:text-white">
                  پیام دهید
                </h2>
                <p className="mt-1 text-xs text-gray-400 dark:text-gray-500">
                  فرم زیر را پر کنید تا در اسرع وقت پاسخ دهیم
                </p>

                <form onSubmit={handleSubmit} className="mt-5 space-y-4">
                  <div>
                    <label className="mb-1 block text-xs font-medium text-gray-600 dark:text-gray-300">
                      نام *
                    </label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="input-field"
                      placeholder="نام خود را وارد کنید"
                      required
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-xs font-medium text-gray-600 dark:text-gray-300">
                      تلفن
                    </label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="input-field"
                      placeholder="شماره تماس (اختیاری)"
                      dir="ltr"
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-xs font-medium text-gray-600 dark:text-gray-300">
                      پیام *
                    </label>
                    <textarea
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="input-field"
                      rows={4}
                      placeholder="پیام خود را بنویسید..."
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={sending}
                    className="btn-primary w-full"
                  >
                    <FaPaperPlane size={13} />
                    {sending ? "در حال ارسال..." : "ارسال پیام"}
                  </button>
                </form>
              </div>
            </motion.div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
