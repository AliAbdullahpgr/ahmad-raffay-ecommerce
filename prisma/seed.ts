import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Starting database seed...");

  // Clear existing data
  await prisma.productImage.deleteMany();
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();
  await prisma.admin.deleteMany();
  await prisma.siteSettings.deleteMany();

  // Create categories
  const shirtsCategory = await prisma.category.create({
    data: {
      name: "Shirts",
      slug: "shirts",
      description: "Hand-embroidered traditional shirts for women",
      image: "https://placehold.co/600x400/1B4D3E/FDF8F3?text=Shirts",
    },
  });

  const trousersCategory = await prisma.category.create({
    data: {
      name: "Trousers",
      slug: "trousers",
      description: "Elegantly embroidered trousers",
      image: "https://placehold.co/600x400/1B4D3E/FDF8F3?text=Trousers",
    },
  });

  console.log("✅ Categories created");

  // Create products
  const products = [
    {
      name: "Floral Embroidered Shirt",
      slug: "floral-embroidered-shirt",
      description:
        "Beautiful floral patterns hand-embroidered on premium cotton fabric. Perfect for casual and semi-formal occasions.",
      price: 2500,
      categoryId: shirtsCategory.id,
      featured: true,
      inStock: true,
    },
    {
      name: "Classic White Kurta",
      slug: "classic-white-kurta",
      description:
        "Timeless white kurta with delicate thread work along the neckline and sleeves. A wardrobe essential.",
      price: 1800,
      categoryId: shirtsCategory.id,
      featured: true,
      inStock: true,
    },
    {
      name: "Traditional Motif Shirt",
      slug: "traditional-motif-shirt",
      description:
        "Authentic Rajanpuri motifs showcasing our heritage. Each piece is a work of art passed down through generations.",
      price: 3200,
      categoryId: shirtsCategory.id,
      featured: false,
      inStock: true,
    },
    {
      name: "Summer Breeze Shirt",
      slug: "summer-breeze-shirt",
      description:
        "Light and airy fabric with subtle embroidery. Ideal for summer wear.",
      price: 2200,
      categoryId: shirtsCategory.id,
      featured: false,
      inStock: true,
    },
    {
      name: "Embroidered Palazzo Trouser",
      slug: "embroidered-palazzo-trouser",
      description:
        "Flowing palazzo style with intricate embroidery along the hem. Comfortable and elegant.",
      price: 1500,
      categoryId: trousersCategory.id,
      featured: true,
      inStock: true,
    },
    {
      name: "Cotton Embroidered Trouser",
      slug: "cotton-embroidered-trouser",
      description:
        "Premium cotton trousers with beautiful side embroidery. Perfect for everyday elegance.",
      price: 1200,
      categoryId: trousersCategory.id,
      featured: true,
      inStock: true,
    },
    {
      name: "Silk Thread Work Trouser",
      slug: "silk-thread-work-trouser",
      description:
        "Luxurious silk thread embroidery on premium fabric. For special occasions.",
      price: 2000,
      categoryId: trousersCategory.id,
      featured: false,
      inStock: true,
    },
    {
      name: "Casual Embroidered Trouser",
      slug: "casual-embroidered-trouser",
      description:
        "Simple yet elegant embroidery for casual everyday wear.",
      price: 1000,
      categoryId: trousersCategory.id,
      featured: false,
      inStock: true,
    },
  ];

  for (const product of products) {
    const createdProduct = await prisma.product.create({
      data: product,
    });

    // Add placeholder images
    await prisma.productImage.createMany({
      data: [
        {
          url: `https://placehold.co/600x800/1B4D3E/FDF8F3?text=${encodeURIComponent(product.name)}`,
          alt: product.name,
          order: 0,
          productId: createdProduct.id,
        },
        {
          url: `https://placehold.co/600x800/D4AF37/2D2D2D?text=${encodeURIComponent(product.name + " Detail")}`,
          alt: `${product.name} - Detail`,
          order: 1,
          productId: createdProduct.id,
        },
      ],
    });
  }

  console.log("✅ Products created with images");

  // Create super admin user from env variables
  const adminEmail = process.env.ADMIN_EMAIL ?? "admin@ahmadrafay.com";
  const adminPassword = process.env.ADMIN_PASSWORD ?? "admin123";
  const hashedPassword = await bcrypt.hash(adminPassword, 12);
  await prisma.admin.create({
    data: {
      email: adminEmail,
      passwordHash: hashedPassword,
      name: "Super Admin",
    },
  });

  console.log(`✅ Super Admin created (email: ${adminEmail})`);

  // Create site settings
  await prisma.siteSettings.create({
    data: {
      id: "default",
      siteName: "Ahmad Rafay Handwork",
      tagline: "Beautiful Embroidery, Honest Prices",
      whatsapp: "03199119572",
      instagram: "@ahmadrafayhandwork",
      facebook: "Ahmad Rafay Handwork",
      aboutText:
        "From Rajanpur with love - authentic hand embroidery passed down through generations. We believe every woman deserves beautiful traditional wear without breaking the bank. Our skilled artisans create each piece with dedication and care, ensuring you receive nothing but the finest craftsmanship.",
      heroTitle: "Ahmad Rafay Handwork",
      heroSubtitle: "Traditional hand-embroidered shirts & trousers from Rajanpur",
    },
  });

  console.log("✅ Site settings created");
  console.log("🎉 Database seed completed successfully!");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
