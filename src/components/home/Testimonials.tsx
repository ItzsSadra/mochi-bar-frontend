"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { FaStar } from "react-icons/fa";

const testimonials = [
  {
    name: "سارا احمدی",
    role: "مشتری دائمی",
    text: "بهترین موچی که تا حالا خوردم! فضا خیلی دنج و آرامه و هر بار با یه تجربه جدید برمی‌گردم.",
    rating: 5,
  },
  {
    name: "محمد رضایی",
    role: "عاشق قهوه",
    text: "کیفیت مواد اولیه عالیه و فرقش با بقیه کافه‌ها معلومه. قیمت‌ها هم مناسب کیفیتشونه.",
    rating: 5,
  },
  {
    name: "نیلوفر کریمی",
    role: "عاشق دسر",
    text: "دسرهای دست‌سازشون واقعاً هنره. هر بار یه چیز جدید امتحان می‌کنم و تا حالا ناامید نشدم.",
    rating: 5,
  },
];

export default function Testimonials() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <section ref={ref} className="relative py-16 sm:py-24 lg:py-32 overflow-hidden" style={{ background: "var(--background)" }}>
      <div className="absolute inset-0">
        <div className="absolute left-1/2 top-0 h-[300px] w-[400px] sm:h-[400px] sm:w-[600px] -translate-x-1/2 rounded-full" style={{ background: "radial-gradient(circle, rgba(107,143,113,0.04) 0%, transparent 70%)", filter: "blur(50px)" }} />
      </div>

      <div className="relative mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center"
        >
          <span className="section-label">نظرات مشتریان</span>
          <h2 className="section-title mt-2.5">آنچه می‌گویند</h2>
        </motion.div>

        {/* Mobile: vertical stacked cards with swipe hint */}
        <div className="sm:hidden mt-7">
          <div className="flex gap-3 overflow-x-auto pb-3 -mx-5 px-5 scrollbar-none snap-x snap-mandatory">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 16 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.1 + index * 0.08, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="glass-card flex-shrink-0 snap-start p-5"
                style={{ width: "min(78vw, 320px)" }}
              >
                <div className="flex items-center gap-1 mb-3.5">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <FaStar key={i} size={11} className="text-amber-400 fill-amber-400" />
                  ))}
                </div>
                <p className="text-[0.8125rem] leading-[1.8]" style={{ color: "var(--foreground)" }}>
                  &ldquo;{testimonial.text}&rdquo;
                </p>
                <div className="mt-4 flex items-center gap-3">
                  <div
                    className="flex h-9 w-9 items-center justify-center rounded-full text-[0.6875rem] font-bold text-white"
                    style={{ background: "linear-gradient(135deg, #6B8F71, #4a7a52)" }}
                  >
                    {testimonial.name[0]}
                  </div>
                  <div>
                    <p className="text-[0.8125rem] font-semibold" style={{ color: "var(--foreground)" }}>{testimonial.name}</p>
                    <p className="text-[0.625rem]" style={{ color: "var(--muted)" }}>{testimonial.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Desktop: horizontal scroll cards */}
        <div className="hidden sm:flex mt-12 gap-5 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-none" style={{ scrollbarWidth: "none" }}>
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 24, scale: 0.96 }}
              animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ delay: 0.15 + index * 0.1, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="glass-card min-w-[360px] max-w-[400px] flex-shrink-0 p-7 snap-center"
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
