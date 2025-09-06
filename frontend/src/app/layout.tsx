import "~/styles/globals.css";

import { type Metadata } from "next";
import { ClientProviders } from "./components/client-providers";

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
        <ClientProviders>
          {children}
        </ClientProviders>
      </body>
    </html>
  );
}