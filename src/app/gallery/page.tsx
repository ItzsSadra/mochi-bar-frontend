import type { Metadata } from "next";
import GalleryPageClient from "@/components/gallery/GalleryPageClient";

export const metadata: Metadata = {
  title: "گالری | تبارستان",
  description: "گالری تصاویر تبارستان — محصولات با کیفیت و تازه.",
  openGraph: {
    title: "گالری تبارستان",
    description: "تصاویری از محصولات با کیفیت ما",
  },
};

export default function Page() {
  return <GalleryPageClient />;
}
