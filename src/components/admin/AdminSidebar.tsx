"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  HiOutlineHome,
  HiOutlineBars3,
  HiOutlinePhoto,
  HiOutlineCog6Tooth,
  HiOutlineFolder,
  HiOutlineArrowRightOnRectangle,
} from "react-icons/hi2";
import { useAuth } from "@/context/AuthContext";

const sidebarLinks = [
  { href: "/admin", label: "داشبورد", icon: HiOutlineHome },
  { href: "/admin/menu", label: "مدیریت منو", icon: HiOutlineBars3 },
  { href: "/admin/categories", label: "دسته‌بندی‌ها", icon: HiOutlineFolder },
  { href: "/admin/gallery", label: "گالری", icon: HiOutlinePhoto },
  { href: "/admin/media", label: "کتابخانه رسانه", icon: HiOutlineFolder },
  { href: "/admin/settings", label: "تنظیمات", icon: HiOutlineCog6Tooth },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const { logout } = useAuth();

  return (
    <aside aria-label="منوی مدیریت" className="fixed right-0 top-0 h-full w-60 border-l border-gray-100 bg-white dark:border-white/5 dark:bg-[#111120]">
      <div className="flex h-full flex-col">
        <div className="flex h-14 items-center gap-2 border-b border-gray-100 px-4 dark:border-white/5">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-matcha-400 text-xs text-white">
            🍡
          </div>
          <span className="text-sm font-semibold text-gray-900 dark:text-white">
            مدیریت
          </span>
        </div>

        <nav className="flex-1 space-y-0.5 p-2.5">
          {sidebarLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={isActive ? "page" : undefined}
                className={`relative flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? "bg-matcha-50 text-matcha-600 dark:bg-matcha-900/20 dark:text-matcha-400"
                    : "text-gray-500 hover:bg-gray-50 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-white/5"
                }`}
              >
                <link.icon size={18} className="shrink-0" />
                <span>{link.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="border-t border-gray-100 p-2.5 dark:border-white/5">
          <Link
            href="/"
            className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium text-gray-500 transition-all hover:bg-gray-50 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-white/5"
          >
            <HiOutlineHome size={18} />
            <span>مشاهده سایت</span>
          </Link>
          <button
            onClick={logout}
            className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium text-red-500 transition-all hover:bg-red-50 dark:hover:bg-red-900/10"
          >
            <HiOutlineArrowRightOnRectangle size={18} />
            <span>خروج</span>
          </button>
        </div>
      </div>
    </aside>
  );
}
