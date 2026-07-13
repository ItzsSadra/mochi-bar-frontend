import type { Metadata } from "next";
import AboutPageClient from "@/components/about/AboutPageClient";

export const metadata: Metadata = {
  title: "درباره ما | موچی بار",
  description: "داستان موچی بار — الهام از هنر و فرهنگ ژاپنی، موچی‌های دست‌ساز با بهترین مواد اولیه در اصفهان.",
  openGraph: {
    title: "درباره موچی بار",
    description: "داستان ما و فلسفه‌مان در تهیه بهترین موچی و نوشیدنی‌های ژاپنی",
  },
};

export default function Page() {
  return <AboutPageClient />;
}
