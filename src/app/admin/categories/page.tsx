"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { api } from "@/lib/api";
import { Category } from "@/types";
import Modal from "@/components/ui/Modal";
import { HiOutlinePlus, HiOutlinePencilSquare, HiOutlineTrash } from "react-icons/hi2";

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [editingCat, setEditingCat] = useState<Category | null>(null);
  const [form, setForm] = useState({
    name: "",
    slug: "",
    description: "",
    icon: "",
    sort_order: "0",
    is_active: true,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadData = async () => {
    try {
      setLoading(true);
      const data = await api.getCategories();
      setCategories(data.categories);
    } catch {
      setError("بارگذاری دسته‌بندی‌ها با خطا مواجه شد");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const openCreate = () => {
    setEditingCat(null);
    setForm({ name: "", slug: "", description: "", icon: "", sort_order: "0", is_active: true });
    setShowModal(true);
  };

  const openEdit = (cat: Category) => {
    setEditingCat(cat);
    setForm({
      name: cat.name,
      slug: cat.slug,
      description: cat.description || "",
      icon: cat.icon || "",
      sort_order: String(cat.sort_order),
      is_active: cat.is_active,
    });
    setShowModal(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const data = {
      ...form,
      sort_order: Number(form.sort_order),
    };

    try {
      if (editingCat) {
        await api.updateCategory(editingCat.id, data);
      } else {
        await api.createCategory(data);
      }
      setShowModal(false);
      loadData();
    } catch {
      setError("ذخیره دسته‌بندی با خطا مواجه شد");
    }
  };

  const handleDelete = async (id: number) => {
    if (confirm("آیا از حذف این دسته‌بندی اطمینان دارید؟")) {
      try {
        await api.deleteCategory(id);
        loadData();
      } catch (err: unknown) {
        alert(err instanceof Error ? err.message : "خطا در حذف");
      }
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-[40vh] items-center justify-center">
        <div className="h-6 w-6 animate-spin rounded-full border-2 border-matcha-400 border-t-transparent" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-20 text-center">
        <p className="text-sm text-red-400">{error}</p>
        <button onClick={() => { setError(null); loadData(); }} className="btn-secondary mt-4">تلاش مجدد</button>
      </div>
    );
  }

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-lg font-bold text-gray-900 dark:text-white">
            دسته‌بندی‌ها
          </h1>
          <p className="mt-0.5 text-xs text-gray-400 dark:text-gray-500">
            {categories.length} دسته‌بندی · مدیریت دسته‌بندی‌های منو
          </p>
        </div>
        <button onClick={openCreate} className="btn-primary">
          <HiOutlinePlus size={16} />
          افزودن دسته‌بندی
        </button>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((cat, index) => (
          <motion.div
            key={cat.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.04 }}
            className="group rounded-2xl border border-gray-100 bg-white p-4 transition-all duration-200 hover:shadow-soft dark:border-white/5 dark:bg-white/[0.02]"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-matcha-50 text-lg dark:bg-matcha-900/30">
                  {cat.icon || "📁"}
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-gray-900 dark:text-white">{cat.name}</h3>
                  <p className="mt-0.5 text-2xs text-gray-400">{cat.item_count} آیتم</p>
                </div>
              </div>
              <div className="flex gap-0.5 opacity-0 transition-opacity group-hover:opacity-100 sm:opacity-0">
                <button
                  onClick={() => openEdit(cat)}
                  className="rounded-lg p-1.5 text-gray-400 transition-colors hover:bg-gray-100 hover:text-matcha-500 dark:hover:bg-white/5"
                >
                  <HiOutlinePencilSquare size={15} />
                </button>
                <button
                  onClick={() => handleDelete(cat.id)}
                  className="rounded-lg p-1.5 text-gray-400 transition-colors hover:bg-red-50 hover:text-red-500 dark:hover:bg-red-900/10"
                >
                  <HiOutlineTrash size={15} />
                </button>
              </div>
            </div>
            <div className="mt-3 flex items-center gap-2">
              <span
                className={`rounded-lg px-2 py-0.5 text-2xs font-medium ${
                  cat.is_active
                    ? "bg-green-50 text-green-600 dark:bg-green-900/20 dark:text-green-400"
                    : "bg-red-50 text-red-600 dark:bg-red-900/20 dark:text-red-400"
                }`}
              >
                {cat.is_active ? "فعال" : "غیرفعال"}
              </span>
              <span className="text-2xs text-gray-400">ترتیب: {cat.sort_order}</span>
            </div>
          </motion.div>
        ))}
      </div>

      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title={editingCat ? "ویرایش دسته‌بندی" : "افزودن دسته‌بندی جدید"}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-1 block text-xs font-medium text-gray-600 dark:text-gray-300">نام</label>
            <input
              type="text"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="input-field"
              required
            />
          </div>
          <div>
            <label className="mb-1 block text-xs font-medium text-gray-600 dark:text-gray-300">نامک (Slug)</label>
            <input
              type="text"
              value={form.slug}
              onChange={(e) => setForm({ ...form, slug: e.target.value })}
              className="input-field"
              placeholder="خودکار از نام ساخته می‌شود"
            />
          </div>
          <div>
            <label className="mb-1 block text-xs font-medium text-gray-600 dark:text-gray-300">آیکون</label>
            <input
              type="text"
              value={form.icon}
              onChange={(e) => setForm({ ...form, icon: e.target.value })}
              className="input-field"
              placeholder="ایموجی"
            />
          </div>
          <div>
            <label className="mb-1 block text-xs font-medium text-gray-600 dark:text-gray-300">توضیحات</label>
            <textarea
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              className="input-field"
              rows={2}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="mb-1 block text-xs font-medium text-gray-600 dark:text-gray-300">ترتیب</label>
              <input
                type="number"
                value={form.sort_order}
                onChange={(e) => setForm({ ...form, sort_order: e.target.value })}
                className="input-field"
              />
            </div>
            <div className="flex items-end pb-1">
              <label className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={form.is_active}
                  onChange={(e) => setForm({ ...form, is_active: e.target.checked })}
                  className="rounded border-gray-300"
                />
                فعال
              </label>
            </div>
          </div>
          <div className="flex justify-end gap-2.5 pt-3">
            <button type="button" onClick={() => setShowModal(false)} className="btn-ghost">
              انصراف
            </button>
            <button type="submit" className="btn-primary">
              {editingCat ? "ذخیره" : "افزودن"}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
