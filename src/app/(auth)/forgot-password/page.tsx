"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Gate } from "@/components/gate";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useGuestOnly } from "@/lib/guards";

const EMAIL_RE = /^\S+@\S+\.\S+$/;

export default function ForgotPasswordPage() {
  const { ready } = useGuestOnly();
  const router = useRouter();
  const [email, setEmail] = React.useState("");
  const [error, setError] = React.useState("");

  if (!ready) return <Gate />;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!EMAIL_RE.test(email)) {
      setError("Enter a valid email");
      return;
    }
    router.push(`/forgot-password/sent?email=${encodeURIComponent(email)}`);
  }

  return (
    <div className="flex flex-col gap-6">
      <Button
        render={<Link href="/login" aria-label="Back to log in" />}
        variant="ghost"
        size="icon"
        className="-ml-2 size-8"
      >
        <ArrowLeft />
      </Button>

      <div className="space-y-1.5">
        <h1 className="text-xl font-semibold tracking-tight">Reset your password</h1>
        <p className="text-sm text-muted-foreground">We&rsquo;ll send a reset link to your inbox.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-1.5">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" placeholder="you@inbox.com" value={email} onChange={(e) => setEmail(e.target.value)} aria-invalid={!!error} />
          {error && <p className="text-xs text-destructive">{error}</p>}
        </div>
        <Button type="submit" className="w-full">Send reset link</Button>
      </form>

      <p className="text-center text-sm text-muted-foreground">
        <Link href="/login" className="font-medium text-primary hover:underline">
          Back to log in
        </Link>
      </p>
    </div>
  );
}
