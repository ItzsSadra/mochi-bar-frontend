"use client";

import { motion } from "framer-motion";
import { FaQuoteRight, FaStar } from "react-icons/fa";

const testimonials = [
  {
    name: "سارا احمدی",
    role: "مشتری دائمی",
    text: "بهترین موچی که تا حالا خوردم! فضا خیلی دنج و آرامه و هر بار با یه تجربه جدید برمی‌گردم. ماچا لاته‌شون رو حتماً امتحان کنید.",
    rating: 5,
  },
  {
    name: "محمد رضایی",
    role: "عاشق قهوه",
    text: "کیفیت مواد اولیه عالیه و فرقش با بقیه کافه‌ها明显ه. قیمت‌ها هم مناسب کیفیتشونه. فضای داخلی هم خیلی خاص و متفاوته.",
    rating: 5,
  },
  {
    name: "نیلوفر کریمی",
    role: "عاشق دسر",
    text: "دسرهای دست‌سازشون واقعاً هنره. هر بار یه چیز جدید امتحان می‌کنم و تا حالا ناامید نشدم. پیشنهاد می‌کنم موچی‌های فصلی رو از دست ندید.",
    rating: 5,
  },
];

export default function Testimonials() {
  return (
    <section className="py-12 bg-cream-50 dark:bg-[#0c0c18] sm:py-20">
      <div className="mx-auto max-w-6xl px-5 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <span className="section-label">نظرات مشتریان</span>
          <h2 className="section-title mt-2">آنچه می‌گویند</h2>
        </motion.div>

        <div className="mt-8 grid grid-cols-1 gap-4 sm:mt-14 md:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
              className="rounded-2xl border border-gray-100 bg-white p-6 dark:border-white/5 dark:bg-white/[0.02]"
            >
              <div className="flex items-center gap-1 mb-3">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <FaStar key={i} size={12} className="text-amber-400 fill-amber-400" />
                ))}
              </div>
              <FaQuoteRight className="mb-3 text-lg text-matcha-400/30" />
              <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-300">
                {testimonial.text}
              </p>
              <div className="mt-5 flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-matcha-50 text-xs font-semibold text-matcha-600 dark:bg-matcha-900/30 dark:text-matcha-400">
                  {testimonial.name[0]}
                </div>
                <div>
                  <p className="text-xs font-semibold text-gray-900 dark:text-white">
                    {testimonial.name}
                  </p>
                  <p className="text-2xs text-gray-400 dark:text-gray-500">
                    {testimonial.role}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
