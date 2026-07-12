"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { api } from "@/lib/api";

export default function AboutPage() {
  const [aboutText, setAboutText] = useState("");

  useEffect(() => {
    api.getSettings().then((data) => {
      setAboutText(data.settings.about?.about_text || "");
    });
  }, []);

  return (
    <>
      <Header />
      <main className="min-h-screen bg-cream-50 pt-20 dark:bg-[#0c0c18]">
        <div className="mx-auto max-w-3xl px-5 py-12 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="section-title">درباره ما</h1>
            <p className="section-subtitle">داستان موچی بار</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="mt-12"
          >
            <div className="rounded-2xl border border-gray-100 bg-white p-8 md:p-10 dark:border-white/5 dark:bg-white/[0.02]">
              <div className="flex justify-center text-6xl mb-6">🍡</div>
              <div className="space-y-5 text-center">
                <p className="text-lg font-medium leading-relaxed text-gray-700 dark:text-gray-200">
                  {aboutText || "موچی بار با الهام از هنر و فرهنگ ژاپنی، فضایی آرام و متفاوت برای لحظات شما خلق کرده است. ما با استفاده از بهترین مواد اولیه و تکنیک‌های نوین، نوشیدنی‌ها و دسرهایی منحصربه‌فرد ارائه می‌دهیم."}
                </p>
                <p className="text-sm leading-relaxed text-gray-500 dark:text-gray-400">
                  ما با استفاده از بهترین مواد اولیه و تکنیک‌های نوین، نوشیدنی‌ها و
                  دسرهایی منحصربه‌فرد ارائه می‌دهیم. هر موچی، هر لاته، هر دسر با
                  عشق و دقت ساخته می‌شود تا تجربه‌ای بی‌نظیر از طعم و کیفیت برای
                  شما به ارمغان بیاورد.
                </p>
                <p className="text-sm leading-relaxed text-gray-500 dark:text-gray-400">
                  فضای داخلی کافه با الهام از معماری ژاپنی طراحی شده و ترکیبی از
                  سادگی و زیبایی را به نمایش می‌گذارد. هر جزئیات با دقت انتخاب شده
                  تا تجربه‌ای متفاوت از نشستن در یک کافه برای شما بسازد.
                </p>
              </div>

              <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-3">
                {[
                  { icon: "🍡", title: "مواد اولیه درجه یک", desc: "استفاده از بهترین مواد اولیه از سراسر جهان" },
                  { icon: "🍵", title: "تکنیک اصیل ژاپنی", desc: "روش‌های سنتی ژاپنی با کیفیت مدرن" },
                  { icon: "💝", title: "عشق در هر جزئیات", desc: "از انتخاب مواد تا سرو نهایی با عشق" },
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.25 + i * 0.08 }}
                    className="text-center"
                  >
                    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-matcha-50 text-2xl dark:bg-matcha-900/30">
                      {item.icon}
                    </div>
                    <h3 className="mt-3 text-sm font-semibold text-gray-900 dark:text-white">
                      {item.title}
                    </h3>
                    <p className="mt-1 text-xs text-gray-400 dark:text-gray-500">
                      {item.desc}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </main>
      <Footer />
    </>
  );
}
