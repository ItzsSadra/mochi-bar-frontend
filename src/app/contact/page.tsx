import type { Metadata } from "next";
import ContactPageClient from "@/components/contact/ContactPageClient";

export const metadata: Metadata = {
  title: "تماس با ما | تبارستان",
  description:
    "ارتباط با تبارستان — آدرس، تلفن، اطلاعات تماس. مازندران، شهرستان نکا.",
  openGraph: {
    title: "تماس با تبارستان",
    description: "آدرس، تلفن، اطلاعات تماس",
  },
};

export default function Page() {
  return <ContactPageClient />;
}
