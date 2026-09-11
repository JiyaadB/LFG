"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { useApp } from "@/lib/app-state";

/** For login/signup/forgot-password/verify — bounce signed-in users onward. */
export function useGuestOnly() {
  const router = useRouter();
  const { state, hydrated } = useApp();

  React.useEffect(() => {
    if (!hydrated || !state.authed) return;
    router.replace(state.onboarded ? "/home" : "/onboarding");
  }, [hydrated, state.authed, state.onboarded, router]);

  return { ready: hydrated && !state.authed };
}

/** For the onboarding page — requires a signed-in, not-yet-onboarded user. */
export function useRequireOnboarding() {
  const router = useRouter();
  const { state, hydrated } = useApp();

  React.useEffect(() => {
    if (!hydrated) return;
    if (!state.authed) router.replace("/login");
    else if (state.onboarded) router.replace("/home");
  }, [hydrated, state.authed, state.onboarded, router]);

  return { ready: hydrated && state.authed && !state.onboarded };
}

/** For the main app shell — requires a fully signed-in, onboarded user. */
export function useRequireApp() {
  const router = useRouter();
  const { state, hydrated } = useApp();

  React.useEffect(() => {
    if (!hydrated) return;
    if (!state.authed) router.replace("/login");
    else if (!state.onboarded) router.replace("/onboarding");
  }, [hydrated, state.authed, state.onboarded, router]);

  return { ready: hydrated && state.authed && state.onboarded };
}
