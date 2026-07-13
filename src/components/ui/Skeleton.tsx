export default function Skeleton({ className = "" }: { className?: string }) {
  return (
    <div
      className={`animate-pulse rounded-xl sm:rounded-2xl ${className}`}
      style={{ background: "rgba(0,0,0,0.04)" }}
      aria-hidden="true"
    />
  );
}

export function MenuCardSkeleton() {
  return (
    <div className="glass-card overflow-hidden">
      <Skeleton className="aspect-[4/3] rounded-none" />
      <div className="p-3 sm:p-4 space-y-2 sm:space-y-2.5">
        <Skeleton className="h-2.5 sm:h-3 w-16 rounded-full" />
        <Skeleton className="h-3 sm:h-4 w-3/4 rounded-full" />
        <Skeleton className="h-2.5 sm:h-3 w-full rounded-full" />
        <div className="flex justify-between pt-0.5 sm:pt-1">
          <Skeleton className="h-3 sm:h-4 w-20 rounded-full" />
          <Skeleton className="h-2.5 sm:h-3 w-12 rounded-full" />
        </div>
      </div>
    </div>
  );
}

export function GallerySkeleton() {
  return (
    <div className="grid grid-cols-2 gap-2.5 sm:gap-3 md:grid-cols-3 lg:gap-4">
      {Array.from({ length: 6 }).map((_, i) => (
        <Skeleton key={i} className="aspect-square rounded-2xl sm:rounded-3xl" />
      ))}
    </div>
  );
}

export function FeaturedSkeleton() {
  return (
    <>
      {/* Mobile: horizontal scroll skeleton */}
      <div className="sm:hidden flex gap-3 overflow-x-auto pb-3 -mx-5 px-5 scrollbar-none">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="flex-shrink-0 glass-card overflow-hidden" style={{ width: "min(72vw, 280px)" }}>
            <Skeleton className="aspect-[4/3] rounded-none" />
            <div className="p-3 space-y-2">
              <Skeleton className="h-2.5 w-16 rounded-full" />
              <Skeleton className="h-3 w-3/4 rounded-full" />
              <Skeleton className="h-2.5 w-14 rounded-full" />
            </div>
          </div>
        ))}
      </div>
      {/* Desktop: grid skeleton */}
      <div className="hidden sm:grid grid-cols-2 gap-5 lg:grid-cols-3">
        {Array.from({ length: 4 }).map((_, i) => (
          <MenuCardSkeleton key={i} />
        ))}
      </div>
    </>
  );
}
