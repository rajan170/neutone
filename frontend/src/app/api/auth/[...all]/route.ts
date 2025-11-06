import { auth } from "~/lib/auth";
import { toNextJsHandler } from "better-auth/next-js";

const handler = toNextJsHandler(auth);

// Add CORS headers
const withCORS = (handler: (req: Request) => Promise<Response>) => {
  return async (req: Request) => {
    const response = await handler(req);
    
    const origin = req.headers.get("origin") ?? "";
    const allowedOrigins = [
      "http://localhost:3000",
      "https://neutone-n2gr.vercel.app",
      process.env.NEXT_PUBLIC_APP_URL,
    ].filter(Boolean);

    if (allowedOrigins.includes(origin)) {
      response.headers.set("Access-Control-Allow-Origin", origin);
      response.headers.set("Access-Control-Allow-Credentials", "true");
      response.headers.set(
        "Access-Control-Allow-Methods",
        "GET, POST, PUT, DELETE, OPTIONS"
      );
      response.headers.set(
        "Access-Control-Allow-Headers",
        "Content-Type, Authorization"
      );
    }

    return response;
  };
};

export const GET = withCORS(handler.GET);
export const POST = withCORS(handler.POST);