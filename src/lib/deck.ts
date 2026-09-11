import { gameById } from "@/lib/games-data";
import type { AppState, Game } from "@/lib/types";

function scoreGame(g: Game, affinity: Record<string, number>) {
  return g.genres.reduce((s, gg) => s + (affinity[gg] ?? 0), 0);
}

export function computeDeck(state: AppState): Game[] {
  const { filters, swiped, order, affinity } = state;
  return order
    .map(gameById)
    .filter((g): g is Game => !!g && !swiped[g.id])
    .filter((g) => filters.genre === "All" || g.genres.includes(filters.genre))
    .filter((g) => filters.mode === "All" || g.mode === filters.mode)
    .sort((a, b) => scoreGame(b, affinity) - scoreGame(a, affinity));
}

export function topGenre(affinity: Record<string, number>): string | null {
  let best: string | null = null;
  let bestScore = -Infinity;
  Object.entries(affinity).forEach(([g, score]) => {
    if (score > bestScore) {
      bestScore = score;
      best = g;
    }
  });
  return best && bestScore > 0.4 ? best : null;
}
