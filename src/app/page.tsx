import type { Metadata } from "next";
import HomePageClient from "@/components/home/HomePageClient";

export const metadata: Metadata = {
  title: "خانه | موچی بار",
  description: "موچی بار، کافه تخصصی موچی و نوشیدنی‌های ژاپنی در اصفهان. موچی‌های دست‌ساز، لاته ماچا، و دسرهای اصیل ژاپنی.",
  openGraph: {
    title: "موچی بار | Mochi Café",
    description: "کافه تخصصی موچی و نوشیدنی‌های ژاپنی در اصفهان",
    type: "website",
  },
};

export default function Page() {
  return <HomePageClient />;
}
