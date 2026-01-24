import { type MetadataRoute } from "next";
import { db } from "~/server/db";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXTAUTH_URL ?? "https://ahmadrafayhandwork.com";

  // Get all products
  const products = await db.product.findMany({
    where: { inStock: true },
    select: { slug: true, updatedAt: true },
  });

  // Get all categories
  const categories = await db.category.findMany({
    select: { slug: true, updatedAt: true },
  });

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${baseUrl}/gallery`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
  ];

  // Category pages
  const categoryPages: MetadataRoute.Sitemap = categories.map((category) => ({
    url: `${baseUrl}/gallery?category=${category.slug}`,
    lastModified: category.updatedAt,
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  // Product pages
  const productPages: MetadataRoute.Sitemap = products.map((product) => ({
    url: `${baseUrl}/product/${product.slug}`,
    lastModified: product.updatedAt,
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  return [...staticPages, ...categoryPages, ...productPages];
}
