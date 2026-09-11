"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Gate } from "@/components/gate";
import { Chip } from "@/components/chip";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useApp, toggleGenre, togglePlatform } from "@/lib/app-state";
import { useRequireOnboarding } from "@/lib/guards";
import { ALL_GENRES, AVATARS, PLATFORM_META } from "@/lib/games-data";
import type { Platform } from "@/lib/types";
import { cn } from "cn";

export default function OnboardingPage() {
  const { ready } = useRequireOnboarding();
  const router = useRouter();
  const { state, completeOnboarding } = useApp();

  const [name, setName] = React.useState(state.user.name);
  const [avatarIndex, setAvatarIndex] = React.useState(
    Math.max(0, AVATARS.findIndex((a) => a.emoji === state.user.avatar.emoji))
  );
  const [genres, setGenres] = React.useState<string[]>(state.user.genres);
  const [platforms, setPlatforms] = React.useState<Platform[]>(state.user.platforms);

  if (!ready) return <Gate />;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    completeOnboarding({
      name: name.trim() || state.user.name || "Player",
      avatar: AVATARS[avatarIndex],
      genres,
      platforms,
    });
    router.replace("/home");
  }

  return (
    <div className="flex flex-col gap-6 pt-4">
      <div className="space-y-1.5">
        <h1 className="text-xl font-semibold tracking-tight">Set up your profile</h1>
        <p className="text-sm text-muted-foreground">This tunes your very first stack of games — swipes refine it from here.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-1.5">
          <Label htmlFor="name">Display name</Label>
          <Input id="name" value={name} onChange={(e) => setName(e.target.value)} />
        </div>

        <div className="space-y-2">
          <Label>Pick an avatar</Label>
          <div className="flex flex-wrap gap-2.5">
            {AVATARS.map((a, i) => (
              <button
                key={a.emoji}
                type="button"
                onClick={() => setAvatarIndex(i)}
                className={cn(
                  "flex size-12 items-center justify-center rounded-2xl border-2 text-xl transition-colors",
                  avatarIndex === i ? "border-primary" : "border-transparent"
                )}
                style={{ background: `${a.color}22`, color: a.color }}
              >
                {a.emoji}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <Label>Genres you like</Label>
          <div className="flex flex-wrap gap-2">
            {ALL_GENRES.map((g) => (
              <Chip key={g} active={genres.includes(g)} onClick={() => setGenres((s) => toggleGenre(s, g))}>
                {g}
              </Chip>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <Label>Where you play</Label>
          <div className="flex flex-wrap gap-2">
            {(Object.keys(PLATFORM_META) as Platform[]).map((p) => (
              <Chip key={p} active={platforms.includes(p)} onClick={() => setPlatforms((s) => togglePlatform(s, p))}>
                {PLATFORM_META[p].label}
              </Chip>
            ))}
          </div>
        </div>

        <Button type="submit" className="w-full">Enter LFG</Button>
      </form>
    </div>
  );
}
