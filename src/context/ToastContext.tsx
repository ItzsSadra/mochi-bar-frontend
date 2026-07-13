"use client";

import { createContext, useContext, useState, useCallback, useMemo, ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HiCheckCircle, HiExclamationTriangle, HiInformationCircle, HiXMark } from "react-icons/hi2";

type ToastType = "success" | "error" | "info";

interface Toast {
  id: number;
  message: string;
  type: ToastType;
}

interface ToastContextType {
  toast: (message: string, type?: ToastType) => void;
}

const ToastContext = createContext<ToastContextType>({ toast: () => {} });

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const toast = useCallback((message: string, type: ToastType = "info") => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  }, []);

  const remove = useCallback((id: number) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const icons = {
    success: <HiCheckCircle size={18} className="text-green-500" />,
    error: <HiExclamationTriangle size={18} className="text-red-500" />,
    info: <HiInformationCircle size={18} className="text-blue-500" />,
  };

  const bgColors = {
    success: "bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-800/30",
    error: "bg-red-50 border-red-200 dark:bg-red-900/20 dark:border-red-800/30",
    info: "bg-blue-50 border-blue-200 dark:bg-blue-900/20 dark:border-blue-800/30",
  };

  const value = useMemo(() => ({ toast }), [toast]);

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div className="fixed bottom-4 left-4 right-4 z-[100] flex flex-col gap-2 sm:left-auto sm:max-w-sm">
        <AnimatePresence>
          {toasts.map((t) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              className={`flex items-center gap-3 rounded-xl border p-3.5 shadow-lg ${bgColors[t.type]}`}
            >
              {icons[t.type]}
              <p className="flex-1 text-sm text-gray-700 dark:text-gray-200">{t.message}</p>
              <button
                onClick={() => remove(t.id)}
                className="shrink-0 rounded-lg p-1 text-gray-400 transition-colors hover:bg-white/50 dark:hover:bg-white/10"
                aria-label="بستن"
              >
                <HiXMark size={14} />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  return useContext(ToastContext);
}
