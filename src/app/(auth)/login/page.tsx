"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Logo } from "@/components/logo";
import { ThemeToggle } from "@/components/theme-toggle";
import { Gate } from "@/components/gate";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useApp } from "@/lib/app-state";
import { useGuestOnly } from "@/lib/guards";

const EMAIL_RE = /^\S+@\S+\.\S+$/;

export default function LoginPage() {
  const { ready } = useGuestOnly();
  const router = useRouter();
  const { login, continueAsGuest } = useApp();

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [errors, setErrors] = React.useState<{ email?: string; password?: string }>({});

  if (!ready) return <Gate />;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const next: typeof errors = {};
    if (!EMAIL_RE.test(email)) next.email = "Enter a valid email";
    if (password.length < 4) next.password = "Password looks too short";
    setErrors(next);
    if (Object.keys(next).length) return;
    login(email);
    router.replace("/home");
  }

  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center justify-between">
        <Logo />
        <ThemeToggle />
      </div>

      <div className="space-y-1.5">
        <h1 className="text-2xl font-semibold tracking-tight">Welcome back</h1>
        <p className="text-sm text-muted-foreground">Your next favorite game is a few swipes away.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-1.5">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" placeholder="you@inbox.com" autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} aria-invalid={!!errors.email} />
          {errors.email && <p className="text-xs text-destructive">{errors.email}</p>}
        </div>
        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <Label htmlFor="password">Password</Label>
            <Link href="/forgot-password" className="text-xs font-medium text-primary hover:underline">
              Forgot password?
            </Link>
          </div>
          <Input id="password" type="password" placeholder="••••••••" autoComplete="current-password" value={password} onChange={(e) => setPassword(e.target.value)} aria-invalid={!!errors.password} />
          {errors.password && <p className="text-xs text-destructive">{errors.password}</p>}
        </div>
        <Button type="submit" className="w-full">Log in</Button>
      </form>

      <div className="flex items-center gap-3 text-xs uppercase text-muted-foreground">
        <Separator className="flex-1" /> or <Separator className="flex-1" />
      </div>

      <Button
        variant="outline"
        className="w-full"
        onClick={() => {
          continueAsGuest();
          router.replace("/home");
        }}
      >
        Just exploring — preview the app
      </Button>

      <p className="text-center text-sm text-muted-foreground">
        New to LFG?{" "}
        <Link href="/signup" className="font-medium text-primary hover:underline">
          Create an account
        </Link>
      </p>
    </div>
  );
}
