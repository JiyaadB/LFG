"use client";

import * as React from "react";
import { toast } from "sonner";
import { Info, PartyPopper, RotateCcw, Heart, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SwipeCard } from "@/components/swipe/swipe-card";
import { useApp } from "@/lib/app-state";
import { computeDeck } from "@/lib/deck";
import type { Game, SwipeDirection } from "@/lib/types";

const DRAG_THRESHOLD = 110;

export function SwipeDeck() {
  const { state, resetDeck } = useApp();
  const deck = React.useMemo(() => computeDeck(state), [state]);
  const top = deck[0] as Game | undefined;

  if (!top) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center gap-3 px-8 py-16 text-center">
        <PartyPopper className="size-10 text-muted-foreground" />
        <h3 className="text-lg font-semibold">You&rsquo;ve cleared the queue</h3>
        <p className="max-w-[30ch] text-sm text-muted-foreground">
          No more games match these filters right now. Widen your filters or replay the demo deck.
        </p>
        <Button onClick={resetDeck} className="mt-2 gap-1.5">
          <RotateCcw className="size-4" /> Replay demo deck
        </Button>
      </div>
    );
  }

  // Keyed on the top game's id so drag state resets for free on remount
  // (via a filter change, resetDeck, etc.) instead of via an extra effect.
  return <ActiveDeck key={top.id} deck={deck} top={top} />;
}

function ActiveDeck({ deck, top }: { deck: Game[]; top: Game }) {
  const { swipe } = useApp();
  const cardRef = React.useRef<HTMLDivElement | null>(null);
  const dragState = React.useRef({ dragging: false, startX: 0, startY: 0, dx: 0 });
  const [drag, setDrag] = React.useState({ dx: 0, dy: 0 });

  function commit(dir: SwipeDirection) {
    const el = cardRef.current;
    const flyX = dir === "liked" ? window.innerWidth : -window.innerWidth;
    if (el) {
      el.style.transition = "transform .38s cubic-bezier(.2,.8,.3,1), opacity .38s";
      el.style.transform = `translate(${flyX}px, -40px) rotate(${dir === "liked" ? 24 : -24}deg)`;
      el.style.opacity = "0";
    }
    window.setTimeout(() => {
      swipe(top.id, dir);
      if (dir === "liked") toast.success(`Added ${top.title} to your wishlist`);
    }, 220);
  }

  function onPointerDown(e: React.PointerEvent) {
    dragState.current = { dragging: true, startX: e.clientX, startY: e.clientY, dx: 0 };
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
    if (cardRef.current) cardRef.current.style.transition = "none";
  }

  function onPointerMove(e: React.PointerEvent) {
    if (!dragState.current.dragging) return;
    const dx = e.clientX - dragState.current.startX;
    const dy = (e.clientY - dragState.current.startY) * 0.4;
    dragState.current.dx = dx;
    setDrag({ dx, dy });
  }

  function endDrag() {
    if (!dragState.current.dragging) return;
    dragState.current.dragging = false;
    const { dx } = dragState.current;
    if (cardRef.current) cardRef.current.style.transition = "";
    if (Math.abs(dx) > DRAG_THRESHOLD) {
      commit(dx > 0 ? "liked" : "passed");
    } else {
      setDrag({ dx: 0, dy: 0 });
    }
  }

  const rot = drag.dx / 18;
  const t = Math.min(Math.abs(drag.dx) / DRAG_THRESHOLD, 1);
  const likeOpacity = drag.dx > 0 ? t : 0;
  const passOpacity = drag.dx < 0 ? t : 0;

  return (
    <div className="flex flex-1 flex-col">
      <div className="relative mx-auto mb-4 h-[58vh] max-h-[560px] w-full">
        {deck.slice(0, 3).map((g, i) =>
          i === 0 ? (
            <SwipeCard
              key={g.id}
              ref={cardRef}
              game={g}
              stackIndex={i}
              isTop
              likeOpacity={likeOpacity}
              passOpacity={passOpacity}
            />
          ) : (
            <SwipeCard key={g.id} game={g} stackIndex={i} isTop={false} />
          )
        )}
        {/* Invisible drag-capture layer sized to the top card */}
        <div
          className="absolute inset-0 z-20"
          style={{ transform: `translate(${drag.dx}px, ${drag.dy}px) rotate(${rot}deg)`, touchAction: "none" }}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={endDrag}
          onPointerCancel={endDrag}
        />
      </div>

      <div className="mb-2 flex items-center justify-center gap-5">
        <Button
          variant="outline"
          size="icon"
          className="size-14 rounded-full text-muted-foreground shadow-sm"
          onClick={() => commit("passed")}
          aria-label="Pass"
        >
          <X className="size-6" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="size-11 rounded-full text-primary shadow-sm"
          onClick={() => toast.info(`${top.title} — full trailer & reviewer links arrive once game data connects live.`)}
          aria-label="Details"
        >
          <Info className="size-5" />
        </Button>
        <Button
          size="icon"
          className="size-16 rounded-full shadow-sm"
          onClick={() => commit("liked")}
          aria-label="Add to wishlist"
        >
          <Heart className="size-6 fill-current" />
        </Button>
      </div>
    </div>
  );
}
