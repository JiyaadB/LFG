"use client";

import * as React from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Mail } from "lucide-react";
import { Gate } from "@/components/gate";
import { Button } from "@/components/ui/button";
import { useGuestOnly } from "@/lib/guards";

function SentContent() {
  const { ready } = useGuestOnly();
  const searchParams = useSearchParams();
  const email = searchParams.get("email");

  if (!ready) return <Gate />;

  return (
    <div className="flex flex-col items-center gap-4 text-center">
      <div className="flex size-14 items-center justify-center rounded-full bg-muted">
        <Mail className="size-6 text-muted-foreground" />
      </div>
      <h1 className="text-xl font-semibold tracking-tight">Check your inbox</h1>
      <p className="max-w-[26ch] text-sm text-muted-foreground">
        If an LFG account exists for{" "}
        <span className="font-medium text-foreground">{email || "that address"}</span>, a reset link is on its way.
      </p>
      <Button render={<Link href="/login" />} className="mt-2">
        Back to log in
      </Button>
    </div>
  );
}

export default function ForgotPasswordSentPage() {
  return (
    <React.Suspense fallback={<Gate />}>
      <SentContent />
    </React.Suspense>
  );
}
