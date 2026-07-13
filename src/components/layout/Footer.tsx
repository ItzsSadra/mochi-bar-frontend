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
    <footer
      className="mobile-body"
      style={{
        background: "var(--surface-solid)",
        borderTop: "0.5px solid var(--border-subtle)",
      }}
    >
      <div className="mx-auto max-w-6xl px-5 py-10 sm:py-16 sm:px-6 lg:px-8">
        {/* ─── Mobile Footer ─── */}
        <div className="sm:hidden">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div
                className="flex h-8 w-8 items-center justify-center rounded-[10px] text-sm text-white"
                style={{ background: "linear-gradient(135deg, #6B8F71, #4a7a52)" }}
              >
                🍡
              </div>
              <div>
                <h3 className="text-[0.8125rem] font-bold" style={{ color: "var(--foreground)" }}>موچی بار</h3>
                <p className="text-[0.625rem]" style={{ color: "var(--muted)" }}>Mochi Café</p>
              </div>
            </div>
            <div className="flex gap-2">
              <a
                href={`https://instagram.com/${instagram.replace("@", "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-xl transition-colors"
                style={{ background: "rgba(0,0,0,0.04)", color: "var(--muted)" }}
              >
                <FaInstagram size={14} />
              </a>
              <a
                href={`tel:${formatPhoneForTel(phone)}`}
                className="flex h-9 w-9 items-center justify-center rounded-xl transition-colors"
                style={{ background: "rgba(0,0,0,0.04)", color: "var(--muted)" }}
              >
                <FaPhone size={14} />
              </a>
            </div>
          </div>

          <div className="mt-5 grid grid-cols-2 gap-3">
            <div>
              <h4 className="text-[0.6875rem] font-semibold" style={{ color: "var(--foreground)", letterSpacing: "0.05em" }}>دسترسی سریع</h4>
              <ul className="mt-3 space-y-2">
                {[
                  { href: "/menu", label: "منو" },
                  { href: "/gallery", label: "گالری" },
                  { href: "/about", label: "درباره ما" },
                  { href: "/contact", label: "تماس" },
                ].map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-[0.75rem] transition-colors" style={{ color: "var(--muted)" }}>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-[0.6875rem] font-semibold" style={{ color: "var(--foreground)", letterSpacing: "0.05em" }}>تماس با ما</h4>
              <ul className="mt-3 space-y-2.5">
                <li className="flex items-start gap-2">
                  <FaMapMarkerAlt className="mt-0.5 shrink-0" size={10} style={{ color: "var(--matcha)" }} />
                  <span className="text-[0.75rem]" style={{ color: "var(--muted)" }}>{address}</span>
                </li>
                <li className="flex items-center gap-2">
                  <FaPhone className="shrink-0" size={10} style={{ color: "var(--matcha)" }} />
                  <span className="text-[0.75rem]" style={{ color: "var(--muted)" }} dir="ltr">{phone}</span>
                </li>
                <li className="flex items-center gap-2">
                  <FaInstagram className="shrink-0" size={10} style={{ color: "var(--matcha)" }} />
                  <span className="text-[0.75rem]" style={{ color: "var(--muted)" }}>{instagram}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* ─── Desktop Footer ─── */}
        <div className="hidden sm:grid grid-cols-2 gap-10 sm:gap-12 md:grid-cols-4">
          <div className="col-span-2">
            <div className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-matcha-400 text-lg text-white">🍡</div>
              <div>
                <h3 className="text-sm font-bold" style={{ color: "var(--foreground)" }}>موچی بار</h3>
                <p className="text-2xs" style={{ color: "var(--muted)" }}>Mochi Café</p>
              </div>
            </div>
            <p className="mt-4 max-w-sm text-sm leading-relaxed" style={{ color: "var(--muted)" }}>
              موچی بار با الهام از هنر و فرهنگ ژاپنی، فضایی آرام و متفاوت
              برای لحظات شما خلق کرده است.
            </p>
            <div className="mt-5 flex gap-2">
              <a href={`https://instagram.com/${instagram.replace("@", "")}`} target="_blank" rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-xl transition-all duration-300"
                style={{ background: "rgba(0,0,0,0.04)", color: "var(--muted)" }}
                onMouseEnter={(e) => { e.currentTarget.style.background = "#6B8F71"; e.currentTarget.style.color = "#fff"; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(0,0,0,0.04)"; e.currentTarget.style.color = "var(--muted)"; }}
              >
                <FaInstagram size={14} />
              </a>
              <a href={`tel:${formatPhoneForTel(phone)}`}
                className="flex h-9 w-9 items-center justify-center rounded-xl transition-all duration-300"
                style={{ background: "rgba(0,0,0,0.04)", color: "var(--muted)" }}
                onMouseEnter={(e) => { e.currentTarget.style.background = "#6B8F71"; e.currentTarget.style.color = "#fff"; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(0,0,0,0.04)"; e.currentTarget.style.color = "var(--muted)"; }}
              >
                <FaPhone size={14} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-xs font-semibold" style={{ color: "var(--foreground)", letterSpacing: "0.05em" }}>دسترسی سریع</h4>
            <ul className="mt-4 space-y-3">
              {[
                { href: "/menu", label: "منو" },
                { href: "/gallery", label: "گالری" },
                { href: "/about", label: "درباره ما" },
                { href: "/contact", label: "تماس" },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm transition-colors" style={{ color: "var(--muted)" }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "#6B8F71")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "var(--muted)")}
                  >{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold" style={{ color: "var(--foreground)", letterSpacing: "0.05em" }}>تماس با ما</h4>
            <ul className="mt-4 space-y-3.5">
              <li className="flex items-start gap-2.5">
                <FaMapMarkerAlt className="mt-0.5 shrink-0 text-matcha-400" size={12} />
                <span className="text-sm" style={{ color: "var(--muted)" }}>{address}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <FaPhone className="shrink-0 text-matcha-400" size={12} />
                <span className="text-sm" style={{ color: "var(--muted)" }} dir="ltr">{phone}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <FaInstagram className="shrink-0 text-matcha-400" size={12} />
                <span className="text-sm" style={{ color: "var(--muted)" }}>{instagram}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 sm:mt-12 pt-5 sm:pt-6 text-center text-[0.6875rem] sm:text-xs"
          style={{ borderTop: "0.5px solid var(--border-subtle)", color: "var(--muted)" }}
        >
          {footerText}
        </div>
      </div>
    </footer>
  );
}
