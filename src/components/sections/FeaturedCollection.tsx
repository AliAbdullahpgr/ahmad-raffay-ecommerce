"use client";

import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { api } from "~/trpc/react";
import { ProductCard } from "~/components/ui/ProductCard";
import { ProductCardSkeleton } from "~/components/ui/Skeleton";

export function FeaturedCollection() {
  const { data: products, isLoading } = api.product.getFeatured.useQuery();

  return (
    <section className="section bg-white">
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center mb-12">
          <span className="inline-block text-sm font-medium uppercase tracking-wider text-gold mb-2">
            Curated Selection
          </span>
          <h2 className="section-title">Featured Collection</h2>
          <p className="section-subtitle">
            Discover our most loved pieces, handpicked for their exceptional craftsmanship
          </p>
        </div>

        {/* Products Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {Array.from({ length: 4 }).map((_, i) => (
              <ProductCardSkeleton key={i} />
            ))}
          </div>
        ) : products && products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 stagger-children">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <p className="text-center text-charcoal-500">
            No featured products available at the moment.
          </p>
        )}

        {/* View All Link */}
        <div className="mt-12 text-center">
          <Link
            href="/gallery"
            className="inline-flex items-center gap-2 text-emerald font-semibold transition-all hover:gap-3"
          >
            View All Products
            <ChevronRight className="h-5 w-5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
