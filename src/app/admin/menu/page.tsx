"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { api, getImageUrl } from "@/lib/api";
import { MenuItem, Category } from "@/types";
import { formatPrice } from "@/lib/utils";
import Modal from "@/components/ui/Modal";
import { HiOutlinePlus, HiOutlinePencilSquare, HiOutlineTrash } from "react-icons/hi2";

export default function AdminMenuPage() {
  const [items, setItems] = useState<MenuItem[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null);
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    category_id: "",
    image_url: "",
    ingredients: "",
    preparation_time: "",
    is_featured: false,
    is_new: false,
    is_available: true,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadData = async () => {
    try {
      setLoading(true);
      const [menuData, catData] = await Promise.all([
        api.getMenu(),
        api.getCategories(),
      ]);
      setItems(menuData.items);
      setCategories(catData.categories);
    } catch {
      setError("بارگذاری منو با خطا مواجه شد");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const openCreate = () => {
    setEditingItem(null);
    setForm({
      name: "",
      description: "",
      price: "",
      category_id: "",
      image_url: "",
      ingredients: "",
      preparation_time: "",
      is_featured: false,
      is_new: false,
      is_available: true,
    });
    setShowModal(true);
  };

  const openEdit = (item: MenuItem) => {
    setEditingItem(item);
    setForm({
      name: item.name,
      description: item.description || "",
      price: String(item.price),
      category_id: String(item.category_id),
      image_url: item.image_url || "",
      ingredients: item.ingredients || "",
      preparation_time: item.preparation_time ? String(item.preparation_time) : "",
      is_featured: item.is_featured,
      is_new: item.is_new,
      is_available: item.is_available,
    });
    setShowModal(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const data = {
      ...form,
      price: Number(form.price),
      category_id: Number(form.category_id),
      preparation_time: form.preparation_time ? Number(form.preparation_time) : null,
    };

    try {
      if (editingItem) {
        await api.updateMenuItem(editingItem.id, data);
      } else {
        await api.createMenuItem(data);
      }
      setShowModal(false);
      loadData();
    } catch {
      setError("ذخیره آیتم با خطا مواجه شد");
    }
  };

  const handleDelete = async (id: number) => {
    if (confirm("آیا از حذف این آیتم اطمینان دارید؟")) {
      try {
        await api.deleteMenuItem(id);
        loadData();
      } catch {
        setError("حذف آیتم با خطا مواجه شد");
      }
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const data = await api.uploadFile(file, "menu");
      setForm({ ...form, image_url: data.media.file_path });
    } catch {
      setError("آپلود تصویر با خطا مواجه شد");
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
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-lg font-bold text-gray-900 dark:text-white">
            مدیریت منو
          </h1>
          <p className="mt-0.5 text-xs text-gray-400 dark:text-gray-500">
            افزودن، ویرایش و حذف آیتم‌های منو
          </p>
        </div>
        <button onClick={openCreate} className="btn-primary">
          <HiOutlinePlus size={16} />
          افزودن آیتم
        </button>
      </div>

      <div className="mt-6 overflow-hidden rounded-xl border border-gray-100 bg-white dark:border-white/5 dark:bg-white/[0.02]">
        <div className="overflow-x-auto">
          <table className="w-full text-right text-sm" aria-label="لیست آیتم‌های منو">
            <thead className="border-b border-gray-100 dark:border-white/5">
              <tr>
                <th className="px-4 py-2.5 text-xs font-medium text-gray-400">نام</th>
                <th className="px-4 py-2.5 text-xs font-medium text-gray-400">دسته‌بندی</th>
                <th className="px-4 py-2.5 text-xs font-medium text-gray-400">قیمت</th>
                <th className="px-4 py-2.5 text-xs font-medium text-gray-400">وضعیت</th>
                <th className="px-4 py-2.5 text-xs font-medium text-gray-400">عملیات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 dark:divide-white/5">
              {items.map((item) => (
                <tr key={item.id} className="transition-colors hover:bg-gray-50/50 dark:hover:bg-white/[0.01]">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2.5">
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-matcha-50 text-sm dark:bg-matcha-900/30">
                        🍡
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-800 dark:text-white">{item.name}</p>
                        <div className="flex gap-1.5">
                          {item.is_featured && (
                            <span className="text-2xs text-sakura-400">ویژه</span>
                          )}
                          {item.is_new && (
                            <span className="text-2xs text-matcha-500">جدید</span>
                          )}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-xs text-gray-400">{item.category_name}</td>
                  <td className="px-4 py-3 text-sm font-medium text-matcha-500 dark:text-matcha-400">
                    {formatPrice(item.price)}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-block rounded-md px-2 py-0.5 text-2xs font-medium ${
                        item.is_available
                          ? "bg-green-50 text-green-600 dark:bg-green-900/20 dark:text-green-400"
                          : "bg-red-50 text-red-600 dark:bg-red-900/20 dark:text-red-400"
                      }`}
                    >
                      {item.is_available ? "موجود" : "ناموجود"}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex gap-1">
                      <button
                        onClick={() => openEdit(item)}
                        className="rounded-lg p-1.5 text-gray-400 transition-colors hover:bg-gray-100 hover:text-matcha-500 dark:hover:bg-white/5"
                        aria-label="ویرایش"
                      >
                        <HiOutlinePencilSquare size={16} />
                      </button>
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="rounded-lg p-1.5 text-gray-400 transition-colors hover:bg-red-50 hover:text-red-500 dark:hover:bg-red-900/10"
                        aria-label="حذف"
                      >
                        <HiOutlineTrash size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title={editingItem ? "ویرایش آیتم" : "افزودن آیتم جدید"}
        size="lg"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
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
              <label className="mb-1 block text-xs font-medium text-gray-600 dark:text-gray-300">قیمت (تومان)</label>
              <input
                type="number"
                value={form.price}
                onChange={(e) => setForm({ ...form, price: e.target.value })}
                className="input-field"
                required
              />
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-gray-600 dark:text-gray-300">دسته‌بندی</label>
              <select
                value={form.category_id}
                onChange={(e) => setForm({ ...form, category_id: e.target.value })}
                className="input-field"
                required
              >
                <option value="">انتخاب کنید</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-gray-600 dark:text-gray-300">زمان آماده‌سازی (دقیقه)</label>
              <input
                type="number"
                value={form.preparation_time}
                onChange={(e) => setForm({ ...form, preparation_time: e.target.value })}
                className="input-field"
              />
            </div>
          </div>

          <div>
            <label className="mb-1 block text-xs font-medium text-gray-600 dark:text-gray-300">توضیحات</label>
            <textarea
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              className="input-field"
              rows={3}
            />
          </div>

          <div>
            <label className="mb-1 block text-xs font-medium text-gray-600 dark:text-gray-300">مواد تشکیل‌دهنده</label>
            <input
              type="text"
              value={form.ingredients}
              onChange={(e) => setForm({ ...form, ingredients: e.target.value })}
              className="input-field"
              placeholder="با کاما جدا کنید"
            />
          </div>

          <div>
            <label htmlFor="menu-image-upload" className="mb-1 block text-xs font-medium text-gray-600 dark:text-gray-300">تصویر اصلی</label>
            <input
              id="menu-image-upload"
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="input-field"
            />
            {form.image_url && (
              <img
                src={getImageUrl(form.image_url)}
                alt=""
                className="mt-2 h-16 w-16 rounded-lg object-cover"
              />
            )}
          </div>

          <div className="flex gap-5">
            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={form.is_featured}
                onChange={(e) => setForm({ ...form, is_featured: e.target.checked })}
                className="rounded border-gray-300"
              />
              ویژه
            </label>
            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={form.is_new}
                onChange={(e) => setForm({ ...form, is_new: e.target.checked })}
                className="rounded border-gray-300"
              />
              جدید
            </label>
            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={form.is_available}
                onChange={(e) => setForm({ ...form, is_available: e.target.checked })}
                className="rounded border-gray-300"
              />
              موجود
            </label>
          </div>

          <div className="flex justify-end gap-2.5 pt-3">
            <button
              type="button"
              onClick={() => setShowModal(false)}
              className="btn-ghost"
            >
              انصراف
            </button>
            <button type="submit" className="btn-primary">
              {editingItem ? "ذخیره تغییرات" : "افزودن"}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
