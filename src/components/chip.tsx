"use client";

import type { ReactNode } from "react";
import { cn } from "cn";

export function Chip({
  active,
  onClick,
  children,
  className,
}: {
  active?: boolean;
  onClick?: () => void;
  children: ReactNode;
  className?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-3.5 py-2 text-sm font-medium transition-colors select-none",
        active
          ? "border-primary bg-primary text-primary-foreground"
          : "border-border bg-muted/60 text-muted-foreground hover:text-foreground",
        className
      )}
    >
      {children}
    </button>
  );
}
