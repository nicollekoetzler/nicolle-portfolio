# Touring Intelligence: interactive prototype

An AI-native touring intelligence platform for independent extreme metal artists, venues and talent buyers.
**Every venue, person, band, score and figure in this prototype is fictional and simulated.** There is no backend and no live booking data.

## Run it

```bash
npm install
npm run dev
# open http://localhost:3000
```

Requires Node 20+. Stack: Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS 4, Recharts, Lucide.

## The journey

1. **Overview** (`/`): NØCTURNE's dashboard with tour status, KPIs, AI touring intelligence (top markets, audience overlap, emerging and suggested markets), recommended venues and an audience-interest chart.
2. **Venue Discovery** (`/discover`): natural-language AI search. Press Enter or the arrow to run it; the prompt is parsed into filters ("Understood as …"), then results are ranked. Refine with filters for draw, country, city, genre, capacity, venue type and availability. Expand "Why this match" for the five-factor explanation; save venues.
3. **Venue Intelligence** (`/venues/void-club`): the full report with compatibility breakdown, AI recommendation, booking intelligence (attendance chart, event history, peer acts, preferences, audience fit) and booking contact.
   Actions: Save opportunity, Add to tour plan, Prepare booking pitch (streams an AI draft in three tones), Contact talent buyer (sending is simulated).
4. **Saved Opportunities** (`/saved`) shows your shortlist with outreach status. Also included: Market Intelligence, Artists, Settings.

State lives in React context, so it lasts while you click around and resets on a full reload.

## Where things live

- `src/lib/data/`: mock venues, artist and markets
- `src/lib/match.ts`: scoring model (weights, draw-adjusted capacity fit, filters)
- `src/lib/search.ts`: local, deterministic stand-in for an LLM intent parser
- `src/lib/pitch.ts`, `src/lib/explain.ts`: generated recommendation, pitch and explanation copy
- `src/components/`: `ui/` primitives, `shell/`, `dashboard/`, `discovery/`, `venue/`
