import type { Metadata } from "next";
import "./globals.css";
import ClientProviders from "@/components/layout/ClientProviders";

export const metadata: Metadata = {
  title: {
    default: "موچی بار | Mochi Café — کافه موچی در اصفهان",
    template: "%s | موچی بار",
  },
  description: "موچی بار، کافه تخصصی موچی و نوشیدنی‌های ژاپنی در اصفهان. موچی‌های دست‌ساز، لاته ماچا، و دسرهای اصیل ژاپنی با بهترین مواد اولیه.",
  keywords: ["موچی", "کافه", "قهوه", "ماچا", "دسر", "بستنی", "نوشیدنی", "اصفهان", "mochi", "cafe", "matcha", " japanese dessert"],
  authors: [{ name: "موچی بار" }],
  creator: "موچی بار",
  metadataBase: new URL("https://mochi-bar.vercel.app"),
  openGraph: {
    title: "موچی بار | Mochi Café",
    description: "کافه تخصصی موچی و نوشیدنی‌های ژاپنی در اصفهان",
    type: "website",
    locale: "fa_IR",
    siteName: "موچی بار",
  },
  twitter: {
    card: "summary_large_image",
    title: "موچی بار | Mochi Café",
    description: "کافه تخصصی موچی و نوشیدنی‌های ژاپنی در اصفهان",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CafeOrCoffeeShop",
    name: "موچی بار",
    alternateName: "Mochi Café",
    description: "کافه تخصصی موچی و نوشیدنی‌های ژاپنی در اصفهان",
    url: "https://mochi-bar.vercel.app",
    telephone: "+989134087153",
    address: {
      "@type": "PostalAddress",
      addressLocality: "اصفهان",
      addressCountry: "IR",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 32.707034,
      longitude: 51.642308,
    },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      opens: "16:00",
      closes: "23:00",
    },
    servesCuisine: ["Dessert", "Coffee", "Japanese"],
    priceRange: "$$",
  };

  return (
    <html lang="fa" dir="rtl" className="scroll-smooth">
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Vazirmatn:wght@100;200;300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="font-vazir antialiased">
        <ClientProviders>{children}</ClientProviders>
      </body>
    </html>
  );
}
