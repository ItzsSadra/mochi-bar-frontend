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
            className="input-field pl-9"
            aria-label="جستجو در منو"
          />
        <svg
          className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </div>

      <div className="flex flex-wrap gap-1.5">
        <button
          onClick={() => onCategoryChange("")}
          className={`rounded-lg px-3.5 py-1.5 text-xs font-medium transition-all duration-200 ${
            selectedCategory === ""
              ? "bg-matcha-400 text-white shadow-sm"
              : "bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-white/5 dark:text-gray-400 dark:hover:bg-white/10"
          }`}
        >
          همه
        </button>
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => onCategoryChange(cat.slug)}
            className={`rounded-lg px-3.5 py-1.5 text-xs font-medium transition-all duration-200 ${
              selectedCategory === cat.slug
                ? "bg-matcha-400 text-white shadow-sm"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-white/5 dark:text-gray-400 dark:hover:bg-white/10"
            }`}
          >
            {cat.icon && <span className="ml-1">{cat.icon}</span>}
            {cat.name}
          </button>
        ))}
      </div>
    </div>
  );
}
