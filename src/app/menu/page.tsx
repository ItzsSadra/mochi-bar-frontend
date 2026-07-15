"use client";

import { Suspense, useEffect, useState, useCallback } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import MenuCard from "@/components/menu/MenuCard";
import MenuFilters from "@/components/menu/MenuFilters";
import { MenuCardSkeleton } from "@/components/ui/Skeleton";
import { api } from "@/lib/api";
import { MenuItem, Category } from "@/types";

function MenuContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("category") || "";

  const [items, setItems] = useState<MenuItem[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.getCategories().then((data) => setCategories(data.categories.filter((c) => c.is_active))).catch(() => {});
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearch(search), 300);
    return () => clearTimeout(timer);
  }, [search]);

  const fetchItems = useCallback(async () => {
    setLoading(true);
    try {
      const data = await api.getMenu({
        category: selectedCategory || undefined,
        search: debouncedSearch || undefined,
      });
      setItems(data.items);
    } catch {
    } finally {
      setLoading(false);
    }
  }, [selectedCategory, debouncedSearch]);

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  return (
    <>
      <Header />
      <main className="min-h-screen pt-14 sm:pt-24 mobile-page" style={{ background: "var(--background)" }}>
        <div className="mx-auto max-w-6xl px-5 py-6 sm:py-12 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <h1 className="section-title">محصولات ما</h1>
            <p className="section-subtitle">
              انتخاب کنید از میان بهترین میوه خشک‌ها و نوشیدنی‌ها
            </p>
          </motion.div>

          <div className="mt-6 sm:mt-10">
            <MenuFilters
              categories={categories}
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
              search={search}
              onSearchChange={setSearch}
            />
          </div>

          <div className="mt-5 sm:mt-8">
            {loading ? (
              <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 xl:grid-cols-4">
                {Array.from({ length: 8 }).map((_, i) => (
                  <MenuCardSkeleton key={i} />
                ))}
              </div>
            ) : items.length === 0 ? (
              <div className="py-16 sm:py-20 text-center">
                <p className="text-4xl sm:text-5xl">📦</p>
                <p className="mt-3 text-[0.8125rem] sm:text-sm" style={{ color: "var(--muted)" }}>
                  آیتمی یافت نشد
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 xl:grid-cols-4">
                {items.map((item) => (
                  <MenuCard key={item.id} item={item} />
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

export default function MenuPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen pt-14 sm:pt-24" style={{ background: "var(--background)" }}>
          <div className="mx-auto max-w-6xl px-5 py-6 sm:py-12 sm:px-6 lg:px-8">
            <div className="text-center">
              <div className="mx-auto h-6 sm:h-8 w-28 sm:w-32 animate-pulse rounded-full" style={{ background: "rgba(0,0,0,0.04)" }} />
              <div className="mx-auto mt-2.5 sm:mt-3 h-3 sm:h-4 w-48 sm:w-64 animate-pulse rounded-full" style={{ background: "rgba(0,0,0,0.04)" }} />
            </div>
            <div className="mt-6 sm:mt-10 grid grid-cols-2 gap-2.5 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 xl:grid-cols-4">
              {Array.from({ length: 8 }).map((_, i) => (
                <MenuCardSkeleton key={i} />
              ))}
            </div>
          </div>
        </div>
      }
    >
      <MenuContent />
    </Suspense>
  );
}
