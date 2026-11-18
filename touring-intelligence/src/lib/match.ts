import type { DrawBand, Filters, Genre, MatchBreakdown, Venue } from "./types";

export const FACTORS: { key: keyof MatchBreakdown; label: string; weight: number; description: string }[] = [
  { key: "genre", label: "Genre compatibility", weight: 0.25, description: "How closely the venue's recent programming matches your subgenres." },
  { key: "audience", label: "Audience overlap", weight: 0.25, description: "Share of the venue's audience that also listens to your sound cluster." },
  { key: "capacity", label: "Capacity fit", weight: 0.2, description: "How well the room size suits your estimated draw." },
  { key: "history", label: "Booking history", weight: 0.2, description: "Whether the venue books acts at your level and in your peer group." },
  { key: "geography", label: "Geographic relevance", weight: 0.1, description: "Distance from your base and how it fits likely tour routing." },
];

export const DRAW_BANDS: DrawBand[] = ["50–150", "150–250", "250–400", "400+"];
const DRAW_MID: Record<DrawBand, number> = { "50–150": 100, "150–250": 200, "250–400": 320, "400+": 480 };
export const DEFAULT_DRAW: DrawBand = "150–250";

function capacityCurve(capacity: number, draw: DrawBand) {
  const ideal = DRAW_MID[draw] * 1.2;
  const fit = 100 - 62 * Math.abs(Math.log(capacity / ideal));
  return Math.max(25, Math.min(99, fit));
}

export function breakdownFor(venue: Venue, draw: DrawBand = DEFAULT_DRAW): MatchBreakdown {
  if (draw === DEFAULT_DRAW) return venue.breakdown;
  const delta = capacityCurve(venue.capacity, draw) - capacityCurve(venue.capacity, DEFAULT_DRAW);
  const capacity = Math.round(Math.max(20, Math.min(99, venue.breakdown.capacity + delta)));
  // Audience potential moves a little with draw too: bigger draws make big rooms more realistic.
  const audience = Math.round(Math.max(20, Math.min(99, venue.breakdown.audience + delta * 0.25)));
  return { ...venue.breakdown, capacity, audience };
}

export function totalScore(b: MatchBreakdown): number {
  return Math.round(FACTORS.reduce((sum, f) => sum + b[f.key] * f.weight, 0));
}

export function scoreFor(venue: Venue, draw: DrawBand = DEFAULT_DRAW) {
  return totalScore(breakdownFor(venue, draw));
}

export function matchTier(score: number) {
  if (score >= 90) return "Exceptional fit";
  if (score >= 84) return "Strong fit";
  if (score >= 76) return "Good fit";
  return "Partial fit";
}

const RELATED: Partial<Record<Genre, Genre[]>> = {
  "Atmospheric Black Metal": ["Atmospheric Black Metal", "Black Metal", "Post-Metal"],
  "Post-Metal": ["Post-Metal", "Atmospheric Black Metal", "Sludge Metal"],
  "Sludge Metal": ["Sludge Metal", "Doom Metal", "Post-Metal"],
};

export function genreMatches(venue: Venue, genres: Genre[]) {
  if (genres.length === 0) return true;
  return genres.some((g) => (RELATED[g] ?? [g]).some((r) => venue.genres.includes(r)));
}

export const DEFAULT_FILTERS: Filters = {
  countries: [],
  cities: [],
  genres: [],
  capacity: [100, 450],
  draw: DEFAULT_DRAW,
  types: [],
  availability: [],
};

export function applyFilters(list: Venue[], f: Filters) {
  return list.filter(
    (v) =>
      (f.countries.length === 0 || f.countries.includes(v.countryCode)) &&
      (f.cities.length === 0 || f.cities.includes(v.city)) &&
      genreMatches(v, f.genres) &&
      v.capacity >= f.capacity[0] &&
      v.capacity <= f.capacity[1] &&
      (f.types.length === 0 || f.types.includes(v.type)) &&
      (f.availability.length === 0 || f.availability.includes(v.availability)),
  );
}

export function countActiveFilters(f: Filters) {
  return (
    f.countries.length +
    f.cities.length +
    f.genres.length +
    f.types.length +
    f.availability.length +
    (f.capacity[0] !== DEFAULT_FILTERS.capacity[0] || f.capacity[1] !== DEFAULT_FILTERS.capacity[1] ? 1 : 0) +
    (f.draw !== DEFAULT_DRAW ? 1 : 0)
  );
}
