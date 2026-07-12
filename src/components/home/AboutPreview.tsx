"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function AboutPreview() {
  return (
    <section className="py-20 bg-cream-50 dark:bg-[#0c0c18]">
      <div className="mx-auto max-w-6xl px-5 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="overflow-hidden rounded-2xl bg-gradient-to-br from-matcha-100 to-sakura-50 p-10 dark:from-matcha-900/20 dark:to-sakura-900/10">
              <div className="flex items-center justify-center text-7xl">🍵</div>
            </div>
            <div className="absolute -bottom-5 -left-5 rounded-xl border border-gray-100 bg-white p-3.5 shadow-soft dark:border-white/10 dark:bg-white/10">
              <div className="flex items-center gap-2.5">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-matcha-50 text-lg dark:bg-matcha-900/30">
                  ☕
                </div>
                <div>
                  <p className="text-xs font-semibold text-gray-900 dark:text-white">کیفیت برتر</p>
                  <p className="text-2xs text-gray-400">بهترین مواد اولیه</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span className="section-label">داستان ما</span>
            <h2 className="section-title mt-2">هنر و طعم در هر لقمه</h2>
            <p className="mt-4 text-sm leading-relaxed text-gray-500 dark:text-gray-400 lg:text-base">
              موچی بار با الهام از هنر و فرهنگ ژاپنی، فضایی آرام و متفاوت برای
              لحظات شما خلق کرده است. ما با استفاده از بهترین مواد اولیه و
              تکنیک‌های نوین، نوشیدنی‌ها و دسرهایی منحصربه‌فرد ارائه می‌دهیم.
            </p>
            <p className="mt-3 text-sm leading-relaxed text-gray-500 dark:text-gray-400 lg:text-base">
              هر موچی، هر لاته، هر دسر با عشق و دقت ساخته می‌شود تا تجربه‌ای
              بی‌نظیر از طعم و کیفیت برای شما به ارمغان بیاورد.
            </p>

            <div className="mt-7 grid grid-cols-2 gap-5">
              {[
                { icon: "🍡", title: "دست‌ساز", desc: "تمام محصولات با دست تهیه می‌شوند" },
                { icon: "🌿", title: "ارگانیک", desc: "مواد اولیه طبیعی و تازه" },
                { icon: "🎨", title: "هنری", desc: "طراحی زیبا در هر جزئیات" },
                { icon: "💝", title: "عشق", desc: "با عشق برای شما تهیه شده" },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-2.5">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-matcha-50 text-sm dark:bg-matcha-900/30">
                    {item.icon}
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-gray-900 dark:text-white">
                      {item.title}
                    </p>
                    <p className="mt-0.5 text-2xs text-gray-400 dark:text-gray-500">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <Link href="/about" className="btn-primary mt-7">
              درباره ما بیشتر بدانید
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
