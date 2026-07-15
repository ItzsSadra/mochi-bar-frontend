import type { Metadata } from "next";
import AboutPageClient from "@/components/about/AboutPageClient";

export const metadata: Metadata = {
  title: "درباره ما | تبارستان",
  description:
    "داستان تبارستان — تامین کننده انواع میوه خشک و نوشیدنی‌های خاص با کیفیت بالا.",
  openGraph: {
    title: "درباره تبارستان",
    description: "تامین کننده انواع میوه خشک و نوشیدنی‌های خاص",
  },
};

export default function Page() {
  return <AboutPageClient />;
}
