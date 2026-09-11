export type Platform = "steam" | "xbox" | "playstation";

export type GameMode = "Singleplayer" | "Multiplayer" | "Co-op";

export type SwipeDirection = "liked" | "passed";

export interface Game {
  id: string;
  title: string;
  tagline: string;
  genres: string[];
  mode: GameMode;
  price: number;
  glyph: string;
  gradient: [string, string];
  desc: string;
  quote: string;
  outlet: string;
  indie: boolean;
  platforms: Platform[];
}

export interface AvatarOption {
  emoji: string;
  color: string;
}

export interface UserProfile {
  name: string;
  email: string;
  avatar: AvatarOption;
  genres: string[];
  platforms: Platform[];
  bio: string;
}

export interface NotifPrefs {
  matches: boolean;
  digest: boolean;
}

export interface GameFilters {
  genre: string;
  mode: string;
}

export interface AppState {
  authed: boolean;
  onboarded: boolean;
  pendingEmail: string;
  user: UserProfile;
  swiped: Record<string, SwipeDirection>;
  order: string[];
  affinity: Record<string, number>;
  filters: GameFilters;
  notif: NotifPrefs;
}
