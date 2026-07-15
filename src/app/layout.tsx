import type { Metadata } from "next";
import "./globals.css";
import ClientProviders from "@/components/layout/ClientProviders";

export const metadata: Metadata = {
  title: {
    default: "تبارستان | عرضه کننده میوه خشک و نوشیدنی‌های خاص",
    template: "%s | تبارستان",
  },
  description:
    "تبارستان، تامین کننده و توزیع کننده انواع میوه خشک و نوشیدنی‌های خاص با کیفیت بالا. فروش عمده و خرده محصولات به سراسر کشور.",
  keywords: [
    "میوه خشک",
    "نوشیدنی",
    "عمده فروشی",
    "تبارستان",
    "میوه خشک عمده",
    "نوشیدنی خاص",
    "صادرات",
    "توزیع",
  ],
  authors: [{ name: "تبارستان" }],
  creator: "تبارستان",
  metadataBase: new URL("https://tabarestan.ir"),
  openGraph: {
    title: "تبارستان | عرضه کننده میوه خشک و نوشیدنی‌های خاص",
    description:
      "تامین کننده انواع میوه خشک و نوشیدنی‌های خاص با کیفیت بالا",
    type: "website",
    locale: "fa_IR",
    siteName: "تبارستان",
  },
  twitter: {
    card: "summary_large_image",
    title: "تبارستان",
    description:
      "عرضه کننده میوه خشک و نوشیدنی‌های خاص",
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
    "@type": "Organization",
    name: "تبارستان",
    alternateName: "Tabarestan",
    description:
      "عرضه کننده میوه خشک و نوشیدنی‌های خاص",
    url: "https://tabarestan.ir",
    telephone: "+989991581300",
    address: {
      "@type": "PostalAddress",
      streetAddress: "خیابان راه‌آهن، نبش نواب صفوی ۶",
      addressLocality: "نکا",
      addressRegion: "مازندران",
      addressCountry: "IR",
    },
    areaServed: "IR",
    makesOffer: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Product",
          name: "میوه خشک",
          description: "انواع میوه خشک با کیفیت بالا",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Product",
          name: "نوشیدنی خاص",
          description: "انواع نوشیدنی‌های خاص و منحصربفرد",
        },
      },
    ],
  };

  return (
    <html lang="fa" dir="rtl" className="scroll-smooth">
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
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
