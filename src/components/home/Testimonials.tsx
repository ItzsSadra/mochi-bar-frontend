"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const testimonials = [
  {
    name: "احمد محمدی",
    role: "عمده فروش",
    text: "کیفیت محصولات تبارستان عالیه. سال‌هاست باهاشون کار می‌کنم و همیشه راضی بودم. توزیع سریع و بسته‌بندی حرفه‌ای.",
    rating: 5,
  },
  {
    name: "فاطمه رضایی",
    role: "خرده فروش",
    text: "تنوع محصولات و قیمت‌های مناسب باعث شده مشتریام همیشه راضی باشن. پیشنهاد می‌کنم.",
    rating: 5,
  },
  {
    name: "علی حسینی",
    role: "توزیع کننده",
    text: "بهترین تامین کننده‌ای که باهاش کار کردم. محصولات تازه و با کیفیت ارسال می‌کنن.",
    rating: 5,
  },
];

function StarRating({ count }: { count: number }) {
  return (
    <div className="flex items-center gap-1.5">
      {Array.from({ length: count }).map((_, i) => (
        <svg
          key={i}
          className="h-3.5 w-3.5"
          fill="#60A5FA"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

function QuoteIcon() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      className="mb-3 opacity-15"
    >
      <path
        d="M4.583 17.321C3.553 16.227 3 15 3 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179zm10 0C13.553 16.227 13 15 13 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179z"
        fill="currentColor"
        style={{ color: "#60A5FA" }}
      />
    </svg>
  );
}

export default function Testimonials() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <section
      ref={ref}
      className="relative py-20 sm:py-28 lg:py-36 overflow-hidden"
      style={{ background: "transparent" }}
    >
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute left-1/2 top-0 h-[300px] w-[400px] sm:h-[400px] sm:w-[600px] -translate-x-1/2 rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(30,58,138,0.05) 0%, transparent 70%)",
            filter: "blur(50px)",
          }}
        />
      </div>

      <div className="relative mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center"
        >
          <span className="section-label">نظرات مشتریان</span>
          <h2 className="section-title mt-2.5">اعتماد آنها به ما</h2>
        </motion.div>

        <div className="sm:hidden mt-7">
          <div className="flex gap-3 overflow-x-auto pb-3 -mx-5 px-5 scrollbar-none scroll-snap-x">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 16 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  delay: 0.1 + index * 0.08,
                  duration: 0.5,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="glass-card flex-shrink-0 snap-start p-5"
                style={{ width: "min(78vw, 320px)" }}
              >
                <StarRating count={testimonial.rating} />
                <QuoteIcon />
                <p
                  className="text-[0.8125rem] leading-[1.8]"
                  style={{ color: "var(--foreground)" }}
                >
                  {testimonial.text}
                </p>
                <div className="mt-4 flex items-center gap-3">
                  <div
                    className="flex h-9 w-9 items-center justify-center rounded-full text-[0.6875rem] font-bold text-white"
                    style={{
                      background: "linear-gradient(135deg, #1E3A8A, #2563EB)",
                    }}
                  >
                    {testimonial.name[0]}
                  </div>
                  <div>
                    <p
                      className="text-[0.8125rem] font-semibold"
                      style={{ color: "var(--foreground)" }}
                    >
                      {testimonial.name}
                    </p>
                    <p
                      className="text-[0.625rem]"
                      style={{ color: "var(--muted)" }}
                    >
                      {testimonial.role}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="mt-12 hidden sm:grid grid-cols-3 gap-5">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 24, scale: 0.96 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{
                delay: 0.15 + index * 0.1,
                duration: 0.7,
                ease: [0.16, 1, 0.3, 1],
              }}
              whileHover={{ y: -4 }}
              className="glass-card p-7"
            >
              <StarRating count={testimonial.rating} />
              <QuoteIcon />
              <p
                className="text-sm leading-[1.8]"
                style={{ color: "var(--foreground)" }}
              >
                {testimonial.text}
              </p>
              <div className="mt-6 flex items-center gap-3.5">
                <div
                  className="flex h-11 w-11 items-center justify-center rounded-full text-sm font-bold text-white"
                  style={{
                    background: "linear-gradient(135deg, #1E3A8A, #2563EB)",
                  }}
                >
                  {testimonial.name[0]}
                </div>
                <div>
                  <p
                    className="text-sm font-semibold"
                    style={{ color: "var(--foreground)" }}
                  >
                    {testimonial.name}
                  </p>
                  <p
                    className="text-2xs"
                    style={{ color: "var(--muted)" }}
                  >
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
