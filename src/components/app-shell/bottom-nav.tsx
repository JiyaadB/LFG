"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Gamepad2, Rocket, ShoppingBag, User } from "lucide-react";
import { cn } from "cn";

const TABS = [
  { href: "/home", label: "Home", icon: Gamepad2 },
  { href: "/indie", label: "Indie Dev", icon: Rocket },
  { href: "/profile", label: "Profile", icon: User },
  { href: "/store", label: "Store", icon: ShoppingBag },
] as const;

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="sticky bottom-0 z-20 border-t bg-background/90 backdrop-blur supports-backdrop-filter:bg-background/70">
      <div className="mx-auto flex max-w-md items-center justify-around px-2 py-2">
        {TABS.map((tab) => {
          const active = pathname === tab.href || pathname.startsWith(tab.href + "/");
          const Icon = tab.icon;
          return (
            <Link
              key={tab.href}
              href={tab.href}
              className={cn(
                "flex flex-col items-center gap-1 rounded-xl px-4 py-1.5 text-[11px] font-medium transition-colors",
                active ? "bg-primary/10 text-primary" : "text-muted-foreground hover:text-foreground"
              )}
            >
              <Icon className="size-5" />
              {tab.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
