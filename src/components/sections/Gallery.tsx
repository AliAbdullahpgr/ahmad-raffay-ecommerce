"use client";

import { useState } from "react";
import { api } from "~/trpc/react";
import { ProductCard } from "~/components/ui/ProductCard";
import { GallerySkeleton } from "~/components/ui/Skeleton";
import { cn } from "~/lib/utils";

interface GalleryProps {
  initialCategory?: string;
  showFilters?: boolean;
  limit?: number;
}

export function Gallery({
  initialCategory,
  showFilters = true,
  limit,
}: GalleryProps) {
  const [activeCategory, setActiveCategory] = useState<string | undefined>(
    initialCategory
  );

  const { data: categories } = api.category.getAll.useQuery();
  const { data, isLoading } = api.product.getAll.useQuery({
    categorySlug: activeCategory,
    limit: limit ?? 50,
  });

  const filters = [
    { slug: undefined, label: "All" },
    ...(categories?.map((c) => ({ slug: c.slug, label: c.name })) ?? []),
  ];

  return (
    <section className="section bg-cream" id="gallery">
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center mb-8">
          <span className="inline-block text-sm font-medium uppercase tracking-wider text-gold mb-2">
            Explore
          </span>
          <h2 className="section-title">Our Collection</h2>
          <p className="section-subtitle">
            Browse our complete range of hand-embroidered traditional wear
          </p>
        </div>

        {/* Filter Tabs */}
        {showFilters && categories && categories.length > 0 && (
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {filters.map((filter) => (
              <button
                key={filter.slug ?? "all"}
                onClick={() => setActiveCategory(filter.slug)}
                className={cn(
                  "px-5 py-2.5 rounded-full font-medium transition-all duration-200",
                  activeCategory === filter.slug
                    ? "bg-emerald text-white shadow-md"
                    : "bg-white text-charcoal-600 hover:bg-emerald/10 border border-charcoal-200"
                )}
              >
                {filter.label}
              </button>
            ))}
          </div>
        )}

        {/* Products Grid */}
        {isLoading ? (
          <GallerySkeleton count={8} />
        ) : data?.products && data.products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {data.products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-charcoal-500 text-lg">
              No products found in this category.
            </p>
            <button
              onClick={() => setActiveCategory(undefined)}
              className="mt-4 text-emerald font-medium hover:underline"
            >
              View all products
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
