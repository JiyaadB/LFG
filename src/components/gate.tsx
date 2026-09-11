import { Loader2 } from "lucide-react";

/** Simple full-height spinner shown while a route guard is resolving/redirecting. */
export function Gate() {
  return (
    <div className="flex flex-1 items-center justify-center py-24">
      <Loader2 className="size-6 animate-spin text-muted-foreground" />
    </div>
  );
}
