import { z } from "zod";

import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";

export const categoryRouter = createTRPCRouter({
  // Get all categories
  getAll: publicProcedure.query(async ({ ctx }) => {
    return ctx.db.category.findMany({
      include: {
        _count: {
          select: { products: true },
        },
      },
      orderBy: { name: "asc" },
    });
  }),

  // Get category by slug with products
  getBySlug: publicProcedure
    .input(z.object({ slug: z.string() }))
    .query(async ({ ctx, input }) => {
      return ctx.db.category.findUnique({
        where: { slug: input.slug },
        include: {
          products: {
            where: { inStock: true },
            include: {
              images: {
                orderBy: { order: "asc" },
                take: 1,
              },
            },
            orderBy: { createdAt: "desc" },
          },
        },
      });
    }),

  // Admin: Create category
  create: protectedProcedure
    .input(
      z.object({
        name: z.string().min(1),
        slug: z.string().min(1),
        description: z.string().optional(),
        image: z.string().url().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db.category.create({
        data: input,
      });
    }),

  // Admin: Update category
  update: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        name: z.string().min(1).optional(),
        slug: z.string().min(1).optional(),
        description: z.string().optional(),
        image: z.string().url().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { id, ...data } = input;
      return ctx.db.category.update({
        where: { id },
        data,
      });
    }),

  // Admin: Delete category
  delete: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      // Check if category has products
      const productsCount = await ctx.db.product.count({
        where: { categoryId: input.id },
      });

      if (productsCount > 0) {
        throw new Error(
          `Cannot delete category with ${productsCount} products. Remove products first.`
        );
      }

      return ctx.db.category.delete({
        where: { id: input.id },
      });
    }),
});
