import "~/styles/globals.css";

import { type Metadata } from "next";
// Use system fonts in restricted build environments
import { Providers } from "../components/providers";
import { Toaster } from "sonner";
import { headers } from "next/headers";
import { auth } from "~/lib/auth";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "~/components/ui/sidebar";
import { AppSidebar } from "../components/sidebar/app-sidebar";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList, 
} from "~/components/ui/breadcrumb";
import { Separator } from "~/components/ui/separator";
import BreadcrumbPageClient from "../components/sidebar/breadcrumb-page-client";
import SoundBarWrapper from "../components/sound-bar-wrapper";

// Removed next/font/google (network fetch at build time).

export const metadata: Metadata = {
  title: "Neutone",
  description: "Music Generation AI",
  icons: [
    { rel: "icon", url: "/favicon.svg", type: "image/svg+xml" },
    { rel: "icon", url: "/favicon.ico" },
  ],
};

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session) {
    return (
      <html lang="en">
        <body>
          <Providers>
            <main className="min-h-screen">{children}</main>
            <Toaster />
          </Providers>
        </body>
      </html>
    );
  }

  return (
    <html lang="en">
      <body>
        <Providers>
          <SidebarProvider>
            <AppSidebar />
            <SidebarInset className="flex h-screen flex-col">
              <header className="bg-background sticky-top z-10 border-b px-4 py-2">
                <div className="flex shrink-0 grow items-center gap-2">
                  <SidebarTrigger className="-ml-1" />
                  <Separator
                    orientation="vertical"
                    className="mr-2 data-[orientation=vertical]:h-4"
                  />
                  <Breadcrumb>
                    <BreadcrumbList>
                      <BreadcrumbItem>
                        <BreadcrumbPageClient />
                      </BreadcrumbItem>
                    </BreadcrumbList>
                  </Breadcrumb>
                </div>
              </header>
              <main className="flex-1 overflow-y-auto">{children}</main>
              <SoundBarWrapper />
            </SidebarInset>
          </SidebarProvider>
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
