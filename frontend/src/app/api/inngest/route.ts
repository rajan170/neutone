import { serve } from "inngest/next";
import { inngest } from "../../../inngest/client";
import { generateSong } from "../../../inngest/functions";

export const runtime = "edge";
export const dynamic = "force-static";

// Create an API that serves zero functions
export const { GET, POST, PUT } = serve({
    client: inngest,
    functions: [generateSong],
});