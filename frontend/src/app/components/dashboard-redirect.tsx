"use client";

import { Loader2 } from "lucide-react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function DashboardRedirect() {
  const router = useRouter();
  
  useEffect(() => {
    router.push("/dashboard");
  }, [router]);

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
