"use client";

import { Loader2 } from "lucide-react";
import { useEffect } from "react";
import { authClient } from "~/lib/auth-client";

export default function DashboardRedirect() {
  useEffect(() => {
    const dashboard = async () => {
      await authClient.customer.portal();
    };
    void dashboard();
  }, []);

  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <div className="flex items-center gap-4">
        <Loader2 className="h-5 w-5 animate-spin" />
        <span className="text-muted-foreground">
          Redirecting to dashboard...
        </span>
      </div>
    </div>
  );
}
