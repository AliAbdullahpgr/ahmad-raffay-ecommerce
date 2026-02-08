import { SITE } from "~/lib/constants";
import {
  buildProductDescription,
  escapeXml,
  formatMerchantPrice,
  getBaseUrl,
  getMerchantConfig,
  toAbsoluteUrl,
} from "~/lib/merchant";
import { db } from "~/server/db";

const GOOGLE_CATEGORY_BY_SLUG: Record<string, string> = {
  shirts: "Apparel & Accessories > Clothing > Shirts & Tops",
  trousers: "Apparel & Accessories > Clothing > Pants",
};

function buildProductItemXml(input: {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  inStock: boolean;
  categorySlug: string;
  categoryName: string;
  imageUrls: string[];
  currency: string;
  targetCountry: string;
  brand: string;
  defaultColor: string;
  defaultSize: string;
  ageGroup: string;
  gender: string;
  shippingPrice: number | null;
  price: number;
  baseUrl: string;
}) {
  const {
    id,
    name,
    slug,
    description,
    inStock,
    categorySlug,
    categoryName,
    imageUrls,
    currency,
    targetCountry,
    brand,
    defaultColor,
    defaultSize,
    ageGroup,
    gender,
    shippingPrice,
    price,
    baseUrl,
  } = input;

  if (imageUrls.length === 0) {
    return "";
  }

  const productUrl = `${baseUrl}/product/${encodeURIComponent(slug)}`;
  const productDescription = buildProductDescription(description, name);
  const availability = inStock ? "in_stock" : "out_of_stock";
  const primaryImageUrl = toAbsoluteUrl(imageUrls[0], baseUrl);
  const additionalImageTags = imageUrls
    .slice(1, 10)
    .map((imageUrl) => `<g:additional_image_link>${escapeXml(toAbsoluteUrl(imageUrl, baseUrl))}</g:additional_image_link>`)
    .join("");

  const shippingBlock =
    shippingPrice === null
      ? ""
      : `<g:shipping><g:country>${escapeXml(
          targetCountry
        )}</g:country><g:service>Standard</g:service><g:price>${escapeXml(
          formatMerchantPrice(shippingPrice, currency)
        )}</g:price></g:shipping>`;

  const googleCategory =
    GOOGLE_CATEGORY_BY_SLUG[categorySlug] ??
    "Apparel & Accessories > Clothing";

  return `<item>
<g:id>${escapeXml(id)}</g:id>
<title>${escapeXml(name)}</title>
<description>${escapeXml(productDescription)}</description>
<link>${escapeXml(productUrl)}</link>
<g:image_link>${escapeXml(primaryImageUrl)}</g:image_link>
${additionalImageTags}
<g:availability>${availability}</g:availability>
<g:price>${escapeXml(formatMerchantPrice(price, currency))}</g:price>
<g:condition>new</g:condition>
<g:brand>${escapeXml(brand)}</g:brand>
<g:google_product_category>${escapeXml(googleCategory)}</g:google_product_category>
<g:product_type>${escapeXml(categoryName)}</g:product_type>
<g:identifier_exists>no</g:identifier_exists>
<g:age_group>${escapeXml(ageGroup)}</g:age_group>
<g:gender>${escapeXml(gender)}</g:gender>
<g:color>${escapeXml(defaultColor)}</g:color>
<g:size>${escapeXml(defaultSize)}</g:size>
${shippingBlock}
</item>`;
}

export async function GET(): Promise<Response> {
  const baseUrl = getBaseUrl();
  const merchant = getMerchantConfig();

  const products = await db.product.findMany({
    include: {
      category: true,
      images: {
        orderBy: { order: "asc" },
      },
    },
    orderBy: { updatedAt: "desc" },
  });

  const items = products
    .map((product) =>
      buildProductItemXml({
        id: product.id,
        name: product.name,
        slug: product.slug,
        description: product.description,
        inStock: product.inStock,
        categorySlug: product.category.slug,
        categoryName: product.category.name,
        imageUrls: product.images.map((image) => image.url).filter(Boolean),
        currency: merchant.currency,
        targetCountry: merchant.targetCountry,
        brand: merchant.brand,
        defaultColor: merchant.defaultColor,
        defaultSize: merchant.defaultSize,
        ageGroup: merchant.ageGroup,
        gender: merchant.gender,
        shippingPrice: merchant.shippingPrice,
        price: product.price,
        baseUrl,
      })
    )
    .filter(Boolean)
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:g="http://base.google.com/ns/1.0">
<channel>
<title>${escapeXml(SITE.name)} Product Feed</title>
<link>${escapeXml(baseUrl)}</link>
<description>${escapeXml(SITE.description)}</description>
${items}
</channel>
</rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
