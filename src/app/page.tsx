"use client";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/home/Hero";
import FeaturedMenu from "@/components/home/FeaturedMenu";
import AboutPreview from "@/components/home/AboutPreview";
import GalleryPreview from "@/components/home/GalleryPreview";
import Testimonials from "@/components/home/Testimonials";
import ContactPreview from "@/components/home/ContactPreview";

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <FeaturedMenu />
        <AboutPreview />
        <GalleryPreview />
        <Testimonials />
        <ContactPreview />
      </main>
      <Footer />
    </>
  );
}
