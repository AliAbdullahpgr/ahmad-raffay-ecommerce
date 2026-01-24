import { z } from "zod";

import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";

export const productRouter = createTRPCRouter({
  // Get all products with optional filters
  getAll: publicProcedure
    .input(
      z
        .object({
          categorySlug: z.string().optional(),
          featured: z.boolean().optional(),
          inStock: z.boolean().optional(),
          limit: z.number().min(1).max(100).default(50),
          cursor: z.string().optional(),
        })
        .optional()
    )
    .query(async ({ ctx, input }) => {
      const { categorySlug, featured, inStock, limit, cursor } = input ?? {};

      const products = await ctx.db.product.findMany({
        where: {
          ...(categorySlug && {
            category: { slug: categorySlug },
          }),
          ...(featured !== undefined && { featured }),
          ...(inStock !== undefined && { inStock }),
        },
        include: {
          category: true,
          images: {
            orderBy: { order: "asc" },
          },
        },
        orderBy: { createdAt: "desc" },
        take: limit + 1,
        cursor: cursor ? { id: cursor } : undefined,
      });

      let nextCursor: typeof cursor | undefined = undefined;
      if (products.length > limit) {
        const nextItem = products.pop();
        nextCursor = nextItem?.id;
      }

      return {
        products,
        nextCursor,
      };
    }),

  // Get featured products
  getFeatured: publicProcedure.query(async ({ ctx }) => {
    return ctx.db.product.findMany({
      where: { featured: true, inStock: true },
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
  }),

  // Get single product by ID or slug
  getById: publicProcedure
    .input(z.object({ id: z.string().optional(), slug: z.string().optional() }))
    .query(async ({ ctx, input }) => {
      if (!input.id && !input.slug) {
        throw new Error("Either id or slug is required");
      }

      return ctx.db.product.findFirst({
        where: input.id ? { id: input.id } : { slug: input.slug },
        include: {
          category: true,
          images: {
            orderBy: { order: "asc" },
          },
        },
      });
    }),

  // Get products by category
  getByCategory: publicProcedure
    .input(z.object({ slug: z.string() }))
    .query(async ({ ctx, input }) => {
      return ctx.db.product.findMany({
        where: {
          category: { slug: input.slug },
          inStock: true,
        },
        include: {
          category: true,
          images: {
            orderBy: { order: "asc" },
            take: 1,
          },
        },
        orderBy: { createdAt: "desc" },
      });
    }),

  // Admin: Create product
  create: protectedProcedure
    .input(
      z.object({
        name: z.string().min(1),
        slug: z.string().min(1),
        description: z.string().optional(),
        price: z.number().min(0),
        categoryId: z.string(),
        featured: z.boolean().default(false),
        inStock: z.boolean().default(true),
        images: z
          .array(
            z.object({
              url: z.string().url(),
              key: z.string().optional(),
              alt: z.string().optional(),
              order: z.number().default(0),
            })
          )
          .optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { images, ...productData } = input;

      return ctx.db.product.create({
        data: {
          ...productData,
          images: images
            ? {
                create: images,
              }
            : undefined,
        },
        include: {
          category: true,
          images: true,
        },
      });
    }),

  // Admin: Update product
  update: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        name: z.string().min(1).optional(),
        slug: z.string().min(1).optional(),
        description: z.string().optional(),
        price: z.number().min(0).optional(),
        categoryId: z.string().optional(),
        featured: z.boolean().optional(),
        inStock: z.boolean().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { id, ...data } = input;

      return ctx.db.product.update({
        where: { id },
        data,
        include: {
          category: true,
          images: true,
        },
      });
    }),

  // Admin: Delete product
  delete: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      // Images will be cascade deleted due to onDelete: Cascade
      return ctx.db.product.delete({
        where: { id: input.id },
      });
    }),

  // Admin: Toggle featured status
  toggleFeatured: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const product = await ctx.db.product.findUnique({
        where: { id: input.id },
      });

      if (!product) {
        throw new Error("Product not found");
      }

      return ctx.db.product.update({
        where: { id: input.id },
        data: { featured: !product.featured },
      });
    }),

  // Admin: Toggle stock status
  toggleStock: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const product = await ctx.db.product.findUnique({
        where: { id: input.id },
      });

      if (!product) {
        throw new Error("Product not found");
      }

      return ctx.db.product.update({
        where: { id: input.id },
        data: { inStock: !product.inStock },
      });
    }),

  // Admin: Add image to product
  addImage: protectedProcedure
    .input(
      z.object({
        productId: z.string(),
        url: z.string().url(),
        key: z.string().optional(),
        alt: z.string().optional(),
        order: z.number().default(0),
      })
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db.productImage.create({
        data: input,
      });
    }),

  // Admin: Delete image
  deleteImage: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return ctx.db.productImage.delete({
        where: { id: input.id },
      });
    }),

  // Admin: Get all products for admin list
  adminGetAll: protectedProcedure.query(async ({ ctx }) => {
    return ctx.db.product.findMany({
      include: {
        category: true,
        images: {
          orderBy: { order: "asc" },
          take: 1,
        },
        _count: {
          select: { images: true },
        },
      },
      orderBy: { createdAt: "desc" },
    });
  }),

  // Admin: Get dashboard stats
  getStats: protectedProcedure.query(async ({ ctx }) => {
    const [total, shirts, trousers, featured, outOfStock] = await Promise.all([
      ctx.db.product.count(),
      ctx.db.product.count({
        where: { category: { slug: "shirts" } },
      }),
      ctx.db.product.count({
        where: { category: { slug: "trousers" } },
      }),
      ctx.db.product.count({ where: { featured: true } }),
      ctx.db.product.count({ where: { inStock: false } }),
    ]);

    return { total, shirts, trousers, featured, outOfStock };
  }),
});
