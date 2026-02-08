"use client";

import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight, MessageCircle, Star } from "lucide-react";
import { useState } from "react";
import { Footer } from "~/components/layout/Footer";
import { Navbar } from "~/components/layout/Navbar";
import { Button } from "~/components/ui/Button";
import { ProductCard } from "~/components/ui/ProductCard";
import { WhatsAppButton } from "~/components/ui/WhatsAppButton";
import { CONTACT } from "~/lib/constants";
import { cn, formatPrice, getWhatsAppLink } from "~/lib/utils";
import { type ProductWithRelations, type ProductWithThumbnail } from "~/types";

interface ProductDetailClientProps {
  product: ProductWithRelations;
  relatedProducts: ProductWithThumbnail[];
}

export function ProductDetailClient({
  product,
  relatedProducts,
}: ProductDetailClientProps) {
  const [selectedImage, setSelectedImage] = useState(0);

  const images =
    product.images.length > 0
      ? product.images
      : [
          {
            id: "placeholder",
            url: `https://placehold.co/600x800/1B4D3E/FDF8F3?text=${encodeURIComponent(
              product.name
            )}`,
            alt: product.name,
            key: null,
            order: 0,
            productId: product.id,
          },
        ];

  const whatsappLink = getWhatsAppLink(CONTACT.whatsapp, product.name);

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-cream pt-16 md:pt-20">
        <div className="border-b border-cream-300 bg-white">
          <div className="container-custom py-4">
            <nav className="flex items-center gap-2 text-sm">
              <Link href="/" className="text-charcoal-500 hover:text-emerald">
                Home
              </Link>
              <ChevronRight className="h-4 w-4 text-charcoal-300" />
              <Link
                href="/gallery"
                className="text-charcoal-500 hover:text-emerald"
              >
                Gallery
              </Link>
              <ChevronRight className="h-4 w-4 text-charcoal-300" />
              <Link
                href={`/gallery?category=${product.category.slug}`}
                className="text-charcoal-500 hover:text-emerald"
              >
                {product.category.name}
              </Link>
              <ChevronRight className="h-4 w-4 text-charcoal-300" />
              <span className="font-medium text-emerald">{product.name}</span>
            </nav>
          </div>
        </div>

        <div className="container-custom py-12">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
            <div className="space-y-4">
              <div className="relative aspect-[3/4] overflow-hidden rounded-2xl bg-white shadow-lg">
                <Image
                  src={images[selectedImage]?.url ?? ""}
                  alt={images[selectedImage]?.alt ?? product.name}
                  fill
                  className="object-cover"
                  priority
                />

                {images.length > 1 && (
                  <>
                    <button
                      onClick={() =>
                        setSelectedImage((prev) =>
                          prev === 0 ? images.length - 1 : prev - 1
                        )
                      }
                      className="absolute left-4 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/80 text-charcoal shadow-lg transition-all hover:bg-white"
                    >
                      <ChevronLeft className="h-6 w-6" />
                    </button>
                    <button
                      onClick={() =>
                        setSelectedImage((prev) =>
                          prev === images.length - 1 ? 0 : prev + 1
                        )
                      }
                      className="absolute right-4 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/80 text-charcoal shadow-lg transition-all hover:bg-white"
                    >
                      <ChevronRight className="h-6 w-6" />
                    </button>
                  </>
                )}

                {product.featured && (
                  <div className="absolute left-4 top-4 rounded-full bg-gold px-4 py-1 text-sm font-semibold text-charcoal">
                    Featured
                  </div>
                )}

                {!product.inStock && (
                  <div className="absolute inset-0 flex items-center justify-center bg-charcoal/60">
                    <span className="rounded-full bg-terracotta px-6 py-3 text-lg font-semibold text-white">
                      Out of Stock
                    </span>
                  </div>
                )}
              </div>

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

            <div className="lg:py-4">
              <Link
                href={`/gallery?category=${product.category.slug}`}
                className="mb-2 inline-block text-sm font-medium uppercase tracking-wider text-emerald hover:underline"
              >
                {product.category.name}
              </Link>

              <h1 className="mb-4 font-serif text-3xl font-bold text-charcoal md:text-4xl">
                {product.name}
              </h1>

              <p className="mb-6 text-3xl font-bold text-emerald">
                {formatPrice(product.price)}
              </p>

              {product.description && (
                <div className="mb-8">
                  <p className="whitespace-pre-line leading-relaxed text-charcoal-600">
                    {product.description}
                  </p>
                </div>
              )}

              <div className="mb-8 flex flex-wrap gap-4">
                <div className="flex items-center gap-2 text-sm text-charcoal-500">
                  <Star className="h-4 w-4 fill-gold text-gold" />
                  <span>100% Handmade</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-charcoal-500">
                  <Star className="h-4 w-4 fill-gold text-gold" />
                  <span>Premium Quality</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-charcoal-500">
                  <Star className="h-4 w-4 fill-gold text-gold" />
                  <span>Cash on Delivery</span>
                </div>
              </div>

              <div className="flex flex-col gap-4 sm:flex-row">
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

              <div className="mt-8 rounded-xl border border-cream-300 bg-white p-4">
                <h3 className="mb-3 font-semibold text-charcoal">How to Order</h3>
                <ol className="space-y-2 text-sm text-charcoal-600">
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
                    We confirm availability and delivery details
                  </li>
                  <li className="flex gap-2">
                    <span className="font-bold text-emerald">4.</span>
                    Cash on Delivery available across Pakistan
                  </li>
                </ol>
              </div>
            </div>
          </div>

          {relatedProducts.length > 0 && (
            <div className="mt-16">
              <h2 className="section-title mb-8 text-center">You May Also Like</h2>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {relatedProducts.slice(0, 4).map((relatedProduct) => (
                  <ProductCard key={relatedProduct.id} product={relatedProduct} />
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
      <WhatsAppButton variant="fixed" />
    </>
  );
}
