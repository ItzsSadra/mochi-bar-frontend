"use client";

import { Suspense, useEffect, useState, useCallback } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import MenuCard from "@/components/menu/MenuCard";
import MenuFilters from "@/components/menu/MenuFilters";
import Loading from "@/components/ui/Loading";
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
    api.getCategories().then((data) => setCategories(data.categories.filter((c) => c.is_active)));
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
      <main className="min-h-screen bg-cream-50 pt-20 dark:bg-[#0c0c18]">
        <div className="mx-auto max-w-6xl px-5 py-12 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="section-title">منوی ما</h1>
            <p className="section-subtitle">
              انتخاب کنید از میان بهترین نوشیدنی‌ها و دسرها
            </p>
          </motion.div>

          <div className="mt-8">
            <MenuFilters
              categories={categories}
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
              search={search}
              onSearchChange={setSearch}
            />
          </div>

          <div className="mt-6">
            {loading ? (
              <Loading />
            ) : items.length === 0 ? (
              <div className="py-20 text-center">
                <p className="text-5xl">🍵</p>
                <p className="mt-3 text-sm text-gray-400">
                  آیتمی یافت نشد
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
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
    <Suspense fallback={<Loading />}>
      <MenuContent />
    </Suspense>
  );
}
