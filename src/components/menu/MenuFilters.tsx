"use client";

import { Category } from "@/types";

interface MenuFiltersProps {
  categories: Category[];
  selectedCategory: string;
  onCategoryChange: (slug: string) => void;
  search: string;
  onSearchChange: (value: string) => void;
}

export default function MenuFilters({
  categories,
  selectedCategory,
  onCategoryChange,
  search,
  onSearchChange,
}: MenuFiltersProps) {
  return (
    <div className="space-y-4">
      <div className="relative max-w-sm">
          <input
            type="text"
            placeholder="جستجو در منو..."
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            className="input-field pl-10"
            aria-label="جستجو در منو"
          />
        <svg
          className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2"
          style={{ color: "var(--muted)" }}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </div>

      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => onCategoryChange("")}
          className="rounded-full px-4 py-2 text-xs font-medium transition-all duration-300"
          style={{
            background: selectedCategory === "" ? "#6B8F71" : "rgba(0,0,0,0.04)",
            color: selectedCategory === "" ? "#fff" : "var(--muted)",
            boxShadow: selectedCategory === "" ? "0 2px 8px rgba(107,143,113,0.25)" : "none",
          }}
        >
          همه
        </button>
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => onCategoryChange(cat.slug)}
            className="rounded-full px-4 py-2 text-xs font-medium transition-all duration-300"
            style={{
              background: selectedCategory === cat.slug ? "#6B8F71" : "rgba(0,0,0,0.04)",
              color: selectedCategory === cat.slug ? "#fff" : "var(--muted)",
              boxShadow: selectedCategory === cat.slug ? "0 2px 8px rgba(107,143,113,0.25)" : "none",
            }}
          >
            {cat.icon && <span className="ml-1">{cat.icon}</span>}
            {cat.name}
          </button>
        ))}
      </div>
    </div>
  );
}
