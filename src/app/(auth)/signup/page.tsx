"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Gate } from "@/components/gate";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useApp } from "@/lib/app-state";
import { useGuestOnly } from "@/lib/guards";

const EMAIL_RE = /^\S+@\S+\.\S+$/;

interface FormState {
  username: string;
  email: string;
  password: string;
  confirm: string;
}

export default function SignupPage() {
  const { ready } = useGuestOnly();
  const router = useRouter();
  const { startSignup } = useApp();

  const [form, setForm] = React.useState<FormState>({ username: "", email: "", password: "", confirm: "" });
  const [errors, setErrors] = React.useState<Partial<Record<keyof FormState, string>>>({});

  if (!ready) return <Gate />;

  function set<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const next: typeof errors = {};
    if (form.username.trim().length < 3) next.username = "Pick at least 3 characters";
    if (!EMAIL_RE.test(form.email)) next.email = "Enter a valid email";
    if (form.password.length < 6) next.password = "At least 6 characters";
    if (!form.confirm || form.confirm !== form.password) next.confirm = "Passwords don't match";
    setErrors(next);
    if (Object.keys(next).length) return;
    startSignup(form.username, form.email);
    router.push("/verify");
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
        <h1 className="text-2xl font-semibold tracking-tight">Create your account</h1>
        <p className="text-sm text-muted-foreground">Tell us who&rsquo;s about to find a lot of new games.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-1.5">
          <Label htmlFor="username">Username</Label>
          <Input id="username" placeholder="shadowbyte" value={form.username} onChange={(e) => set("username", e.target.value)} aria-invalid={!!errors.username} />
          {errors.username && <p className="text-xs text-destructive">{errors.username}</p>}
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" placeholder="you@inbox.com" value={form.email} onChange={(e) => set("email", e.target.value)} aria-invalid={!!errors.email} />
          {errors.email && <p className="text-xs text-destructive">{errors.email}</p>}
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="password">Password</Label>
          <Input id="password" type="password" placeholder="At least 6 characters" value={form.password} onChange={(e) => set("password", e.target.value)} aria-invalid={!!errors.password} />
          {errors.password && <p className="text-xs text-destructive">{errors.password}</p>}
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="confirm">Confirm password</Label>
          <Input id="confirm" type="password" placeholder="Repeat password" value={form.confirm} onChange={(e) => set("confirm", e.target.value)} aria-invalid={!!errors.confirm} />
          {errors.confirm && <p className="text-xs text-destructive">{errors.confirm}</p>}
        </div>
        <Button type="submit" className="w-full">Create account</Button>
      </form>

      <p className="text-center text-sm text-muted-foreground">
        Already have one?{" "}
        <Link href="/login" className="font-medium text-primary hover:underline">
          Log in
        </Link>
      </p>
    </div>
  );
}
