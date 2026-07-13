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
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={onClose}
            aria-hidden="true"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 20 }}
            transition={{ duration: 0.2 }}
            className={`relative w-full ${sizeClasses[size]} max-h-[90vh] overflow-hidden rounded-t-2xl bg-white shadow-xl sm:rounded-2xl dark:bg-gray-900`}
            role="dialog"
            aria-modal="true"
            aria-label={title}
          >
            <div className="sticky top-0 z-10 flex items-center justify-between border-b border-gray-100 bg-white px-6 py-4 sm:px-6 dark:border-white/5 dark:bg-gray-900">
              <h3 className="text-base font-semibold text-gray-900 dark:text-white">
                {title}
              </h3>
              <button
                ref={closeButtonRef}
                onClick={onClose}
                className="rounded-lg p-1.5 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600 dark:hover:bg-white/5"
                aria-label="بستن"
              >
                <HiXMark size={18} />
              </button>
            </div>
            <div className="max-h-[calc(90vh-64px)] overflow-y-auto px-6 py-5">
              {children}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
