import "~/styles/globals.css";

import { type Metadata } from "next";
import { Providers } from "./components/providers";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: "Neutone",
  description: "Music Generation AI",
  icons: [
    { rel: "icon", url: "/favicon.svg", type: "image/svg+xml" },
    { rel: "icon", url: "/favicon.ico" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <Providers>
          {children}
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}