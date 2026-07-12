import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-cream-50 dark:bg-[#0c0c18]">
      <div className="text-center">
        <p className="text-7xl font-bold text-matcha-400">۴۰۴</p>
        <h2 className="mt-4 text-lg font-bold text-gray-900 dark:text-white">
          صفحه یافت نشد
        </h2>
        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
          صفحه‌ای که دنبال آن هستید وجود ندارد
        </p>
        <Link href="/" className="btn-primary mt-6 inline-flex">
          بازگشت به خانه
        </Link>
      </div>
    </div>
  );
}
