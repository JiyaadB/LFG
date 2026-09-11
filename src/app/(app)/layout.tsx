"use client";

import type { ReactNode } from "react";
import { Gate } from "@/components/gate";
import { BottomNav } from "@/components/app-shell/bottom-nav";
import { useRequireApp } from "@/lib/guards";

export default function AppGroupLayout({ children }: { children: ReactNode }) {
  const { ready } = useRequireApp();

  if (!ready) return <Gate />;

  return (
    <div className="mx-auto flex min-h-svh w-full max-w-md flex-1 flex-col border-x bg-background">
      <div className="flex-1 overflow-y-auto pb-2">{children}</div>
      <BottomNav />
    </div>
  );
}
