import Image from "next/image";
import Link from "next/link";
import { MessageCircle } from "lucide-react";
import { formatPrice, getWhatsAppLink, cn } from "~/lib/utils";
import { CONTACT } from "~/lib/constants";
import { type ProductWithThumbnail } from "~/types";

interface ProductCardProps {
  product: ProductWithThumbnail;
  className?: string;
}

export function ProductCard({ product, className }: ProductCardProps) {
  const thumbnailUrl =
    product.images[0]?.url ??
    `https://placehold.co/400x500/1B4D3E/FDF8F3?text=${encodeURIComponent(product.name)}`;

  const whatsappLink = getWhatsAppLink(CONTACT.whatsapp, product.name);

  return (
    <div
      className={cn(
        "group relative overflow-hidden rounded-xl bg-white shadow-sm border border-cream-300 transition-all duration-300 hover:shadow-lg hover:-translate-y-1",
        className
      )}
    >
      {/* Image Container */}
      <div className="relative aspect-[3/4] overflow-hidden bg-cream-200">
        <Image
          src={thumbnailUrl}
          alt={product.images[0]?.alt ?? product.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
        />

        {/* Featured Badge */}
        {product.featured && (
          <div className="absolute left-3 top-3 rounded-full bg-gold px-3 py-1 text-xs font-semibold text-charcoal">
            Featured
          </div>
        )}

        {/* Out of Stock Badge */}
        {!product.inStock && (
          <div className="absolute inset-0 flex items-center justify-center bg-charcoal/60">
            <span className="rounded-full bg-terracotta px-4 py-2 text-sm font-semibold text-white">
              Out of Stock
            </span>
          </div>
        )}

        {/* Quick WhatsApp Button */}
        <a
          href={whatsappLink}
          target="_blank"
          rel="noopener noreferrer"
          className="absolute bottom-3 right-3 flex h-10 w-10 items-center justify-center rounded-full bg-[#25D366] text-white opacity-0 shadow-lg transition-all duration-300 group-hover:opacity-100 hover:bg-[#128C7E] hover:scale-110"
          aria-label={`Order ${product.name} on WhatsApp`}
        >
          <MessageCircle className="h-5 w-5" fill="currentColor" />
        </a>
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Category */}
        <p className="mb-1 text-xs font-medium uppercase tracking-wider text-emerald">
          {product.category.name}
        </p>

        {/* Name */}
        <Link href={`/product/${product.slug}`}>
          <h3 className="font-serif text-lg font-semibold text-charcoal transition-colors hover:text-emerald line-clamp-1">
            {product.name}
          </h3>
        </Link>

        {/* Price */}
        <p className="mt-2 text-xl font-bold text-emerald">
          {formatPrice(product.price)}
        </p>

        {/* View Button */}
        <Link
          href={`/product/${product.slug}`}
          className="mt-3 block w-full rounded-lg border-2 border-emerald py-2 text-center text-sm font-medium text-emerald transition-all duration-200 hover:bg-emerald hover:text-white"
        >
          View Details
        </Link>
      </div>
    </div>
  );
}
