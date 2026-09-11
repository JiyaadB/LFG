import Link from "next/link";
import { Rocket } from "lucide-react";
import { AppHeader } from "@/components/app-shell/app-header";
import { Button } from "@/components/ui/button";

export default function IndieSubmittedPage() {
  return (
    <div className="flex min-h-full flex-col">
      <AppHeader title="Indie Dev" subtitle="Discover & submit indie games" />
      <div className="flex flex-1 flex-col items-center justify-center gap-3 px-8 py-16 text-center">
        <Rocket className="size-10 text-muted-foreground" />
        <h3 className="text-lg font-semibold">Submitted for review</h3>
        <p className="max-w-[30ch] text-sm text-muted-foreground">
          Our (fictional, demo) curation team looks at every submission within 5 business days.
        </p>
        <Button render={<Link href="/indie" />} variant="outline" className="mt-2">
          Back to Indie Dev
        </Button>
      </div>
    </div>
  );
}
