"use client";

import { ShoppingBag, X } from "lucide-react";
import { AppHeader } from "@/components/app-shell/app-header";
import { GameListItem } from "@/components/games/game-list-item";
import { Button } from "@/components/ui/button";
import { useApp } from "@/lib/app-state";
import { gameById, PLATFORM_META } from "@/lib/games-data";

export default function StorePage() {
  const { state, removeFromWishlist } = useApp();
  const liked = Object.entries(state.swiped)
    .filter(([, dir]) => dir === "liked")
    .map(([id]) => gameById(id))
    .filter((g): g is NonNullable<typeof g> => !!g);

  return (
    <div className="flex min-h-full flex-col">
      <AppHeader
        title="Your Store"
        subtitle={`${liked.length} ${liked.length === 1 ? "game" : "games"} wishlisted`}
      />
      <div className="flex-1 px-4 py-3">
        {liked.length === 0 ? (
          <div className="flex flex-col items-center gap-3 px-6 py-16 text-center text-sm text-muted-foreground">
            <ShoppingBag className="size-8" />
            <p>
              Nothing here yet. Swipe right on <b className="text-foreground">Home</b> to start building your
              wishlist — matched games land here with links to buy.
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-2.5">
            {liked.map((g) => (
              <GameListItem
                key={g.id}
                game={g}
                subtitle={`${g.genres.join(" · ")} · ${g.price === 0 ? "Free" : `$${g.price.toFixed(2)}`}`}
                titleRight={
                  <Button
                    variant="ghost"
                    size="icon-sm"
                    className="text-muted-foreground"
                    aria-label={`Remove ${g.title} from wishlist`}
                    onClick={() => removeFromWishlist(g.id)}
                  >
                    <X className="size-4" />
                  </Button>
                }
              >
                {g.platforms.map((p) => (
                  <Button
                    key={p}
                    render={<a href={PLATFORM_META[p].url} target="_blank" rel="noopener noreferrer" />}
                    variant="outline"
                    size="sm"
                    className="h-7 text-xs"
                  >
                    View on {PLATFORM_META[p].label}
                  </Button>
                ))}
              </GameListItem>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
