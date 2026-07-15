"use client";

import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HiXMark } from "react-icons/hi2";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  size?: "sm" | "md" | "lg";
}

export default function Modal({ isOpen, onClose, title, children, size = "md" }: ModalProps) {
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);
  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;

  const sizeClasses = {
    sm: "max-w-md",
    md: "max-w-lg",
    lg: "max-w-2xl",
  };

  useEffect(() => {
    if (!isOpen) return;

    previousFocusRef.current = document.activeElement as HTMLElement;

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onCloseRef.current();
        return;
      }
      if (e.key === "Tab") {
        const modal = document.querySelector(`[role="dialog"][aria-label="${title}"]`) as HTMLElement;
        if (!modal) return;
        const focusables = modal.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (focusables.length === 0) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", handleKey);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", handleKey);
      previousFocusRef.current?.focus();
    };
  }, [isOpen, title]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center sm:p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 backdrop-blur-xl"
            style={{ background: "rgba(7,11,20,0.6)" }}
            onClick={onClose}
            aria-hidden="true"
          />
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.96 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className={`glass-card relative w-full ${sizeClasses[size]} max-h-[85vh] sm:max-h-[90vh] overflow-hidden shadow-glass-lg sm:rounded-2xl`}
            style={{ borderRadius: "1.25rem 1.25rem 0 0" }}
            role="dialog"
            aria-modal="true"
            aria-label={title}
          >
            {/* Mobile swipe indicator */}
            <div className="flex justify-center pt-2.5 sm:hidden">
              <div className="swipe-indicator" />
            </div>

            <div
              className="sticky top-0 z-10 flex items-center justify-between px-5 py-3.5 sm:px-6 sm:py-4"
              style={{ borderBottom: "0.5px solid var(--border-subtle)" }}
            >
              <h3 className="text-[0.9375rem] sm:text-base font-semibold" style={{ color: "var(--foreground)" }}>
                {title}
              </h3>
              <button
                ref={closeButtonRef}
                onClick={onClose}
                className="flex h-9 w-9 items-center justify-center rounded-full transition-colors"
                style={{ color: "var(--muted)" }}
                aria-label="بستن"
              >
                <HiXMark size={18} />
              </button>
            </div>
            <div className="max-h-[calc(85vh-64px)] sm:max-h-[calc(90vh-64px)] overflow-y-auto px-5 py-4 sm:px-6 sm:py-5">
              {children}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
