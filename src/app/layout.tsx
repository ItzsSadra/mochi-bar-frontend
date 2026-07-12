import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "موچی بار | Mochi Bar",
  description: "تجربه‌ای متفاوت از طعم و هنر — موچی های دست ساز با کیفیت فوق‌العاده",
  keywords: ["موچی", "کافه", "قهوه", "ماچا", "دسر", "بستنی", "نوشیدنی", "اصفهان"],
  openGraph: {
    title: "موچی بار",
    description: "تجربه‌ای متفاوت از طعم و هنر",
    type: "website",
    locale: "fa_IR",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fa" dir="rtl" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Vazirmatn:wght@100;200;300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-vazir bg-cream-50 text-gray-800 antialiased dark:bg-[#0c0c18] dark:text-gray-100">
        {children}
      </body>
    </html>
  );
}
