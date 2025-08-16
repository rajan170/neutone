import { inngest } from "../../../inngest/client";

export const generateSong = inngest.createFunction(
    { id: "generate-song" },
    { event: "generate-song-event" },
    async ({ event, step }) => {
        await step.sleep("wait-a-moment", "1s");
        return { message: `Hello ${event.data.email}!` };
    },
);