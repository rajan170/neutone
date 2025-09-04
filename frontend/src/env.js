// env.js
import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

// Best-effort dotenv preload for local builds (no effect on CF edge if .env absent)
try {
  if (typeof process !== "undefined" && process.versions?.node) {
    // eslint-disable-next-line global-require
    require("dotenv").config();
  }
} catch { }

/**
 * Helper: optional non-empty string (so "" becomes undefined with emptyStringAsUndefined)
 */
const optional = z.string().min(1).optional();

export const env = createEnv({
  // Server-only vars schema
  server: {
    // Make build-time optional; enforce at runtime where used
    DATABASE_URL: z.string().url().optional(),

    NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
    MODAL_KEY: z.string(),          // keep required if truly needed at build
    MODAL_SECRET: z.string(),

    // Note: many SDKs expect AWS_ACCESS_KEY_ID; we map it in runtimeEnv below
    AWS_ACCESS_KEY: optional,
    AWS_SECRET_ACCESS_KEY: optional,
    AWS_REGION: optional,
    S3_BUCKET_NAME: optional,

    GENERATE_FROM_DESCRIPTION_ENDPOINT: optional,
    GENERATE_FROM_DESCRIBED_LYRICS_ENDPOINT: optional,
    GENERATE_FROM_LYRICS_ENDPOINT: optional,

    BETTER_AUTH_SECRET: z.string(),
    POLAR_ACCESS_TOKEN: optional,
    POLAR_WEBHOOK_SECRET: optional,
  },

  // Client-side (none yet; add NEXT_PUBLIC_* here)
  client: {},

  // Explicit runtime env mapping (avoid destructuring in edge)
  runtimeEnv: {
    DATABASE_URL: process.env.DATABASE_URL,
    NODE_ENV: process.env.NODE_ENV,

    MODAL_KEY: process.env.MODAL_KEY,
    MODAL_SECRET: process.env.MODAL_SECRET,

    // Accept either AWS_ACCESS_KEY or AWS_ACCESS_KEY_ID
    AWS_ACCESS_KEY: process.env.AWS_ACCESS_KEY ?? process.env.AWS_ACCESS_KEY_ID,
    AWS_SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY,
    AWS_REGION: process.env.AWS_REGION,
    S3_BUCKET_NAME: process.env.S3_BUCKET_NAME,

    GENERATE_FROM_DESCRIPTION_ENDPOINT: process.env.GENERATE_FROM_DESCRIPTION_ENDPOINT,
    GENERATE_FROM_DESCRIBED_LYRICS_ENDPOINT: process.env.GENERATE_FROM_DESCRIBED_LYRICS_ENDPOINT,
    GENERATE_FROM_LYRICS_ENDPOINT: process.env.GENERATE_FROM_LYRICS_ENDPOINT,

    BETTER_AUTH_SECRET: process.env.BETTER_AUTH_SECRET,
    POLAR_ACCESS_TOKEN: process.env.POLAR_ACCESS_TOKEN,
    POLAR_WEBHOOK_SECRET: process.env.POLAR_WEBHOOK_SECRET,
  },

  // Allow skipping validation in CI if you set SKIP_ENV_VALIDATION=true
  skipValidation: !!process.env.SKIP_ENV_VALIDATION,
  // Treat "" as undefined so z.string() fails on empty strings
  emptyStringAsUndefined: true,
});

/**
 * Runtime guard: call must('KEY') where you actually need a secret.
 * Keeps builds green while ensuring runtime safety.
 */
/**
 * @param {keyof typeof env} key
 * @returns {string}
 */
export function must(key) {
  const val = env[key];
  if (!val) throw new Error(`${key} is required at runtime`);
  return val;
}
