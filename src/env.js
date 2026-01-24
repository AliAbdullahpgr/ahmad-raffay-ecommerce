import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  /**
   * Server-side environment variables schema
   */
  server: {
    DATABASE_URL: z.string().url(),
    NODE_ENV: z
      .enum(["development", "test", "production"])
      .default("development"),
    NEXTAUTH_SECRET:
      process.env.NODE_ENV === "production"
        ? z.string()
        : z.string().optional(),
    NEXTAUTH_URL: z.preprocess(
      (str) => process.env.VERCEL_URL ?? str,
      process.env.VERCEL ? z.string() : z.string().url()
    ),
    UPLOADTHING_TOKEN: z.string().optional(),
  },

  /**
   * Client-side environment variables schema
   */
  client: {
    // NEXT_PUBLIC_CLIENTVAR: z.string(),
  },

  /**
   * Runtime environment variables
   */
  runtimeEnv: {
    DATABASE_URL: process.env.DATABASE_URL,
    NODE_ENV: process.env.NODE_ENV,
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
    UPLOADTHING_TOKEN: process.env.UPLOADTHING_TOKEN,
  },

  /**
   * Skip validation in edge runtime
   */
  skipValidation: !!process.env.SKIP_ENV_VALIDATION,

  /**
   * Empty string handling
   */
  emptyStringAsUndefined: true,
});
