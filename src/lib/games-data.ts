import type { AvatarOption, Game, Platform } from "@/lib/types";

export const GAMES: Game[] = [
  { id: "ashfall-keep", title: "Ashfall Keep", tagline: "A keep that remembers every death.", genres: ["Roguelike", "RPG"], mode: "Singleplayer", price: 19.99, glyph: "🏰", gradient: ["#3a1f18", "#6b2e1e"], desc: "Claw back up a collapsing fortress one procedurally-cursed run at a time. Every death rewires the keep's floors for the next attempt.", quote: "The best roguelike structure since the genre got popular.", outlet: "Pixel & Ink", indie: false, platforms: ["steam", "xbox"] },
  { id: "nightshift-diner", title: "Nightshift Diner", tagline: "Serve the 3am crowd. All of them.", genres: ["Simulation", "Comedy"], mode: "Co-op", price: 12.99, glyph: "🍳", gradient: ["#2a1f3d", "#4a2f66"], desc: "Run a diner that only opens after midnight, for customers who are only sort of human. Split shifts with a friend before the coffee runs out.", quote: "Overcooked energy with an actual sense of humor.", outlet: "Couch Co-op Weekly", indie: false, platforms: ["steam", "playstation"] },
  { id: "vector-static", title: "Vector Static", tagline: "Tune the signal before it forgets you.", genres: ["Puzzle", "Sci-Fi"], mode: "Singleplayer", price: 0, glyph: "📡", gradient: ["#0f2a33", "#134a52"], desc: "A minimalist signal-tracing puzzler where every solved frequency reshapes the next one. No dialogue, no timer, just static and geometry.", quote: "Quietly one of the smartest puzzle games this year.", outlet: "The Backlog Report", indie: true, platforms: ["steam"] },
  { id: "palefire-rally", title: "Palefire Rally", tagline: "Wet asphalt, worse decisions.", genres: ["Racing"], mode: "Multiplayer", price: 29.99, glyph: "🏁", gradient: ["#331a12", "#7a3418"], desc: "Arcade rally racing across procedurally weathered routes. Sixteen-player lobbies, zero mercy, glorious wrecks.", quote: "The most fun I've had crashing a car in years.", outlet: "Drift Report", indie: false, platforms: ["steam", "xbox", "playstation"] },
  { id: "hollow-choir", title: "Hollow Choir", tagline: "Something in the chapel is still singing.", genres: ["Horror", "Walking Sim"], mode: "Singleplayer", price: 14.99, glyph: "🕯️", gradient: ["#1a1520", "#3a2340"], desc: "A slow-burn horror walk through a flooded seminary. The choir never stopped rehearsing — you're just late to the practice.", quote: "Dread you can hear coming from three rooms away.", outlet: "Late Night Load", indie: true, platforms: ["steam", "playstation"] },
  { id: "scrapyard-regatta", title: "Scrapyard Regatta", tagline: "Built from junk. Raced like it matters.", genres: ["Sports", "Racing"], mode: "Co-op", price: 9.99, glyph: "🚤", gradient: ["#152a1c", "#1f4a30"], desc: "Bolt a boat together from scrapyard parts with a friend, then race it before the glue dries. Physics are a suggestion.", quote: "Chaotic, scrappy, and impossible to put down.", outlet: "Couch Co-op Weekly", indie: true, platforms: ["steam", "xbox"] },
  { id: "drift-ember", title: "Drift & Ember", tagline: "A season at the lighthouse, one letter at a time.", genres: ["Visual Novel", "Romance"], mode: "Singleplayer", price: 6.99, glyph: "📖", gradient: ["#3d2418", "#6b3a20"], desc: "A slow, gentle visual novel about a lighthouse keeper's last summer and the letters that arrive anyway.", quote: "Unhurried, warm, and quietly devastating.", outlet: "Paper Lantern Reviews", indie: true, platforms: ["steam"] },
  { id: "ironclad-ledger", title: "Ironclad Ledger", tagline: "Trade routes. Broken treaties. Good cards.", genres: ["Strategy", "Card Battler"], mode: "Multiplayer", price: 0, glyph: "🃏", gradient: ["#241c14", "#4a3822"], desc: "A merchant-guild card battler where your deck is also your economy. Bluff a caravan, lose a war, win the market.", quote: "Deceptively deep for a free-to-play card game.", outlet: "The Backlog Report", indie: false, platforms: ["steam", "xbox"] },
  { id: "static-orchard", title: "Static Orchard", tagline: "The orchard grows back wrong every night.", genres: ["Platformer", "Metroidvania"], mode: "Singleplayer", price: 17.99, glyph: "🍎", gradient: ["#1c2a14", "#33481f"], desc: "A metroidvania where the map redraws itself while you sleep. Learn the orchard's new shape or get lost in it.", quote: "One of the tightest movement systems in the genre.", outlet: "Pixel & Ink", indie: true, platforms: ["steam", "playstation"] },
  { id: "undertow-signal", title: "Undertow Signal", tagline: "Two divers. One flooding station.", genres: ["Action", "Co-op"], mode: "Co-op", price: 24.99, glyph: "🌊", gradient: ["#0d222e", "#124155"], desc: "Cooperative underwater action as a flooding research station goes fully dark. One of you reads the map, one of you fights what's in it.", quote: "Tense, tight, and built for two people who trust each other.", outlet: "Late Night Load", indie: false, platforms: ["steam", "xbox", "playstation"] },
  { id: "molt", title: "Molt", tagline: "Shed the wrong skin, start the year over.", genres: ["Puzzle", "Horror"], mode: "Singleplayer", price: 8.99, glyph: "🦋", gradient: ["#241a2c", "#432752"], desc: "A tiny, unsettling puzzle game about a body that keeps molting into someone else's memories.", quote: "Small, strange, and stuck in my head for a week.", outlet: "Paper Lantern Reviews", indie: true, platforms: ["steam"] },
  { id: "tideglass-tactics", title: "Tideglass Tactics", tagline: "The tide is also a unit.", genres: ["Strategy"], mode: "Multiplayer", price: 19.99, glyph: "♟️", gradient: ["#101f2c", "#1c3a4d"], desc: "Turn-based tactics on a coastline that floods and drains on a real clock. Time your assault or lose your army to the water.", quote: "Adds a genuinely new wrinkle to tactics combat.", outlet: "The Backlog Report", indie: false, platforms: ["steam", "xbox"] },
  { id: "lantern-bone", title: "Lantern & Bone", tagline: "A small RPG about a very long walk home.", genres: ["RPG", "Adventure"], mode: "Singleplayer", price: 15.99, glyph: "🏮", gradient: ["#2c1c14", "#553220"], desc: "A hand-drawn RPG about walking a lantern across a continent that doesn't want you to arrive.", quote: "The best three-person team in indie RPGs right now.", outlet: "Pixel & Ink", indie: true, platforms: ["steam", "playstation"] },
  { id: "culdesac-kart", title: "Cul-de-Sac Kart Club", tagline: "Every driveway is a track now.", genres: ["Racing", "Party"], mode: "Multiplayer", price: 34.99, glyph: "🛞", gradient: ["#2c1710", "#603018"], desc: "Neighborhood kart racing across backyards, driveways and one very contested cul-de-sac. Local party chaos, up to 8 players.", quote: "Mario Kart energy with its own personality.", outlet: "Drift Report", indie: false, platforms: ["steam", "xbox", "playstation"] },
  { id: "quietwork", title: "Quietwork", tagline: "A loom, a quiet house, no deadline.", genres: ["Simulation"], mode: "Singleplayer", price: 0, glyph: "🧵", gradient: ["#1a231c", "#2e4232"], desc: "A no-fail weaving and mending sim about a quiet house that just needs tending to. No timers, no losing.", quote: "The most restorative fifteen minutes in gaming.", outlet: "Late Night Load", indie: true, platforms: ["steam"] },
  { id: "backline-blues", title: "Backline Blues", tagline: "Marching band, but it's a raid boss.", genres: ["Sports", "Co-op"], mode: "Co-op", price: 22.99, glyph: "🎷", gradient: ["#241a10", "#4a3318"], desc: "Cooperative rhythm-sports where your marching band formation is also your attack pattern against increasingly unreasonable opponents.", quote: "Unhinged premise, shockingly tight rhythm game.", outlet: "Couch Co-op Weekly", indie: true, platforms: ["steam", "xbox"] },
];

