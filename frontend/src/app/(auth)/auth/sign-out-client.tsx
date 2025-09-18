"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { authClient } from "~/lib/auth-client";

export default function SignOutClient() {
  const router = useRouter();
  const once = useRef(false);

  useEffect(() => {
    if (once.current) return;
    once.current = true;

    authClient
      .signOut()
      .catch(() => {})
      .finally(() => {
        router.replace("/");
        router.refresh();
      });
  }, [router]);

  return <Loader2 className="animate-spin" />;
}

