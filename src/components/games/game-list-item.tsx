import type { ReactNode } from "react";
import type { Game } from "@/lib/types";

export function GameListItem({
  game,
  subtitle,
  titleRight,
  children,
}: {
  game: Game;
  subtitle: ReactNode;
  titleRight?: ReactNode;
  children?: ReactNode;
}) {
  return (
    <div className="flex gap-3 rounded-2xl border bg-card p-3">
      <div
        className="flex size-14 shrink-0 items-center justify-center rounded-xl text-2xl"
        style={{ background: `linear-gradient(160deg, ${game.gradient[0]}, ${game.gradient[1]})` }}
      >
        {game.glyph}
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-baseline justify-between gap-2">
          <span className="truncate font-semibold">{game.title}</span>
          {titleRight}
        </div>
        <div className="mt-0.5 text-xs text-muted-foreground">{subtitle}</div>
        {children && <div className="mt-2.5 flex flex-wrap gap-1.5">{children}</div>}
      </div>
    </div>
  );
}
