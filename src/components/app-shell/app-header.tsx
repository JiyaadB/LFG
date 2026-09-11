import { Logo } from "@/components/logo";
import { ThemeToggle } from "@/components/theme-toggle";

export function AppHeader({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div className="sticky top-0 z-10 flex items-center justify-between border-b bg-background/90 px-4 py-3.5 backdrop-blur supports-backdrop-filter:bg-background/70">
      <div>
        <h1 className="text-base font-semibold leading-tight">{title}</h1>
        {subtitle && <p className="text-xs text-muted-foreground">{subtitle}</p>}
      </div>
      <div className="flex items-center gap-2">
        <ThemeToggle />
        <Logo />
      </div>
    </div>
  );
}
