import { cn } from "~/lib/utils";

interface SkeletonProps {
  className?: string;
}

export function Skeleton({ className }: SkeletonProps) {
  return (
    <div
      className={cn("animate-pulse rounded bg-charcoal-200", className)}
    />
  );
}

export function ProductCardSkeleton() {
  return (
    <div className="overflow-hidden rounded-xl bg-white shadow-sm border border-cream-300">
      <Skeleton className="aspect-[3/4] w-full rounded-none" />
      <div className="p-4 space-y-3">
        <Skeleton className="h-3 w-16" />
        <Skeleton className="h-5 w-3/4" />
        <Skeleton className="h-6 w-24" />
        <Skeleton className="h-10 w-full" />
      </div>
    </div>
  );
}

export function GallerySkeleton({ count = 8 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <ProductCardSkeleton key={i} />
      ))}
    </div>
  );
}

export function HeroSkeleton() {
  return (
    <div className="relative h-[80vh] min-h-[600px] w-full bg-emerald/10">
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center space-y-6 px-4">
          <Skeleton className="h-12 w-64 mx-auto" />
          <Skeleton className="h-6 w-48 mx-auto" />
          <Skeleton className="h-4 w-80 mx-auto" />
          <div className="flex gap-4 justify-center">
            <Skeleton className="h-12 w-32" />
            <Skeleton className="h-12 w-32" />
          </div>
        </div>
      </div>
    </div>
  );
}

export function SettingsSkeleton() {
  return (
    <div className="space-y-6">
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i} className="space-y-2">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-10 w-full" />
        </div>
      ))}
    </div>
  );
}
