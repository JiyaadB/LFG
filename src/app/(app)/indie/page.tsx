"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { AppHeader } from "@/components/app-shell/app-header";
import { GameListItem } from "@/components/games/game-list-item";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useApp } from "@/lib/app-state";
import { GAMES } from "@/lib/games-data";

const SPOTLIGHT = GAMES.filter((g) => g.indie).slice(0, 4);

export default function IndiePage() {
  const router = useRouter();
  const { state, swipe } = useApp();

  const [title, setTitle] = React.useState("");
  const [link, setLink] = React.useState("");
  const [pitch, setPitch] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [error, setError] = React.useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim()) {
      setError("Add a game title first");
      return;
    }
    setError("");
    router.push("/indie/submitted");
  }

  return (
    <div className="flex min-h-full flex-col">
      <AppHeader title="Indie Dev" subtitle="Discover & submit indie games" />
      <div className="flex-1 space-y-6 px-4 py-4">
        <div className="rounded-2xl border bg-gradient-to-br from-muted to-muted/50 p-5">
          <h2 className="mb-1.5 text-lg font-semibold">Get discovered on LFG</h2>
          <p className="text-sm leading-relaxed text-muted-foreground">
            Every swipe-right on your game adds it to a real wishlist and surfaces it higher for players with
            matching taste. No algorithm blackout — just genre and mode signal, same as everyone else.
          </p>
        </div>

        <div>
          <div className="mb-2.5 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            This week&rsquo;s indie spotlight
          </div>
          <div className="flex flex-col gap-2.5">
            {SPOTLIGHT.map((g) => {
              const liked = state.swiped[g.id] === "liked";
              return (
                <GameListItem key={g.id} game={g} subtitle={g.tagline}>
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-7 border-primary/40 text-xs text-primary"
                    disabled={liked}
                    onClick={() => {
                      swipe(g.id, "liked");
                      toast.success(`Added ${g.title} to your wishlist`);
                    }}
                  >
                    {liked ? "On your wishlist" : "+ Add to wishlist"}
                  </Button>
                </GameListItem>
              );
            })}
          </div>
        </div>

        <div>
          <div className="mb-2.5 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            Submit your game
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="dev-title">Game title</Label>
              <Input id="dev-title" placeholder="e.g. Molt" value={title} onChange={(e) => setTitle(e.target.value)} aria-invalid={!!error} />
              {error && <p className="text-xs text-destructive">{error}</p>}
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="dev-link">Store link</Label>
              <Input id="dev-link" placeholder="https://store.steampowered.com/..." value={link} onChange={(e) => setLink(e.target.value)} />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="dev-pitch">One-line pitch</Label>
              <Textarea id="dev-pitch" placeholder="What makes it worth swiping right on?" value={pitch} onChange={(e) => setPitch(e.target.value)} />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="dev-email">Contact email</Label>
              <Input id="dev-email" type="email" placeholder="studio@yourgame.dev" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <p className="text-xs text-muted-foreground">
              Prototype form — nothing is sent yet. Wiring this to a real inbox is a backend step.
            </p>
            <Button type="submit" className="w-full">Submit for review</Button>
          </form>
        </div>
      </div>
    </div>
  );
}
