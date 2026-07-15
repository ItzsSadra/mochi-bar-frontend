import type { Metadata } from "next";
import HomePageClient from "@/components/home/HomePageClient";

export const metadata: Metadata = {
  title: "خانه | تبارستان",
  description:
    "تبارستان، عرضه کننده میوه خشک و نوشیدنی‌های خاص. فروش عمده و خرده محصولات با کیفیت بالا به سراسر کشور.",
  openGraph: {
    title: "تبارستان | Tabarestan",
    description: "عرضه کننده میوه خشک و نوشیدنی‌های خاص",
    type: "website",
  },
};

export default function Page() {
  return <HomePageClient />;
}
