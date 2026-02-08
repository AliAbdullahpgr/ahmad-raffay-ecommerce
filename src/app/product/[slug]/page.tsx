import { type Metadata } from "next";
import { notFound } from "next/navigation";
import { ProductDetailClient } from "~/components/product/ProductDetailClient";
import {
  buildProductDescription,
  getBaseUrl,
  getMerchantConfig,
  toAbsoluteUrl,
} from "~/lib/merchant";
import { db } from "~/server/db";

interface ProductPageProps {
  params: {
    slug: string;
  };
}

const productInclude = {
  category: true,
  images: {
    orderBy: {
      order: "asc" as const,
    },
  },
};

async function getProductBySlug(slug: string) {
  return db.product.findUnique({
    where: { slug },
    include: productInclude,
  });
}

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const product = await getProductBySlug(params.slug);
  if (!product) {
    return {
      title: "Product Not Found",
    };
  }

  const baseUrl = getBaseUrl();
  const canonicalUrl = `${baseUrl}/product/${product.slug}`;
  const description = buildProductDescription(product.description, product.name, 300);
  const primaryImageUrl = product.images[0]
    ? toAbsoluteUrl(product.images[0].url, baseUrl)
    : toAbsoluteUrl("/og-image.jpg", baseUrl);

  return {
    title: product.name,
    description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      type: "website",
      url: canonicalUrl,
      title: product.name,
      description,
      images: [
        {
          url: primaryImageUrl,
          alt: product.images[0]?.alt ?? product.name,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: product.name,
      description,
      images: [primaryImageUrl],
    },
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const product = await getProductBySlug(params.slug);
  if (!product) {
    notFound();
  }

  const relatedProducts = await db.product.findMany({
    where: {
      categoryId: product.categoryId,
      inStock: true,
      NOT: { id: product.id },
    },
    include: {
      category: true,
      images: {
        orderBy: { order: "asc" },
        take: 1,
      },
    },
    orderBy: { createdAt: "desc" },
    take: 4,
  });

  const baseUrl = getBaseUrl();
  const merchant = getMerchantConfig();
  const productUrl = `${baseUrl}/product/${product.slug}`;
  const description = buildProductDescription(product.description, product.name);
  const imageUrls = product.images.map((image) => toAbsoluteUrl(image.url, baseUrl));
  const priceValidUntil = new Date(
    Date.now() + 1000 * 60 * 60 * 24 * 365
  )
    .toISOString()
    .split("T")[0];

  const returnPolicy = {
    "@type": "MerchantReturnPolicy",
    applicableCountry: merchant.targetCountry,
    returnPolicyCategory:
      "https://schema.org/MerchantReturnFiniteReturnWindow",
    merchantReturnDays: merchant.returnWindowDays,
    returnMethod: "https://schema.org/ReturnByMail",
    returnFees: "https://schema.org/ReturnFeesCustomerResponsibility",
    merchantReturnLink: `${baseUrl}/return-policy`,
  };

  const shippingDetails =
    merchant.shippingPrice === null
      ? undefined
      : {
          "@type": "OfferShippingDetails",
          shippingRate: {
            "@type": "MonetaryAmount",
            value: merchant.shippingPrice.toFixed(2),
            currency: merchant.currency,
          },
          shippingDestination: {
            "@type": "DefinedRegion",
            addressCountry: merchant.targetCountry,
          },
          deliveryTime: {
            "@type": "ShippingDeliveryTime",
            handlingTime: {
              "@type": "QuantitativeValue",
              minValue: merchant.handlingMinDays,
              maxValue: merchant.handlingMaxDays,
              unitCode: "DAY",
            },
            transitTime: {
              "@type": "QuantitativeValue",
              minValue: merchant.transitMinDays,
              maxValue: merchant.transitMaxDays,
              unitCode: "DAY",
            },
          },
        };

  const offer = {
    "@type": "Offer",
    url: productUrl,
    priceCurrency: merchant.currency,
    price: product.price.toFixed(2),
    priceValidUntil,
    availability: product.inStock
      ? "https://schema.org/InStock"
      : "https://schema.org/OutOfStock",
    itemCondition: "https://schema.org/NewCondition",
    seller: {
      "@type": "Organization",
      name: merchant.brand,
    },
    hasMerchantReturnPolicy: returnPolicy,
    ...(shippingDetails ? { shippingDetails } : {}),
  };

  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    "@id": `${productUrl}#product`,
    url: productUrl,
    name: product.name,
    description,
    sku: product.id,
    category: product.category.name,
    color: merchant.defaultColor,
    size: merchant.defaultSize,
    image: imageUrls.length > 0 ? imageUrls : [toAbsoluteUrl("/og-image.jpg", baseUrl)],
    brand: {
      "@type": "Brand",
      name: merchant.brand,
    },
    offers: offer,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />
      <ProductDetailClient product={product} relatedProducts={relatedProducts} />
    </>
  );
}
