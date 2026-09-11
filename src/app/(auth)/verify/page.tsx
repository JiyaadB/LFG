"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Logo } from "@/components/logo";
import { Gate } from "@/components/gate";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useApp } from "@/lib/app-state";
import { useGuestOnly } from "@/lib/guards";

const CODE_LENGTH = 5;

export default function VerifyPage() {
  const { ready } = useGuestOnly();
  const router = useRouter();
  const { state, verifyEmail, resendCode } = useApp();

  const [otp, setOtp] = React.useState<string[]>(Array(CODE_LENGTH).fill(""));
  const inputs = React.useRef<(HTMLInputElement | null)[]>([]);

  if (!ready) return <Gate />;

  const complete = otp.every((v) => v !== "");

  function handleChange(i: number, raw: string) {
    const v = raw.replace(/[^0-9]/g, "").slice(0, 1);
    setOtp((prev) => {
      const next = [...prev];
      next[i] = v;
      return next;
    });
    if (v && i < CODE_LENGTH - 1) inputs.current[i + 1]?.focus();
  }

  function handleKeyDown(i: number, e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Backspace" && !otp[i] && i > 0) inputs.current[i - 1]?.focus();
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!complete) return;
    verifyEmail();
    router.push("/onboarding");
  }

  return (
    <div className="flex flex-col gap-8">
      <Logo />

      <div className="space-y-1.5">
        <h1 className="text-xl font-semibold tracking-tight">Verify your email</h1>
        <p className="text-sm text-muted-foreground">
          We sent a {CODE_LENGTH}-digit code to{" "}
          <span className="font-medium text-foreground">{state.pendingEmail || state.user.email || "your email"}</span>.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="flex gap-2">
          {otp.map((v, i) => (
            <Input
              key={i}
              ref={(el) => {
                inputs.current[i] = el;
              }}
              value={v}
              onChange={(e) => handleChange(i, e.target.value)}
              onKeyDown={(e) => handleKeyDown(i, e)}
              inputMode="numeric"
              maxLength={1}
              className="h-14 flex-1 text-center text-lg font-semibold"
            />
          ))}
        </div>
        <Button type="submit" className="w-full" disabled={!complete}>
          Verify &amp; continue
        </Button>
      </form>

      <p className="text-center text-sm text-muted-foreground">
        Didn&rsquo;t get it?{" "}
        <button
          type="button"
          className="font-medium text-primary hover:underline"
          onClick={() => {
            resendCode();
            toast.info("Code resent (demo) — try 00000");
          }}
        >
          Resend code
        </button>
      </p>
    </div>
  );
}
