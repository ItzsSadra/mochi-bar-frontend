"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { AuthProvider, useAuth } from "@/context/AuthContext";
import AdminSidebar from "@/components/admin/AdminSidebar";
import Loading from "@/components/ui/Loading";
import { HiOutlineBars3 } from "react-icons/hi2";

function AdminLayoutInner({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const isLoginPage = pathname === "/admin/login";
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if (!loading && !isAuthenticated && !isLoginPage) {
      router.replace("/admin/login");
    }
  }, [loading, isAuthenticated, router, isLoginPage]);

  useEffect(() => {
    setSidebarOpen(false);
  }, [pathname]);

  if (isLoginPage) {
    return <>{children}</>;
  }

  if (loading || !isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-[#0a0a14] flex items-center justify-center">
        <Loading />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0a0a14]">
      <AdminSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <button
        onClick={() => setSidebarOpen(true)}
        className="fixed left-3 top-3 z-30 rounded-xl bg-white p-2.5 shadow-sm border border-gray-100 text-gray-600 transition-all hover:bg-gray-50 hover:shadow-md lg:hidden dark:bg-gray-900 dark:border-white/10 dark:text-gray-300 dark:hover:bg-gray-800"
        aria-label="باز کردن منو"
      >
        <HiOutlineBars3 size={20} />
      </button>

      <div className="pt-14 lg:pt-6 lg:mr-60 px-4 pb-6 sm:px-6 lg:px-8">
        {children}
      </div>
    </div>
  );
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <AdminLayoutInner>{children}</AdminLayoutInner>
    </AuthProvider>
  );
}
