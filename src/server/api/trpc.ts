import { initTRPC, TRPCError } from "@trpc/server";
import superjson from "superjson";
import { ZodError } from "zod";

import { getSession } from "~/server/auth";
import { db } from "~/server/db";

/**
 * Context creation for tRPC
 */
export const createTRPCContext = async (opts: { headers: Headers }) => {
  const session = await getSession();

  return {
    db,
    session,
    ...opts,
  };
};

/**
 * Initialize tRPC
 */
const t = initTRPC.context<typeof createTRPCContext>().create({
  transformer: superjson,
  errorFormatter({ shape, error }) {
    return {
      ...shape,
      data: {
        ...shape.data,
        zodError:
          error.cause instanceof ZodError ? error.cause.flatten() : null,
      },
    };
  },
});

/**
 * Create tRPC router and procedure helpers
 */
export const createCallerFactory = t.createCallerFactory;
export const createTRPCRouter = t.router;

/**
 * Public (unauthenticated) procedure
 */
export const publicProcedure = t.procedure;

/**
 * Protected (authenticated) procedure
 */
export const protectedProcedure = t.procedure.use(({ ctx, next }) => {
  if (!ctx.session?.user) {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }
  return next({
    ctx: {
      session: { ...ctx.session, user: ctx.session.user },
    },
  });
});
