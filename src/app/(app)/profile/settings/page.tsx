"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { ArrowLeft, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useApp } from "@/lib/app-state";

export default function AccountSettingsPage() {
  const router = useRouter();
  const { state, updateProfile, toggleNotif, deleteAccount } = useApp();
  const { user, notif } = state;

  const [name, setName] = React.useState(user.name);
  const [email, setEmail] = React.useState(user.email);
  const [bio, setBio] = React.useState(user.bio);
  const [deleteOpen, setDeleteOpen] = React.useState(false);

  function handleSave() {
    updateProfile({
      name: name.trim() || user.name,
      email: email.trim() || user.email,
      bio: bio.trim() || user.bio,
    });
    toast.success("Settings saved");
  }

  return (
    <div className="flex min-h-full flex-col">
      <div className="flex items-center gap-3 border-b px-4 py-3.5">
        <Button
          render={<Link href="/profile" aria-label="Back to profile" />}
          variant="ghost"
          size="icon"
          className="size-8"
        >
          <ArrowLeft className="size-4" />
        </Button>
        <h1 className="text-base font-semibold">Account &amp; settings</h1>
      </div>

      <div className="flex-1 space-y-6 px-4 py-4">
        <div>
          <div className="mb-2.5 text-xs font-semibold uppercase tracking-wide text-muted-foreground">Profile</div>
          <div className="space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="acct-name">Display name</Label>
              <Input id="acct-name" value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="acct-email">Email</Label>
              <Input id="acct-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="acct-bio">Bio</Label>
              <Textarea id="acct-bio" value={bio} onChange={(e) => setBio(e.target.value)} />
            </div>
            <Button className="w-full" onClick={handleSave}>Save changes</Button>
          </div>
        </div>

        <div>
          <div className="mb-2.5 text-xs font-semibold uppercase tracking-wide text-muted-foreground">Notifications</div>
          <div className="divide-y rounded-xl border">
            <div className="flex items-center justify-between px-3.5 py-3">
              <span className="flex items-center gap-2.5 text-sm font-medium">
                <Bell className="size-4" /> New match alerts
              </span>
              <Switch checked={notif.matches} onCheckedChange={() => toggleNotif("matches")} />
            </div>
            <div className="flex items-center justify-between px-3.5 py-3">
              <span className="flex items-center gap-2.5 text-sm font-medium">
                <Bell className="size-4" /> Weekly indie digest
              </span>
              <Switch checked={notif.digest} onCheckedChange={() => toggleNotif("digest")} />
            </div>
          </div>
        </div>

        <div>
          <div className="mb-2.5 text-xs font-semibold uppercase tracking-wide text-muted-foreground">Danger zone</div>
          <Dialog open={deleteOpen} onOpenChange={setDeleteOpen}>
            <DialogTrigger render={<Button variant="destructive" className="w-full" />}>
              Delete account
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Delete your account?</DialogTitle>
                <DialogDescription>
                  This clears your profile, swipes and wishlist from this device. This can&rsquo;t be undone.
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <Button variant="outline" onClick={() => setDeleteOpen(false)}>Cancel</Button>
                <Button
                  variant="destructive"
                  onClick={() => {
                    deleteAccount();
                    setDeleteOpen(false);
                    router.replace("/login");
                  }}
                >
                  Yes, delete
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
}
