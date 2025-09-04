import { auth } from "~/lib/auth";
import { toNextJsHandler } from "better-auth/next-js";

// Use Node.js runtime for full better-auth compatibility with Polar plugins
export const runtime = "nodejs";

export const { POST, GET } = toNextJsHandler(auth);