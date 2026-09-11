import * as React from "react";
import { Badge } from "@/components/ui/badge";
import type { Game } from "@/lib/types";
import { cn } from "cn";

interface SwipeCardProps {
  game: Game;
  stackIndex: number;
  isTop: boolean;
  likeOpacity?: number;
  passOpacity?: number;
}

export const SwipeCard = React.forwardRef<HTMLDivElement, SwipeCardProps>(
  ({ game, stackIndex, isTop, likeOpacity = 0, passOpacity = 0 }, ref) => {
    const stackStyle: React.CSSProperties = isTop
      ? {}
      : {
          transform: `translateY(${stackIndex * 10}px) scale(${1 - stackIndex * 0.045})`,
          opacity: 1 - stackIndex * 0.25,
        };

    return (
      <div
        ref={ref}
        className={cn(
          "absolute inset-0 flex touch-none flex-col overflow-hidden rounded-3xl border bg-card shadow-xl"
        )}
        style={{ zIndex: 10 - stackIndex, ...stackStyle }}
      >
        <div
          className="relative flex h-[56%] shrink-0 items-center justify-center text-7xl"
          style={{ background: `linear-gradient(160deg, ${game.gradient[0]}, ${game.gradient[1]})` }}
        >
          {game.indie && (
            <span className="absolute left-3 top-3 rounded-full bg-black/50 px-2.5 py-1 font-mono text-[10px] uppercase tracking-wide text-white backdrop-blur">
              Indie
            </span>
          )}
          <span>{game.glyph}</span>
          {isTop && (
            <>
              <div
                className="absolute right-5 top-6 -rotate-12 rounded-md border-[3px] border-primary px-4 py-1.5 text-xl font-bold uppercase tracking-wide text-primary"
                style={{ opacity: likeOpacity }}
              >
                Yes
              </div>
              <div
                className="absolute left-5 top-6 rotate-12 rounded-md border-[3px] border-muted-foreground px-4 py-1.5 text-xl font-bold uppercase tracking-wide text-muted-foreground"
                style={{ opacity: passOpacity }}
              >
                Pass
              </div>
            </>
          )}
        </div>

        <div className="flex min-h-0 flex-1 flex-col gap-2 p-4">
          <div className="flex items-baseline justify-between gap-2">
            <span className="text-lg font-semibold">{game.title}</span>
            <span className="shrink-0 font-mono text-sm font-medium text-primary">
              {game.price === 0 ? "Free" : `$${game.price.toFixed(2)}`}
            </span>
          </div>
          <p className="-mt-1 text-xs text-muted-foreground">{game.tagline}</p>
          <div className="flex flex-wrap gap-1.5">
            <Badge variant="secondary" className="bg-primary/10 text-primary">{game.mode}</Badge>
            {game.genres.map((g) => (
              <Badge key={g} variant="secondary">{g}</Badge>
            ))}
          </div>
          <p className="line-clamp-2 text-xs leading-relaxed text-muted-foreground">{game.desc}</p>
          <p className="mt-auto border-l-2 pl-2 text-[11px] italic text-muted-foreground">
            &ldquo;{game.quote}&rdquo; — {game.outlet}
          </p>
        </div>
      </div>
    );
  }
);
SwipeCard.displayName = "SwipeCard";
