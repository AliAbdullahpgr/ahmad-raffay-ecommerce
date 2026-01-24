import { z } from "zod";

import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";

export const settingsRouter = createTRPCRouter({
  // Get public site settings
  get: publicProcedure.query(async ({ ctx }) => {
    let settings = await ctx.db.siteSettings.findUnique({
      where: { id: "default" },
    });

    // Create default settings if not exists
    if (!settings) {
      settings = await ctx.db.siteSettings.create({
        data: {
          id: "default",
          siteName: "Ahmad Rafay Handwork",
          tagline: "Beautiful Embroidery, Honest Prices",
          whatsapp: "03199119572",
          instagram: "@ahmadrafayhandwork",
          facebook: "Ahmad Rafay Handwork",
        },
      });
    }

    return settings;
  }),

  // Admin: Update site settings
  update: protectedProcedure
    .input(
      z.object({
        siteName: z.string().min(1).optional(),
        tagline: z.string().optional(),
        whatsapp: z.string().optional(),
        instagram: z.string().optional(),
        facebook: z.string().optional(),
        aboutText: z.string().optional(),
        heroTitle: z.string().optional(),
        heroSubtitle: z.string().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db.siteSettings.upsert({
        where: { id: "default" },
        create: {
          id: "default",
          ...input,
        },
        update: input,
      });
    }),
});
