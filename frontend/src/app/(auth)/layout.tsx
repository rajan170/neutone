import "~/styles/globals.css";

import { type Metadata } from "next";
// Use system fonts in restricted build environments
import { Providers } from "~/app/components/providers";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: "Neutone",
  description: "Music Generation Tool",
  icons: [
    { rel: "icon", url: "/favicon.svg", type: "image/svg+xml" },
    { rel: "icon", url: "/favicon.ico" },
  ],
};

// Removed next/font/google (network fetch at build time).

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className="min-h-svh flex flex-col items-center justify-center">
        <Providers>{children}
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
