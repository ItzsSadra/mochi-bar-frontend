"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";

const driedFruits = [
  { name: "پرتقال", emoji: "🍊", desc: "خشک شده با روش طبیعی" },
  { name: "گوجه", emoji: "🍅", desc: "ترد و خوشمزه" },
  { name: "کیوی", emoji: "🥝", desc: "ویتامین‌دار و تازه" },
  { name: "موز", emoji: "🍌", desc: "شیرین و طبیعی" },
  { name: "نارنگی", emoji: "🍈", desc: "ویژه فصل" },
  { name: "هلو", emoji: "🍑", desc: "تازه و معطر" },
  { name: "انواع میوه فصل", emoji: "🍇", desc: "متنوع و تازه" },
];

const beverages = [
  { name: "استرا", emoji: "🥤", desc: "نوشیدنی خاص و منحصربفرد" },
  { name: "دراگون", emoji: "🧃", desc: "ترکیبی از طعم‌های خاص" },
  { name: "شات فون", emoji: "🍹", desc: "تازه و گوارا" },
  { name: "نارفیس", emoji: "🥛", desc: "نوشیدنی سالم و طبیعی" },
  { name: "تیکامون", emoji: "🍵", desc: "انرژی‌بخش" },
  { name: "اکلیسا", emoji: "🍷", desc: "لوکس و ویژه" },
];

function ProductCard({
  item,
  index,
  variant,
}: {
  item: { name: string; emoji: string; desc: string };
  index: number;
  variant: "fruit" | "drink";
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{
        duration: 0.5,
        delay: index * 0.06,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      <motion.div
        whileHover={{ y: -6, scale: 1.02 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="glass-card group cursor-pointer overflow-hidden p-6 text-center"
      >
        <div
          className="mx-auto flex h-20 w-20 items-center justify-center rounded-2xl text-4xl transition-all duration-500 group-hover:scale-110"
          style={{
            background: variant === "fruit" ? "rgba(30,58,138,0.08)" : "rgba(59,130,246,0.08)",
            border: `1px solid ${variant === "fruit" ? "rgba(30,58,138,0.12)" : "rgba(59,130,246,0.12)"}`,
          }}
        >
          {item.emoji}
        </div>

        <h3
          className="mt-4 text-base font-bold transition-colors duration-300"
          style={{ color: "var(--foreground)" }}
        >
          {item.name}
        </h3>
        <p
          className="mt-1.5 text-xs leading-relaxed"
          style={{ color: "var(--muted)" }}
        >
          {item.desc}
        </p>

        <div
          className="mt-4 h-px opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{
            background:
              "linear-gradient(90deg, transparent, rgba(59,130,246,0.25), transparent)",
          }}
        />
      </motion.div>
    </motion.div>
  );
}

export default function FeaturedMenu() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <section
      ref={ref}
      className="relative py-20 sm:py-28 lg:py-36"
      style={{ background: "transparent" }}
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute right-0 top-1/4 h-[300px] w-[300px] sm:h-[500px] sm:w-[500px] rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(30,58,138,0.06) 0%, transparent 70%)",
            filter: "blur(60px)",
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
          <span className="section-label">محصولات ما</span>
          <h2 className="section-title mt-2.5">میوه خشک</h2>
          <p className="section-subtitle mx-auto">
            انواع میوه خشک با کیفیت بالا و طعم بی‌نظیر
          </p>
        </motion.div>

        <div className="mt-10 sm:hidden">
          <div className="flex gap-3 overflow-x-auto pb-3 -mx-5 px-5 scrollbar-none scroll-snap-x">
            {driedFruits.map((item, index) => (
              <div
                key={index}
                className="flex-shrink-0 snap-start"
                style={{ width: "min(65vw, 240px)" }}
              >
                <ProductCard item={item} index={index} variant="fruit" />
              </div>
            ))}
          </div>
        </div>

        <div className="mt-10 hidden sm:grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {driedFruits.map((item, index) => (
            <ProductCard
              key={index}
              item={item}
              index={index}
              variant="fruit"
            />
          ))}
        </div>

        <div className="mt-20 sm:mt-28">
          <div className="premium-divider mb-16 sm:mb-20" />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.7 }}
            className="text-center"
          >
            <span className="section-label">نوشیدنی‌های خاص</span>
            <h2 className="section-title mt-2.5">نوشیدنی</h2>
            <p className="section-subtitle mx-auto">
              نوشیدنی‌های منحصربفرد و خاص با بهترین کیفیت
            </p>
          </motion.div>

          <div className="mt-10 sm:hidden">
            <div className="flex gap-3 overflow-x-auto pb-3 -mx-5 px-5 scrollbar-none scroll-snap-x">
              {beverages.map((item, index) => (
                <div
                  key={index}
                  className="flex-shrink-0 snap-start"
                  style={{ width: "min(65vw, 240px)" }}
                >
                  <ProductCard item={item} index={index} variant="drink" />
                </div>
              ))}
            </div>
          </div>

          <div className="mt-10 hidden sm:grid grid-cols-2 gap-4 md:grid-cols-3">
            {beverages.map((item, index) => (
              <ProductCard
                key={index}
                item={item}
                index={index}
                variant="drink"
              />
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-14 text-center sm:mt-16"
        >
          <Link href="/contact" className="btn-primary">
            مشاوره و سفارش محصول
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