export const PLATFORM_META: Record<Platform, { label: string; url: string }> = {
  steam: { label: "Steam", url: "https://store.steampowered.com" },
  xbox: { label: "Xbox", url: "https://www.xbox.com/games" },
  playstation: { label: "PlayStation", url: "https://www.playstation.com/en-us/games/" },
};

export const ALL_GENRES = [
  "Action", "Adventure", "Card Battler", "Co-op", "Comedy", "Horror", "Metroidvania",
  "Party", "Platformer", "Puzzle", "RPG", "Racing", "Roguelike", "Romance", "Sci-Fi",
  "Simulation", "Sports", "Strategy", "Visual Novel", "Walking Sim",
];

export const AVATARS: AvatarOption[] = [
  { emoji: "🎮", color: "#ff5a3c" },
  { emoji: "🕹️", color: "#4cc9c0" },
  { emoji: "👾", color: "#8a6cff" },
  { emoji: "🦊", color: "#ff8a5c" },
  { emoji: "🐙", color: "#3fa9ff" },
  { emoji: "🐺", color: "#7d8296" },
  { emoji: "🦉", color: "#c98a3f" },
  { emoji: "🐸", color: "#4caf6e" },
];

export function gameById(id: string): Game | undefined {
  return GAMES.find((g) => g.id === id);
}

export function shuffle<T>(arr: T[]): T[] {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
