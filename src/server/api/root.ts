import { productRouter } from "~/server/api/routers/product";
import { categoryRouter } from "~/server/api/routers/category";
import { settingsRouter } from "~/server/api/routers/settings";
import { createCallerFactory, createTRPCRouter } from "~/server/api/trpc";

/**
 * Primary router for the app
 */
export const appRouter = createTRPCRouter({
  product: productRouter,
  category: categoryRouter,
  settings: settingsRouter,
});

export type AppRouter = typeof appRouter;

/**
 * Create a server-side caller for the tRPC API
 */
export const createCaller = createCallerFactory(appRouter);
