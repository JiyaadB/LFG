"use client";

import * as React from "react";
import { Info } from "lucide-react";
import { AppHeader } from "@/components/app-shell/app-header";
import { Chip } from "@/components/chip";
import { SwipeDeck } from "@/components/swipe/swipe-deck";
import { useApp } from "@/lib/app-state";
import { ALL_GENRES, GAMES } from "@/lib/games-data";
import { topGenre } from "@/lib/deck";

const GENRE_FILTERS = ["All", ...ALL_GENRES.filter((g) => GAMES.some((game) => game.genres.includes(g)))].slice(0, 10);

export default function HomePage() {
  const { state, setFilters } = useApp();
  const tg = topGenre(state.affinity);

  return (
    <div className="flex min-h-full flex-col">
      <AppHeader title="Discover" subtitle="Swipe to find your next game" />
      <div className="flex flex-1 flex-col px-4 pt-3">
        <div className="mb-3 flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none]">
          {GENRE_FILTERS.map((g) => (
            <Chip key={g} active={state.filters.genre === g} onClick={() => setFilters({ genre: g })} className="shrink-0 px-3 py-1.5 text-xs">
              {g}
            </Chip>
          ))}
        </div>
        {tg && (
          <div className="mb-3 flex items-center justify-center gap-1.5 text-xs text-muted-foreground">
            <Info className="size-3.5" />
            <span>
              Leaning into <b className="font-semibold text-foreground">{tg}</b> based on your swipes
            </span>
          </div>
        )}
        <SwipeDeck />
      </div>
    </div>
  );
}
