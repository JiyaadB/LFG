# LFG

Like, Find, Go — swipe to discover your next game.

LFG is Tinder/Hinge, but for video games. Instead of scrolling YouTube reviews, Instagram reels, and TikToks trying to figure out what to play next, you swipe: right adds a game to your wishlist with a link to buy it on Steam, Xbox, or PlayStation, left filters it out and tunes what shows up next. It also doubles as a social home base for indie developers to get their games in front of players, and for gamers to talk about what they're into.

Gamers already know "LFG" as gaming slang for Looking For Group. This is the same idea, one player short — you're looking for a game.

Why swipe?

Finding a new game to play usually means digging through a pile of trailers, reviews, and influencer takes before you even know if it's your kind of thing. LFG cuts that down to three things gamers actually care about first — genre, single/multiplayer, price — and lets a swipe do the filtering, the same way dating apps replaced scrolling through profiles one tab at a time.

Features
Swipe deck (core feature) — drag or tap to like/pass on a game. Each card is a mini profile: trailer, genre tags, mode, price, a short pitch, and a reviewer quote.
Personalized queue — the deck reorders itself based on your like/pass history, leaning into the genres you keep saying yes to.
Wishlist / Store tab — everything you swiped right on, one tap from its Steam / Xbox / PlayStation page.
Filtering — narrow the deck by genre or mode on the fly.
Indie Dev hub — a spotlight for indie titles and a submission flow for developers trying to get discovered.
Profile & social layer — stats, favorite genres, platforms owned, account settings — the foundation for finding people through what they like and review.
TikTok-style bottom nav — Home, Indie Dev, Profile, Store — fades out when you're not touching the screen, fades back in the moment you are.
Status

🚧 Early prototype. The swipe mechanics, full auth flow (login/sign-up/forgot password/email verification/onboarding), and all four core tabs are built and clickable end-to-end against mock game data. No real backend yet — see Roadmap.

		
Show Image	Show Image	Show Image
Tech stack

Right now: a single dependency-free HTML/CSS/JS prototype — no build step, no framework, runs by opening the file in a browser. That was a deliberate call for v1, to move fast and get every screen clickable before committing to an architecture.

Where this is headed:

Frontend: React, rebuilt from this prototype once the design's locked in.
Backend: real accounts + database (Supabase/Firebase, TBD) so wishlists and profiles sync across devices.
Native app: the same React codebase wrapped with Capacitor to ship as an installable iOS/Android app — one codebase, three surfaces, all hitting the same backend, which is what makes your data follow you the way it does on apps like TikTok.
Roadmap
 Real authentication & accounts
 Real game database + trailer/reviewer links (currently placeholders)
 TikTok-style video feed of game content
 Deeper indie developer submission pipeline
 Friend-finding / social layer around reviews
 React rebuild + Capacitor wrap for iOS/Android
Running the prototype

No install needed — open lfg.html in any browser. It's a single self-contained file.
