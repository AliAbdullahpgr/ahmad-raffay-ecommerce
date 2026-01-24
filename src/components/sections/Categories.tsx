"use client";

import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { api } from "~/trpc/react";
import { Skeleton } from "~/components/ui/Skeleton";

export function Categories() {
  const { data: categories, isLoading } = api.category.getAll.useQuery();

  if (isLoading) {
    return (
      <section className="section bg-cream">
        <div className="container-custom">
          <div className="text-center mb-12">
            <Skeleton className="h-4 w-24 mx-auto mb-2" />
            <Skeleton className="h-10 w-64 mx-auto mb-4" />
            <Skeleton className="h-6 w-96 mx-auto" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Skeleton className="aspect-[4/3] rounded-2xl" />
            <Skeleton className="aspect-[4/3] rounded-2xl" />
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="section bg-cream">
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center mb-12">
          <span className="inline-block text-sm font-medium uppercase tracking-wider text-gold mb-2">
            Browse By
          </span>
          <h2 className="section-title">Our Categories</h2>
          <p className="section-subtitle">
            Explore our collection of hand-embroidered traditional wear
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {categories?.map((category) => (
            <Link
              key={category.id}
              href={`/gallery?category=${category.slug}`}
              className="group relative aspect-[4/3] overflow-hidden rounded-2xl bg-emerald shadow-lg"
            >
              {/* Background Image */}
              {category.image && (
                <Image
                  src={category.image}
                  alt={category.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
              )}

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-charcoal/40 to-transparent transition-all duration-300 group-hover:from-charcoal/90" />

              {/* Content */}
              <div className="absolute inset-0 flex flex-col items-center justify-end p-8 text-center">
                <h3 className="font-serif text-3xl md:text-4xl font-bold text-white mb-2">
                  {category.name}
                </h3>
                <p className="text-cream-200 mb-4">
                  {category._count.products} Products Available
                </p>
                <div className="flex items-center gap-2 text-gold font-semibold transition-all group-hover:gap-3">
                  Shop {category.name}
                  <ChevronRight className="h-5 w-5" />
                </div>
              </div>

              {/* Decorative Border */}
              <div className="absolute inset-4 border-2 border-white/20 rounded-xl pointer-events-none transition-all duration-300 group-hover:inset-6 group-hover:border-gold/40" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
