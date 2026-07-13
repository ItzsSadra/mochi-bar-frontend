"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence, useMotionValueEvent, useScroll } from "framer-motion";
import { HiMenu, HiX, HiHome, HiCollection, HiPhotograph, HiInformationCircle, HiPhone } from "react-icons/hi";

const navLinks = [
  { href: "/", label: "خانه", icon: HiHome },
  { href: "/menu", label: "منو", icon: HiCollection },
  { href: "/gallery", label: "گالری", icon: HiPhotograph },
  { href: "/about", label: "درباره ما", icon: HiInformationCircle },
  { href: "/contact", label: "تماس", icon: HiPhone },
];

const bottomNavLinks = [
  { href: "/", label: "خانه", icon: HiHome },
  { href: "/menu", label: "منو", icon: HiCollection },
  { href: "/gallery", label: "گالری", icon: HiPhotograph },
  { href: "/contact", label: "تماس", icon: HiPhone },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
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
      {/* ─── Desktop Header ─── */}
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
        className="desktop-only fixed top-0 left-0 right-0 z-50 px-4 pt-4 sm:px-6"
      >
        <nav
          className={`mx-auto max-w-5xl transition-all duration-700 ease-out-expo ${
            scrolled
              ? "glass-ultra shadow-glass-lg rounded-[20px]"
              : "bg-transparent"
          }`}
        >
          <div className="flex h-16 items-center justify-between px-6">
            <Link href="/" className="flex items-center gap-3 group" onClick={close}>
              <motion.div
                whileHover={{ rotate: 8, scale: 1.08 }}
                transition={{ type: "spring", stiffness: 400, damping: 15 }}
                className="flex h-9 w-9 items-center justify-center rounded-[14px] text-lg text-white"
                style={{ background: "linear-gradient(135deg, #6B8F71, #4a7a52)" }}
              >
                🍡
              </motion.div>
              <div>
                <h1 className="text-sm font-bold leading-none" style={{ color: "var(--foreground)" }}>
                  موچی بار
                </h1>
                <p className="text-2xs mt-0.5 font-medium" style={{ color: "var(--muted)" }}>
                  Mochi Café
                </p>
              </div>
            </Link>

            <div className="flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="relative rounded-full px-4 py-2 text-sm font-medium transition-colors duration-300"
                  style={{ color: pathname === link.href ? "var(--matcha)" : "var(--muted)" }}
                  onMouseEnter={(e) => {
                    if (pathname !== link.href) {
                      e.currentTarget.style.color = "var(--foreground)";
                      e.currentTarget.style.background = "var(--matcha-light)";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (pathname !== link.href) {
                      e.currentTarget.style.color = "var(--muted)";
                      e.currentTarget.style.background = "transparent";
                    }
                  }}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            <motion.button
              whileTap={{ scale: 0.92 }}
              onClick={() => setIsOpen(!isOpen)}
              className="flex h-9 w-9 items-center justify-center rounded-full transition-colors sm:hidden"
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

      {/* ─── Mobile Top Bar ─── */}
      <div className="mobile-only fixed top-0 left-0 right-0 z-50">
        <div
          className={`flex items-center justify-between px-4 transition-all duration-500 ${
            scrolled
              ? "glass-ultra shadow-glass-lg"
              : "bg-transparent"
          }`}
          style={{ paddingTop: "env(safe-area-inset-top, 0px)", height: "3.25rem" }}
        >
          <Link href="/" className="flex items-center gap-2.5" onClick={close}>
            <div
              className="flex h-8 w-8 items-center justify-center rounded-[10px] text-sm text-white"
              style={{ background: "linear-gradient(135deg, #6B8F71, #4a7a52)" }}
            >
              🍡
            </div>
            <span className="text-[0.8125rem] font-bold" style={{ color: "var(--foreground)" }}>
              موچی بار
            </span>
          </Link>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex h-10 w-10 items-center justify-center rounded-full transition-colors"
            style={{ color: "var(--muted)" }}
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
          </button>
        </div>
      </div>

      {/* ─── Mobile Bottom Navigation ─── */}
      <div className="mobile-only fixed bottom-0 left-0 right-0 z-50">
        <div
          className="glass-ultra"
          style={{
            borderTop: "0.5px solid var(--border-subtle)",
            paddingBottom: "env(safe-area-inset-bottom, 0px)",
          }}
        >
          <nav className="flex items-center justify-around px-2" style={{ height: "3.5rem" }}>
            {bottomNavLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className="relative flex flex-col items-center justify-center gap-0.5 rounded-2xl px-3 py-1.5 transition-colors"
                  style={{ minWidth: "3.5rem" }}
                >
                  {isActive && (
                    <motion.div
                      layoutId="bottomNavIndicator"
                      className="absolute inset-0 rounded-2xl"
                      style={{ background: "var(--matcha-light)" }}
                      transition={{ type: "spring", stiffness: 500, damping: 35 }}
                    />
                  )}
                  <link.icon
                    size={19}
                    className="relative z-10"
                    style={{ color: isActive ? "var(--matcha)" : "var(--muted)" }}
                    fill={isActive ? "var(--matcha)" : "none"}
                    strokeWidth={isActive ? 0 : 1.5}
                  />
                  <span
                    className="relative z-10 text-[0.625rem] font-medium"
                    style={{ color: isActive ? "var(--matcha)" : "var(--muted)" }}
                  >
                    {link.label}
                  </span>
                </Link>
              );
            })}
          </nav>
        </div>
      </div>

      {/* ─── Mobile Menu Overlay ─── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40"
            style={{ background: "rgba(0,0,0,0.35)", backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)" }}
            onClick={close}
          >
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.96 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="glass-ultra shadow-glass-lg mx-4 mt-16 overflow-hidden rounded-[20px]"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-2.5">
                {navLinks.map((link, i) => {
                  const isActive = pathname === link.href;
                  return (
                    <motion.div
                      key={link.href}
                      initial={{ opacity: 0, x: -12 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.04 + i * 0.035, duration: 0.3 }}
                    >
                      <Link
                        href={link.href}
                        onClick={close}
                        className="flex items-center gap-3.5 rounded-2xl px-5 py-3.5 text-[0.9375rem] font-medium transition-colors"
                        style={{
                          color: isActive ? "var(--matcha)" : "var(--foreground)",
                          background: isActive ? "var(--matcha-light)" : "transparent",
                        }}
                      >
                        <link.icon size={18} style={{ color: isActive ? "var(--matcha)" : "var(--muted)" }} />
                        {link.label}
                      </Link>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
