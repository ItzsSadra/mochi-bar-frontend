import Link from "next/link";

export default function NotFound() {
  return (
    <div
      className="flex min-h-screen items-center justify-center"
      style={{ background: "var(--background)" }}
    >
      <div className="text-center">
        <p
          className="text-6xl font-bold sm:text-7xl"
          style={{ color: "var(--highlight)" }}
        >
          ۴۰۴
        </p>
        <h2
          className="mt-4 text-lg font-bold"
          style={{ color: "var(--foreground)" }}
        >
          صفحه یافت نشد
        </h2>
        <p
          className="mt-2 text-sm"
          style={{ color: "var(--muted)" }}
        >
          صفحه‌ای که دنبال آن هستید وجود ندارد
        </p>
        <Link href="/" className="btn-primary mt-6 inline-flex">
          بازگشت به خانه
        </Link>
      </div>
    </div>
  );
}
