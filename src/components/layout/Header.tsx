"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { motion, AnimatePresence, useMotionValueEvent, useScroll } from "framer-motion";
import { HiMenu, HiX } from "react-icons/hi";

const navLinks = [
  { href: "/", label: "خانه" },
  { href: "/menu", label: "منو" },
  { href: "/gallery", label: "گالری" },
  { href: "/about", label: "درباره ما" },
  { href: "/contact", label: "تماس" },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 30);
  });

  const close = useCallback(() => setIsOpen(false), []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  return (
    <>
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
        className="fixed top-0 left-0 right-0 z-50 px-4 pt-4 sm:px-6"
      >
        <nav
          className={`mx-auto max-w-5xl transition-all duration-700 ease-out-expo ${
            scrolled
              ? "glass-ultra shadow-glass-lg rounded-[20px]"
              : "bg-transparent"
          }`}
        >
          <div className="flex h-[3.25rem] items-center justify-between px-5 sm:h-16 sm:px-6">
            <Link href="/" className="flex items-center gap-3 group" onClick={close}>
              <motion.div
                whileHover={{ rotate: 8, scale: 1.08 }}
                transition={{ type: "spring", stiffness: 400, damping: 15 }}
                className="flex h-9 w-9 items-center justify-center rounded-[14px] text-lg text-white"
                style={{ background: "linear-gradient(135deg, #6B8F71, #4a7a52)" }}
              >
                🍡
              </motion.div>
              <div className="hidden sm:block">
                <h1 className="text-sm font-bold leading-none" style={{ color: "var(--foreground)" }}>
                  موچی بار
                </h1>
                <p className="text-2xs mt-0.5 font-medium" style={{ color: "var(--muted)" }}>
                  Mochi Café
                </p>
              </div>
            </Link>

            <div className="hidden items-center gap-1 md:flex">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="relative rounded-full px-4 py-2 text-sm font-medium transition-colors duration-300"
                  style={{ color: "var(--muted)" }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = "var(--foreground)";
                    e.currentTarget.style.background = "var(--matcha-light)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = "var(--muted)";
                    e.currentTarget.style.background = "transparent";
                  }}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            <motion.button
              whileTap={{ scale: 0.92 }}
              onClick={() => setIsOpen(!isOpen)}
              className="flex h-9 w-9 items-center justify-center rounded-full transition-colors md:hidden"
              style={{ color: "var(--muted)" }}
              aria-expanded={isOpen}
              aria-label={isOpen ? "بستن منو" : "باز کردن منو"}
            >
              <AnimatePresence mode="wait">
                {isOpen ? (
                  <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
                    <HiX size={20} />
                  </motion.div>
                ) : (
                  <motion.div key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
                    <HiMenu size={20} />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </nav>
      </motion.header>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 md:hidden"
            style={{ background: "rgba(0,0,0,0.2)", backdropFilter: "blur(8px)", WebkitBackdropFilter: "blur(8px)" }}
            onClick={close}
          >
            <motion.div
              initial={{ opacity: 0, y: -12, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -12, scale: 0.96 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="glass-ultra shadow-glass-lg mx-4 mt-20 overflow-hidden rounded-[24px]"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-3">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 + i * 0.04, duration: 0.3 }}
                  >
                    <Link
                      href={link.href}
                      onClick={close}
                      className="block rounded-2xl px-5 py-3.5 text-base font-medium transition-colors"
                      style={{ color: "var(--muted)" }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.color = "var(--foreground)";
                        e.currentTarget.style.background = "var(--matcha-light)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.color = "var(--muted)";
                        e.currentTarget.style.background = "transparent";
                      }}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
