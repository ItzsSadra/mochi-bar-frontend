"use client";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div
      className="flex min-h-screen items-center justify-center px-5"
      style={{ background: "var(--background)" }}
    >
      <div className="text-center">
        <p className="text-5xl">⚠️</p>
        <h2
          className="mt-4 text-lg font-bold"
          style={{ color: "var(--foreground)" }}
        >
          خطایی رخ داد
        </h2>
        <p
          className="mt-2 text-sm"
          style={{ color: "var(--muted)" }}
        >
          متأسفانه مشکلی پیش آمده است
        </p>
        <button onClick={reset} className="btn-primary mt-6">
          تلاش مجدد
        </button>
      </div>
    </div>
  );
}
