"use client";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-cream-50 dark:bg-[#0c0c18]">
      <div className="text-center">
        <p className="text-5xl">⚠️</p>
        <h2 className="mt-4 text-lg font-bold text-gray-900 dark:text-white">
          خطایی رخ داد
        </h2>
        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
          متأسفانه مشکلی پیش آمده است
        </p>
        <button onClick={reset} className="btn-primary mt-6">
          تلاش مجدد
        </button>
      </div>
    </div>
  );
}
