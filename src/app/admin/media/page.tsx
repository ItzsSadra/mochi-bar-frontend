"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { api, getImageUrl } from "@/lib/api";
import { Media } from "@/types";
import { HiOutlineTrash, HiOutlineMagnifyingGlass } from "react-icons/hi2";

export default function AdminMediaPage() {
  const [media, setMedia] = useState<Media[]>([]);
  const [folders, setFolders] = useState<string[]>([]);
  const [selectedFolder, setSelectedFolder] = useState("");
  const [search, setSearch] = useState("");
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState({ current: 0, total: 0, percent: 0 });
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const t = setTimeout(() => setDebouncedSearch(search), 300);
    return () => clearTimeout(t);
  }, [search]);

  const loadData = async () => {
    try {
      setLoading(true);
      const [mediaData, folderData] = await Promise.all([
        api.getMedia({ folder: selectedFolder || undefined, search: debouncedSearch || undefined }),
        api.getMediaFolders(),
      ]);
      setMedia(mediaData.media);
      setFolders(folderData.folders);
    } catch {
      setError("بارگذاری رسانه‌ها با خطا مواجه شد");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [selectedFolder, debouncedSearch]);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const fileList = Array.from(files);
    setUploading(true);
    setUploadError(null);
    setUploadProgress({ current: 0, total: fileList.length, percent: 0 });
    try {
      if (fileList.length === 1) {
        await api.uploadFileWithProgress(fileList[0], selectedFolder || "default", (p) =>
          setUploadProgress({ current: 1, total: 1, percent: p })
        );
      } else {
        await api.uploadMultipleFilesWithProgress(fileList, selectedFolder || "default", (cur, total, p) =>
          setUploadProgress({ current: cur, total, percent: p })
        );
      }
      await loadData();
    } catch (err) {
      setUploadError(err instanceof Error ? err.message : "خطا در آپلود فایل");
    } finally {
      setUploading(false);
      setUploadProgress({ current: 0, total: 0, percent: 0 });
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const handleDelete = async (id: number) => {
    if (confirm("آیا از حذف این فایل اطمینان دارید؟")) {
      try {
        await api.deleteMedia(id);
        loadData();
      } catch {
        setError("حذف فایل با خطا مواجه شد");
      }
    }
  };

  const formatSize = (bytes: number | null) => {
    if (!bytes) return "";
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
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
            کتابخانه رسانه
          </h1>
          <p className="mt-0.5 text-xs text-gray-400 dark:text-gray-500">
            مدیریت فایل‌های رسانه
          </p>
        </div>
        <label className="btn-primary cursor-pointer">
          آپلود فایل
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept="image/*"
            onChange={handleUpload}
            className="hidden"
          />
        </label>
      </div>

      <div className="mt-5 flex flex-wrap items-center gap-3">
        <div className="relative flex-1 md:w-56">
          <input
            type="text"
            placeholder="جستجو..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="input-field pl-8"
            aria-label="جستجوی رسانه"
          />
          <HiOutlineMagnifyingGlass className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
        </div>
        <div className="flex flex-wrap gap-1.5">
          <button
            onClick={() => setSelectedFolder("")}
            className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-all ${
              selectedFolder === ""
                ? "bg-matcha-400 text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-white/5 dark:text-gray-400 dark:hover:bg-white/10"
            }`}
          >
            همه
          </button>
          {folders.map((folder) => (
            <button
              key={folder}
              onClick={() => setSelectedFolder(folder)}
              className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-all ${
                selectedFolder === folder
                  ? "bg-matcha-400 text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-white/5 dark:text-gray-400 dark:hover:bg-white/10"
              }`}
            >
              {folder}
            </button>
          ))}
        </div>
      </div>

      {uploadError && (
        <div className="mt-3 rounded-lg bg-red-50 p-2.5 text-center text-xs text-red-500 dark:bg-red-900/20 dark:text-red-400">
          {uploadError}
        </div>
      )}

      {uploading && (
        <div className="mt-3 rounded-lg bg-matcha-50 p-3 dark:bg-matcha-900/20">
          <div className="mb-1.5 flex items-center justify-between text-xs">
            <span className="text-matcha-600 dark:text-matcha-400">
              {uploadProgress.total > 1
                ? `آپلود فایل ${uploadProgress.current} از ${uploadProgress.total}`
                : "در حال آپلود فایل..."}
            </span>
            <span className="font-medium text-matcha-600 dark:text-matcha-400">
              {uploadProgress.percent}%
            </span>
          </div>
          <div className="h-1.5 w-full overflow-hidden rounded-full bg-matcha-200/50 dark:bg-matcha-800/30">
            <div
              className="h-full rounded-full bg-matcha-400 transition-all duration-300 ease-out dark:bg-matcha-500"
              style={{
                width: uploadProgress.total > 1
                  ? `${((uploadProgress.current - 1 + uploadProgress.percent / 100) / uploadProgress.total) * 100}%`
                  : `${uploadProgress.percent}%`,
              }}
            />
          </div>
        </div>
      )}

      <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
        {media.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.02 }}
            className="group relative overflow-hidden rounded-xl bg-gray-100 dark:bg-white/[0.02]"
          >
            <img
              src={getImageUrl(item.file_path)}
              alt={item.alt_text || item.original_name}
              className="aspect-square w-full object-cover"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 transition-opacity group-hover:opacity-100">
              <button
                onClick={() => handleDelete(item.id)}
                className="rounded-lg bg-red-500/80 p-1.5 text-white transition-colors hover:bg-red-500"
              >
                <HiOutlineTrash size={16} />
              </button>
            </div>
            <div className="p-1.5">
              <p className="truncate text-2xs text-gray-500 dark:text-gray-400">
                {item.original_name}
              </p>
              <p className="text-2xs text-gray-400">{formatSize(item.file_size)}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {media.length === 0 && (
        <div className="py-16 text-center">
          <p className="text-4xl">📁</p>
          <p className="mt-3 text-xs text-gray-400">فایلی یافت نشد</p>
        </div>
      )}
    </div>
  );
}
