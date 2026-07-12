"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { api, getImageUrl } from "@/lib/api";
import { GalleryImage } from "@/types";
import Modal from "@/components/ui/Modal";
import { HiOutlinePlus, HiOutlinePencilSquare, HiOutlineTrash } from "react-icons/hi2";

export default function AdminGalleryPage() {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [editingImg, setEditingImg] = useState<GalleryImage | null>(null);
  const [form, setForm] = useState({
    title: "",
    caption: "",
    image_url: "",
  });
  const [uploading, setUploading] = useState(false);
  const [uploadPercent, setUploadPercent] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadData = async () => {
    try {
      setLoading(true);
      const data = await api.getGallery();
      setImages(data.images);
    } catch {
      setError("بارگذاری گالری با خطا مواجه شد");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const openCreate = () => {
    setEditingImg(null);
    setForm({ title: "", caption: "", image_url: "" });
    setShowModal(true);
  };

  const openEdit = (img: GalleryImage) => {
    setEditingImg(img);
    setForm({
      title: img.title || "",
      caption: img.caption || "",
      image_url: img.image_url,
    });
    setShowModal(true);
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setUploadPercent(0);
    try {
      const data = await api.uploadFileWithProgress(file, "gallery", setUploadPercent);
      setForm({ ...form, image_url: data.media.file_path });
    } finally {
      setUploading(false);
      setUploadPercent(0);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.image_url) {
      alert("لطفاً تصویر را آپلود کنید");
      return;
    }

    try {
      if (editingImg) {
        await api.updateGalleryImage(editingImg.id, form);
      } else {
        await api.createGalleryImage(form);
      }
      setShowModal(false);
      loadData();
    } catch {
      setError("ذخیره تصویر با خطا مواجه شد");
    }
  };

  const handleDelete = async (id: number) => {
    if (confirm("آیا از حذف این تصویر اطمینان دارید؟")) {
      try {
        await api.deleteGalleryImage(id);
        loadData();
      } catch {
        setError("حذف تصویر با خطا مواجه شد");
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
          <h1 className="text-lg font-bold text-gray-900 dark:text-white">گالری</h1>
          <p className="mt-0.5 text-xs text-gray-400 dark:text-gray-500">
            مدیریت تصاویر گالری
          </p>
        </div>
        <button onClick={openCreate} className="btn-primary">
          <HiOutlinePlus size={16} />
          افزودن تصویر
        </button>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4">
        {images.map((img, index) => (
          <motion.div
            key={img.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.04 }}
            className="group relative overflow-hidden rounded-xl bg-gray-100 dark:bg-white/[0.02]"
          >
            <img
              src={getImageUrl(img.image_url)}
              alt={img.title || ""}
              className="aspect-square w-full object-cover"
            />
            <div className="absolute inset-0 flex items-center justify-center gap-1.5 bg-black/50 opacity-0 transition-opacity group-hover:opacity-100">
              <button
                onClick={() => openEdit(img)}
                className="rounded-lg bg-white/20 p-1.5 text-white backdrop-blur-sm transition-colors hover:bg-white/30"
                aria-label="ویرایش"
              >
                <HiOutlinePencilSquare size={16} />
              </button>
              <button
                onClick={() => handleDelete(img.id)}
                className="rounded-lg bg-red-500/50 p-1.5 text-white backdrop-blur-sm transition-colors hover:bg-red-500/70"
                aria-label="حذف"
              >
                <HiOutlineTrash size={16} />
              </button>
            </div>
            {(img.title || img.caption) && (
              <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/60 p-2.5">
                {img.title && (
                  <p className="text-xs font-semibold text-white">{img.title}</p>
                )}
                {img.caption && (
                  <p className="text-2xs text-gray-300">{img.caption}</p>
                )}
              </div>
            )}
          </motion.div>
        ))}
      </div>

      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title={editingImg ? "ویرایش تصویر" : "افزودن تصویر جدید"}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-1 block text-xs font-medium text-gray-600 dark:text-gray-300">تصویر</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="input-field"
            />
            {uploading && (
              <div className="mt-2 rounded-lg bg-matcha-50 p-2 dark:bg-matcha-900/20">
                <div className="mb-1 flex items-center justify-between text-2xs">
                  <span className="text-matcha-600 dark:text-matcha-400">در حال آپلود...</span>
                  <span className="font-medium text-matcha-600 dark:text-matcha-400">{uploadPercent}%</span>
                </div>
                <div className="h-1 w-full overflow-hidden rounded-full bg-matcha-200/50 dark:bg-matcha-800/30">
                  <div
                    className="h-full rounded-full bg-matcha-400 transition-all duration-300 ease-out dark:bg-matcha-500"
                    style={{ width: `${uploadPercent}%` }}
                  />
                </div>
              </div>
            )}
            {form.image_url && (
              <img
                src={getImageUrl(form.image_url)}
                alt=""
                className="mt-2 h-24 w-full rounded-lg object-cover"
              />
            )}
          </div>
          <div>
            <label className="mb-1 block text-xs font-medium text-gray-600 dark:text-gray-300">عنوان</label>
            <input
              type="text"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              className="input-field"
            />
          </div>
          <div>
            <label className="mb-1 block text-xs font-medium text-gray-600 dark:text-gray-300">توضیحات</label>
            <textarea
              value={form.caption}
              onChange={(e) => setForm({ ...form, caption: e.target.value })}
              className="input-field"
              rows={2}
            />
          </div>
          <div className="flex justify-end gap-2.5 pt-3">
            <button type="button" onClick={() => setShowModal(false)} className="btn-ghost">
              انصراف
            </button>
            <button type="submit" className="btn-primary" disabled={uploading}>
              {editingImg ? "ذخیره" : "افزودن"}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
