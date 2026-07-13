export default function Skeleton({ className = "" }: { className?: string }) {
  return (
    <div
      className={`animate-pulse rounded-2xl ${className}`}
      style={{ background: "rgba(0,0,0,0.04)" }}
      aria-hidden="true"
    />
  );
}

export function MenuCardSkeleton() {
  return (
    <div className="glass-card overflow-hidden">
      <Skeleton className="aspect-[4/3] rounded-none" />
      <div className="p-4 space-y-2.5">
        <Skeleton className="h-3 w-16 rounded-full" />
        <Skeleton className="h-4 w-3/4 rounded-full" />
        <Skeleton className="h-3 w-full rounded-full" />
        <div className="flex justify-between pt-1">
          <Skeleton className="h-4 w-20 rounded-full" />
          <Skeleton className="h-3 w-12 rounded-full" />
        </div>
      </div>
    </div>
  );
}

export function GallerySkeleton() {
  return (
    <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:gap-4">
      {Array.from({ length: 6 }).map((_, i) => (
        <Skeleton key={i} className="aspect-square rounded-2xl" />
      ))}
    </div>
  );
}

export function FeaturedSkeleton() {
  return (
    <>
      {Array.from({ length: 4 }).map((_, i) => (
        <MenuCardSkeleton key={i} />
      ))}
    </>
  );
}
