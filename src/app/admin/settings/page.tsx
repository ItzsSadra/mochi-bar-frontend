"use client";

import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { api } from "@/lib/api";

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState<Record<string, string>>({});
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    api.getSettings()
      .then((data) => {
        const flat: Record<string, string> = {};
        Object.values(data.settings).forEach((group) => {
          Object.entries(group).forEach(([key, value]) => {
            flat[key] = value;
          });
        });
        setSettings(flat);
      })
      .catch(() => setError("بارگذاری تنظیمات با خطا مواجه شد"))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const handleChange = (key: string, value: string) => {
    setSettings({ ...settings, [key]: value });
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await api.updateSettings(settings);
      setSaved(true);
      timeoutRef.current = setTimeout(() => setSaved(false), 3000);
    } catch {
      setError("ذخیره تنظیمات با خطا مواجه شد");
    } finally {
      setSaving(false);
    }
  };

  const sections = [
    {
      title: "عمومی",
      fields: [
        { key: "cafe_name", label: "نام کافه", type: "text" },
        { key: "cafe_slogan", label: "شعار کافه", type: "text" },
      ],
    },
    {
      title: "هیرو",
      fields: [
        { key: "hero_text", label: "متن اصلی هیرو", type: "text" },
        { key: "hero_subtext", label: "متن فرعی هیرو", type: "text" },
      ],
    },
    {
      title: "تماس",
      fields: [
        { key: "address", label: "آدرس", type: "text" },
        { key: "phone", label: "تلفن", type: "text" },
        { key: "instagram", label: "اینستاگرام", type: "text" },
        { key: "working_hours", label: "ساعات کاری", type: "text" },
      ],
    },
    {
      title: "درباره",
      fields: [
        { key: "about_text", label: "متن درباره ما", type: "textarea" },
      ],
    },
    {
      title: "فوتر",
      fields: [
        { key: "footer_text", label: "متن فوتر", type: "text" },
      ],
    },
    {
      title: "ظاهر",
      fields: [
        { key: "primary_color", label: "رنگ اصلی", type: "color" },
        { key: "accent_color", label: "رنگ لهجه", type: "color" },
      ],
    },
  ];

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
        <button onClick={() => window.location.reload()} className="btn-secondary mt-4">
          تلاش مجدد
        </button>
      </div>
    );
  }

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-lg font-bold text-gray-900 dark:text-white">
            تنظیمات سایت
          </h1>
          <p className="mt-0.5 text-xs text-gray-400 dark:text-gray-500">
            ویرایش اطلاعات و تنظیمات سایت
          </p>
        </div>
        <button onClick={handleSave} disabled={saving} className="btn-primary">
          {saving ? "در حال ذخیره..." : saved ? "✓ ذخیره شد" : "ذخیره تغییرات"}
        </button>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
        {sections.map((section, sIndex) => (
          <motion.div
            key={section.title}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: sIndex * 0.06 }}
            className="rounded-2xl border border-gray-100 bg-white p-5 dark:border-white/5 dark:bg-white/[0.02]"
          >
            <h3 className="mb-4 text-sm font-semibold text-gray-900 dark:text-white">
              {section.title}
            </h3>
            <div className="space-y-3">
              {section.fields.map((field) => (
                <div key={field.key}>
                  <label className="mb-1 block text-xs font-medium text-gray-600 dark:text-gray-300">
                    {field.label}
                  </label>
                  {field.type === "textarea" ? (
                    <textarea
                      value={settings[field.key] || ""}
                      onChange={(e) => handleChange(field.key, e.target.value)}
                      className="input-field"
                      rows={4}
                    />
                  ) : field.type === "color" ? (
                    <div className="flex items-center gap-3">
                      <input
                        type="color"
                        value={settings[field.key] || "#6B8F71"}
                        onChange={(e) => handleChange(field.key, e.target.value)}
                        className="h-9 w-9 shrink-0 cursor-pointer rounded-lg border-0"
                      />
                      <input
                        type="text"
                        value={settings[field.key] || ""}
                        onChange={(e) => handleChange(field.key, e.target.value)}
                        className="input-field flex-1"
                      />
                    </div>
                  ) : (
                    <input
                      type="text"
                      value={settings[field.key] || ""}
                      onChange={(e) => handleChange(field.key, e.target.value)}
                      className="input-field"
                    />
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
