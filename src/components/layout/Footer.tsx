"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { FaInstagram, FaPhone, FaMapMarkerAlt } from "react-icons/fa";
import { api } from "@/lib/api";

function toLtrDigits(str: string): string {
  return str.replace(/[۰-۹]/g, (d) => String("۰۱۲۳۴۵۶۷۸۹".indexOf(d)));
}

function formatPhoneForTel(phone: string): string {
  return toLtrDigits(phone).replace(/[^0-9+]/g, "");
}

export default function Footer() {
  const [footerText, setFooterText] = useState("© ۱۴۰۵ موچی کافه. تمامی حقوق محفوظ است.");
  const [address, setAddress] = useState("اصفهان، خانه اصفهان، خیابان سپاه");
  const [phone, setPhone] = useState("۰۹۱۳۴۰۸۷۱۵۳");
  const [instagram, setInstagram] = useState("@mochibar_isfahan");

  useEffect(() => {
    api.getSettings().then((data) => {
      const contact = data.settings.contact || {};
      const footer = data.settings.footer || {};
      if (contact.address) setAddress(contact.address);
      if (contact.phone) setPhone(contact.phone);
      if (contact.instagram) setInstagram(contact.instagram);
      if (footer.footer_text) setFooterText(footer.footer_text);
    }).catch(() => {});
  }, []);

  return (
    <footer className="border-t border-gray-100 bg-white dark:border-white/5 dark:bg-[#0c0c18]">
      <div className="mx-auto max-w-6xl px-5 py-10 sm:px-6 sm:py-14 lg:px-8">
        <div className="grid grid-cols-2 gap-8 sm:gap-10 md:grid-cols-4">
          <div className="col-span-2">
            <div className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-matcha-400 text-lg text-white">
                🍡
              </div>
              <div>
                <h3 className="text-base font-bold text-gray-900 dark:text-white">
                  موچی بار
                </h3>
                <p className="text-2xs text-gray-400 dark:text-gray-500">
                  Mochi Café
                </p>
              </div>
            </div>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-gray-500 dark:text-gray-400">
              موچی بار با الهام از هنر و فرهنگ ژاپنی، فضایی آرام و متفاوت
              برای لحظات شما خلق کرده است.
            </p>
            <div className="mt-5 flex gap-2">
              <a
                href={`https://instagram.com/${instagram.replace("@", "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-lg bg-gray-50 text-gray-400 transition-all duration-200 hover:bg-matcha-400 hover:text-white dark:bg-white/5 dark:hover:bg-matcha-400"
              >
                <FaInstagram size={15} />
              </a>
              <a
                href={`tel:${formatPhoneForTel(phone)}`}
                className="flex h-9 w-9 items-center justify-center rounded-lg bg-gray-50 text-gray-400 transition-all duration-200 hover:bg-matcha-400 hover:text-white dark:bg-white/5 dark:hover:bg-matcha-400"
              >
                <FaPhone size={15} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-900 dark:text-white">
              دسترسی سریع
            </h4>
            <ul className="mt-3.5 space-y-2.5">
              {[
                { href: "/menu", label: "منو" },
                { href: "/gallery", label: "گالری" },
                { href: "/about", label: "درباره ما" },
                { href: "/contact", label: "تماس" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-500 transition-colors hover:text-matcha-500 dark:text-gray-400 dark:hover:text-matcha-400"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-900 dark:text-white">
              تماس با ما
            </h4>
            <ul className="mt-3.5 space-y-3">
              <li className="flex items-start gap-2.5">
                <FaMapMarkerAlt className="mt-0.5 shrink-0 text-matcha-400" size={13} />
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {address}
                </span>
              </li>
              <li className="flex items-center gap-2.5">
                <FaPhone className="shrink-0 text-matcha-400" size={13} />
                <span className="text-sm text-gray-500 dark:text-gray-400" dir="ltr">
                  {phone}
                </span>
              </li>
              <li className="flex items-center gap-2.5">
                <FaInstagram className="shrink-0 text-matcha-400" size={13} />
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {instagram}
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-gray-100 dark:border-white/5 pt-6 text-center text-xs text-gray-400 dark:text-gray-500">
          {footerText}
        </div>
      </div>
    </footer>
  );
}
