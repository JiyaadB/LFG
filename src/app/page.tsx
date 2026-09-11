"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { useApp } from "@/lib/app-state";
import { Loader2 } from "lucide-react";

export default function RootPage() {
  const router = useRouter();
  const { state, hydrated } = useApp();

  React.useEffect(() => {
    if (!hydrated) return;
    if (!state.authed) {
      router.replace("/login");
    } else if (!state.onboarded) {
      router.replace("/onboarding");
    } else {
      router.replace("/home");
    }
  }, [hydrated, state.authed, state.onboarded, router]);

  return (
    <div className="flex flex-1 items-center justify-center">
      <Loader2 className="size-6 animate-spin text-muted-foreground" />
    </div>
  );
}
