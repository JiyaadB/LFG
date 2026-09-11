import { Gamepad2 } from "lucide-react";
import { cn } from "cn";

export function Logo({ className }: { className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-2 font-semibold tracking-tight", className)}>
      <span className="flex size-7 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground">
        <Gamepad2 className="size-4" />
      </span>
      <span className="text-lg">LFG</span>
    </span>
  );
}
