import type { Metadata } from "next";
import ContactPageClient from "@/components/contact/ContactPageClient";

export const metadata: Metadata = {
  title: "تماس با ما | موچی بار",
  description: "ارتباط با موچی بار — آدرس، تلفن، ساعات کاری و فرم ارتباطی. اصفهان، خیابان سپاه.",
  openGraph: {
    title: "تماس با موچی بار",
    description: "آدرس، تلفن، ساعات کاری و فرم ارتباطی",
  },
};

export default function Page() {
  return <ContactPageClient />;
}
