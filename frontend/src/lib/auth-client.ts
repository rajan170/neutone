import { polarClient } from "@polar-sh/better-auth";
import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({

    baseURL: process.env.NODE_ENV === "development"
        ? "http://localhost:3000"
        : process.env.VERCEL_URL
            ? `https://${process.env.VERCEL_URL}`
            : "https://neutone.pages.dev", // Your Cloudflare Pages URL
    plugins: [polarClient()]
});

export const {
    signIn,
    signOut,
    signUp,
    useSession,
} = authClient;