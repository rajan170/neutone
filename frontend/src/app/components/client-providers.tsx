"use client";

import { useEffect, useState } from "react";
import { AuthUIProvider } from "@daveyplate/better-auth-ui";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type { ReactNode } from "react";
import { Toaster } from "sonner";

import { authClient } from "~/lib/auth-client";

export function ClientProviders({ children }: { children: ReactNode }) {
  const [isClient, setIsClient] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return <>{children}</>;
  }

  return (
    <AuthUIProvider
      authClient={authClient}
      navigate={(path) => router.push(path)}
      replace={(path) => router.replace(path)}
      onSessionChange={() => {
        // Clear router cache (protected routes)
        router.refresh();
      }}
      Link={Link}
    >
      {children}
      <Toaster />
    </AuthUIProvider>
  );
}
