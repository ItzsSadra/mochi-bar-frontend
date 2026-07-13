"use client";

import { motion } from "framer-motion";

interface StatsCardProps {
  title: string;
  value: number | string;
  icon: React.ReactNode;
  color: string;
  trend?: string;
}

export default function StatsCard({ title, value, icon, color, trend }: StatsCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="group relative overflow-hidden rounded-2xl border border-gray-100 bg-white p-5 transition-all duration-300 hover:shadow-soft-lg dark:border-white/5 dark:bg-white/[0.02]"
    >
      <div className={`absolute -left-4 -top-4 h-24 w-24 rounded-full opacity-[0.07] transition-transform duration-500 group-hover:scale-110 ${color}`} />
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <p className="text-xs text-gray-400 dark:text-gray-500">{title}</p>
          <p className="mt-1.5 text-2xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-3xl">
            {value}
          </p>
          {trend && (
            <p className="mt-1.5 flex items-center gap-1 text-2xs text-matcha-500">
              {trend}
            </p>
          )}
        </div>
        <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${color} shadow-sm`}>
          {icon}
        </div>
      </div>
    </motion.div>
  );
}
