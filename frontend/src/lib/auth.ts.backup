import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { db } from "~/server/db";
import { Polar } from "@polar-sh/sdk";
import { env } from "~/env";
import { polar, checkout, portal, webhooks } from "@polar-sh/better-auth";
import { smallCreditsProductId, mediumCreditsProductId, largeCreditsProductId } from "./auth-constants";

const polarClient = new Polar({
    accessToken: env.POLAR_ACCESS_TOKEN,
    server: "production",
});

export const auth = betterAuth({
    database: prismaAdapter(db, {
        provider: "postgresql",
    }),
    emailAndPassword: {
        enabled: true,
    },

    plugins: [
        polar({
            client: polarClient,
            createCustomerOnSignUp: true,
            use: [
                checkout({
                    products: [
                        {
                            productId: smallCreditsProductId,
                            slug: "small"
                        },
                        {
                            productId: mediumCreditsProductId,
                            slug: "medium"
                        },
                        {
                            productId: largeCreditsProductId,
                            slug: "large"
                        },

                    ],
                    successUrl: "/",
                    authenticatedUsersOnly: true
                }),
                portal(),
                webhooks({
                    secret: env.POLAR_WEBHOOK_SECRET,
                    onOrderPaid: async (payload) => {
                        const externalCustomerId = payload.data.customer.externalId;

                        if (!externalCustomerId) {
                            console.error("External customer id not found");
                            throw new Error("External customer id not found");
                        }

                        const productId = payload.data.productId;

                        let creditsToAdd = 0;

                        switch (productId) {
                            case smallCreditsProductId:
                                creditsToAdd = 50;
                                break;
                            case mediumCreditsProductId:
                                creditsToAdd = 250;
                                break;
                            case largeCreditsProductId:
                                creditsToAdd = 500;
                                break;
                            default:
                                console.error("Invalid product id");
                                throw new Error("Invalid product id");
                        }

                        await db.user.update({
                            where: {
                                id: externalCustomerId,
                            },
                            data: {
                                credits: {
                                    increment: creditsToAdd,
                                },
                            },
                        });
                    }
                })
            ],
        })
    ],
});

