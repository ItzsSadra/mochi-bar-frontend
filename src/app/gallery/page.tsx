import type { Metadata } from "next";
import GalleryPageClient from "@/components/gallery/GalleryPageClient";

export const metadata: Metadata = {
  title: "گالری | موچی بار",
  description: "گالری تصاویر موچی بار — فضای دنج کافه، موچی‌های دست‌ساز و لحظات زیبا.",
  openGraph: {
    title: "گالری موچی بار",
    description: "تصاویری از فضای دنج و محصولات خاص ما",
  },
};

export default function Page() {
  return <GalleryPageClient />;
}
