import { HeroSkeleton, GallerySkeleton } from "~/components/ui/Skeleton";

export default function Loading() {
  return (
    <div className="min-h-screen bg-cream">
      <HeroSkeleton />
      <div className="container-custom py-16">
        <GallerySkeleton count={8} />
      </div>
    </div>
  );
}
