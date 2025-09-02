"use client";

import { AccountView } from "@daveyplate/better-auth-ui";
import { ArrowLeftIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "~/components/ui/button";

export function AccountView({ pathname }: { pathname: string }) {
  const router = useRouter();

  return (
    <main className="container flex grow flex-col items-center justify-center gap-3 self-center p-4 md:p-6">
      {["settings", "security", "api-keys", "organizations"].includes(pathname) && (
        <Button
          className="self-start"
          variant="outline"
          onClick={() => router.back()}
        >
          <ArrowLeftIcon />
          Back
        </Button>
      )}
      <AccountView pathname={pathname} />
    </main>
  );
}
