"use client";

import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronLeft, ChevronRight, MessageCircle, Star } from "lucide-react";
import { useState } from "react";
import { api } from "~/trpc/react";
import { Navbar } from "~/components/layout/Navbar";
import { Footer } from "~/components/layout/Footer";
import { WhatsAppButton } from "~/components/ui/WhatsAppButton";
import { Button } from "~/components/ui/Button";
import { ProductCard } from "~/components/ui/ProductCard";
import { Skeleton, ProductCardSkeleton } from "~/components/ui/Skeleton";
import { formatPrice, getWhatsAppLink, cn } from "~/lib/utils";
import { CONTACT } from "~/lib/constants";

export default function ProductPage({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = params;
  const [selectedImage, setSelectedImage] = useState(0);

  const { data: product, isLoading } = api.product.getById.useQuery({ slug });
  const { data: relatedProducts, isLoading: loadingRelated } = api.product.getByCategory.useQuery(
    { slug: product?.category.slug ?? "" },
    { enabled: !!product?.category.slug }
  );

  if (isLoading) {
    return (
      <>
        <Navbar />
        <main className="pt-16 md:pt-20 min-h-screen bg-cream">
          <div className="container-custom py-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <Skeleton className="aspect-square rounded-2xl" />
              <div className="space-y-4">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-10 w-3/4" />
                <Skeleton className="h-8 w-32" />
                <Skeleton className="h-24 w-full" />
                <Skeleton className="h-12 w-48" />
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  if (!product) {
    notFound();
  }

  const images = product.images.length > 0
    ? product.images
    : [{ id: "placeholder", url: `https://placehold.co/600x800/1B4D3E/FDF8F3?text=${encodeURIComponent(product.name)}`, alt: product.name }];

  const whatsappLink = getWhatsAppLink(CONTACT.whatsapp, product.name);

  // Filter out current product from related
  const filteredRelated = relatedProducts?.filter((p) => p.id !== product.id).slice(0, 4);

  return (
    <>
      <Navbar />
      <main className="pt-16 md:pt-20 min-h-screen bg-cream">
        {/* Breadcrumb */}
        <div className="bg-white border-b border-cream-300">
          <div className="container-custom py-4">
            <nav className="flex items-center gap-2 text-sm">
              <Link href="/" className="text-charcoal-500 hover:text-emerald">
                Home
              </Link>
              <ChevronRight className="h-4 w-4 text-charcoal-300" />
              <Link href="/gallery" className="text-charcoal-500 hover:text-emerald">
                Gallery
              </Link>
              <ChevronRight className="h-4 w-4 text-charcoal-300" />
              <Link href={`/gallery?category=${product.category.slug}`} className="text-charcoal-500 hover:text-emerald">
                {product.category.name}
              </Link>
              <ChevronRight className="h-4 w-4 text-charcoal-300" />
              <span className="text-emerald font-medium">{product.name}</span>
            </nav>
          </div>
        </div>

        {/* Product Details */}
        <div className="container-custom py-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Image Gallery */}
            <div className="space-y-4">
              {/* Main Image */}
              <div className="relative aspect-[3/4] overflow-hidden rounded-2xl bg-white shadow-lg">
                <Image
                  src={images[selectedImage]?.url ?? ""}
                  alt={images[selectedImage]?.alt ?? product.name}
                  fill
                  className="object-cover"
                  priority
                />
                
                {/* Navigation Arrows */}
                {images.length > 1 && (
                  <>
                    <button
                      onClick={() => setSelectedImage((prev) => (prev === 0 ? images.length - 1 : prev - 1))}
                      className="absolute left-4 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-white/80 text-charcoal shadow-lg transition-all hover:bg-white"
                    >
                      <ChevronLeft className="h-6 w-6" />
                    </button>
                    <button
                      onClick={() => setSelectedImage((prev) => (prev === images.length - 1 ? 0 : prev + 1))}
                      className="absolute right-4 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-white/80 text-charcoal shadow-lg transition-all hover:bg-white"
                    >
                      <ChevronRight className="h-6 w-6" />
                    </button>
                  </>
                )}

                {/* Featured Badge */}
                {product.featured && (
                  <div className="absolute left-4 top-4 rounded-full bg-gold px-4 py-1 text-sm font-semibold text-charcoal">
                    Featured
                  </div>
                )}

                {/* Out of Stock Overlay */}
                {!product.inStock && (
                  <div className="absolute inset-0 flex items-center justify-center bg-charcoal/60">
                    <span className="rounded-full bg-terracotta px-6 py-3 text-lg font-semibold text-white">
                      Out of Stock
                    </span>
                  </div>
                )}
              </div>

              {/* Thumbnails */}
              {images.length > 1 && (
                <div className="flex gap-3 overflow-x-auto pb-2">
                  {images.map((image, index) => (
                    <button
                      key={image.id}
                      onClick={() => setSelectedImage(index)}
                      className={cn(
                        "relative aspect-square w-20 flex-shrink-0 overflow-hidden rounded-lg border-2 transition-all",
                        selectedImage === index
                          ? "border-emerald shadow-md"
                          : "border-transparent opacity-70 hover:opacity-100"
                      )}
                    >
                      <Image
                        src={image.url}
                        alt={image.alt ?? `${product.name} ${index + 1}`}
                        fill
                        className="object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product Info */}
            <div className="lg:py-4">
              {/* Category */}
              <Link
                href={`/gallery?category=${product.category.slug}`}
                className="inline-block text-sm font-medium uppercase tracking-wider text-emerald hover:underline mb-2"
              >
                {product.category.name}
              </Link>

              {/* Name */}
              <h1 className="font-serif text-3xl md:text-4xl font-bold text-charcoal mb-4">
                {product.name}
              </h1>

              {/* Price */}
              <p className="text-3xl font-bold text-emerald mb-6">
                {formatPrice(product.price)}
              </p>

              {/* Description */}
              {product.description && (
                <div className="mb-8">
                  <p className="text-charcoal-600 leading-relaxed whitespace-pre-line">
                    {product.description}
                  </p>
                </div>
              )}

              {/* Trust Badges */}
              <div className="flex flex-wrap gap-4 mb-8">
                <div className="flex items-center gap-2 text-sm text-charcoal-500">
                  <Star className="h-4 w-4 text-gold fill-gold" />
                  <span>100% Handmade</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-charcoal-500">
                  <Star className="h-4 w-4 text-gold fill-gold" />
                  <span>Premium Quality</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-charcoal-500">
                  <Star className="h-4 w-4 text-gold fill-gold" />
                  <span>COD Available</span>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href={whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1"
                >
                  <Button
                    variant="whatsapp"
                    size="lg"
                    className="w-full"
                    disabled={!product.inStock}
                  >
                    <MessageCircle className="h-5 w-5" fill="currentColor" />
                    Order on WhatsApp
                  </Button>
                </a>
                <Link href="/gallery" className="flex-1 sm:flex-none">
                  <Button variant="outline" size="lg" className="w-full">
                    Continue Shopping
                  </Button>
                </Link>
              </div>

              {/* Additional Info */}
              <div className="mt-8 p-4 bg-white rounded-xl border border-cream-300">
                <h3 className="font-semibold text-charcoal mb-3">How to Order</h3>
                <ol className="text-sm text-charcoal-600 space-y-2">
                  <li className="flex gap-2">
                    <span className="font-bold text-emerald">1.</span>
                    Click "Order on WhatsApp" above
                  </li>
                  <li className="flex gap-2">
                    <span className="font-bold text-emerald">2.</span>
                    Share your size and any customization needs
                  </li>
                  <li className="flex gap-2">
                    <span className="font-bold text-emerald">3.</span>
                    We'll confirm availability and delivery details
                  </li>
                  <li className="flex gap-2">
                    <span className="font-bold text-emerald">4.</span>
                    Cash on Delivery available across Pakistan!
                  </li>
                </ol>
              </div>
            </div>
          </div>

          {/* Related Products */}
          {filteredRelated && filteredRelated.length > 0 && (
            <div className="mt-16">
              <h2 className="section-title text-center mb-8">You May Also Like</h2>
              {loadingRelated ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {Array.from({ length: 4 }).map((_, i) => (
                    <ProductCardSkeleton key={i} />
                  ))}
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {filteredRelated.map((p) => (
                    <ProductCard key={p.id} product={p} />
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </main>
      <Footer />
      <WhatsAppButton variant="fixed" />
    </>
  );
}
