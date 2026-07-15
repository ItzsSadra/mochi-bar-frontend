"use client";

import Link from "next/link";
import { FaInstagram, FaPhone, FaMapMarkerAlt } from "react-icons/fa";

export default function Footer() {
  const phone = "۰۹۹۹۱۵۸۱۳۰۰";
  const address =
    "مازندران، شهرستان نکا، خیابان راه‌آهن، نبش نواب صفوی ۶";
  const instagram = "@tabarestan";

  function formatPhoneForTel(p: string): string {
    return p
      .replace(/[۰-۹]/g, (d) => String("۰۱۲۳۴۵۶۷۸۹".indexOf(d)))
      .replace(/[^0-9+]/g, "");
  }

  return (
    <footer
      style={{
        background: "rgba(7, 11, 20, 0.6)",
        borderTop: "1px solid rgba(255,255,255,0.05)",
      }}
    >
      <div className="mx-auto max-w-6xl px-5 py-10 sm:py-16 sm:px-6 lg:px-8">
        {/* ─── Mobile Footer ─── */}
        <div className="sm:hidden">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div
                className="flex h-8 w-8 items-center justify-center rounded-[10px] text-xs font-bold text-white"
                style={{
                  background: "linear-gradient(135deg, #1E3A8A, #2563EB)",
                }}
              >
                T
              </div>
              <div>
                <h3
                  className="text-[0.8125rem] font-bold"
                  style={{ color: "var(--foreground)" }}
                >
                  تبارستان
                </h3>
                <p
                  className="text-[0.625rem]"
                  style={{ color: "var(--muted)" }}
                >
                  Tabarestan
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              <a
                href={`https://instagram.com/${instagram.replace("@", "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-xl transition-all duration-300"
                style={{
                  background: "rgba(255,255,255,0.05)",
                  color: "var(--muted)",
                  border: "1px solid rgba(255,255,255,0.05)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "rgba(59,130,246,0.1)";
                  e.currentTarget.style.color = "#60A5FA";
                  e.currentTarget.style.borderColor = "rgba(59,130,246,0.15)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "rgba(255,255,255,0.05)";
                  e.currentTarget.style.color = "var(--muted)";
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.05)";
                }}
              >
                <FaInstagram size={14} />
              </a>
              <a
                href={`tel:${formatPhoneForTel(phone)}`}
                className="flex h-9 w-9 items-center justify-center rounded-xl transition-all duration-300"
                style={{
                  background: "rgba(255,255,255,0.05)",
                  color: "var(--muted)",
                  border: "1px solid rgba(255,255,255,0.05)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "rgba(59,130,246,0.1)";
                  e.currentTarget.style.color = "#60A5FA";
                  e.currentTarget.style.borderColor = "rgba(59,130,246,0.15)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "rgba(255,255,255,0.05)";
                  e.currentTarget.style.color = "var(--muted)";
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.05)";
                }}
              >
                <FaPhone size={14} />
              </a>
            </div>
          </div>

          <div className="mt-5 grid grid-cols-2 gap-3">
            <div>
              <h4
                className="text-[0.6875rem] font-semibold"
                style={{
                  color: "var(--foreground)",
                  letterSpacing: "0.05em",
                }}
              >
                دسترسی سریع
              </h4>
              <ul className="mt-3 space-y-2">
                {[
                  { href: "/products", label: "محصولات" },
                  { href: "/about", label: "درباره ما" },
                  { href: "/contact", label: "تماس" },
                ].map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-[0.75rem] transition-colors duration-300"
                      style={{ color: "var(--muted)" }}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.color = "#60A5FA")
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.color = "var(--muted)")
                      }
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4
                className="text-[0.6875rem] font-semibold"
                style={{
                  color: "var(--foreground)",
                  letterSpacing: "0.05em",
                }}
              >
                تماس با ما
              </h4>
              <ul className="mt-3 space-y-2.5">
                <li className="flex items-start gap-2">
                  <FaMapMarkerAlt
                    className="mt-0.5 shrink-0"
                    size={10}
                    style={{ color: "#60A5FA" }}
                  />
                  <span
                    className="text-[0.75rem]"
                    style={{ color: "var(--muted)" }}
                  >
                    {address}
                  </span>
                </li>
                <li className="flex items-center gap-2">
                  <FaPhone
                    className="shrink-0"
                    size={10}
                    style={{ color: "#60A5FA" }}
                  />
                  <span
                    className="text-[0.75rem]"
                    style={{ color: "var(--muted)" }}
                    dir="ltr"
                  >
                    {phone}
                  </span>
                </li>
                <li className="flex items-center gap-2">
                  <FaInstagram
                    className="shrink-0"
                    size={10}
                    style={{ color: "#60A5FA" }}
                  />
                  <span
                    className="text-[0.75rem]"
                    style={{ color: "var(--muted)" }}
                  >
                    {instagram}
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* ─── Desktop Footer ─── */}
        <div className="hidden sm:grid grid-cols-2 gap-10 sm:gap-12 md:grid-cols-4">
          <div className="col-span-2">
            <div className="flex items-center gap-2.5">
              <div
                className="flex h-9 w-9 items-center justify-center rounded-xl text-sm font-bold text-white"
                style={{
                  background: "linear-gradient(135deg, #1E3A8A, #2563EB)",
                  boxShadow: "0 4px 12px rgba(30,58,138,0.3)",
                }}
              >
                T
              </div>
              <div>
                <h3
                  className="text-sm font-bold"
                  style={{ color: "var(--foreground)" }}
                >
                  تبارستان
                </h3>
                <p className="text-2xs" style={{ color: "var(--muted)" }}>
                  Tabarestan
                </p>
              </div>
            </div>
            <p
              className="mt-4 max-w-sm text-sm leading-relaxed"
              style={{ color: "var(--muted)" }}
            >
              تبارستان، تامین کننده و توزیع کننده انواع میوه خشک و
              نوشیدنی‌های خاص با کیفیت بالا به سراسر کشور.
            </p>
            <div className="mt-5 flex gap-2">
              <a
                href={`https://instagram.com/${instagram.replace("@", "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-xl transition-all duration-300"
                style={{
                  background: "rgba(255,255,255,0.05)",
                  color: "var(--muted)",
                  border: "1px solid rgba(255,255,255,0.05)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "rgba(59,130,246,0.1)";
                  e.currentTarget.style.color = "#60A5FA";
                  e.currentTarget.style.borderColor = "rgba(59,130,246,0.15)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "rgba(255,255,255,0.05)";
                  e.currentTarget.style.color = "var(--muted)";
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.05)";
                }}
              >
                <FaInstagram size={14} />
              </a>
              <a
                href={`tel:${formatPhoneForTel(phone)}`}
                className="flex h-9 w-9 items-center justify-center rounded-xl transition-all duration-300"
                style={{
                  background: "rgba(255,255,255,0.05)",
                  color: "var(--muted)",
                  border: "1px solid rgba(255,255,255,0.05)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "rgba(59,130,246,0.1)";
                  e.currentTarget.style.color = "#60A5FA";
                  e.currentTarget.style.borderColor = "rgba(59,130,246,0.15)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "rgba(255,255,255,0.05)";
                  e.currentTarget.style.color = "var(--muted)";
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.05)";
                }}
              >
                <FaPhone size={14} />
              </a>
            </div>
          </div>

          <div>
            <h4
              className="text-xs font-semibold"
              style={{
                color: "var(--foreground)",
                letterSpacing: "0.05em",
              }}
            >
              دسترسی سریع
            </h4>
            <ul className="mt-4 space-y-3">
              {[
                { href: "/products", label: "محصولات" },
                { href: "/about", label: "درباره ما" },
                { href: "/contact", label: "تماس" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm transition-colors duration-300"
                    style={{ color: "var(--muted)" }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.color = "#60A5FA")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.color = "var(--muted)")
                    }
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4
              className="text-xs font-semibold"
              style={{
                color: "var(--foreground)",
                letterSpacing: "0.05em",
              }}
            >
              تماس با ما
            </h4>
            <ul className="mt-4 space-y-3.5">
              <li className="flex items-start gap-2.5">
                <FaMapMarkerAlt
                  className="mt-0.5 shrink-0"
                  size={12}
                  style={{ color: "#60A5FA" }}
                />
                <span
                  className="text-sm"
                  style={{ color: "var(--muted)" }}
                >
                  {address}
                </span>
              </li>
              <li className="flex items-center gap-2.5">
                <FaPhone
                  className="shrink-0"
                  size={12}
                  style={{ color: "#60A5FA" }}
                />
                <span
                  className="text-sm"
                  style={{ color: "var(--muted)" }}
                  dir="ltr"
                >
                  {phone}
                </span>
              </li>
              <li className="flex items-center gap-2.5">
                <FaInstagram
                  className="shrink-0"
                  size={12}
                  style={{ color: "#60A5FA" }}
                />
                <span
                  className="text-sm"
                  style={{ color: "var(--muted)" }}
                >
                  {instagram}
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div
          className="mt-8 sm:mt-12 pt-5 sm:pt-6 text-center text-[0.6875rem] sm:text-xs"
          style={{
            borderTop: "1px solid rgba(255,255,255,0.05)",
            color: "var(--muted)",
          }}
        >
          © ۱۴۰۵ شرکت توزیع و صادرات تبارستان. تمامی حقوق محفوظ است.
        </div>
      </div>
    </footer>
  );
}
