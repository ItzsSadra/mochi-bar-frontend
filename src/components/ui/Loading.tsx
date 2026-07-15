"use client";

import { motion } from "framer-motion";

export default function Loading() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <div className="flex flex-col items-center gap-3">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
          className="h-6 w-6 rounded-full border-2 border-navy-500 border-t-transparent motion-reduce:animate-none"
          role="status"
          aria-label="در حال بارگذاری"
        />
        <span className="sr-only">در حال بارگذاری...</span>
      </div>
    </div>
  );
}
