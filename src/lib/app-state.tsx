"use client";

import * as React from "react";
import { AVATARS, GAMES, gameById, shuffle } from "@/lib/games-data";
import type { AppState, Platform, SwipeDirection, UserProfile } from "@/lib/types";

const STORAGE_KEY = "lfg_app_state_v1";

const DEFAULT_USER: UserProfile = {
  name: "",
  email: "",
  avatar: AVATARS[0],
  genres: [],
  platforms: [],
  bio: "Still figuring out what I'm into.",
};

const DEFAULT_STATE: AppState = {
  authed: false,
  onboarded: false,
  pendingEmail: "",
  user: DEFAULT_USER,
  swiped: {},
  order: GAMES.map((g) => g.id),
  affinity: {},
  filters: { genre: "All", mode: "All" },
  notif: { matches: true, digest: false },
};

interface AppContextValue {
  state: AppState;
  hydrated: boolean;
  /** Continue as a guest without a real account (demo/preview mode). */
  continueAsGuest(): void;
  /** Fake "log in" — in this prototype any well-formed email/password pair succeeds. */
  login(email: string): void;
  /** Start signup — stashes the email pending OTP verification. */
  startSignup(username: string, email: string): void;
  /** Complete OTP verification and move into onboarding. */
  verifyEmail(): void;
  resendCode(): void;
  completeOnboarding(profile: Partial<UserProfile>): void;
  logout(): void;
  swipe(gameId: string, dir: SwipeDirection): void;
  removeFromWishlist(gameId: string): void;
  setFilters(filters: Partial<AppState["filters"]>): void;
  resetDeck(): void;
  updateProfile(profile: Partial<UserProfile>): void;
  toggleNotif(key: keyof AppState["notif"]): void;
  deleteAccount(): void;
}

const AppContext = React.createContext<AppContextValue | null>(null);

function bumpAffinity(affinity: Record<string, number>, genres: string[], dir: SwipeDirection) {
  const next = { ...affinity };
  genres.forEach((g) => {
    next[g] = (next[g] ?? 0) + (dir === "liked" ? 1 : -0.4);
  });
  return next;
}

export function AppStateProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = React.useState<AppState>(DEFAULT_STATE);
  const [hydrated, setHydrated] = React.useState(false);

  React.useEffect(() => {
    // One-time hydration from a browser-only API (localStorage) that isn't
    // available during SSR — this has to run after mount, so the usual
    // "avoid setState in an effect" advice doesn't apply here.
    /* eslint-disable react-hooks/set-state-in-effect */
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as Partial<AppState>;
        setState((s) => ({ ...s, ...parsed, user: { ...s.user, ...parsed.user } }));
      }
    } catch {
      // ignore corrupt storage
    }
    setHydrated(true);
    /* eslint-enable react-hooks/set-state-in-effect */
  }, []);

  React.useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      // storage full / unavailable — non-fatal for a prototype
    }
  }, [state, hydrated]);

  const value = React.useMemo<AppContextValue>(() => ({
    state,
    hydrated,

    continueAsGuest() {
      setState((s) => ({
        ...s,
        authed: true,
        onboarded: true,
        user: s.user.name ? s.user : { ...s.user, name: "Guest Player", email: "guest@lfg.app" },
      }));
    },

    login(email) {
      setState((s) => ({
        ...s,
        authed: true,
        onboarded: true,
        user: s.user.name ? s.user : { ...s.user, name: email.split("@")[0], email },
      }));
    },

    startSignup(username, email) {
      setState((s) => ({
        ...s,
        pendingEmail: email,
        user: { ...s.user, name: username, email },
      }));
    },

    verifyEmail() {
      setState((s) => ({ ...s, authed: true, onboarded: false }));
    },

    resendCode() {
      // Demo-only: no real email is sent.
    },

    completeOnboarding(profile) {
      setState((s) => {
        const user = { ...s.user, ...profile };
        let affinity = s.affinity;
        (user.genres ?? []).forEach((g) => {
          affinity = { ...affinity, [g]: (affinity[g] ?? 0) + 0.8 };
        });
        return { ...s, user, affinity, onboarded: true };
      });
    },

    logout() {
      setState((s) => ({ ...s, authed: false }));
    },

    swipe(gameId, dir) {
      setState((s) => {
        const game = gameById(gameId);
        const swiped = { ...s.swiped, [gameId]: dir };
        const affinity = game ? bumpAffinity(s.affinity, game.genres, dir) : s.affinity;
        return { ...s, swiped, affinity };
      });
    },

    removeFromWishlist(gameId) {
      setState((s) => {
        const swiped = { ...s.swiped };
        delete swiped[gameId];
        return { ...s, swiped };
      });
    },

    setFilters(filters) {
      setState((s) => ({ ...s, filters: { ...s.filters, ...filters } }));
    },

    resetDeck() {
      setState((s) => ({ ...s, swiped: {}, order: shuffle(GAMES.map((g) => g.id)) }));
    },

    updateProfile(profile) {
      setState((s) => ({ ...s, user: { ...s.user, ...profile } }));
    },

    toggleNotif(key) {
      setState((s) => ({ ...s, notif: { ...s.notif, [key]: !s.notif[key] } }));
    },

    deleteAccount() {
      try {
        localStorage.removeItem(STORAGE_KEY);
      } catch {
        // ignore
      }
      setState(DEFAULT_STATE);
    },
  }), [state, hydrated]);

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const ctx = React.useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used within an AppStateProvider");
  return ctx;
}

export function togglePlatform(list: Platform[], p: Platform): Platform[] {
  return list.includes(p) ? list.filter((x) => x !== p) : [...list, p];
}

export function toggleGenre(list: string[], g: string): string[] {
  return list.includes(g) ? list.filter((x) => x !== g) : [...list, g];
}
