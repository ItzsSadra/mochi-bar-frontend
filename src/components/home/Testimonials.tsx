"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { FaStar } from "react-icons/fa";

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
    text: "کیفیت مواد اولیه عالیه و فرقش با بقیه کافه‌ها معلومه. قیمت‌ها هم مناسب کیفیتشونه. فضای داخلی هم خیلی خاص و متفاوته.",
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
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="relative py-24 sm:py-32 overflow-hidden" style={{ background: "var(--background)" }}>
      {/* Background accent */}
      <div className="absolute inset-0">
        <div className="absolute left-1/2 top-0 h-[400px] w-[600px] -translate-x-1/2 rounded-full" style={{ background: "radial-gradient(circle, rgba(107,143,113,0.04) 0%, transparent 70%)", filter: "blur(60px)" }} />
      </div>

      <div className="relative mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center"
        >
          <span className="section-label">نظرات مشتریان</span>
          <h2 className="section-title mt-3">آنچه می‌گویند</h2>
        </motion.div>

        {/* Horizontal scroll cards */}
        <div className="mt-14 flex gap-5 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-none" style={{ scrollbarWidth: "none" }}>
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 24, scale: 0.96 }}
              animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ delay: 0.15 + index * 0.1, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="glass-card min-w-[320px] max-w-[400px] flex-shrink-0 p-7 snap-center sm:min-w-[360px]"
            >
              <div className="flex items-center gap-1.5 mb-5">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <FaStar key={i} size={12} className="text-amber-400 fill-amber-400" />
                ))}
              </div>
              <p className="text-sm leading-[1.8]" style={{ color: "var(--foreground)" }}>
                &ldquo;{testimonial.text}&rdquo;
              </p>
              <div className="mt-6 flex items-center gap-3.5">
                <div
                  className="flex h-11 w-11 items-center justify-center rounded-full text-sm font-bold text-white"
                  style={{ background: "linear-gradient(135deg, #6B8F71, #4a7a52)" }}
                >
                  {testimonial.name[0]}
                </div>
                <div>
                  <p className="text-sm font-semibold" style={{ color: "var(--foreground)" }}>{testimonial.name}</p>
                  <p className="text-2xs" style={{ color: "var(--muted)" }}>{testimonial.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
