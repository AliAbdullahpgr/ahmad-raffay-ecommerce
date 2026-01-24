"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { Navbar } from "~/components/layout/Navbar";
import { Footer } from "~/components/layout/Footer";
import { Gallery } from "~/components/sections/Gallery";
import { WhatsAppButton } from "~/components/ui/WhatsAppButton";
import { GallerySkeleton } from "~/components/ui/Skeleton";

function GalleryContent() {
  const searchParams = useSearchParams();
  const category = searchParams.get("category") ?? undefined;

  return <Gallery initialCategory={category} showFilters={true} />;
}

export default function GalleryPage() {
  return (
    <>
      <Navbar />
      <main className="pt-16 md:pt-20 min-h-screen">
        <div className="py-8 bg-emerald text-white">
          <div className="container-custom text-center">
            <h1 className="font-serif text-3xl md:text-4xl font-bold mb-2">
              Our Collection
            </h1>
            <p className="text-emerald-200">
              Explore our complete range of hand-embroidered traditional wear
            </p>
          </div>
        </div>
        <Suspense fallback={<div className="container-custom py-12"><GallerySkeleton count={12} /></div>}>
          <GalleryContent />
        </Suspense>
      </main>
      <Footer />
      <WhatsAppButton variant="fixed" />
    </>
  );
}
