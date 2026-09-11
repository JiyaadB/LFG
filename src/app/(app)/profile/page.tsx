"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChevronRight, LogOut, Settings } from "lucide-react";
import { AppHeader } from "@/components/app-shell/app-header";
import { Badge } from "@/components/ui/badge";
import { useApp } from "@/lib/app-state";
import { PLATFORM_META } from "@/lib/games-data";
import { topGenre } from "@/lib/deck";

export default function ProfilePage() {
  const router = useRouter();
  const { state, logout } = useApp();
  const { user } = state;

  const likedCount = Object.values(state.swiped).filter((d) => d === "liked").length;
  const passedCount = Object.values(state.swiped).filter((d) => d === "passed").length;
  const tg = topGenre(state.affinity) ?? "—";
  const handle = "@" + (user.name || "player").toLowerCase().replace(/\s+/g, "");

  return (
    <div className="flex min-h-full flex-col">
      <AppHeader title="Profile" subtitle={handle} />
      <div className="flex-1 px-4 py-4">
        <div className="flex flex-col items-center gap-2 py-3 text-center">
          <div
            className="flex size-16 items-center justify-center rounded-2xl text-3xl"
            style={{ background: `${user.avatar.color}22`, color: user.avatar.color }}
          >
            {user.avatar.emoji}
          </div>
          <div className="text-lg font-semibold">{user.name || "Player"}</div>
          <p className="text-sm text-muted-foreground">{user.bio}</p>
        </div>

        <div className="my-5 grid grid-cols-3 gap-2">
          <div className="rounded-xl border bg-card p-3 text-center">
            <div className="font-mono text-lg font-semibold text-primary">{likedCount}</div>
            <div className="mt-0.5 text-[10px] uppercase tracking-wide text-muted-foreground">Liked</div>
          </div>
          <div className="rounded-xl border bg-card p-3 text-center">
            <div className="font-mono text-lg font-semibold text-primary">{passedCount}</div>
            <div className="mt-0.5 text-[10px] uppercase tracking-wide text-muted-foreground">Passed</div>
          </div>
          <div className="rounded-xl border bg-card p-3 text-center">
            <div className="truncate text-sm font-semibold text-primary">{tg}</div>
            <div className="mt-0.5 text-[10px] uppercase tracking-wide text-muted-foreground">Top genre</div>
          </div>
        </div>

        <div className="mb-1.5 text-xs font-semibold uppercase tracking-wide text-muted-foreground">Favorite genres</div>
        <div className="mb-5 flex flex-wrap gap-1.5">
          {user.genres.length ? (
            user.genres.map((g) => <Badge key={g} variant="secondary">{g}</Badge>)
          ) : (
            <Badge variant="secondary">Add your favorite genres</Badge>
          )}
        </div>

        <div className="mb-1.5 text-xs font-semibold uppercase tracking-wide text-muted-foreground">Platforms</div>
        <div className="mb-6 flex flex-wrap gap-1.5">
          {user.platforms.length ? (
            user.platforms.map((p) => <Badge key={p} variant="secondary">{PLATFORM_META[p].label}</Badge>)
          ) : (
            <Badge variant="secondary">No platforms set</Badge>
          )}
        </div>

        <div className="mb-1.5 text-xs font-semibold uppercase tracking-wide text-muted-foreground">Settings</div>
        <div className="divide-y rounded-xl border">
          <Link href="/profile/settings" className="flex items-center justify-between px-3.5 py-3 text-sm font-medium">
            <span className="flex items-center gap-2.5">
              <Settings className="size-4" /> Account &amp; settings
            </span>
            <ChevronRight className="size-4 text-muted-foreground" />
          </Link>
          <button
            className="flex w-full items-center gap-2.5 px-3.5 py-3 text-sm font-medium text-destructive"
            onClick={() => {
              logout();
              router.replace("/login");
            }}
          >
            <LogOut className="size-4" /> Log out
          </button>
        </div>
      </div>
    </div>
  );
}
